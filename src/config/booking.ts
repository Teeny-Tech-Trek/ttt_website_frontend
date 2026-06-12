// Single source of truth for consultation-booking availability.
// Imported by BOTH the page scheduler (components/home/Pricing.tsx) and the
// chatbot booking widget (pages/ChatbotModal.tsx) so the offered days and times
// can never drift between the two surfaces.
//
// Rules:
//   - Days:  Monday–Friday only (no Saturday/Sunday).
//   - Times: 30-minute slots from 11:00 AM, last meeting ending at 7:00 PM
//            (so the last start is 6:30 PM).

export interface TimeSlot {
  label: string;
  value: string; // "HH:mm" 24-hour
}

export interface BookingDay {
  value: string; // "YYYY-MM-DD"
  weekday: string; // e.g. "Mon"
  day: number; // day-of-month
  month: string; // e.g. "Jun"
}

// 11:00 AM – 7:00 PM, every 30 minutes (last start 6:30 PM → ends 7:00 PM).
export const BOOKING_TIME_SLOTS: TimeSlot[] = [
  { label: '11:00 AM', value: '11:00' },
  { label: '11:30 AM', value: '11:30' },
  { label: '12:00 PM', value: '12:00' },
  { label: '12:30 PM', value: '12:30' },
  { label: '1:00 PM', value: '13:00' },
  { label: '1:30 PM', value: '13:30' },
  { label: '2:00 PM', value: '14:00' },
  { label: '2:30 PM', value: '14:30' },
  { label: '3:00 PM', value: '15:00' },
  { label: '3:30 PM', value: '15:30' },
  { label: '4:00 PM', value: '16:00' },
  { label: '4:30 PM', value: '16:30' },
  { label: '5:00 PM', value: '17:00' },
  { label: '5:30 PM', value: '17:30' },
  { label: '6:00 PM', value: '18:00' },
  { label: '6:30 PM', value: '18:30' },
  { label: '7:00 PM', value: '19:00' },
];

// Mon–Fri are weekdays; getDay() returns 0 (Sun) … 6 (Sat).
export const isWeekday = (date: Date): boolean => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

const formatDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// The next `count` weekdays starting tomorrow (skips Sat/Sun, never same-day so a
// slot can't be in the past).
export const buildBookingDays = (count: number): BookingDay[] => {
  const result: BookingDay[] = [];
  const cursor = new Date();
  let guard = 0;
  while (result.length < count && guard < count * 3 + 14) {
    guard += 1;
    cursor.setDate(cursor.getDate() + 1);
    if (!isWeekday(cursor)) continue;
    result.push({
      value: formatDateValue(cursor),
      weekday: cursor.toLocaleDateString(undefined, { weekday: 'short' }),
      day: cursor.getDate(),
      month: cursor.toLocaleDateString(undefined, { month: 'short' }),
    });
  }
  return result;
};

// First selectable weekday — used as the page scheduler's default date.
export const getInitialBookingDate = (): string => buildBookingDays(1)[0]?.value ?? '';

// Build the 30-minute meeting window (ISO strings) for a chosen date + slot.
export const getSlotDateRange = (dateValue: string, timeValue: string) => {
  const [hour, minute] = timeValue.split(':').map(Number);
  const start = new Date(`${dateValue}T00:00:00`);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);
  return { startTime: start.toISOString(), endTime: end.toISOString() };
};
