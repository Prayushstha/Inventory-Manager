export function selectProductIds(
  visibleIds,
  selectedIds,
  productId,
  shiftKey,
  lastSelectedId,
) {
  const index = visibleIds.indexOf(productId);
  const lastIndex = lastSelectedId ? visibleIds.indexOf(lastSelectedId) : -1;
  const idsToToggle =
    shiftKey && index >= 0 && lastIndex >= 0
      ? visibleIds.slice(
          Math.min(index, lastIndex),
          Math.max(index, lastIndex) + 1,
        )
      : [productId];

  if (!shiftKey && selectedIds.includes(productId)) {
    return selectedIds.filter((id) => id !== productId);
  }
  return [...new Set([...selectedIds, ...idsToToggle])];
}

export function toggleVisibleSelection(visibleIds, selectedIds) {
  const allSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
  return allSelected ? [] : [...visibleIds];
}

export function clearHiddenSelections(selectedIds, visibleIds) {
  const visible = new Set(visibleIds);
  return selectedIds.filter((id) => visible.has(id));
}
