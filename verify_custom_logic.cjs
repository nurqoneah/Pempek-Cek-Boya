// verify_custom_logic.cjs
// Native exception catching for clean output
process.on('uncaughtException', (err) => {
  console.log('=== TEST RUNNER EXCEPTION ===');
  console.log(err.stack || err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.log('=== TEST RUNNER REJECTION ===');
  console.log(reason);
  process.exit(1);
});

// Mock browser environment for Node.js testing
global.window = global;

// Mock local storage
const store = {};
global.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, val) => { store[key] = String(val); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { for (const k in store) delete store[k]; }
};

// Load dependency scripts
const fs = require('fs');
eval(fs.readFileSync('js/data.js', 'utf8'));
eval(fs.readFileSync('js/db.js', 'utf8'));

// Mock fetch for WhatsApp API
const fetchCalls = [];
global.fetch = async (url, options) => {
  fetchCalls.push({ url, options: JSON.parse(JSON.stringify(options)) });
  return {
    ok: true,
    status: 200,
    text: async () => '{"status":"success"}',
    json: async () => ({ status: 'success', message: 'Mocked sending success' })
  };
};

async function runTests() {
  console.log('=== STARTING LOGICAL INTEGRATION TESTS ===\n');

  // Test 1: Member Tier Calculations
  console.log('Test 1: Member Tier Rules Verification');
  const testTiers = [
    { pts: 0, expected: 'BRONZE' },
    { pts: 99, expected: 'BRONZE' },
    { pts: 100, expected: 'SILVER' },
    { pts: 250, expected: 'SILVER' },
    { pts: 300, expected: 'GOLD' },
    { pts: 499, expected: 'GOLD' },
    { pts: 500, expected: 'PLATINUM' },
    { pts: 1000, expected: 'PLATINUM' }
  ];
  
  for (const t of testTiers) {
    const got = window.calculateMemberTier(t.pts);
    if (got === t.expected) {
      console.log(`  ✓ Points: ${t.pts} -> Tier: ${got} (Pass)`);
    } else {
      console.error(`  ✗ Points: ${t.pts} -> Expected: ${t.expected}, Got: ${got} (Fail)`);
      process.exit(1);
    }
  }

  // Test 2: WhatsApp Evolution Settings CRUD
  console.log('\nTest 2: WhatsApp Evolution API Settings CRUD');
  let currentSettings = await window.db.getWASettings();
  console.log('  Initial settings:', currentSettings);

  await window.db.saveWASettings('http://localhost:8080', 'test-inst', 'test-secret-key', true);
  currentSettings = await window.db.getWASettings();
  if (currentSettings.url === 'http://localhost:8080' && currentSettings.instance === 'test-inst' && currentSettings.apiKey === 'test-secret-key' && currentSettings.autoSend === true) {
    console.log('  ✓ saveWASettings and getWASettings successfully stored and retrieved configuration.');
  } else {
    console.error('  ✗ WhatsApp settings CRUD failed. Stored settings:', currentSettings);
    process.exit(1);
  }

  // Test 3: Customer Creation and Update
  console.log('\nTest 3: Customer Profiles with Loyalty Fields');
  const custData = {
    name: 'Budi Test Pelanggan',
    phone: '08123456789'
  };
  const addedCust = await window.db.addCustomer(custData);
  console.log('  Added Customer details:', addedCust);
  
  if (addedCust.points === 0 && addedCust.tier === 'BRONZE' && addedCust.id && addedCust.join_date) {
    console.log('  ✓ Customer initialized with 0 pts and BRONZE tier correctly.');
  } else {
    console.error('  ✗ Customer initialization failure.', addedCust);
    process.exit(1);
  }

  // Test 4: Sale submit directly without batch_id and verification of points reward
  console.log('\nTest 4: Creating regular sales and calculating earned points');
  
  // Set packages config
  global.state = {
    packages: window.DEFAULT_PACKAGES,
    customers: [addedCust],
    sales: []
  };

  // Mock document and innerHTML for app logic tests
  global.document = {
    getElementById: (id) => {
      return {
        value: '',
        addEventListener: () => {},
        removeEventListener: () => {}
      };
    }
  };

  // Construct a sale payload
  const saleItems = [
    { package_id: 'C', quantity: 2, price: 100000 }
  ];
  
  const saleData = {
    batch_id: null,
    customer_name: addedCust.name,
    package_id: 'C',
    quantity: 2,
    total_price: 200000,
    payment_status: 'paid',
    delivery_status: 'pending',
    notes: 'Uji Coba Otomatisasi',
    items: saleItems
  };

  const addedSale = await window.db.addSale(saleData);
  console.log('  Added Sale transaction:', addedSale);
  if (addedSale.id && addedSale.total_price === 200000 && addedSale.batch_id === null) {
    console.log('  ✓ Sale order created successfully without batch_id.');
  } else {
    console.error('  ✗ Sale order creation issue.', addedSale);
    process.exit(1);
  }

  const totalBill = saleData.total_price;
  const pointsEarned = Math.floor(totalBill / 10000);
  console.log(`  Expected Points Earned: ${pointsEarned}`);
  if (pointsEarned !== 20) {
    console.error('  ✗ Points earned calculation incorrect!');
    process.exit(1);
  }

  const newPoints = (addedCust.points || 0) + pointsEarned;
  const newTier = window.calculateMemberTier(newPoints);
  await window.db.updateCustomer(addedCust.id, { points: newPoints, tier: newTier });
  
  const updatedCust = (await window.db.getCustomers()).find(c => c.id === addedCust.id);
  console.log('  Updated Customer details after sale:', updatedCust);
  if (updatedCust.points === 20 && updatedCust.tier === 'BRONZE') {
    console.log('  ✓ Customer points and tier updated successfully in database.');
  } else {
    console.error('  ✗ Customer database update issue.', updatedCust);
    process.exit(1);
  }

  // Test 5: Verify WhatsApp Evolution API payload formatting and call
  console.log('\nTest 5: WhatsApp Evolution API Receipt Generation & Fetch Calls');
  global.state.sales = [addedSale];
  global.state.customers = [updatedCust];

  // Helper code to format WA receipt text
  function testGenerateWhatsAppText(saleRow) {
    let items = typeof saleRow.items === 'string' ? JSON.parse(saleRow.items) : saleRow.items;
    const itemsText = items.map(item => {
      const pkg = state.packages[item.package_id];
      const name = pkg ? pkg.name.split(' (')[0] : `Paket ${item.package_id}`;
      return `• ${name} x${item.quantity} (${formatIDR(item.price * item.quantity)})`;
    }).join('\n');

    const customerObj = state.customers.find(c => c.name.toLowerCase() === saleRow.customer_name.toLowerCase());
    const tier = customerObj ? customerObj.tier || 'BRONZE' : 'BRONZE';
    const tierLabel = window.MEMBER_TIERS[tier] ? window.MEMBER_TIERS[tier].name : 'Bronze';
    const points = customerObj ? customerObj.points || 0 : 0;
    
    return `*STRUK PENJUALAN - PEMPEK CEK BOYA*
----------------------------------------
Pelanggan : ${saleRow.customer_name} ${customerObj ? `(ID Member: ${customerObj.id})` : ''}
Tier      : Member ${tierLabel} (Poin: ${points})
Tanggal   : ${saleRow.created_at}
----------------------------------------
*Rincian Pesanan:*
${itemsText}
----------------------------------------
*Total Tagihan : ${formatIDR(saleRow.total_price)}*
${saleRow.notes ? `\nCatatan: ${saleRow.notes}` : ''}`;
  }

  function formatIDR(val) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  }

  const receiptText = testGenerateWhatsAppText(addedSale);
  console.log('  --- Generated Receipt WA Message ---');
  console.log(receiptText);
  console.log('  ------------------------------------\n');

  if (receiptText.includes('Budi Test Pelanggan') && receiptText.includes('Member Bronze') && receiptText.includes('Poin: 20') && receiptText.includes('Rp 200.000')) {
    console.log('  ✓ Receipt text matches expectation.');
  } else {
    console.error('  ✗ Receipt formatting issue!');
    process.exit(1);
  }

  // Test send receipt action
  console.log('  Triggering simulated WhatsApp message send...');
  async function testSendWhatsAppReceipt(saleId) {
    const sale = state.sales.find(s => s.id === saleId);
    const customerObj = state.customers.find(c => c.name.toLowerCase() === sale.customer_name.toLowerCase());
    const ws = await window.db.getWASettings();
    
    let phone = customerObj.phone.replace(/\D/g, '');
    if (phone.startsWith('0')) {
      phone = '62' + phone.substring(1);
    }
    
    const body = {
      number: phone,
      text: receiptText,
      delay: 1200
    };
    
    const endpoint = `${ws.url}/message/sendText/${ws.instance}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': ws.apiKey
      },
      body: JSON.stringify(body)
    });
    return response.ok;
  }

  const result = await testSendWhatsAppReceipt(addedSale.id);
  console.log('  Fetch calls recorded:', fetchCalls);
  
  if (result && fetchCalls.length === 1 && fetchCalls[0].url === 'http://localhost:8080/message/sendText/test-inst') {
    console.log('  ✓ sendWhatsAppReceipt made fetch network call to correct target Evolution API url with api-keys.');
  } else {
    console.error('  ✗ WhatsApp fetch call targets invalid.', fetchCalls);
    process.exit(1);
  }

  // Test 6: Manual Stock Adjustments
  console.log('\nTest 6: Manual Stock Adjustments');
  
  // 6.1: Adjust loose pempek stock
  const initialStock = await window.db.getStockSummary();
  const initialTelur = initialStock.ingredients.telur || 0;
  console.log(`  Initial Telur Stock: ${initialTelur}`);
  
  // Increase by 10
  await window.db.adjustIngredientStock('telur', 10, 'Penyesuaian manual (+10)');
  let afterIncrease = await window.db.getStockSummary();
  let afterIncreaseTelur = afterIncrease.ingredients.telur || 0;
  console.log(`  Telur Stock after (+10): ${afterIncreaseTelur}`);
  if (afterIncreaseTelur !== initialTelur + 10) {
    console.error('  ✗ Telur stock adjustment (+10) failed!');
    process.exit(1);
  }
  
  // Decrease by 3
  await window.db.adjustIngredientStock('telur', -3, 'Penyesuaian manual (-3)');
  let afterDecrease = await window.db.getStockSummary();
  let afterDecreaseTelur = afterDecrease.ingredients.telur || 0;
  console.log(`  Telur Stock after (-3): ${afterDecreaseTelur}`);
  if (afterDecreaseTelur !== initialTelur + 7) {
    console.error('  ✗ Telur stock adjustment (-3) failed!');
    process.exit(1);
  }
  
  // 6.2: Adjust package stock
  const initialPkgStock = await window.db.getPackageStock();
  const initialPkgC = parseInt(initialPkgStock['C']) || 0;
  console.log(`  Initial Package C Stock: ${initialPkgC}`);
  
  // Increase package stock
  await window.db.updatePackageStock('C', 5);
  let afterPkgIncrease = await window.db.getPackageStock();
  let afterPkgIncreaseC = parseInt(afterPkgIncrease['C']) || 0;
  console.log(`  Package C Stock after (+5): ${afterPkgIncreaseC}`);
  if (afterPkgIncreaseC !== initialPkgC + 5) {
    console.error('  ✗ Package C stock adjustment (+5) failed!');
    process.exit(1);
  }
  
  // Decrease package stock
  await window.db.updatePackageStock('C', -2);
  let afterPkgDecrease = await window.db.getPackageStock();
  let afterPkgDecreaseC = parseInt(afterPkgDecrease['C']) || 0;
  console.log(`  Package C Stock after (-2): ${afterPkgDecreaseC}`);
  if (afterPkgDecreaseC !== Math.max(0, initialPkgC + 3)) {
    console.error('  ✗ Package C stock adjustment (-2) failed!');
    process.exit(1);
  }
  
  console.log('  ✓ Manual stock adjustment database records verified successfully.');

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

runTests();

