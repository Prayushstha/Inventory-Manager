export const store = {
  init() {
    const DEFAULT_PRODUCTS = [
      { sku: 'OIL-001', name: 'Premium baby Oil', barcode: '8001234567890', category: 'Food & Beverage', wholesale: 1100.00, retail: 1950.00, stock: 45, minStock: 10 },
      { sku: 'HON-002', name: 'Organic baby oil', barcode: '8001234567891', category: 'Food & Beverage', wholesale: 780.00, retail: 1625.00, stock: 8, minStock: 15 },
      { sku: 'SOP-003', name: 'Artisan baby Soap Bar', barcode: '8001234567892', category: 'Personal Care', wholesale: 325.00, retail: 910.00, stock: 120, minStock: 20 },
      { sku: 'MUG-004', name: 'Ceramic baby Mug', barcode: '8001234567893', category: 'Homeware', wholesale: 520.00, retail: 1300.00, stock: 3, minStock: 10 },
      { sku: 'GRA-005', name: 'Granola Mix 750g', barcode: '8001234567894', category: 'Food & Beverage', wholesale: 495.00, retail: 1040.00, stock: 62, minStock: 20 },
      { sku: 'CAN-006', name: 'Scented Candle - Vanilla', barcode: '8001234567895', category: 'Homeware', wholesale: 650.00, retail: 1560.00, stock: 18, minStock: 10 }
    ];

    const DEFAULT_SALES = [
      { customer: 'Prayush Basnet', items: 'Premium baby Oil ×2, Artisan baby Soap Bar ×3', total: 6630.00, date: '2026-03-18' },
      { customer: 'Prayush Timalsina', items: 'Granola Mix 750g ×1, Bamboo Toothbrush ×4', total: 3115.00, date: '2026-03-17' },
      { customer: 'Prayush Shrestha', items: 'Scented Candle - Vanilla ×2, Ceramic baby Mug ×1', total: 4420.00, date: '2026-03-17' }
    ];

    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem('sales')) {
      localStorage.setItem('sales', JSON.stringify(DEFAULT_SALES));
    }
  },

  getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  },

  addProduct(product) {
    const products = this.getProducts();
    products.unshift(product);
    localStorage.setItem('products', JSON.stringify(products));
  },

  updateStock(sku, quantityChange) {
    const products = this.getProducts();
    const prod = products.find(p => p.sku === sku);
    if (prod) {
      prod.stock += quantityChange;
      localStorage.setItem('products', JSON.stringify(products));
    }
  },

  getSales() {
    return JSON.parse(localStorage.getItem('sales') || '[]');
  },

  addSale(sale) {
    const sales = this.getSales();
    sales.unshift(sale); // Add to top
    localStorage.setItem('sales', JSON.stringify(sales));
  }
};
