import { useState } from "react";
import { useToast } from "../hooks/ToastContext";
import "./onboarding.css";

const STEPS = ["Welcome", "Business details", "Security"];

export function OnboardingWizard({ settings, onComplete }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [shopName, setShopName] = useState(settings.invoiceDefaults?.shopName || "");
  const [shopAddress, setShopAddress] = useState(settings.invoiceDefaults?.shopAddress || "");
  const [shopTelephone, setShopTelephone] = useState(settings.invoiceDefaults?.shopTelephone || "");
  const [paymentMethod, setPaymentMethod] = useState(settings.defaultPaymentMethod || "Cash");
  const [password, setPassword] = useState("");
  const showToast = useToast();

  async function finish(skipSetup = false) {
    setBusy(true);
    try {
      if (!skipSetup) {
        await window.db.updateInvoiceDefaults({
          ...settings.invoiceDefaults,
          shopName,
          shopAddress,
          shopTelephone,
        });
        await window.db.updateDefaultPaymentMethod(paymentMethod);
        if (password) await window.db.setDefaultProfilePassword(password);
      }
      await window.db.completeOnboarding();
      onComplete();
    } catch (error) {
      showToast(error?.message || "Could not finish setup.", "error");
    } finally {
      setBusy(false);
    }
  }

  function next() {
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  return (
    <div className="onboarding-backdrop" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <section className="onboarding-card">
        <div className="onboarding-progress" aria-label={`Setup step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((label, index) => (
            <div className={`onboarding-step ${index <= step ? "is-active" : ""}`} key={label}>
              <span>{index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="onboarding-content">
            <p className="onboarding-eyebrow">StockWise setup</p>
            <h1 id="onboarding-title">Welcome to your inventory workspace</h1>
            <p>
              Let&apos;s prepare the basics so your invoices and daily workflow are ready.
              You can change everything later from Settings.
            </p>
            <ul className="onboarding-benefits">
              <li>Set the shop details shown on invoices</li>
              <li>Choose the default payment method</li>
              <li>Protect this profile with an optional password</li>
            </ul>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-content">
            <p className="onboarding-eyebrow">Step 2 of 3</p>
            <h1 id="onboarding-title">Tell us about your shop</h1>
            <p>These details are used on invoices. All fields are optional.</p>
            <div className="onboarding-fields">
              <label>
                Shop name
                <input value={shopName} onChange={(event) => setShopName(event.target.value)} autoFocus />
              </label>
              <label>
                Address
                <input value={shopAddress} onChange={(event) => setShopAddress(event.target.value)} />
              </label>
              <label>
                Telephone
                <input value={shopTelephone} onChange={(event) => setShopTelephone(event.target.value)} />
              </label>
              <label>
                Default payment method
                <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Credit">Credit</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-content">
            <p className="onboarding-eyebrow">Step 3 of 3</p>
            <h1 id="onboarding-title">Secure the profile</h1>
            <p>
              Add a password to require authentication when switching back to the default
              profile. You can skip this and set one later in Settings.
            </p>
            {!settings.defaultProfilePasswordSet ? (
              <label className="onboarding-password-field">
                Profile password
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  autoFocus
                />
              </label>
            ) : (
              <p className="onboarding-note">A password is already set for this profile.</p>
            )}
          </div>
        )}

        <div className="onboarding-actions">
          <button type="button" className="onboarding-skip" onClick={() => finish(true)} disabled={busy}>
            Skip setup
          </button>
          {step > 0 && (
            <button type="button" onClick={() => setStep((current) => current - 1)} disabled={busy}>
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="onboarding-primary" onClick={next} disabled={busy}>
              Continue
            </button>
          ) : (
            <button type="button" className="onboarding-primary" onClick={() => finish()} disabled={busy}>
              {busy ? "Saving..." : "Finish setup"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
