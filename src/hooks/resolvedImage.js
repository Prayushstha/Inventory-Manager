import { useState, useEffect } from "react";

export function useResolvedImage(relativePath) {
  const [resolvedImage, setResolvedImage] = useState("/images/NoImage.jpg");

  useEffect(() => {
    async function resolve() {
      if (!relativePath) {
        setResolvedImage("/images/NoImage.jpg");
        return;
      }
      const absPath = await window.db.resolveImagePath(relativePath);
      setResolvedImage(
        `app-image://open?path=${encodeURIComponent(absPath.replace(/\\/g, "/"))}`,
      );
    }
    resolve();
  }, [relativePath]);

  return resolvedImage;
}
