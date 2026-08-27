import { useEffect } from "react";

/**
 * Hook for handling keyboard shortcuts in dialogs
 * @param {Object} config - Configuration object
 * @param {Function} config.onSave - Called when Ctrl+S or Cmd+S is pressed
 * @param {Function} config.onClose - Called when Escape is pressed
 * @param {Function} config.onAddItem - Called when Shift+Enter is pressed
 * @param {Array} config.fields - Array of input field refs for arrow key navigation
 * @param {number} config.currentFieldIndex - Currently focused field index
 * @param {Function} config.onFieldChange - Called when arrow keys navigate fields
 * @param {boolean} config.enabled - Whether the hook is enabled (default: true)
 */
export function useDialogKeyboard({
  onSave,
  onClose,
  onAddItem,
  fields,
  currentFieldIndex,
  onFieldChange,
  enabled = true,
} = {}) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      // Ctrl+S or Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        onSave?.();
        return;
      }

      // Escape to close
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }

      // Shift+Enter to add item
      if (e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        onAddItem?.();
        return;
      }

      // Arrow key navigation (only if fields array is provided)
      if (fields && fields.length > 0 && onFieldChange) {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex = (currentFieldIndex + 1) % fields.length;
          onFieldChange(nextIndex);
          const nextField = fields[nextIndex]?.current || fields[nextIndex];
          nextField?.focus?.();
          return;
        }

        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex = currentFieldIndex - 1 < 0 ? fields.length - 1 : currentFieldIndex - 1;
          onFieldChange(prevIndex);
          const prevField = fields[prevIndex]?.current || fields[prevIndex];
          prevField?.focus?.();
          return;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSave, onClose, onAddItem, fields, currentFieldIndex, onFieldChange, enabled]);
}
