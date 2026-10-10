import { useState } from "react";
import { useConfirm } from "../hooks/useConfirm";
import { useToast } from "../hooks/ToastContext";
import "./settings.css";

function fileName(filePath) {
      return filePath.split(/[\\/]/).pop();
}

export function SettingsPage() {
      const [busy, setBusy] = useState("");
      const showToast = useToast();
      const { confirm, ConfirmDialogComponent } = useConfirm();

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

      return (
            <main className="settings-page">
                  <header className="settings-header">
                        <h1>Settings</h1>
                  </header>
                  <section className="settings-section" aria-labelledby="database-settings-title">
                        <div className="settings-section-heading">
                              <h2 id="database-settings-title">Local Database</h2>
                              <p>Back up your business data or restore it from a previous backup.</p>
                        </div>
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