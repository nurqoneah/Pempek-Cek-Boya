// Module Database Adapter - Hybrid LocalStorage & Supabase (Exposed globally)
let supabaseClient = null;
let isCustomersTableMissing = false;

window.db = {
  // Inisialisasi Database
  async init() {
    isCustomersTableMissing = false; // Reset flag saat inisialisasi/koneksi ulang
    const config = this.getCloudConfig();
    if (config && config.url && config.key) {
      try {
        if (window.supabase) {
          supabaseClient = window.supabase.createClient(config.url, config.key);
          // Tes koneksi sederhana dengan query batch
          const { data, error } = await supabaseClient.from('batches').select('id').limit(1);
          if (error) throw error;
          return { connected: true, msg: 'Terhubung ke database cloud Supabase!' };
        } else {
          return { connected: false, error: 'Library Supabase CDN gagal dimuat.' };
        }
      } catch (err) {
        console.error('Koneksi Supabase error:', err);
        supabaseClient = null;
        return { connected: false, error: `Gagal terhubung ke cloud: ${err.message}` };
      }
    }
    return { connected: false, msg: 'Menggunakan penyimpanan lokal browser.' };
  },

  // Konfigurasi Cloud
  getCloudConfig() {
    const cfg = localStorage.getItem('pempek_cloud_config');
    return cfg ? JSON.parse(cfg) : null;
  },

  saveCloudConfig(url, key) {
    localStorage.setItem('pempek_cloud_config', JSON.stringify({ url, key }));
  },

  clearCloudConfig() {
    localStorage.removeItem('pempek_cloud_config');
    supabaseClient = null;
  },

  isCloudActive() {
    return !!supabaseClient;
  },

  // Konfigurasi WhatsApp Evolution
  getWASettings() {
    const cfg = localStorage.getItem('pempek_wa_config');
    return cfg ? JSON.parse(cfg) : { url: '', instance: '', apiKey: '', autoSend: false };
  },

  saveWASettings(url, instance, apiKey, autoSend) {
    localStorage.setItem('pempek_wa_config', JSON.stringify({ url, instance, apiKey, autoSend }));
  },

  getModalAwal() {
    return parseFloat(localStorage.getItem('pempek_modal_awal')) || 0;
  },

  saveModalAwal(value) {
    localStorage.setItem('pempek_modal_awal', value);
  },


  // helper generate uuid untuk local storage
  _generateUUID() {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // --- CRUD PACKAGES ---
  async getPackages() {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('packages')
          .select('*')
          .order('id');
        if (!error) {
          if (data.length === 0) {
            // Seed cloud packages if empty
            const seedData = Object.keys(window.DEFAULT_PACKAGES).map(id => ({
              id,
              name: window.DEFAULT_PACKAGES[id].name,
              price: window.DEFAULT_PACKAGES[id].price,
              composition: window.DEFAULT_PACKAGES[id].composition
            }));
            await supabaseClient.from('packages').insert(seedData);
            localStorage.setItem('local_packages', JSON.stringify(window.DEFAULT_PACKAGES));
            return window.DEFAULT_PACKAGES;
          }
          // Convert list to map
          const map = {};
          data.forEach(p => {
            map[p.id] = { name: p.name, price: p.price, composition: p.composition };
          });
          localStorage.setItem('local_packages', JSON.stringify(map));
          return map;
        }
        console.warn('Gagal fetch cloud packages, menggunakan cache lokal:', error);
      } catch (err) {
        console.warn('Gagal fetch cloud packages, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_packages');
    if (!local) {
      localStorage.setItem('local_packages', JSON.stringify(window.DEFAULT_PACKAGES));
      return window.DEFAULT_PACKAGES;
    }
    return JSON.parse(local);
  },

  async addPackage(id, name, price, composition) {
    const newPackage = {
      name,
      price: parseFloat(price),
      composition
    };

    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('packages')
          .insert([{ id, name: newPackage.name, price: newPackage.price, composition: newPackage.composition }])
          .select();
        if (error) throw error;
        await this.getPackages();
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menyimpan paket ke cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const map = await this.getPackages();
    map[id] = newPackage;
    localStorage.setItem('local_packages', JSON.stringify(map));
    return { id, ...newPackage };
  },

  async updatePackage(id, updates) {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('packages')
          .update({
            name: updates.name,
            price: parseFloat(updates.price),
            composition: updates.composition
          })
          .eq('id', id)
          .select();
        if (error) throw error;
        await this.getPackages();
        return data[0];
      } catch (err) {
        throw new Error(`Gagal update paket di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const map = await this.getPackages();
    if (map[id]) {
      map[id] = {
        ...map[id],
        name: updates.name,
        price: parseFloat(updates.price),
        composition: updates.composition
      };
      localStorage.setItem('local_packages', JSON.stringify(map));
      return { id, ...map[id] };
    }
    throw new Error('Paket tidak ditemukan secara lokal.');
  },

  async deletePackage(id) {
    if (this.isCloudActive()) {
      try {
        const { error } = await supabaseClient
          .from('packages')
          .delete()
          .eq('id', id);
        if (error) throw error;
        await this.getPackages();
        return true;
      } catch (err) {
        throw new Error(`Gagal menghapus paket di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const map = await this.getPackages();
    if (map[id]) {
      delete map[id];
      localStorage.setItem('local_packages', JSON.stringify(map));
      return true;
    }
    throw new Error('Paket tidak ditemukan secara lokal.');
  },

  // --- CRUD CUSTOMERS ---
  async getCustomers() {
    if (this.isCloudActive() && !isCustomersTableMissing) {
      try {
        const { data, error } = await supabaseClient
          .from('customers')
          .select('*')
          .order('name');
        if (!error) {
          localStorage.setItem('local_customers', JSON.stringify(data));
          return data;
        }
        if (error.code === 'PGRST205') {
          isCustomersTableMissing = true;
          console.warn('Tabel "customers" tidak ditemukan di Supabase. Menggunakan penyimpanan lokal (offline-first).');
        } else {
          console.warn('Gagal fetch cloud customers, menggunakan cache lokal:', error);
        }
      } catch (err) {
        console.warn('Gagal fetch cloud customers, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_customers');
    return local ? JSON.parse(local) : [];
  },

  async addCustomer(customer) {
    let list = [];
    try {
      list = await this.getCustomers();
    } catch {
      // ignore
    }
    
    let newId = customer.id;
    if (!newId) {
      let count = list.length + 1;
      newId = `CB-${String(count).padStart(3, '0')}`;
      while (list.some(c => c.id === newId)) {
        count++;
        newId = `CB-${String(count).padStart(3, '0')}`;
      }
    }

    const newCustomer = {
      id: newId,
      name: customer.name,
      phone: customer.phone || '',
      points: parseInt(customer.points) || 0,
      tier: customer.tier || 'BRONZE',
      join_date: customer.join_date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    if (this.isCloudActive() && !isCustomersTableMissing) {
      try {
        const { data, error } = await supabaseClient
          .from('customers')
          .insert([{ 
            id: newCustomer.id, 
            name: newCustomer.name, 
            phone: newCustomer.phone,
            points: newCustomer.points,
            tier: newCustomer.tier,
            join_date: newCustomer.join_date
          }])
          .select();
        if (error) {
          if (error.code === 'PGRST205') {
            isCustomersTableMissing = true;
            console.warn('Tabel "customers" tidak ditemukan di Supabase. Menyimpan pelanggan secara lokal.');
            const localList = JSON.parse(localStorage.getItem('local_customers') || '[]');
            localList.push(newCustomer);
            localStorage.setItem('local_customers', JSON.stringify(localList));
            return newCustomer;
          } else {
            throw error;
          }
        }
        await this.getCustomers();
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menyimpan pelanggan ke cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    list.push(newCustomer);
    localStorage.setItem('local_customers', JSON.stringify(list));
    return newCustomer;
  },

  async updateCustomer(id, updates) {
    if (this.isCloudActive() && !isCustomersTableMissing) {
      try {
        const { data, error } = await supabaseClient
          .from('customers')
          .update(updates)
          .eq('id', id)
          .select();
        if (error) {
          if (error.code === 'PGRST205') {
            isCustomersTableMissing = true;
            console.warn('Tabel "customers" tidak ditemukan di Supabase. Mengupdate secara lokal.');
            const list = JSON.parse(localStorage.getItem('local_customers') || '[]');
            const idx = list.findIndex(c => c.id === id);
            if (idx !== -1) {
              list[idx] = { ...list[idx], ...updates };
              localStorage.setItem('local_customers', JSON.stringify(list));
              return list[idx];
            }
            throw new Error('Pelanggan tidak ditemukan secara lokal.');
          } else {
            throw error;
          }
        }
        await this.getCustomers();
        return data[0];
      } catch (err) {
        throw new Error(`Gagal update pelanggan di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getCustomers();
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem('local_customers', JSON.stringify(list));
      return list[idx];
    }
    throw new Error('Pelanggan tidak ditemukan secara lokal.');
  },

  async deleteCustomer(id) {
    if (this.isCloudActive() && !isCustomersTableMissing) {
      try {
        const { error } = await supabaseClient
          .from('customers')
          .delete()
          .eq('id', id);
        if (error) {
          if (error.code === 'PGRST205') {
            isCustomersTableMissing = true;
            console.warn('Tabel "customers" tidak ditemukan di Supabase. Menghapus secara lokal.');
            let list = JSON.parse(localStorage.getItem('local_customers') || '[]');
            list = list.filter(c => c.id !== id);
            localStorage.setItem('local_customers', JSON.stringify(list));
            return true;
          } else {
            throw error;
          }
        }
        await this.getCustomers();
        return true;
      } catch (err) {
        throw new Error(`Gagal menghapus pelanggan di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    let list = await this.getCustomers();
    list = list.filter(c => c.id !== id);
    localStorage.setItem('local_customers', JSON.stringify(list));
    return true;
  },

  // --- CRUD BATCHES ---
  async getBatches() {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('batches')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error) {
          if (data.length === 0) {
            // Seed cloud batches if empty
            if (window.SEED_BATCHES && window.SEED_BATCHES.length > 0) {
              await supabaseClient.from('batches').insert(window.SEED_BATCHES);
              
              // Seed cloud expenses as well if batches was seeded
              const { data: expData, error: expError } = await supabaseClient
                .from('expenses')
                .select('*')
                .limit(1);
              if (!expError && expData.length === 0 && window.SEED_EXPENSES && window.SEED_EXPENSES.length > 0) {
                // Chunk insert to avoid request size limits
                for (let i = 0; i < window.SEED_EXPENSES.length; i += 50) {
                  const chunk = window.SEED_EXPENSES.slice(i, i + 50);
                  await supabaseClient.from('expenses').insert(chunk);
                }
              }
              localStorage.setItem('local_batches', JSON.stringify(window.SEED_BATCHES));
              if (window.SEED_EXPENSES) {
                localStorage.setItem('local_expenses', JSON.stringify(window.SEED_EXPENSES));
              }
              return [...window.SEED_BATCHES].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
          }
          localStorage.setItem('local_batches', JSON.stringify(data));
          return data;
        }
        if (error) throw error;
      } catch (err) {
        console.warn('Gagal fetch cloud, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_batches');
    if (!local && window.SEED_BATCHES) {
      localStorage.setItem('local_batches', JSON.stringify(window.SEED_BATCHES));
      if (!localStorage.getItem('local_expenses') && window.SEED_EXPENSES) {
        localStorage.setItem('local_expenses', JSON.stringify(window.SEED_EXPENSES));
      }
      return [...window.SEED_BATCHES].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return local ? JSON.parse(local) : [];
  },

  async addBatch(name) {
    const newBatch = {
      id: this._generateUUID(),
      name: name,
      status: 'active',
      created_at: new Date().toISOString(),
      closed_at: null
    };

    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('batches')
          .insert([{ name: newBatch.name, status: newBatch.status }])
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menyimpan batch ke cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getBatches();
    list.unshift(newBatch);
    localStorage.setItem('local_batches', JSON.stringify(list));
    return newBatch;
  },

  async closeBatch(id) {
    const closedAt = new Date().toISOString();
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('batches')
          .update({ status: 'closed', closed_at: closedAt })
          .eq('id', id)
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menutup batch di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getBatches();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      list[idx].status = 'closed';
      list[idx].closed_at = closedAt;
      localStorage.setItem('local_batches', JSON.stringify(list));
      return list[idx];
    }
    throw new Error('Batch tidak ditemukan secara lokal.');
  },

  async reopenBatch(id) {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('batches')
          .update({ status: 'active', closed_at: null })
          .eq('id', id)
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        throw new Error(`Gagal membuka kembali batch di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getBatches();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      list[idx].status = 'active';
      list[idx].closed_at = null;
      localStorage.setItem('local_batches', JSON.stringify(list));
      return list[idx];
    }
    throw new Error('Batch tidak ditemukan secara lokal.');
  },


  async deleteBatch(id) {
    if (this.isCloudActive()) {
      try {
        const { error } = await supabaseClient
          .from('batches')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        throw new Error(`Gagal menghapus batch di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    let batches = await this.getBatches();
    batches = batches.filter(b => b.id !== id);
    localStorage.setItem('local_batches', JSON.stringify(batches));

    // Hapus sales dan expenses terkait secara lokal
    let sales = await this.getAllSales();
    sales = sales.filter(s => s.batch_id !== id);
    localStorage.setItem('local_sales', JSON.stringify(sales));

    let expenses = await this.getAllExpenses();
    expenses = expenses.filter(e => e.batch_id !== id);
    localStorage.setItem('local_expenses', JSON.stringify(expenses));

    return true;
  },

  // --- CRUD SALES (PENJUALAN) ---
  async getAllSales() {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('sales')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        localStorage.setItem('local_sales', JSON.stringify(data));
        return data;
      } catch (err) {
        console.warn('Gagal fetch cloud sales, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_sales');
    return local ? JSON.parse(local) : [];
  },

  async getSales(batchId) {
    const allSales = await this.getAllSales();
    return allSales.filter(s => s.batch_id === batchId);
  },

  async addSale(sale) {
    const saleDate = sale.created_at ? new Date(sale.created_at) : new Date();
    const dateStr = saleDate.toISOString().substring(2, 10).replace(/-/g, ''); // YYMMDD
    const prefix = `PCB-${dateStr}`;

    let count = 0;
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('sales')
          .select('id')
          .like('id', `${prefix}%`);
        if (!error && data) {
          count = data.length;
        }
      } catch (err) {
        console.error('Count daily sales error:', err);
      }
    } else {
      const localSales = JSON.parse(localStorage.getItem('local_sales') || '[]');
      count = localSales.filter(s => s.id && s.id.startsWith(prefix)).length;
    }

    const nextNum = String(count + 1).padStart(4, '0');
    const customId = `${prefix}-${nextNum}`;

    const newSale = {
      id: customId,
      batch_id: sale.batch_id,
      customer_name: sale.customer_name,
      package_id: sale.package_id,
      quantity: parseInt(sale.quantity) || 1,
      total_price: parseFloat(sale.total_price),
      payment_status: sale.payment_status || 'unpaid',
      delivery_status: sale.delivery_status || 'pending',
      notes: sale.notes || '',
      items: sale.items || [], // Simpan array item paket
      created_at: sale.created_at || new Date().toISOString()
    };

    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('sales')
          .insert([{
            id: newSale.id,
            batch_id: newSale.batch_id,
            customer_name: newSale.customer_name,
            package_id: newSale.package_id,
            quantity: newSale.quantity,
            total_price: newSale.total_price,
            payment_status: newSale.payment_status,
            delivery_status: newSale.delivery_status,
            notes: newSale.notes,
            items: newSale.items
          }])
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menyimpan penjualan ke cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getAllSales();
    list.unshift(newSale);
    localStorage.setItem('local_sales', JSON.stringify(list));
    return newSale;
  },

  async updateSale(id, updates) {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('sales')
          .update(updates)
          .eq('id', id)
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        throw new Error(`Gagal update penjualan di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getAllSales();
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem('local_sales', JSON.stringify(list));
      return list[idx];
    }
    throw new Error('Penjualan tidak ditemukan secara lokal.');
  },

  async deleteSale(id) {
    if (this.isCloudActive()) {
      try {
        const { error } = await supabaseClient
          .from('sales')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        throw new Error(`Gagal menghapus penjualan di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    let list = await this.getAllSales();
    list = list.filter(s => s.id !== id);
    localStorage.setItem('local_sales', JSON.stringify(list));
    return true;
  },

  // --- CRUD EXPENSES (PENGELUARAN) ---
  async getAllExpenses() {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('expenses')
          .select('*')
          .order('date', { ascending: false });
        if (error) throw error;
        localStorage.setItem('local_expenses', JSON.stringify(data));
        return data;
      } catch (err) {
        console.warn('Gagal fetch cloud expenses, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_expenses');
    return local ? JSON.parse(local) : [];
  },

  async getExpenses(batchId) {
    const allExpenses = await this.getAllExpenses();
    return allExpenses.filter(e => e.batch_id === batchId);
  },

  async addExpense(expense) {
    const newExpense = {
      id: this._generateUUID(),
      batch_id: expense.batch_id,
      category: expense.category,
      description: expense.description,
      amount: parseFloat(expense.amount),
      date: expense.date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('expenses')
          .insert([{
            batch_id: newExpense.batch_id,
            category: newExpense.category,
            description: newExpense.description,
            amount: newExpense.amount,
            date: newExpense.date
          }])
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menyimpan pengeluaran ke cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getAllExpenses();
    list.unshift(newExpense);
    localStorage.setItem('local_expenses', JSON.stringify(list));
    return newExpense;
  },

  async deleteExpense(id) {
    if (this.isCloudActive()) {
      try {
        const { error } = await supabaseClient
          .from('expenses')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        throw new Error(`Gagal menghapus pengeluaran di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    let list = await this.getAllExpenses();
    list = list.filter(e => e.id !== id);
    localStorage.setItem('local_expenses', JSON.stringify(list));
    return true;
  },

  // --- SINKRONISASI DATA LOKAL KE CLOUD ---
  async syncLocalToCloud() {
    if (!this.isCloudActive()) {
      throw new Error('Supabase Client belum diinisialisasi.');
    }

    const localCustomers = JSON.parse(localStorage.getItem('local_customers') || '[]');
    const localPackages = JSON.parse(localStorage.getItem('local_packages') || '{}');
    const localBatches = JSON.parse(localStorage.getItem('local_batches') || '[]');
    const localSales = JSON.parse(localStorage.getItem('local_sales') || '[]');
    const localExpenses = JSON.parse(localStorage.getItem('local_expenses') || '[]');

    try {
      let syncedCustomersCount = 0;
      let syncedPackagesCount = 0;
      let syncedBatchesCount = 0;
      let syncedSalesCount = 0;
      let syncedExpensesCount = 0;

      // 1. Sinkronkan Customers
      for (const cust of localCustomers) {
        const { error } = await supabaseClient
          .from('customers')
          .upsert([{ id: cust.id, name: cust.name, phone: cust.phone }]);
        if (error) throw error;
        syncedCustomersCount++;
      }

      // 2. Sinkronkan Packages
      for (const id of Object.keys(localPackages)) {
        const pkg = localPackages[id];
        const { error } = await supabaseClient
          .from('packages')
          .upsert([{ id, name: pkg.name, price: pkg.price, composition: pkg.composition }]);
        if (error) throw error;
        syncedPackagesCount++;
      }

      // Peta untuk menyimpan kecocokan ID lokal ke ID cloud
      const idMapping = {};

      // 3. Sinkronkan Batches
      for (const batch of localBatches) {
        const { data: existing } = await supabaseClient
          .from('batches')
          .select('id')
          .eq('name', batch.name)
          .limit(1);

        let cloudBatchId;
        if (existing && existing.length > 0) {
          cloudBatchId = existing[0].id;
        } else {
          const { data, error } = await supabaseClient
            .from('batches')
            .insert([{ name: batch.name, status: batch.status, closed_at: batch.closed_at }])
            .select();
          if (error) throw error;
          cloudBatchId = data[0].id;
          syncedBatchesCount++;
        }
        idMapping[batch.id] = cloudBatchId;
      }

      // 4. Sinkronkan Sales
      for (const sale of localSales) {
        const cloudBatchId = idMapping[sale.batch_id];
        if (!cloudBatchId) continue;

        const { data: existingSale } = await supabaseClient
          .from('sales')
          .select('id')
          .eq('batch_id', cloudBatchId)
          .eq('customer_name', sale.customer_name)
          .eq('total_price', sale.total_price)
          .limit(1);

        if (!existingSale || existingSale.length === 0) {
          const { error } = await supabaseClient
            .from('sales')
            .insert([{
              batch_id: cloudBatchId,
              customer_name: sale.customer_name,
              package_id: sale.package_id,
              quantity: sale.quantity,
              total_price: sale.total_price,
              payment_status: sale.payment_status,
              delivery_status: sale.delivery_status,
              notes: sale.notes,
              items: sale.items
            }]);
          if (error) throw error;
          syncedSalesCount++;
        }
      }

      // 5. Sinkronkan Expenses
      for (const exp of localExpenses) {
        const cloudBatchId = idMapping[exp.batch_id];
        if (!cloudBatchId) continue;

        const { data: existingExp } = await supabaseClient
          .from('expenses')
          .select('id')
          .eq('batch_id', cloudBatchId)
          .eq('description', exp.description)
          .eq('amount', exp.amount)
          .limit(1);

        if (!existingExp || existingExp.length === 0) {
          const { error } = await supabaseClient
            .from('expenses')
            .insert([{
              batch_id: cloudBatchId,
              category: exp.category,
              description: exp.description,
              amount: exp.amount,
              date: exp.date
            }]);
          if (error) throw error;
          syncedExpensesCount++;
        }
      }

      return {
        success: true,
        customers: syncedCustomersCount,
        packages: syncedPackagesCount,
        batches: syncedBatchesCount,
        sales: syncedSalesCount,
        expenses: syncedExpensesCount,
        msg: `Sinkronisasi sukses! Berhasil mengunggah ${syncedCustomersCount} pelanggan, ${syncedPackagesCount} paket, ${syncedBatchesCount} batch, ${syncedSalesCount} transaksi, dan ${syncedExpensesCount} pengeluaran ke cloud.`
      };
    } catch (err) {
      console.error('Error saat sinkronisasi:', err);
      throw new Error(`Proses sinkronisasi gagal: ${err.message}`);
    }
  },

  // --- CRUD PRODUCTION RECORDS ---
  async getProductionRecords() {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('production_records')
          .select('*')
          .order('date', { ascending: false });
        if (!error) {
          localStorage.setItem('local_production_records', JSON.stringify(data));
          return data;
        }
        console.warn('Gagal fetch cloud production records, menggunakan cache lokal:', error);
      } catch (err) {
        console.warn('Gagal fetch cloud production records, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_production_records');
    return local ? JSON.parse(local) : [];
  },

  async addProductionRecord(record) {
    const newRecord = {
      id: this._generateUUID(),
      date: record.date || new Date().toISOString().split('T')[0],
      items: record.items,
      notes: record.notes || '',
      created_at: new Date().toISOString()
    };

    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('production_records')
          .insert([{
            date: newRecord.date,
            items: newRecord.items,
            notes: newRecord.notes
          }])
          .select();
        if (error) throw error;
        await this.getProductionRecords();
        return data[0];
      } catch (err) {
        throw new Error(`Gagal menyimpan produksi ke cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    const list = await this.getProductionRecords();
    list.unshift(newRecord);
    localStorage.setItem('local_production_records', JSON.stringify(list));
    return newRecord;
  },

  async deleteProductionRecord(id) {
    if (this.isCloudActive()) {
      try {
        const { error } = await supabaseClient
          .from('production_records')
          .delete()
          .eq('id', id);
        if (error) throw error;
        await this.getProductionRecords();
        return true;
      } catch (err) {
        throw new Error(`Gagal menghapus produksi di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    let list = await this.getProductionRecords();
    list = list.filter(r => r.id !== id);
    localStorage.setItem('local_production_records', JSON.stringify(list));
    return true;
  },

  // --- CRUD PACKAGE STOCK ---
  async getPackageStock() {
    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('package_stock')
          .select('*');
        if (!error) {
          const stockMap = {};
          data.forEach(item => {
            stockMap[item.package_id] = item.quantity;
          });
          localStorage.setItem('local_package_stock', JSON.stringify(stockMap));
          return stockMap;
        }
        console.warn('Gagal fetch cloud package stock, menggunakan cache lokal:', error);
      } catch (err) {
        console.warn('Gagal fetch cloud package stock, menggunakan cache lokal:', err);
      }
    }
    const local = localStorage.getItem('local_package_stock');
    return local ? JSON.parse(local) : {};
  },

  async updatePackageStock(packageId, quantityChange) {
    const stockMap = await this.getPackageStock();
    const currentStock = parseInt(stockMap[packageId]) || 0;
    const newStock = Math.max(0, currentStock + quantityChange);
    stockMap[packageId] = newStock;

    if (this.isCloudActive()) {
      try {
        const { data, error } = await supabaseClient
          .from('package_stock')
          .upsert([{
            package_id: packageId,
            quantity: newStock,
            updated_at: new Date().toISOString()
          }])
          .select();
        if (error) throw error;
        await this.getPackageStock();
        return { package_id: packageId, quantity: newStock };
      } catch (err) {
        throw new Error(`Gagal update stok paket di cloud: ${err.message}`);
      }
    }

    // Fallback Lokal
    localStorage.setItem('local_package_stock', JSON.stringify(stockMap));
    return { package_id: packageId, quantity: newStock };
  },

  async adjustIngredientStock(ingredientKey, quantityChange, notes = 'Penyesuaian Manual') {
    const items = {
      kulit: 0,
      telur: 0,
      lenjer_kecil: 0,
      lenjer_potong: 0,
      lenjer_besar: 0,
      kapal_selam: 0
    };
    if (items[ingredientKey] !== undefined) {
      items[ingredientKey] = quantityChange;
      return await this.addProductionRecord({
        date: new Date().toISOString().split('T')[0],
        items: items,
        notes: notes
      });
    }
    throw new Error(`Bahan pempek tidak dikenal: ${ingredientKey}`);
  },

  async getStockSummary() {
    const productionRecords = await this.getProductionRecords();
    const packageStock = await this.getPackageStock();
    const packages = await this.getPackages();

    const ingredientStock = window.calculateIngredientStock(productionRecords);

    return {
      ingredients: ingredientStock,
      packages: packageStock,
      packages_data: packages
    };
  }
};
