import { store } from '../store.js';

export function renderSales() {
  const sales = store.getSales();
  
  const recentSalesHTML = sales.length === 0 ? `<div class="p-6 text-center text-muted">No sales yet. Searching for a product and recording a sale will populate this list.</div>` :
    sales.map(s => `
      <div class="list-item">
        <div class="sale-info">
          <h4>${s.customer}</h4>
          <div class="sale-items text-muted">${s.items}</div>
          <div class="sale-date text-muted">${s.date}</div>
        </div>
        <div class="sale-total font-bold">NPR ${parseFloat(s.total).toFixed(2)}</div>
      </div>
    `).join('');

  return `
    <div class="panel mb-6">
      <div class="panel-header">
        <h3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> New Sale</h3>
      </div>
      <div class="scanner-box">
        <div class="search-box full-width flex gap-2">
          <svg viewBox="0 0 24 24" fill="none" class="search-icon" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="sale-product-search" placeholder="Type a Product SKU to quick-sell (e.g. OIL-001)...">
          <button id="quick-sell-btn" class="btn btn-primary ml-2 flex-shrink-0">Sell 1x</button>
        </div>
        <div id="sale-feedback" class="mt-4 text-green" style="display: none; text-align: center; font-weight: 500;"></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Recent Sales</h3>
      </div>
      <div class="list-container large-list">
        ${recentSalesHTML}
      </div>
    </div>
  `;
}

export function initSales() {
  const btn = document.getElementById('quick-sell-btn');
  const input = document.getElementById('sale-product-search');
  const feedback = document.getElementById('sale-feedback');

  if (btn && input) {
    btn.onclick = () => {
      const sku = input.value.trim().toUpperCase();
      if (!sku) return;

      const products = store.getProducts();
      const product = products.find(p => p.sku === sku || p.name.toUpperCase().includes(sku));

      if (product) {
        if (product.stock > 0) {
          store.updateStock(product.sku, -1);
          store.addSale({
            customer: 'Walk-in Customer',
            items: `${product.name} ×1`,
            total: product.retail,
            date: new Date().toISOString().split('T')[0]
          });
          
          input.value = '';
          feedback.textContent = `✅ Success! Sold 1x ${product.name} (NPR ${product.retail})`;
          feedback.className = 'mt-4 text-green';
          feedback.style.display = 'block';
          
          // Slight delay before re-render so they see the success text
          setTimeout(() => {
            document.getElementById('app-content').innerHTML = renderSales();
            initSales();
          }, 1500);
        } else {
          feedback.textContent = `❌ Out of stock: ${product.name}`;
          feedback.className = 'mt-4 text-red';
          feedback.style.display = 'block';
        }
      } else {
        feedback.textContent = `❌ Product not found`;
        feedback.className = 'mt-4 text-red';
        feedback.style.display = 'block';
      }
    };
  }
}
