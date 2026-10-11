import { useEffect, useState } from "react";
import { useConfirm } from "../hooks/useConfirm";
import { useToast } from "../hooks/ToastContext";
import "./settings.css";

function fileName(filePath) {
      return filePath.split(/[\\/]/).pop();
}

export function SettingsPage() {
      const [busy, setBusy] = useState("");
      const [settings, setSettings] = useState(null);
      const showToast = useToast();
      const { confirm, ConfirmDialogComponent } = useConfirm();

      useEffect(() => {
            let cancelled = false;
            window.db.getAppSettings()
                  .then((currentSettings) => {
                        if (!cancelled) setSettings(currentSettings);
                  })
                  .catch((error) => {
                        showToast(error.message || "Could not load application settings.", "error");
                  });
            return () => {
                  cancelled = true;
            };
      }, [showToast]);

      async function handleCreateBackup() {
            setBusy("backup");
            try {
                  const result = await window.db.createBackup();
                  if (result) showToast(`Backup saved as ${fileName(result.filePath)}.`, "success");
            } catch (error) {
                  showToast(error.message || "Could not create the database backup.", "error");
            } finally {
                  setBusy("");
            }
      }

      async function handleRestoreBackup() {
            const accepted = await confirm(
                  "Restore replaces the current database and restarts StockWise. A recovery backup will be created first. Continue?",
            );
            if (!accepted) return;

            setBusy("restore");
            try {
                  const result = await window.db.restoreBackup();
                  if (result) {
                        showToast(
                              `Restore complete. Recovery copy: ${fileName(result.recoveryBackupPath)}. Restarting...`,
                              "success",
                        );
                  }
            } catch (error) {
                  showToast(error.message || "Could not restore the database backup.", "error");
            } finally {
                  setBusy("");
            }
      }

      async function handlePaymentMethodChange(event) {
            const defaultPaymentMethod = event.target.value;
            setBusy("defaults");
            try {
                  const updatedSettings = await window.db.updateDefaultPaymentMethod(defaultPaymentMethod);
                  setSettings(updatedSettings);
                  showToast("Default payment method updated.", "success");
            } catch (error) {
                  showToast(error.message || "Could not update the default payment method.", "error");
            } finally {
                  setBusy("");
            }
      }

      async function handleOpenDataDirectory() {
            try {
                  await window.db.openDataDirectory();
            } catch (error) {
                  showToast(error.message || "Could not open the data folder.", "error");
            }
      }

      async function handleChangeDataDirectory() {
            const accepted = await confirm(
                  "StockWise will copy the database and product images to an empty folder, then restart. The existing data will remain as a safety copy. Continue?",
            );
            if (!accepted) return;

            setBusy("path");
            try {
                  const updatedSettings = await window.db.changeDataDirectory();
                  if (updatedSettings) {
                        setSettings(updatedSettings);
                        showToast("Data copied. StockWise is restarting...", "success");
                  }
            } catch (error) {
                  showToast(error.message || "Could not change the data folder.", "error");
            } finally {
                  setBusy("");
            }
      }

      return (
            <main className="settings-page">
                  <header className="settings-header">
                        <h1>Settings</h1>
                  </header>
                  <section className="settings-section" aria-labelledby="defaults-settings-title">
                        <div className="settings-section-heading">
                              <h2 id="defaults-settings-title">App Defaults</h2>
                              <p>Choose the payment method preselected when creating a new bill.</p>
                        </div>
                        <div className="settings-field">
                              <label htmlFor="default-payment-method">Default payment method</label>
                              <select
                                    id="default-payment-method"
                                    value={settings?.defaultPaymentMethod || ""}
                                    onChange={handlePaymentMethodChange}
                                    disabled={!settings || Boolean(busy)}
                              >
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Card</option>
                                    <option value="Credit">Credit</option>
                              </select>
                        </div>
                  </section>
                  <section className="settings-section" aria-labelledby="database-settings-title">
                        <div className="settings-section-heading">
                              <h2 id="database-settings-title">Local Database</h2>
                              <p>View or change where StockWise keeps local data, or back up and restore your business data.</p>
                        </div>
                        <div className="settings-path-row">
                              <div className="settings-path">
                                    <span>Data folder</span>
                                    <code>{settings?.dataDirectory || "Loading..."}</code>
                              </div>
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={handleOpenDataDirectory}
                                    disabled={!settings || Boolean(busy)}
                              >
                                    <i className="ti ti-folder-open" aria-hidden="true" />
                                    <span>Open Folder</span>
                              </button>
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={handleChangeDataDirectory}
                                    disabled={!settings || Boolean(busy)}
                              >
                                    <i className="ti ti-folder-share" aria-hidden="true" />
                                    <span>{busy === "path" ? "Copying Data..." : "Change Folder"}</span>
                              </button>
                        </div>
                        <p className="settings-note">Choose an empty folder. StockWise copies the database and product images; it does not delete the existing data.</p>
                        <div className="settings-action-row">
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={handleCreateBackup}
                                    disabled={Boolean(busy)}
                              >
                                    <i className="ti ti-database-export" aria-hidden="true" />
                                    <span>{busy === "backup" ? "Creating Backup..." : "Create Backup"}</span>
                              </button>
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={handleRestoreBackup}
                                    disabled={Boolean(busy)}
                              >
                                    <i className="ti ti-database-import" aria-hidden="true" />
                                    <span>{busy === "restore" ? "Restoring..." : "Restore Backup"}</span>
                              </button>
                        </div>
                  </section>
                  {ConfirmDialogComponent}
            </main>
      );
}