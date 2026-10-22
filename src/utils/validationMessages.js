export const validationMessages = Object.freeze({
  required: (label) => `${label} is required.`,
  positive: (label) => `${label} must be greater than zero.`,
  nonNegative: (label) => `${label} must be zero or greater.`,
  invalid: (label) => `Enter a valid ${label.toLowerCase()}.`,
});

export function requiredText(value, label) {
  return String(value ?? "").trim()
    ? ""
    : validationMessages.required(label);
}

export function positiveNumber(value, label) {
  const number = Number(value);
  if (String(value ?? "").trim() === "" || !Number.isFinite(number)) {
    return validationMessages.invalid(label);
  }
  return number > 0 ? "" : validationMessages.positive(label);
}

export function nonNegativeNumber(value, label) {
  const number = Number(value);
  if (String(value ?? "").trim() === "" || !Number.isFinite(number)) {
    return validationMessages.invalid(label);
  }
  return number >= 0 ? "" : validationMessages.nonNegative(label);
}
