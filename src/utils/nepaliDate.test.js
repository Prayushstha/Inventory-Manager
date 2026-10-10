import assert from "node:assert/strict";
import test from "node:test";
import {
  formatNepaliDate,
  getNepaliDateParts,
  getNepaliMonthInfo,
  nepaliDateToGregorianISO,
} from "./nepaliDate.js";

test("formats Gregorian dates as Bikram Sambat dates", () => {
  assert.equal(formatNepaliDate("2026-10-10"), "24 Aswin 2083");
});

test("converts a selected Bikram Sambat date back to its Gregorian ISO date", () => {
  assert.equal(nepaliDateToGregorianISO(2083, 5, 24), "2026-10-10");
});

test("exposes the configured number of days and weekday for a BS month", () => {
  assert.deepEqual(getNepaliMonthInfo(2083, 5), {
    days: 31,
    firstWeekday: 4,
  });
});

test("round-trips every date in the current BS year", () => {
  for (let month = 0; month < 12; month += 1) {
    const { days } = getNepaliMonthInfo(2083, month);
    for (let day = 1; day <= days; day += 1) {
      const gregorianDate = nepaliDateToGregorianISO(2083, month, day);
      const convertedDate = getNepaliDateParts(gregorianDate);
      assert.equal(convertedDate.year, 2083);
      assert.equal(convertedDate.month, month);
      assert.equal(convertedDate.date, day);
    }
  }
});

test("rejects invalid Bikram Sambat calendar days", () => {
  assert.throws(() => nepaliDateToGregorianISO(2083, 5, 32), RangeError);
});

test("keeps Gregorian dates outside the converter range readable", () => {
  assert.equal(getNepaliDateParts("1900-01-01"), null);
  assert.match(formatNepaliDate("1900-01-01"), /\(AD\)$/);
});
