import { store } from '../store.js';

export function renderDashboard() {
  const products = store.getProducts();
  const sales = store.getSales();
  
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  const lowStockHTML = lowStockProducts.length === 0 ? `<p class="text-muted p-4">All stock levels are optimal.</p>` :
    lowStockProducts.slice(0, 4).map(p => `
      <div class="list-item">
        <div class="item-info">
          <h4>${p.name}</h4><span class="subtext">Min: ${p.minStock} units</span>
        </div>
        <span class="badge ${p.stock === 0 ? 'badge-red' : 'badge-yellow'}">${p.stock} left</span>
      </div>
    `).join('');

  const recentSalesHTML = sales.length === 0 ? `<tr><td colspan="4" class="text-muted text-center py-4">No recent sales.</td></tr>` :
    sales.slice(0, 4).map(s => `
      <tr>
        <td class="text-muted">${s.date}</td><td><strong>${s.customer}</strong></td>
        <td class="text-muted">${s.items}</td><td class="text-right font-bold">NPR ${parseFloat(s.total).toFixed(2)}</td>
      </tr>
    `).join('');

  return `
    <div class="dashboard-grid">
      <!-- Top Cards -->
      <div class="dash-cards">
        <div class="dash-card">
          <div class="card-header">
            <span class="card-title">Total Products</span>
            <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>
          </div>
          <div class="card-value">${totalProducts}</div>
          <div class="card-trend text-green">System synced</div>
        </div>
        <div class="dash-card">
          <div class="card-header">
            <span class="card-title">Recorded Sales</span>
            <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div>
          </div>
          <div class="card-value">${sales.length}</div>
          <div class="card-trend text-green">Up to date</div>
        </div>
        <div class="dash-card">
          <div class="card-header">
            <span class="card-title">Low Stock Alerts</span>
            <div class="card-icon alert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
          </div>
          <div class="card-value">${lowStockProducts.length}</div>
          <div class="card-trend ${lowStockProducts.length > 0 ? 'text-red' : 'text-green'}">${lowStockProducts.length > 0 ? 'Needs attention' : 'All optimal'}</div>
        </div>
        <div class="dash-card">
          <div class="card-header">
            <span class="card-title">Total Revenue</span>
            <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
          </div>
          <div class="card-value">NPR ${parseFloat(totalRevenue).toFixed(2)}</div>
          <div class="card-trend text-green">Gross total</div>
        </div>
      </div>

      <!-- Second Row (Alerts and Transactions) -->
      <div class="panel">
        <div class="panel-header alert-header">
          <h3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" class="${lowStockProducts.length > 0 ? 'text-red' : 'text-green'}" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg> Low Stock Alerts</h3>
        </div>
        <div class="list-container">
          ${lowStockHTML}
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Recent Transactions</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>Date</th><th>Customer</th><th>Items</th><th class="text-right">Total</th></tr>
          </thead>
          <tbody>
            ${recentSalesHTML}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initDashboard() {}