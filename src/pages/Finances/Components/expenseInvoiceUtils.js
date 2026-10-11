export function formatInvoiceNumber(value) {
  if (value == null || String(value).trim() === "") return "0000.00";
  const number = Number(value);
  return Number.isFinite(number)
    ? number.toLocaleString("en-NP", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0000.00";
}
