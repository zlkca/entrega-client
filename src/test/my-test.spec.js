import { getWeekStartEndDates } from '../pages/utils.js';
const date = new Date(2024, 0, 1); // January 1, 2024
const result = getWeekStartEndDates(date);
console.log(result);