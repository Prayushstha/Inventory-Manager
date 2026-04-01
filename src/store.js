import DEFAULT_PRODUCTS from './Javascript/items.json';

export const store = {
  init() {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    const storedBarcodes = new Set(stored.map(p => p.barcode));
    const newProducts = DEFAULT_PRODUCTS.filter(p => !storedBarcodes.has(p.barcode));

    if (newProducts.length > 0) {
      localStorage.setItem('products', JSON.stringify([...stored, ...newProducts]));
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
    sales.unshift(sale);
    localStorage.setItem('sales', JSON.stringify(sales));
  }
};
