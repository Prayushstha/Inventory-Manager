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
        <div class="wrapper">
  <input type="checkbox" />
  <div class="btn"></div>
  <div class="tooltip">
    <svg></svg>
    <svg></svg>
    <svg></svg>
  </div>
  <svg></svg>
</div>

<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-01" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg">
    <path
      transform="translate(0 -2)"
      d="M18.29,5.76l-.7-1.37A2.59,2.59,0,0,0,15.29,3H10.71a2.59,2.59,0,0,0-2.3,1.39l-.7,1.37a2.6,2.6,0,0,1-2.3,1.39H3.58A2.57,2.57,0,0,0,1,9.71V20.44A2.57,2.57,0,0,0,3.58,23H22.42A2.57,2.57,0,0,0,25,20.44V9.71a2.57,2.57,0,0,0-2.58-2.56H20.59A2.6,2.6,0,0,1,18.29,5.76Z"
    ></path>
    <ellipse ry="4.49" rx="4.52" cy="12.99" cx="13"></ellipse>
  </symbol>
  <symbol id="icon-02" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg">
    <line y2="9.42" x2="25" y1="12.58" x1="25"></line>
    <line y2="7.84" x2="21" y1="14.16" x1="21"></line>
    <line y2="6.26" x2="17" y1="15.74" x1="17"></line>
    <line y2="1" x2="13" y1="21" x1="13"></line>
    <line y2="4.68" x2="9" y1="17.32" x1="9"></line>
    <line y2="8.37" x2="5" y1="13.63" x1="5"></line>
    <line y2="10.47" x2="1" y1="11.53" x1="1"></line>
  </symbol>
  <symbol id="icon-03" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg">
    <polygon
      points="8.08 10 1 21 25 21 18.09 12.66 13.78 17.45 8.08 10"
    ></polygon>
    <circle r="3" cy="4" cx="8"></circle>
  </symbol>

  <symbol
    id="shape-01"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon
      points="155.77 140.06 141.08 152.42 159.12 158.96 155.77 140.06"
      stroke="var(--shape-color-03)"
    ></polygon>
  </symbol>
  <symbol
    id="shape-02"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="var(--shape-color-02)">
      <line y2="152.29" x2="141.54" y1="146.73" x1="158.66"></line>
      <line y2="158.07" x2="152.88" y1="140.95" x1="147.32"></line>
    </g>
  </symbol>
  <symbol
    id="shape-03"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      r="13"
      cy="149.51"
      cx="150.1"
      stroke="var(--shape-color-01)"
    ></circle>
  </symbol>
  <symbol
    id="shape-04"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle r="4" cy="149.51" cx="150.1" fill="var(--shape-color-01)"></circle>
  </symbol>
  <symbol
    id="shape-05"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      transform="translate(40.44 -31.76) rotate(13.94)"
      height="18"
      width="18"
      y="140.51"
      x="141.1"
      stroke="var(--shape-color-03)"
    ></rect>
  </symbol>
  <symbol
    id="shape-06"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="var(--shape-color-02)">
      <line y2="146.24" x2="141.72" y1="152.78" x1="158.48"></line>
      <line y2="157.89" x2="146.83" y1="141.13" x1="153.37"></line>
    </g>
  </symbol>
  <symbol
    id="shape-07"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      transform="translate(-42.94 62.23) rotate(-20.56)"
      height="24"
      width="24"
      y="137.51"
      x="138.1"
      stroke="var(--shape-color-03)"
    ></rect>
  </symbol>

  <symbol
    id="shape-08"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle r="4" cy="149.51" cx="150.1" fill="var(--shape-color-01)"></circle>
  </symbol>
  <symbol
    id="shape-09"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      r="8"
      cy="149.51"
      cx="150.1"
      stroke="var(--shape-color-01)"
    ></circle>
  </symbol>
</svg>
      </div>
        </div>

      </div>
    </main>
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
}
