const PRODUCTS = [
  { name: "Apex Ultima", units: 18, revenue: 81000 },
  { name: "Royal Emulsion", units: 14, revenue: 16800 },
  { name: "Tactor Emulsion", units: 9, revenue: 19800 },
  { name: "Exterior Wall Primer", units: 7, revenue: 12600 },
  { name: "Enamel", units: 5, revenue: 15500 },
];

export function TopProducts({ Card, Eyebrow }) {
  const max = Math.max(...PRODUCTS.map((p) => p.revenue));
  return (
    <Card style={{width: "48%"}}>
      <Eyebrow color="var(--info)" tint="rgba(55,138,221,0.14)">
        best sellers
      </Eyebrow>
      <h3 className="card-title">Top products</h3>

      <div className="item-list">
        {PRODUCTS.map((p, i) => (
          <div key={p.name}>
            <div className="product-row-top">
              <div className="product-info">
                <span className="product-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="product-analytics-name">{p.name}</span>
              </div>
              <span className="product-units">{p.units} sold</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(p.revenue / max) * 100}%`,
                  backgroundColor: "var(--info)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
