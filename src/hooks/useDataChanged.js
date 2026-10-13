import { useEffect, useRef } from "react";

export function useDataChanged(onChange) {
  const callbackRef = useRef(onChange);

  useEffect(() => {
    callbackRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!window.app?.onDataChanged) return undefined;
    return window.app.onDataChanged(() => {
      Promise.resolve(callbackRef.current()).catch((error) => {
        console.error("Failed to refresh data after a change:", error);
      });
    });
  }, []);
}
