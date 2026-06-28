// Data paket default Pempek Cek Boya sebagai data awal (seeding)
window.DEFAULT_PACKAGES = {
  'A': {
    name: 'Paket A (37k)',
    price: 37000,
    composition: { kulit: 2, lenjer_kecil: 2, lenjer_potong: 3, telur: 3, lenjer_besar: 0, kapal_selam: 0 }
  },
  'B': {
    name: 'Paket B (37k)',
    price: 37000,
    composition: { kulit: 0, lenjer_kecil: 3, lenjer_potong: 4, telur: 3, lenjer_besar: 0, kapal_selam: 0 }
  },
  'C': {
    name: 'Paket C (100k)',
    price: 100000,
    composition: { kulit: 5, lenjer_kecil: 10, lenjer_potong: 10, telur: 5, lenjer_besar: 0, kapal_selam: 0 }
  },
  'D': {
    name: 'Paket D (200k)',
    price: 200000,
    composition: { kulit: 10, lenjer_kecil: 20, lenjer_potong: 20, telur: 10, lenjer_besar: 0, kapal_selam: 0 }
  },
  'E': {
    name: 'Paket E: Lenjer Kecil x10 (36k)',
    price: 36000,
    composition: { kulit: 0, lenjer_kecil: 10, lenjer_potong: 0, telur: 0, lenjer_besar: 0, kapal_selam: 0 }
  },
  'F': {
    name: 'Paket F: Lenjer Potong x10 (36k)',
    price: 36000,
    composition: { kulit: 0, lenjer_kecil: 0, lenjer_potong: 10, telur: 0, lenjer_besar: 0, kapal_selam: 0 }
  },
  'G': {
    name: 'Paket G: Telur x10 (38k)',
    price: 38000,
    composition: { kulit: 0, lenjer_kecil: 0, lenjer_potong: 0, telur: 10, lenjer_besar: 0, kapal_selam: 0 }
  },
  'H': {
    name: 'Paket H: Kulit x10 (35k)',
    price: 35000,
    composition: { kulit: 10, lenjer_kecil: 0, lenjer_potong: 0, telur: 0, lenjer_besar: 0, kapal_selam: 0 }
  },
  'I': {
    name: 'Paket I: Lenjer Besar x5 (140k)',
    price: 140000,
    composition: { kulit: 0, lenjer_kecil: 0, lenjer_potong: 0, telur: 0, lenjer_besar: 5, kapal_selam: 0 }
  },
  'J': {
    name: 'Paket J: Kapal Selam x5 (70k)',
    price: 70000,
    composition: { kulit: 0, lenjer_kecil: 0, lenjer_potong: 0, telur: 0, lenjer_besar: 0, kapal_selam: 5 }
  }
};

// Item labels for Indonesian display
window.ITEM_LABELS = {
  kulit: 'Kulit',
  lenjer_kecil: 'Lenjer Kecil',
  lenjer_potong: 'Lenjer Potong',
  telur: 'Telur',
  lenjer_besar: 'Lenjer Besar',
  kapal_selam: 'Kapal Selam'
};

// Hitung total butiran pempek dari kumpulan penjualan (sales) berdasarkan paket dinamis secara dinamis
window.calculateProductionSummary = function(salesList, packagesMap) {
  const summary = {};

  salesList.forEach(sale => {
    // Cari daftar items dari sale
    let items = [];
    if (sale.items) {
      items = typeof sale.items === 'string' ? JSON.parse(sale.items) : sale.items;
    }

    // Fallback jika array items kosong (mode backward compatibility)
    if (!Array.isArray(items) || items.length === 0) {
      items = [{ package_id: sale.package_id, quantity: sale.quantity }];
    }

    items.forEach(item => {
      const pkg = packagesMap[item.package_id];
      if (pkg) {
        const qty = parseInt(item.quantity) || 0;
        let comp = pkg.composition;
        if (typeof comp === 'string') {
          try { comp = JSON.parse(comp); } catch { comp = {}; }
        }
        if (comp && typeof comp === 'object') {
          Object.keys(comp).forEach(itemKey => {
            const val = parseInt(comp[itemKey]) || 0;
            if (val > 0) {
              if (summary[itemKey] === undefined) {
                summary[itemKey] = 0;
              }
              summary[itemKey] += val * qty;
            }
          });
        }
      }
    });
  });

  return summary;
};

// Production record template
window.PRODUCTION_TEMPLATE = {
  id: null,
  date: '',
  items: {
    kulit: 0,
    lenjer_kecil: 0,
    lenjer_potong: 0,
    telur: 0,
    lenjer_besar: 0,
    kapal_selam: 0
  },
  notes: '',
  created_at: null
};

// Package stock template
window.PACKAGE_STOCK_TEMPLATE = {
  package_id: '',
  quantity: 0,
  updated_at: null
};

// Calculate total ingredient stock from production records
window.calculateIngredientStock = function(productionRecords) {
  const stock = {
    kulit: 0,
    lenjer_kecil: 0,
    lenjer_potong: 0,
    telur: 0,
    lenjer_besar: 0,
    kapal_selam: 0
  };

  productionRecords.forEach(record => {
    let items = typeof record.items === 'string' ? JSON.parse(record.items) : record.items;
    Object.keys(items).forEach(key => {
      if (stock[key] !== undefined) {
        stock[key] += parseInt(items[key]) || 0;
      }
    });
  });

  return stock;
};

// Calculate how many packages can be made from available ingredients
window.calculatePossiblePackages = function(ingredientStock, packageComposition) {
  let maxPackages = Infinity;
  
  Object.keys(packageComposition).forEach(ingredient => {
    const needed = parseInt(packageComposition[ingredient]) || 0;
    const available = parseInt(ingredientStock[ingredient]) || 0;
    
    if (needed > 0) {
      const possible = Math.floor(available / needed);
      maxPackages = Math.min(maxPackages, possible);
    }
  });

  return maxPackages === Infinity ? 0 : maxPackages;
};

// --- CUSTOMER MEMBERSHIP SYSTEM ---
window.MEMBER_TIERS = {
  BRONZE: { name: 'Bronze', minPoints: 0, badgeClass: 'badge-secondary' },
  SILVER: { name: 'Silver', minPoints: 100, badgeClass: 'badge-info' },
  GOLD: { name: 'Gold', minPoints: 300, badgeClass: 'badge-warning' },
  PLATINUM: { name: 'Platinum', minPoints: 500, badgeClass: 'badge-accent' }
};

window.calculateMemberTier = function(points) {
  const pts = parseInt(points) || 0;
  if (pts >= window.MEMBER_TIERS.PLATINUM.minPoints) return 'PLATINUM';
  if (pts >= window.MEMBER_TIERS.GOLD.minPoints) return 'GOLD';
  if (pts >= window.MEMBER_TIERS.SILVER.minPoints) return 'SILVER';
  return 'BRONZE';
};

// WhatsApp settings template
window.WA_SETTINGS_TEMPLATE = {
  url: '',
  instance: '',
  apiKey: '',
  autoSend: false
};


// Seed Batches List from Google Sheets
window.SEED_BATCHES = [
  { id: 'b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1', name: 'Batch 1 (26 Mei 2026)', status: 'closed', created_at: '2026-05-26T00:00:00Z', closed_at: '2026-05-26T23:59:59Z' },
  { id: 'b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2', name: 'Batch 2 (27 Mei - 4 Jun 2026)', status: 'closed', created_at: '2026-05-27T00:00:00Z', closed_at: '2026-06-04T23:59:59Z' },
  { id: 'b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3', name: 'Batch 3 (5 Jun - 14 Jun 2026)', status: 'closed', created_at: '2026-06-05T00:00:00Z', closed_at: '2026-06-14T23:59:59Z' },
  { id: 'b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4', name: 'Batch 4 (15 Jun - 25 Jun 2026)', status: 'closed', created_at: '2026-06-15T00:00:00Z', closed_at: '2026-06-25T23:59:59Z' }
];

// Seed Expenses List from Google Sheets
window.SEED_EXPENSES = [
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Tepung Kanji (Qty: 20,00, Harga: Rp 7.250)",
    "amount": 145000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Garam (Qty: 1,00, Harga: Rp 15.000)",
    "amount": 15000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Penyedap (Qty: 1,00, Harga: Rp 15.000)",
    "amount": 15000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Telur (Qty: 2,00, Harga: Rp 46.000)",
    "amount": 92000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Bawang Bombay (Qty: 1,00, Harga: Rp 19.000)",
    "amount": 19000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Bawang Merah (Qty: 1,00, Harga: Rp 10.000)",
    "amount": 10000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Bawang Putih (Qty: 1,00, Harga: Rp 15.000)",
    "amount": 15000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Cabe Rawit (Qty: 1,00, Harga: Rp 26.000)",
    "amount": 26000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Bawang Putih Bubuk (Qty: 1,00, Harga: Rp 3.000)",
    "amount": 3000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Minyak (Qty: 1,00, Harga: Rp 44.500)",
    "amount": 44500,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Ikan & Gula Merah (Qty: 1,00, Harga: Rp 1.390.000)",
    "amount": 1390000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Gula Pasir (Qty: 1,00, Harga: Rp 13.000)",
    "amount": 13000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Bawang Putih (Qty: 1,00, Harga: Rp 7.000)",
    "amount": 7000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Bahan",
    "description": "Cabe (Qty: 1,00, Harga: Rp 8.000)",
    "amount": 8000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Botol Cuka 60 ml (Qty: 40,00, Harga: Rp 1.300)",
    "amount": 52000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Botol Cuka 200 ml (Qty: 20,00, Harga: Rp 1.300)",
    "amount": 26000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Plastik Vacum Kecil (Qty: 1,00, Harga: Rp 77.000)",
    "amount": 77000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Plastik Vacum Kecil (Qty: 20,00, Harga: Rp 1.000)",
    "amount": 20000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Plastik Kresek (Qty: 1,00, Harga: Rp 20.000)",
    "amount": 20000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Plastik Masak (Qty: 1,00, Harga: Rp 70.000)",
    "amount": 70000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Ember (Qty: 5,00, Harga: Rp 10.000)",
    "amount": 50000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Serbet (Qty: 5,00, Harga: Rp 6.000)",
    "amount": 30000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Alat & Kemasan",
    "description": "Plastik Vacum (Qty: 10,00, Harga: Rp 1.200)",
    "amount": 12000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Operasional",
    "description": "Upah (Qty: 2,00, Harga: Rp 100.000)",
    "amount": 200000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Transportasi",
    "description": "Bensin (Qty: 1,00, Harga: Rp 20.000)",
    "amount": 20000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b1b1b1b1-b1b1-4b1b-b1b1-b1b1b1b1b1b1",
    "category": "Transportasi",
    "description": "Parkir (Qty: 1,00, Harga: Rp 1.000)",
    "amount": 1000,
    "date": "2026-05-26"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Cabe Rawit (Qty: 1,00, Harga: Rp 15.000)",
    "amount": 15000,
    "date": "2026-05-27"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Bawang Putih (Qty: 1,00, Harga: Rp 8.000)",
    "amount": 8000,
    "date": "2026-05-27"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Operasional",
    "description": "Gas (Qty: 1,00, Harga: Rp 19.000)",
    "amount": 19000,
    "date": "2026-05-27"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Asam Jawa (Qty: 1,00, Harga: Rp 15.000)",
    "amount": 15000,
    "date": "2026-05-29"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Gula Merah (Qty: 1,00, Harga: 32000)",
    "amount": 32000,
    "date": "2026-05-29"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Tepung Kanji (Qty: 20,00, Harga: 7250)",
    "amount": 145000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Tepung Terigu (Qty: 1,00, Harga: 12900)",
    "amount": 12900,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Ikan Dan Gula Merah (Qty: 1,00, Harga: 590000)",
    "amount": 590000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Alat & Kemasan",
    "description": "Botol 200ml (Qty: 10,00, Harga: 1500)",
    "amount": 15000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Alat & Kemasan",
    "description": "Botol 60ml (Qty: 30,00, Harga: 733)",
    "amount": 21990,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Alat & Kemasan",
    "description": "Plastik Vacuum Besar (Qty: 10,00, Harga: 1000)",
    "amount": 10000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Alat & Kemasan",
    "description": "Plastik Vacuum Kecil (Qty: 100,00, Harga: 490)",
    "amount": 49000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Alat & Kemasan",
    "description": "Plastik Kresek (Qty: 50,00, Harga: 360)",
    "amount": 18000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Bawang Putih (Qty: 1,00, Harga: 14000)",
    "amount": 14000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Cabe Rawit (Qty: 1,00, Harga: 26000)",
    "amount": 26000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Bawang Bombay (Qty: 1,00, Harga: 5000)",
    "amount": 5000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Daun Bawang (Qty: 1,00, Harga: Rp 2.000)",
    "amount": 2000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Alat & Kemasan",
    "description": "Plastik Tangan (Qty: 5,00, Harga: 1200)",
    "amount": 6000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Minyak 1 Liter (Qty: 1,00, Harga: 21000)",
    "amount": 21000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Garam 1kg (Qty: 1,00, Harga: 14500)",
    "amount": 14500,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Transportasi",
    "description": "Transportasi (Qty: 1,00, Harga: 20000)",
    "amount": 20000,
    "date": "2026-06-03"
  },
  {
    "batch_id": "b2b2b2b2-b2b2-4b2b-b2b2-b2b2b2b2b2b2",
    "category": "Bahan",
    "description": "Gula merah 1.1 (Qty: 1,00, Harga: 40000)",
    "amount": 40000,
    "date": "2026-06-04"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "ikan dan gula merah (Qty: 1,00, Harga: 555000)",
    "amount": 555000,
    "date": "2026-06-05"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "botol plastik 60 ml (Qty: 1,00, Harga: 60000)",
    "amount": 60000,
    "date": "2026-06-05"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "botol plastik 200 ml (Qty: 1,00, Harga: 54724)",
    "amount": 54724,
    "date": "2026-06-06"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "spork (Qty: 1,00, Harga: 7638)",
    "amount": 7638,
    "date": "2026-06-06"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "cup cuka 30 ml (Qty: 1,00, Harga: 12000)",
    "amount": 12000,
    "date": "2026-06-06"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "paper thinwall (Qty: 1,00, Harga: 34000)",
    "amount": 34000,
    "date": "2026-06-06"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "bombay (Qty: 1,00, Harga: 5000)",
    "amount": 5000,
    "date": "2026-06-06"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "daun bawang (Qty: 1,00, Harga: 2000)",
    "amount": 2000,
    "date": "2026-06-06"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Operasional",
    "description": "gas (Qty: 1,00, Harga: 19000)",
    "amount": 19000,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "sunco 2l (Qty: 1,00, Harga: 51100)",
    "amount": 51100,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "garam supra (Qty: 1,00, Harga: 14800)",
    "amount": 14800,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "lada putih (Qty: 1,00, Harga: 5300)",
    "amount": 5300,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "ajinamoto (Qty: 1,00, Harga: 12300)",
    "amount": 12300,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Bahan",
    "description": "telur (Qty: 1,00, Harga: 54000)",
    "amount": 54000,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Transportasi",
    "description": "ongkos (Qty: 1,00, Harga: 20000)",
    "amount": 20000,
    "date": "2026-06-07"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "thinwall 1000 ml (Qty: 1,00, Harga: 49000)",
    "amount": 49000,
    "date": "2026-06-14"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "spatulla (Qty: 1,00, Harga: 22000)",
    "amount": 22000,
    "date": "2026-06-14"
  },
  {
    "batch_id": "b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3",
    "category": "Alat & Kemasan",
    "description": "plastik paket c (Qty: 1,00, Harga: 64650)",
    "amount": 64650,
    "date": "2026-06-14"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "tepung kanji (Qty: 1,00, Harga: 145000)",
    "amount": 145000,
    "date": "2026-06-15"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "sunco 2 liter (Qty: 1,00, Harga: 45500)",
    "amount": 45500,
    "date": "2026-06-15"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "tepung terigu 1 kg (Qty: 1,00, Harga: 12500)",
    "amount": 12500,
    "date": "2026-06-15"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Alat & Kemasan",
    "description": "paseo (tisu makanan) (Qty: 1,00, Harga: 13000)",
    "amount": 13000,
    "date": "2026-06-15"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "ikan + ongkir 80 + sterofoam 70 (Qty: 1,00, Harga: 2770000)",
    "amount": 2770000,
    "date": "2026-06-15"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "pempek 50 pack (Qty: 1,00, Harga: 830000)",
    "amount": 830000,
    "date": "2026-06-15"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "bawang merah 1/4 (Qty: 1,00, Harga: 8000)",
    "amount": 8000,
    "date": "2026-06-16"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "bawang putih 1/2 (Qty: 1,00, Harga: 20000)",
    "amount": 20000,
    "date": "2026-06-16"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "cabe rawit 1/2 (Qty: 1,00, Harga: 25000)",
    "amount": 25000,
    "date": "2026-06-16"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "bawang bombay 1/4 (Qty: 1,00, Harga: 9000)",
    "amount": 9000,
    "date": "2026-06-16"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "telor (Qty: 1,00, Harga: 45000)",
    "amount": 45000,
    "date": "2026-06-19"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Alat & Kemasan",
    "description": "plastik 1/4 (Qty: 1,00, Harga: 2000)",
    "amount": 2000,
    "date": "2026-06-19"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "daun bawang (Qty: 1,00, Harga: 2000)",
    "amount": 2000,
    "date": "2026-06-19"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "asam jawa (Qty: 1,00, Harga: 14000)",
    "amount": 14000,
    "date": "2026-06-19"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Alat & Kemasan",
    "description": "plastik kresek (Qty: 1,00, Harga: 45000)",
    "amount": 45000,
    "date": "2026-06-19"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Operasional",
    "description": "upah (bu dahlia) (Qty: 1,00, Harga: 50000)",
    "amount": 50000,
    "date": "2026-06-19"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Operasional",
    "description": "upah (bu dahlia) (Qty: 1,00, Harga: 50000)",
    "amount": 50000,
    "date": "2026-06-22"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "telur (Qty: 1,00, Harga: 45000)",
    "amount": 45000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "bawang putih (Qty: 1,00, Harga: 20000)",
    "amount": 20000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "cabe rawit (Qty: 1,00, Harga: 26000)",
    "amount": 26000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "bawang bombay (Qty: 1,00, Harga: 7000)",
    "amount": 7000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "daun bawang (Qty: 1,00, Harga: 2000)",
    "amount": 2000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Operasional",
    "description": "gas (Qty: 1,00, Harga: 18000)",
    "amount": 18000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "ikan (Qty: 1,00, Harga: 245000)",
    "amount": 245000,
    "date": "2026-06-24"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "tepung kanji 2 pcs (Qty: 1,00, Harga: 23000)",
    "amount": 23000,
    "date": "2026-06-25"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "ajinomoto (Qty: 1,00, Harga: 13000)",
    "amount": 13000,
    "date": "2026-06-25"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Bahan",
    "description": "telur (Qty: 1,00, Harga: 48000)",
    "amount": 48000,
    "date": "2026-06-25"
  },
  {
    "batch_id": "b4b4b4b4-b4b4-4b4b-b4b4-b4b4b4b4b4b4",
    "category": "Operasional",
    "description": "upah (Bu Eka) (Qty: 1,00, Harga: 100000)",
    "amount": 100000,
    "date": "2026-06-25"
  }
];
