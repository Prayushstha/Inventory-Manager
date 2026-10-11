import { useEffect, useRef, useState } from "react";
import { useConfirm } from "../hooks/useConfirm";
import { useToast } from "../hooks/ToastContext";
import "./settings.css";

function fileName(filePath) {
      return filePath.split(/[\\/]/).pop();
}

const APPEARANCE_THEMES = [
      { value: "lara-light", label: "Lara" },
      { value: "lara-dark", label: "Lara dark" },
      { value: "claude-light", label: "Claude +" },
      { value: "claude-dark", label: "Claude dark" },
      { value: "zen-light", label: "Zen" },
      { value: "zen-dark", label: "Zen dark" },
      { value: "auto-blog-light", label: "Auto Blog" },
      { value: "auto-blog-dark", label: "Auto Blog dark" },
];

export function SettingsPage({ appearanceTheme, appearanceMode, setAppearance }) {
      const [busy, setBusy] = useState("");
      const [settings, setSettings] = useState(null);
      const [profileId, setProfileId] = useState("");
      const [profileUsername, setProfileUsername] = useState("");
      const [profilePassword, setProfilePassword] = useState("");
      const [profileDialogMode, setProfileDialogMode] = useState("");
      const [exportPath, setExportPath] = useState("");
      const [exportSelections, setExportSelections] = useState({
            products: true,
            customers: true,
            bills: true,
            imports: true,
            expenses: true,
      });
      const profileDialog = useRef(null);
      const showToast = useToast();
      const { confirm, ConfirmDialogComponent } = useConfirm();

      useEffect(() => {
            const dialog = profileDialog.current;
            if (!dialog) return;
            if (profileDialogMode && !dialog.open) dialog.showModal();
            if (!profileDialogMode && dialog.open) dialog.close();
      }, [profileDialogMode]);

      useEffect(() => {
            let cancelled = false;
            window.db.getAppSettings()
                  .then((currentSettings) => {
                        if (!cancelled) {
                              setSettings(currentSettings);
                              setProfileId(currentSettings.activeProfileId);
                              setProfileUsername(
                                    currentSettings.profiles.find(
                                          (profile) => profile.id === currentSettings.activeProfileId,
                                    )?.username || "user",
                              );
                        }
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

      async function handleAppearanceThemeChange(event) {
            const selected = event.target.value;
            const mode = selected.endsWith("-dark") ? "dark" : "light";
            const theme = selected.slice(0, -(mode.length + 1));
            setBusy("appearance");
            try {
                  const updatedSettings = await window.db.updateAppearanceSettings(theme, mode);
                  setSettings(updatedSettings);
                  setAppearance(updatedSettings);
                  showToast("Appearance updated.", "success");
            } catch (error) {
                  showToast(error.message || "Could not update the appearance theme.", "error");
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

      async function handlePickExportDirectory() {
            try {
                  const directory = await window.db.pickExportDirectory();
                  if (directory) setExportPath(directory);
            } catch (error) {
                  showToast(error.message || "Could not choose an export folder.", "error");
            }
      }

      async function handleExport() {
            if (!Object.values(exportSelections).some(Boolean)) {
                  showToast("Choose at least one data section to export.", "error");
                  return;
            }
            setBusy("export");
            try {
                  const filePath = await window.db.exportData(exportPath, exportSelections);
                  showToast(`Export created: ${fileName(filePath)}.`, "success");
            } catch (error) {
                  showToast(error.message || "Could not create the export.", "error");
            } finally {
                  setBusy("");
            }
      }

      function openProfileDialog() {
            setProfileUsername(profileId === "create-new" ? "" : profileId === "user"
                  ? "user"
                  : settings?.profiles.find((profile) => profile.id === profileId)?.username || "");
            setProfilePassword("");
            setProfileDialogMode(profileId === "create-new" ? "create" : "switch");
      }

      async function handleProfileDialogSubmit(event) {
            event.preventDefault();
            if (profileDialogMode === "create") {
                  setBusy("profile-create");
            } else if (profileId === "user" && !settings?.defaultProfilePasswordSet) {
                  setBusy("default-profile-password");
            } else {
                  setBusy("profile-switch");
            }
            try {
                  let targetProfileId = profileId;
                  if (profileDialogMode === "create") {
                        const createdSettings = await window.db.createProfile(profileUsername, profilePassword);
                        const newProfile = createdSettings.profiles.find(
                              (profile) => !profile.isDefault &&
                                    !settings?.profiles.some((existing) => existing.id === profile.id),
                        );
                        if (!newProfile) throw new Error("The new profile was created, but could not be found.");
                        setSettings(createdSettings);
                        targetProfileId = newProfile.id;
                  } else if (profileId === "user" && !settings?.defaultProfilePasswordSet) {
                        await window.db.setDefaultProfilePassword(profilePassword);
                  }

                  const updatedSettings = await window.db.switchProfile(
                        targetProfileId,
                        profileUsername,
                        profilePassword,
                  );
                  setSettings(updatedSettings);
                  setProfileId(targetProfileId);
                  setProfileDialogMode("");
                  showToast("Profile switched. Reloading StockWise...", "success");
            } catch (error) {
                  showToast(error.message || "Could not complete the profile action.", "error");
                  setBusy("");
            }
      }

      return (
            <main className="settings-page">
                  <header className="settings-header">
                        <h1>Settings</h1>
                  </header>
                  <section className="settings-section" aria-labelledby="appearance-settings-title">
                        <div className="settings-section-heading">
                              <h2 id="appearance-settings-title">Appearance</h2>
                              <p>Choose the color theme used throughout StockWise.</p>
                        </div>
                        <div className="settings-field">
                              <label htmlFor="appearance-theme">Color theme</label>
                              <select
                                    id="appearance-theme"
                                    value={`${appearanceTheme || settings?.appearanceTheme || "lara"}-${appearanceMode || settings?.appearanceMode || "dark"}`}
                                    onChange={handleAppearanceThemeChange}
                                    disabled={!settings || Boolean(busy)}
                              >
                                    {APPEARANCE_THEMES.map((theme) => (
                                          <option key={theme.value} value={theme.value}>
                                                {theme.label}
                                          </option>
                                    ))}
                              </select>
                        </div>
                  </section>
                  <section className="settings-section" aria-labelledby="profiles-settings-title">
                        <div className="settings-section-heading">
                              <h2 id="profiles-settings-title">Profiles</h2>
                              <p>Each profile has separate inventory, bills, finances, and database. Enter its credentials every time you switch.</p>
                        </div>
                        <div className="settings-profile-switch">
                              <div className="settings-field">
                                    <label htmlFor="profile-select">Switch profile</label>
                                    <select
                                          id="profile-select"
                                          value={profileId || settings?.activeProfileId || "user"}
                                          onChange={(event) => {
                                                const selectedId = event.target.value;
                                                setProfileId(selectedId);
                                                if (selectedId !== "create-new" &&
                                                      selectedId !== settings?.activeProfileId) {
                                                      const selectedProfile = settings?.profiles.find(
                                                            (profile) => profile.id === selectedId,
                                                      );
                                                      setProfileUsername(selectedProfile?.username || "");
                                                      setProfilePassword("");
                                                      setProfileDialogMode("switch");
                                                }
                                          }}
                                          disabled={!settings || Boolean(busy)}
                                    >
                                          {settings?.profiles.map((profile) => (
                                                <option key={profile.id} value={profile.id}>
                                                      {profile.username}{profile.id === settings.activeProfileId ? " (active)" : ""}
                                                </option>
                                          ))}
                                          <option value="create-new">Create new</option>
                                    </select>
                              </div>
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={openProfileDialog}
                                    disabled={
                                          !settings ||
                                          Boolean(busy) ||
                                          profileId === settings?.activeProfileId
                                    }
                              >
                                    Switch Profile
                              </button>
                        </div>
                        <dialog
                              ref={profileDialog}
                              className="settings-profile-dialog"
                              onCancel={(event) => {
                                    event.preventDefault();
                                    setProfileDialogMode("");
                              }}
                        >
                              <form className="settings-profile-dialog-form" onSubmit={handleProfileDialogSubmit}>
                                    <button
                                          className="settings-profile-dialog-close"
                                          type="button"
                                          aria-label="Close"
                                          onClick={() => setProfileDialogMode("")}
                                    >
                                          ×
                                    </button>
                                    <h3>
                                          {profileDialogMode === "create"
                                                ? "Create profile"
                                                : profileId === "user" && !settings?.defaultProfilePasswordSet
                                                      ? "Set up the user profile"
                                                      : "Switch profile"}
                                    </h3>
                                    {profileDialogMode === "create" && (
                                          <p>Create a profile with its own separate database.</p>
                                    )}
                                    {profileDialogMode === "switch" && profileId === "user" &&
                                          !settings?.defaultProfilePasswordSet && (
                                                <p>Set a password for the existing user profile. This password will be required whenever you switch back to it.</p>
                                          )}
                                    <div className="settings-field">
                                          <label htmlFor="profile-dialog-username">Username</label>
                                          <input
                                                id="profile-dialog-username"
                                                autoComplete="username"
                                                value={profileUsername}
                                                onChange={(event) => setProfileUsername(event.target.value)}
                                                readOnly={profileId === "user" && profileDialogMode !== "create"}
                                                required
                                          />
                                    </div>
                                    <div className="settings-field">
                                          <label htmlFor="profile-dialog-password">
                                                {profileDialogMode === "create" ||
                                                      (profileId === "user" && !settings?.defaultProfilePasswordSet)
                                                      ? "Password (at least 8 characters)"
                                                      : "Password"}
                                          </label>
                                          <input
                                                id="profile-dialog-password"
                                                type="password"
                                                autoComplete={profileDialogMode === "create" ||
                                                      (profileId === "user" && !settings?.defaultProfilePasswordSet)
                                                      ? "new-password"
                                                      : "current-password"}
                                                minLength={profileDialogMode === "create" ||
                                                      (profileId === "user" && !settings?.defaultProfilePasswordSet)
                                                      ? 8
                                                      : undefined}
                                                value={profilePassword}
                                                onChange={(event) => setProfilePassword(event.target.value)}
                                                required
                                          />
                                    </div>
                                    <div className="settings-profile-dialog-actions">
                                          <button
                                                className="settings-action"
                                                type="button"
                                                onClick={() => setProfileDialogMode("")}
                                                disabled={Boolean(busy)}
                                          >
                                                Cancel
                                          </button>
                                          <button className="settings-action" type="submit" disabled={Boolean(busy)}>
                                                {busy === "profile-create"
                                                      ? "Creating..."
                                                      : busy === "profile-switch"
                                                            ? "Switching..."
                                                            : busy === "default-profile-password"
                                                                  ? "Setting up..."
                                                                  : profileDialogMode === "create"
                                                                        ? "Create Profile"
                                                                        : "Continue"}
                                          </button>
                                    </div>
                              </form>
                        </dialog>
                  </section>
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
                  <section className="settings-section" aria-labelledby="export-settings-title">
                        <div className="settings-section-heading">
                              <h2 id="export-settings-title">Export Data</h2>
                              <p>Choose the business data to export. StockWise creates one ZIP containing an introduction PDF, Excel data, and printable bills when applicable.</p>
                        </div>
                        <fieldset className="settings-export-options">
                              <legend>Data sections</legend>
                              {[
                                    ["products", "Products", "Includes variants, bases, and stock."],
                                    ["customers", "Customers", "Includes customer bills and bill details."],
                                    ["bills", "Bills", "Includes bill items and activity."],
                                    ["imports", "Imports", "Includes imported inventory items."],
                                    ["expenses", "Expenses", "Includes expense items."],
                              ].map(([key, label, description]) => (
                                    <label key={key} className="settings-export-option">
                                          <input
                                                type="checkbox"
                                                checked={exportSelections[key]}
                                                onChange={(event) =>
                                                      setExportSelections((current) => ({
                                                            ...current,
                                                            [key]: event.target.checked,
                                                      }))
                                                }
                                                disabled={Boolean(busy)}
                                          />
                                          <span>
                                                <strong>{label}</strong>
                                                <small>{description}</small>
                                          </span>
                                    </label>
                              ))}
                        </fieldset>
                        <div className="settings-path-row">
                              <label className="settings-path" htmlFor="export-path">
                                    <span>Export destination folder</span>
                                    <input
                                          id="export-path"
                                          type="text"
                                          value={exportPath}
                                          onChange={(event) => setExportPath(event.target.value)}
                                          placeholder="Type a folder path or browse..."
                                          disabled={Boolean(busy)}
                                    />
                              </label>
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={handlePickExportDirectory}
                                    disabled={Boolean(busy)}
                              >
                                    <i className="ti ti-folder-open" aria-hidden="true" />
                                    <span>Browse</span>
                              </button>
                        </div>
                        {busy === "export" && (
                              <div className="settings-export-progress" role="status" aria-live="polite">
                                    <span className="settings-progress-spinner" aria-hidden="true" />
                                    <span>Preparing your export...</span>
                              </div>
                        )}
                        <div className="settings-action-row">
                              <button
                                    className="settings-action"
                                    type="button"
                                    onClick={handleExport}
                                    disabled={Boolean(busy) || !settings}
                              >
                                    <i className="ti ti-file-export" aria-hidden="true" />
                                    <span>{busy === "export" ? "Exporting..." : "Export Selected Data"}</span>
                              </button>
                        </div>
                  </section>
                  {ConfirmDialogComponent}
            </main>
      );
}