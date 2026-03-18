export function renderReports() {
  return `
    <div class="dash-cards wide-cards">
      <div class="dash-card">
        <div class="card-header">
          <span class="card-title"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" class="mr-2 inline" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> Sales</span>
        </div>
        <p class="card-desc text-muted mt-2">Revenue, top products, and best-selling categories.</p>
      </div>
      <div class="dash-card">
        <div class="card-header">
          <span class="card-title"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" class="mr-2 inline" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Stock Levels</span>
        </div>
        <p class="card-desc text-muted mt-2">Current inventory levels, low-stock items, and reorder suggestions.</p>
      </div>
      <div class="dash-card">
        <div class="card-header">
          <span class="card-title"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" class="mr-2 inline" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Supplier Orders</span>
        </div>
        <p class="card-desc text-muted mt-2">Purchase orders raised and supplier activity within the date range.</p>
      </div>
    </div>

    <div class="panel mt-6">
      <div class="panel-header export-header">
        <div class="date-pickers">
          <div class="picker-group">
            <label class="text-muted text-sm">Start Date</label>
            <div class="input-wrapper">
              <input type="text" value="01/03/2026" class="form-input">
              <svg viewBox="0 0 24 24" class="input-icon right" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
          <div class="picker-group">
            <label class="text-muted text-sm">End Date</label>
            <div class="input-wrapper">
              <input type="text" value="18/03/2026" class="form-input">
              <svg viewBox="0 0 24 24" class="input-icon right" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
        </div>
        <div class="export-actions">
          <button class="btn btn-outline"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="mr-2 inline"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> CSV</button>
          <button class="btn btn-primary"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="mr-2 inline"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> PDF</button>
        </div>
      </div>
      
      <div class="report-preview-box">
        <div class="preview-badge">2026-03-01 — 2026-03-18</div>
        <div class="preview-empty text-center">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <h4 class="mt-4 font-bold text-primary">Report preview will appear here</h4>
          <p class="text-muted mt-2">Select a report type, choose your date range, and click export to generate.</p>
        </div>
      </div>
    </div>
  `;
}
export function initReports() {}
