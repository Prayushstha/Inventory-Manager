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
        <button class="btn btn-primary" id="btn-scan"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> Scan</button>
        <button class="btn btn-primary" id="btn-add-product">+ Add Product</button>
              <div class="change-layout">
      <button class="btn btn-primary layout-btn" id="layout-btn">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="var(--text-primary)" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1H1V5H7V1Z"/>
    <path d="M7 7H1V15H7V7Z"/>
    <path d="M9 1H15V9H9V1Z"/>
    <path d="M15 11H9V15H15V11Z"/>
  </svg>
      </button>
      </div>
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
    const layoutBtn = document.getElementById('layout-btn'); 


  if (btnAdd) btnAdd.onclick = () => modal.classList.remove('hidden');
  if (btnClose) btnClose.onclick = () => modal.classList.add('hidden');
  if (layoutBtn) layoutBtn.addEventListener('click', changelayout); 


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
function getProductImage(filename) {
  if (!filename) return null;
  try {
    return require(`../images/product-images/${filename}`);
  } catch {
    return null;
  }
}
function renderProductCard(p) {
  
const imgSrc = getProductImage(p.image);

  let badgeClass = 'badge-gray';
  let stockText = 'Stock unknown';
  if (p.stock === null) { badgeClass = 'badge-gray'; stockText = 'Unknown'; }
  else if (p.stock === 0) { badgeClass = 'badge-red'; stockText = 'Out of stock'; }
  else if (p.stock <= p.minStock) { badgeClass = 'badge-yellow'; stockText = `Low: ${p.stock}`; }
  else { badgeClass = 'badge-green'; stockText = `${p.stock} in stock`; }

  const retail = p.retail != null ? `NPR ${p.retail.toLocaleString()}` : '—';
  const ws = p.wholesale != null ? `NPR ${p.wholesale.toLocaleString()}` : '—';

return `
  <div class="prod-card">
    <div class="card-img">
      ${imgSrc 
        ? `<img src="${imgSrc}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">` 
        : `<span class="no-img-text">No image</span>`
      }
        <span class="card-category">${p.category}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-sku">${p.sku}</div>
        <div class="card-prices">
          <div class="price-row">
            <span class="price-label">Retail</span>
            <span class="price-retail">${retail}</span>
          </div>
          <div class="price-row">
            <span class="price-label">Wholesale</span>
            <span class="price-ws">${ws}</span>
          </div>
        </div>
        <div class="card-stock">
          <span class="badge ${badgeClass}">${stockText}</span>
        </div>
      </div>
    </div>
  `;
}

let isGridLayout = false;

export function changelayout() {
  isGridLayout = !isGridLayout;
  const panel = document.querySelector('.panel');

  if (isGridLayout) {
    const products = store.getProducts();
    panel.innerHTML = `<div class="prod-card-grid">${products.map(renderProductCard).join('')}</div>`;
  } else {
    // Re-render the full products page to restore the table
    document.getElementById('app-content').innerHTML = renderProducts();
    initProducts();
  }
}
