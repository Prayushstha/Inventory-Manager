import { useEffect, useRef, useState } from "react";
import {
  NEPALI_MONTHS,
  NEPALI_WEEKDAYS,
  NEPALI_YEARS,
  formatNepaliDate,
  getNepaliDateParts,
  getNepaliMonthInfo,
  getTodayNepaliDateParts,
  nepaliDateToGregorianISO,
} from "../utils/nepaliDate";
import "./Styles/nepali-date-picker.css";

export function NepaliDatePicker({
  value,
  onChange,
  disabled = false,
  className = "",
  invalid = false,
}) {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = getNepaliDateParts(value);
  const today = getTodayNepaliDateParts();
  const initialView = selectedDate ?? today;
  const [viewState, setViewState] = useState({ value, view: initialView });
  const view = viewState.value === value ? viewState.view : initialView;

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  if (!view) {
    return (
      <div className="nepali-date-unavailable">
        Nepali calendar dates are unavailable for this system date.
      </div>
    );
  }

  const yearIndex = NEPALI_YEARS.indexOf(view.year);
  const monthInfo = getNepaliMonthInfo(view.year, view.month);
  if (!monthInfo) {
    return (
      <div className="nepali-date-unavailable">
        Nepali calendar dates are unavailable for this year.
      </div>
    );
  }

  function moveMonth(delta) {
    let year = view.year;
    let month = view.month + delta;

    if (month < 0) {
      year -= 1;
      month = NEPALI_MONTHS.length - 1;
    } else if (month >= NEPALI_MONTHS.length) {
      year += 1;
      month = 0;
    }

    if (yearIndex === -1 || !NEPALI_YEARS.includes(year)) return;
    setViewState({ value, view: { year, month } });
  }

  function selectDate(day) {
    onChange(nepaliDateToGregorianISO(view.year, view.month, day));
    setIsOpen(false);
  }

  return (
    <div
      className="nepali-date-picker"
      ref={rootRef}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <button
        type="button"
        className={`nepali-date-trigger ${className}`.trim()}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{formatNepaliDate(value)}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      </button>

      {isOpen && (
        <div className="nepali-date-calendar" role="dialog" aria-label="Choose Bikram Sambat date">
          <div className="nepali-calendar-header">
            <button
              type="button"
              aria-label="Previous month"
              disabled={yearIndex === 0 && view.month === 0}
              onClick={() => moveMonth(-1)}
            >
              ‹
            </button>
            <strong>
              {NEPALI_MONTHS[view.month]} {view.year}
            </strong>
            <button
              type="button"
              aria-label="Next month"
              disabled={
                yearIndex === NEPALI_YEARS.length - 1 &&
                view.month === NEPALI_MONTHS.length - 1
              }
              onClick={() => moveMonth(1)}
            >
              ›
            </button>
          </div>

          <div className="nepali-calendar-grid" role="grid">
            {NEPALI_WEEKDAYS.map((weekday) => (
              <span className="nepali-calendar-weekday" role="columnheader" key={weekday}>
                {weekday}
              </span>
            ))}
            {Array.from({ length: monthInfo.firstWeekday }, (_, index) => (
              <span
                className="nepali-calendar-empty"
                role="gridcell"
                aria-hidden="true"
                key={`empty-${index}`}
              />
            ))}
            {Array.from({ length: monthInfo.days }, (_, index) => {
              const day = index + 1;
              const isSelected =
                selectedDate?.year === view.year &&
                selectedDate?.month === view.month &&
                selectedDate?.date === day;
              const isToday =
                today?.year === view.year &&
                today?.month === view.month &&
                today?.date === day;
              return (
                <button
                  type="button"
                  className={[
                    "nepali-calendar-day",
                    isSelected ? "selected" : "",
                    isToday ? "today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  role="gridcell"
                  aria-label={`${day} ${NEPALI_MONTHS[view.month]} ${view.year} BS`}
                  aria-pressed={isSelected}
                  key={day}
                  onClick={() => selectDate(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
