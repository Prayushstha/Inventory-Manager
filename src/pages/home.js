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
        <div class="item-preview">
          <div class="item-image-wrapper">
            <img class="item-picture" src="" alt="">
          </div>
          <div class="item-description">
            <p class="item-name">ITEM NAME</p>
            <div class="item-rating">
              5.0 &#9733;
            </div>
            <div class="item-description">
             "A description"
            </div>
            <div class="item-sub-description">
              <span class="item-price">&#x20B9;720</span>
              <button class="buy-button">Buy</button>
            </div>
          </div>
      </div>

      <div class="item-preview" style="display: flex;">
       <button class="add-item-to-page-btn">+</button>
      </div>
    </main>

    <dialog id="add-item-modal" class="modal">
    hello
    </dialog>
  `;
}

export function initHome() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      console.log("Searching for:", searchInput.value);
    });
  }
  const addBtn = document.querySelector(".add-item-to-page-btn");
  if (addBtn) {
    addBtn.addEventListener("click", openAddItemModal);
  }
}

window.openAddItemModal = function() {
  const dialog = document.getElementById("add-item-modal");
  dialog.showModal();
}
