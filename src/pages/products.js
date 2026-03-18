import { store } from '../store';

export function renderProducts() {
  const products = store.getProducts();

  const productRows = products.map(p => {
    let badgeClass = 'badge-gray';
    if (p.stock <= p.minStock) badgeClass = p.stock === 0 ? 'badge-red' : 'badge-yellow';
    
    return `
      <tr>
        <td>
          <div class="product-cell">
            <div class="prod-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8l-7-4-7 4v8l7 4 7-4Z"></path></svg></div>
            <div class="prod-inf">
              <div class="prod-name">${p.name}</div>
              <div class="prod-barcode text-muted">${p.barcode}</div>
            </div>
          </div>
        </td>
        <td class="text-muted">${p.sku}</td>
        <td class="text-muted">${p.category}</td>
        <td class="text-muted">NPR ${parseFloat(p.wholesale).toFixed(2)}</td>
        <td class="font-bold">NPR ${parseFloat(p.retail).toFixed(2)}</td>
        <td class="text-center"><span class="badge ${badgeClass}">${p.stock}</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-top-actions">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" class="search-icon" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" placeholder="Search by name, SKU, or barcode..." id="product-search">
      </div>
      <div class="action-buttons">
        <button class="btn btn-outline" id="btn-scan"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> Scan</button>
        <button class="btn btn-primary" id="btn-add-product">+ Add Product</button>
      </div>
    </div>

    <div class="panel">
      <table class="data-table products-table">
        <thead>
          <tr>
            <th>Product</th><th>SKU</th><th>Category</th><th>Wholesale</th><th>Retail</th><th class="text-center">Stock</th>
          </tr>
        </thead>
        <tbody id="product-list-body">
          ${productRows}
        </tbody>
      </table>
    </div>

    <!-- Add Product Modal Form -->
    <div id="product-modal" class="modal-overlay hidden">
      <div class="modal-glass">
        <div class="modal-header">
          <h3>Add New Product</h3>
          <button id="modal-close" class="btn-icon">&times;</button>
        </div>
        <form id="add-product-form" class="modal-body">
          <div class="form-group"><label>Name</label><input type="text" id="p-name" required class="form-input"></div>
          <div class="form-row">
            <div class="form-group"><label>SKU</label><input type="text" id="p-sku" required class="form-input"></div>
            <div class="form-group"><label>Barcode</label><input type="text" id="p-barcode" value="-" class="form-input"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Stock</label><input type="number" id="p-stock" required class="form-input"></div>
            <div class="form-group"><label>Min Stock</label><input type="number" id="p-min" value="10" class="form-input"></div>
          </div>
          <div class="form-row">
             <div class="form-group"><label>Wholesale (NPR)</label><input type="number" step="0.01" id="p-ws" required class="form-input"></div>
             <div class="form-group"><label>Retail (NPR)</label><input type="number" step="0.01" id="p-ret" required class="form-input"></div>
          </div>
          <button type="submit" class="btn btn-primary mt-4" style="width: 100%;">Save Product</button>
        </form>
      </div>
    </div>
  `;
}

export function initProducts() {
  const modal = document.getElementById('product-modal');
  const btnAdd = document.getElementById('btn-add-product');
  const btnClose = document.getElementById('modal-close');
  const form = document.getElementById('add-product-form');

  if (btnAdd) btnAdd.onclick = () => modal.classList.remove('hidden');
  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const product = {
        name: document.getElementById('p-name').value,
        sku: document.getElementById('p-sku').value,
        barcode: document.getElementById('p-barcode').value,
        category: 'Uncategorized',
        stock: parseInt(document.getElementById('p-stock').value),
        minStock: parseInt(document.getElementById('p-min').value),
        wholesale: parseFloat(document.getElementById('p-ws').value),
        retail: parseFloat(document.getElementById('p-ret').value)
      };

      store.addProduct(product);
      
      // Re-render
      modal.classList.add('hidden');
      document.getElementById('app-content').innerHTML = renderProducts();
      initProducts(); // Rebind events
    };
  }
}
