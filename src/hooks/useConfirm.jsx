import { useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

export function useConfirm() {
  const [confirmState, setConfirmState] = useState(null);

  const confirm = (
    message,
    confirmLabel = "Yes, Delete",
    cancelLabel = "Cancel",
    title = "Confirm action",
  ) => {
    return new Promise((resolve) => {
       setConfirmState({ message, confirmLabel, cancelLabel, title, resolve });
    });
  };

  const handleConfirm = () => {
    confirmState?.resolve(true);
    setConfirmState(null);
  };

  const handleCancel = () => {
    confirmState?.resolve(false);
    setConfirmState(null);
  };

  const ConfirmDialogComponent = confirmState ? (
    <ConfirmDialog
      message={confirmState.message}
      title={confirmState.title}
      confirmLabel={confirmState.confirmLabel}
      cancelLabel={confirmState.cancelLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return { confirm, ConfirmDialogComponent };
}
