// function getTargetDate(currentDate, deltaDays) {
//     const targetDate = new Date(currentDate);
//     targetDate.setDate(targetDate.getDate() + deltaDays);

import { getWeekStartEndDates } from "../../pages/utils.js";


//     // Handle cases where the target date falls in a different month or year
//     if (deltaDays > 0) {
//       // If the target date is in the future
//       if (targetDate.getMonth() < currentDate.getMonth() || targetDate.getFullYear() < currentDate.getFullYear()) {
//         // Adjust the month and year if necessary
//         targetDate.setMonth(currentDate.getMonth() + 1);
//         targetDate.setFullYear(currentDate.getFullYear());
//       }
//     } else if (deltaDays < 0) {
//       // If the target date is in the past
//       if (targetDate.getMonth() >= currentDate.getMonth() && targetDate.getFullYear() > currentDate.getFullYear()) {
//         // Adjust the year if necessary
//         targetDate.setFullYear(currentDate.getFullYear() - 1);
//       } else if (targetDate.getMonth() < currentDate.getMonth() && targetDate.getFullYear() <= currentDate.getFullYear()) {
//         // Adjust the month and year if necessary
//         targetDate.setMonth(currentDate.getMonth() - 1);
//         targetDate.setFullYear(currentDate.getFullYear());
//       }
//     }
  
//     return targetDate;
//   }
  
  // Test cases
//   console.log('Test case 1: Current date is January 1, 2024, and delta days is 3');
//   const testDate1 = new Date(2024, 0, 1); // January 1, 2024
//   const targetDate1 = getTargetDate(new Date(2024, 0, 1), -3);
//   console.log('Target date:', targetDate1); // Expected output: Thu Jan 04 2024 00:00:00 GMT+0530 (India Standard Time)
  
//   console.log('\nTest case 2: Current date is January 3, 2024, and delta days is 30');
//   const testDate2 = new Date(2024, 0, 3); // January 1, 2024
//   const targetDate2 = getTargetDate(testDate2, 30);
//   console.log('Target date:', targetDate2); // Expected output: Wed Jan 31 2024 00:00:00 GMT+0530 (India Standard Time)
  
//   console.log('\nTest case 3: Current date is January 1, 2024, and delta days is 366');
//   const testDate3 = new Date(2024, 0, 1); // January 1, 2024
//   const targetDate3 = getTargetDate(testDate3, 366);
//   console.log('Target date:', targetDate3); // Expected output: Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)
  
//   console.log('\nTest case 4: Current date is December 31, 2024, and delta days is -3');
//   const testDate4 = new Date(2024, 11, 31); // December 31, 2024
//   const targetDate4 = getTargetDate(testDate4, -3);
//   console.log('Target date:', targetDate4); // Expected output: Fri Dec 28 2024 00:00:00 GMT+0530 (India Standard Time)
  
//   console.log('\nTest case 5: Current date is December 31, 2024, and delta days is -30');
//   const testDate5 = new Date(2024, 11, 31); // December 31, 2024
//   const targetDate5 = getTargetDate(testDate5, -30);
//   console.log('Target date:', targetDate5); // Expected output: Sun Dec 01 2024 00:00:00 GMT+0530 (India Standard Time)
  
//   console.log('\nTest case 6: Current date is December 31, 2024, and delta days is -365');
//   const testDate6 = new Date(2024, 11, 31); // December 31, 2024
//   const targetDate6 = getTargetDate(testDate6, -365);
//   console.log('Target date:', targetDate6); // Expected output: Wed Jan 01 2024 00:00:00 GMT+0530 (India Standard Time)
  describe("Test getWeekStartEndDates", () => {
    it("should return the start and end dates for the given date range", () => {
      const date = new Date(2024, 0, 1); // January 1, 2024
     const result = getWeekStartEndDates(date);
      expect(result).toEqual({
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      });
    });
  });