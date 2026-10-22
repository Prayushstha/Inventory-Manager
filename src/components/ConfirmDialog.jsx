import { Dialog } from "./Dialog";

export function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
  title = "Confirm action",
  confirmLabel = "Yes, Delete",
  cancelLabel = "Cancel",
}) {
  return (
    <Dialog
      title={title}
      size="small"
      onClose={onCancel}
      footer={(
        <>
          <button className="btn-secondary confirm-btn" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="btn-primary confirm-btn" onClick={onConfirm} autoFocus>
            {confirmLabel}
          </button>
        </>
      )}
    >
      <p>{message}</p>
    </Dialog>
  );
}
