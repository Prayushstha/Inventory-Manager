export function renderHome() {
  return `
    <section class="hero-section" id="homepage-hero-section">
      <div class="hero-container">
        <h1 class="hero-title">Find Your Items</h1>
        <div class="search-container">
          <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input type="text" id="search-input" class="search-input" placeholder="Search for items, categories, or SKU..." />
          <button class="search-btn" id="search-btn">Search</button>
        </div>
      </div>
    </section>

    <main class="main-content">
      <div class="content-container">
        <div class="section-header">
          <h2>Available Items</h2>
          <div class="filter-controls">
            <button class="filter-btn" id="filter-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 4H18M5 10H15M8 16H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div class="items-grid" id="items-grid">
          <div class="item-card">
            <div class="item-image">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" alt="Sample Item" />
            </div>
            <div class="item-info">
              <h3 class="item-name">Sample Item</h3>
              <p class="item-price">Rs. 1,200</p>
              <p class="item-desc">A short description of the item goes here.</p>
              <button class="buy-btn">BUY</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  `;
}

export function initHome() {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      console.log('Searching for:', searchInput.value);
    });
  }
}