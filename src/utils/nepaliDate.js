import NepaliDateModule, { dateConfigMap } from "nepali-date-converter";

const NepaliDate = NepaliDateModule.default ?? NepaliDateModule;

export const NEPALI_MONTHS = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Aswin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

export const NEPALI_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const NEPALI_YEARS = Object.keys(dateConfigMap)
  .map(Number)
  .sort((a, b) => a - b);

const MONTH_KEYS = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Aswin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const MIN_SUPPORTED_DATE = toGregorianDate(NEPALI_YEARS[0], 0, 1);
const LAST_YEAR = NEPALI_YEARS[NEPALI_YEARS.length - 1];
const LAST_MONTH = MONTH_KEYS.length - 1;
const MAX_SUPPORTED_DATE = toGregorianDate(
  LAST_YEAR,
  LAST_MONTH,
  dateConfigMap[LAST_YEAR][MONTH_KEYS[LAST_MONTH]],
);

function parseGregorianISO(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? "");
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }
  return date;
}

function toGregorianDate(year, month, day) {
  return new NepaliDate(year, month, day).toJsDate();
}

function toGregorianISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayGregorianISO() {
  return toGregorianISO(new Date());
}

export function getNepaliDateParts(value) {
  const date = parseGregorianISO(value);
  if (!date || date < MIN_SUPPORTED_DATE || date > MAX_SUPPORTED_DATE) {
    return null;
  }
  return new NepaliDate(date).getBS();
}

export function getTodayNepaliDateParts() {
  return getNepaliDateParts(getTodayGregorianISO());
}

export function getNepaliMonthInfo(year, month) {
  const days = dateConfigMap[year]?.[MONTH_KEYS[month]];
  if (!Number.isInteger(days)) return null;
  return {
    days,
    firstWeekday: new NepaliDate(year, month, 1).getDay(),
  };
}

export function formatNepaliDate(value, format = "DD MMMM YYYY") {
  const date = parseGregorianISO(value);
  if (!date) return value ?? "";

  const nepaliDate = getNepaliDateParts(value);
  if (!nepaliDate) {
    return `${new Intl.DateTimeFormat("en-NP", { dateStyle: "medium" }).format(date)} (AD)`;
  }
  return new NepaliDate(date).format(format, "en");
}

export function nepaliDateToGregorianISO(year, month, day) {
  const yearConfig = dateConfigMap[year];
  const monthName = MONTH_KEYS[month];
  const daysInMonth = yearConfig?.[monthName];

  if (!Number.isInteger(day) || day < 1 || day > daysInMonth) {
    throw new RangeError("The selected Bikram Sambat date is invalid.");
  }

  return toGregorianISO(toGregorianDate(year, month, day));
}
