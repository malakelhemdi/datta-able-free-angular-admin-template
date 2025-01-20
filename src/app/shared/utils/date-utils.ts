import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

/**
 * Calculate the difference between two dates in years, months, and days.
 * @param {string} startDate - The start date in the format "YYYY-MM-DD".
 * @param {string} endDate - The end date in the format "YYYY-MM-DD".
 * @returns {Object} An object containing the difference in years, months, and days.
 */
export function calculateDateDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the total difference in years, months, and days
  const totalYears = differenceInYears(end, start);
  const totalMonths = differenceInMonths(end, start);
  const totalDays = differenceInDays(end, start);

  // Calculate precise months and days
  const years = totalYears;
  const months = totalMonths - years * 12;
  const days = totalDays - differenceInDays(new Date(start.getFullYear() + years, start.getMonth() + months, start.getDate()), start);

  return {
    years,
    months,
    days
  };
}
