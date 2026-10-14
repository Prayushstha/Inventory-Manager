export function DefaultsSection({
      settings,
      busy,
      onChange,
      onInventoryAddItemModeChange,
}) {
      return (
            <section className="settings-section" aria-labelledby="defaults-settings-title">
                  <div className="settings-section-heading">
                        <h2 id="defaults-settings-title">App Defaults</h2>
                        <p>Choose the defaults used when creating bills and adding inventory items.</p>
                  </div>
                  <div className="settings-field">
                        <label htmlFor="default-payment-method">Default payment method</label>
                        <select
                              id="default-payment-method"
                              value={settings?.defaultPaymentMethod || ""}
                              onChange={onChange}
                              disabled={!settings || Boolean(busy)}
                        >
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI</option>
                              <option value="Card">Card</option>
                              <option value="Credit">Credit</option>
                        </select>
                  </div>
                  <div className="settings-field">
                        <label htmlFor="inventory-add-item-mode">Add item method</label>
                        <select
                              id="inventory-add-item-mode"
                              value={settings?.inventoryAddItemMode || ""}
                              onChange={onInventoryAddItemModeChange}
                              disabled={!settings || Boolean(busy)}
                        >
                              <option value="">Ask every time</option>
                              <option value="default">Default add</option>
                              <option value="bill">Add via bill</option>
                        </select>
                        <p className="settings-note">
                              Choose "Ask every time" to use either add-item method again.
                        </p>
                  </div>
            </section>
      );
}
