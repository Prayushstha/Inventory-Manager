import { useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

export function useConfirm() {
  const [confirmState, setConfirmState] = useState(null);

  const confirm = (message) => {
    return new Promise((resolve) => {
      setConfirmState({ message, resolve });
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
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return { confirm, ConfirmDialogComponent };
}
