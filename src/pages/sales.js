import { store } from '../store.js';

function formatMoney(value) {
  return `NPR ${Number(value || 0).toFixed(2)}`;
}

export function renderSales() {
  const sales = store.getSales();
  const products = store
    .getProducts()
    .filter(product => Number.isFinite(Number(product.retail)));

  const recentSalesHTML = sales.length === 0
    ? `<div class="p-6 text-center text-muted">No sales yet. Add items below to record your first one-time sale.</div>`
    : sales.map(sale => `
      <div class="list-item">
        <div class="sale-info">
          <h4>${sale.customer}</h4>
          ${sale.phone ? `<div class="sale-date text-muted">${sale.phone}</div>` : ''}
          <div class="sale-items text-muted">${sale.items}</div>
          <div class="sale-date text-muted">${sale.date}</div>
        </div>
        <div class="sale-total font-bold">${formatMoney(sale.total)}</div>
      </div>
    `).join('');

  return `
    <div class="sales-page">
      <div class="panel">
        <div class="panel-header">
          <h3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> One-Time Sale</h3>
        </div>

        <form id="sales-form" class="sales-form">
          <div class="sales-grid">
            <section class="sales-section">
              <div class="sales-section__head">
                <h4>Customer Details</h4>
                <p class="text-muted">Record who bought the items and any note for the bill.</p>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="sale-customer-name">Customer Name</label>
                  <input type="text" id="sale-customer-name" class="form-input" placeholder="Walk-in Customer">
                </div>
                <div class="form-group">
                  <label for="sale-customer-phone">Phone Number</label>
                  <input type="text" id="sale-customer-phone" class="form-input" placeholder="98XXXXXXXX">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="sale-date">Sale Date</label>
                  <input type="date" id="sale-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                  <label for="sale-note">Note</label>
                  <input type="text" id="sale-note" class="form-input" placeholder="Optional note">
                </div>
              </div>
            </section>

            <section class="sales-section">
              <div class="sales-section__head sales-section__head--inline">
                <div>
                  <h4>Items To Sell</h4>
                  <p class="text-muted">Add products, set quantity, and the total will be calculated automatically.</p>
                </div>
                <button type="button" id="add-sale-line" class="btn btn-primary">+ Add Item</button>
              </div>

              <div id="sale-lines" class="sales-lines"></div>

              <div class="sales-summary">
                <div class="sales-summary__row">
                  <span class="text-muted">Items</span>
                  <strong id="sale-item-count">0</strong>
                </div>
                <div class="sales-summary__row">
                  <span class="text-muted">Quantity</span>
                  <strong id="sale-total-qty">0</strong>
                </div>
                <div class="sales-summary__row sales-summary__row--grand">
                  <span>Total</span>
                  <strong id="sale-grand-total">${formatMoney(0)}</strong>
                </div>
              </div>

              <div class="sales-actions">
                <button type="submit" class="btn btn-primary">Complete Sale</button>
              </div>
            </section>
          </div>

          <div id="sale-feedback" class="mt-4 text-green sales-feedback" style="display: none;"></div>
        </form>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Recent Sales</h3>
        </div>
        <div class="list-container large-list">
          ${recentSalesHTML}
        </div>
      </div>
    </div>
  `;
}

export function initSales() {
  const form = document.getElementById('sales-form');
  const linesContainer = document.getElementById('sale-lines');
  const addLineBtn = document.getElementById('add-sale-line');
  const feedback = document.getElementById('sale-feedback');
  const itemCountEl = document.getElementById('sale-item-count');
  const totalQtyEl = document.getElementById('sale-total-qty');
  const grandTotalEl = document.getElementById('sale-grand-total');
  const products = store
    .getProducts()
    .filter(product => Number.isFinite(Number(product.retail)));

  if (!form || !linesContainer || !feedback) return;

  let lineId = 0;

  function getProductOptionsMarkup(selectedSku = '') {
    if (products.length === 0) {
      return '<option value="">No sellable products available</option>';
    }

    return `
      <option value="">Select a product</option>
      ${products.map(product => `
        <option value="${product.sku}" ${product.sku === selectedSku ? 'selected' : ''}>
          ${product.name} (${product.sku}) - ${formatMoney(product.retail)}
        </option>
      `).join('')}
    `;
  }

  function updateSummary() {
    const rows = Array.from(linesContainer.querySelectorAll('.sale-line'));
    let itemCount = 0;
    let totalQty = 0;
    let grandTotal = 0;

    rows.forEach(row => {
      const select = row.querySelector('.sale-product-select');
      const qtyInput = row.querySelector('.sale-qty-input');
      const product = products.find(entry => entry.sku === select.value);
      const quantity = Math.max(1, Number(qtyInput.value) || 1);

      if (!product) return;

      itemCount += 1;
      totalQty += quantity;
      grandTotal += Number(product.retail) * quantity;
    });

    itemCountEl.textContent = String(itemCount);
    totalQtyEl.textContent = String(totalQty);
    grandTotalEl.textContent = formatMoney(grandTotal);
  }

  function syncLine(row) {
    const select = row.querySelector('.sale-product-select');
    const qtyInput = row.querySelector('.sale-qty-input');
    const meta = row.querySelector('.sale-line__meta');
    const unitPriceEl = row.querySelector('.sale-unit-price');
    const lineTotalEl = row.querySelector('.sale-line-total');
    const selectedProduct = products.find(product => product.sku === select.value);
    const quantity = Math.max(1, Number(qtyInput.value) || 1);

    qtyInput.value = String(quantity);

    if (!selectedProduct) {
      meta.textContent = 'Select a product to see price and stock.';
      unitPriceEl.textContent = formatMoney(0);
      lineTotalEl.textContent = formatMoney(0);
      updateSummary();
      return;
    }

    const unitPrice = Number(selectedProduct.retail);
    const stockText = Number.isFinite(Number(selectedProduct.stock))
      ? `${selectedProduct.stock} in stock`
      : 'Stock not tracked';

    meta.textContent = `${selectedProduct.name} • ${stockText}`;
    unitPriceEl.textContent = formatMoney(unitPrice);
    lineTotalEl.textContent = formatMoney(unitPrice * quantity);
    updateSummary();
  }

  function addSaleLine(selectedSku = '') {
    const row = document.createElement('div');
    row.className = 'sale-line';
    row.dataset.lineId = String(lineId++);
    row.innerHTML = `
      <div class="sale-line__grid">
        <div class="form-group sale-line__product">
          <label>Product</label>
          <select class="form-input sale-product-select">
            ${getProductOptionsMarkup(selectedSku)}
          </select>
          <div class="sale-line__meta text-muted">Select a product to see price and stock.</div>
        </div>

        <div class="form-group sale-line__qty">
          <label>Quantity</label>
          <input type="number" min="1" value="1" class="form-input sale-qty-input">
        </div>

        <div class="form-group sale-line__price">
          <label>Unit Price</label>
          <div class="sale-line__value sale-unit-price">${formatMoney(0)}</div>
        </div>

        <div class="form-group sale-line__total">
          <label>Line Total</label>
          <div class="sale-line__value sale-line-total">${formatMoney(0)}</div>
        </div>

        <div class="sale-line__remove">
          <button type="button" class="btn btn-primary sale-remove-btn">Remove</button>
        </div>
      </div>
    `;

    linesContainer.appendChild(row);
    syncLine(row);
  }

  if (products.length > 0) {
    addSaleLine();
  } else {
    linesContainer.innerHTML = `
      <div class="sale-line sale-line--empty">
        <p class="text-muted">No products with a retail price are available yet. Add products first, then come back here to record sales.</p>
      </div>
    `;
  }

  if (addLineBtn) {
    addLineBtn.onclick = () => addSaleLine();
  }

  linesContainer.addEventListener('change', event => {
    const row = event.target.closest('.sale-line');
    if (row) syncLine(row);
  });

  linesContainer.addEventListener('input', event => {
    const row = event.target.closest('.sale-line');
    if (row) syncLine(row);
  });

  linesContainer.addEventListener('click', event => {
    const removeBtn = event.target.closest('.sale-remove-btn');
    if (!removeBtn) return;

    const rows = linesContainer.querySelectorAll('.sale-line');
    if (rows.length === 1) {
      feedback.textContent = 'At least one item row is required for a sale.';
      feedback.className = 'mt-4 text-red sales-feedback';
      feedback.style.display = 'block';
      return;
    }

    removeBtn.closest('.sale-line').remove();
    feedback.style.display = 'none';
    updateSummary();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const rows = Array.from(linesContainer.querySelectorAll('.sale-line'));
    const customerName = document.getElementById('sale-customer-name').value.trim() || 'Walk-in Customer';
    const phone = document.getElementById('sale-customer-phone').value.trim();
    const note = document.getElementById('sale-note').value.trim();
    const saleDate = document.getElementById('sale-date').value || new Date().toISOString().split('T')[0];
    const lineItems = [];
    let grandTotal = 0;

    for (const row of rows) {
      const select = row.querySelector('.sale-product-select');
      const qtyInput = row.querySelector('.sale-qty-input');
      const product = products.find(entry => entry.sku === select.value);
      const quantity = Math.max(1, Number(qtyInput.value) || 1);

      if (!product) {
        feedback.textContent = 'Choose a product for every row before completing the sale.';
        feedback.className = 'mt-4 text-red sales-feedback';
        feedback.style.display = 'block';
        return;
      }

      if (Number.isFinite(Number(product.stock)) && Number(product.stock) < quantity) {
        feedback.textContent = `${product.name} only has ${product.stock} item(s) in stock.`;
        feedback.className = 'mt-4 text-red sales-feedback';
        feedback.style.display = 'block';
        return;
      }

      const unitPrice = Number(product.retail);
      const lineTotal = unitPrice * quantity;

      lineItems.push({
        sku: product.sku,
        name: product.name,
        quantity,
        unitPrice,
        total: lineTotal
      });

      grandTotal += lineTotal;
    }

    lineItems.forEach(item => {
      const product = products.find(entry => entry.sku === item.sku);
      if (product && Number.isFinite(Number(product.stock))) {
        store.updateStock(item.sku, -item.quantity);
      }
    });

    store.addSale({
      customer: customerName,
      phone,
      note,
      items: lineItems.map(item => `${item.name} x${item.quantity}`).join(', '),
      lineItems,
      total: grandTotal,
      date: saleDate
    });

    feedback.textContent = `Sale recorded for ${customerName}. Total: ${formatMoney(grandTotal)}`;
    feedback.className = 'mt-4 text-green sales-feedback';
    feedback.style.display = 'block';

    setTimeout(() => {
      document.getElementById('app-content').innerHTML = renderSales();
      initSales();
    }, 900);
  });
}
