import { useEffect, useId } from "react";

export function Dialog({
  title,
  children,
  footer,
  onClose,
  size = "",
  className = "",
  overlayStyle,
  dialogStyle,
  closeOnOverlay = true,
}) {
  const titleId = useId();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="dialog-overlay"
      onClick={closeOnOverlay ? onClose : undefined}
      style={overlayStyle}
    >
      <div
        className={`dialog ${size ? `dialog-${size}` : ""} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        style={dialogStyle}
      >
        {title && (
          <div className="dialog-header">
            <h2 className="dialog-title" id={titleId}>{title}</h2>
            <button className="dialog-close" type="button" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        )}
        <div className="dialog-body">{children}</div>
        {footer && <div className="dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}

export function ValidationMessage({ id, children }) {
  if (!children) return null;
  return <small className="validation-message" id={id} role="alert">{children}</small>;
}
