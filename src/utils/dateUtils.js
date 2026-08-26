export function getRangeStart(period) {
  const now = new Date();
  if (period === 1) {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }
  if (period === 2) {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  if (period === 3) {
    return new Date(now.getFullYear(), 0, 1);
  }
  return null;
}
