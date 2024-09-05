export const getDiscount = (discountStr, price) => {
  if (discountStr) {
    if (discountStr.includes("%")) {
      const rate = parseInt(discountStr.replace("%", ""));
      return (price * rate) / 100;
    } else {
      if (!isNaN(discountStr)) {
        return parseInt(discountStr);
      } else {
        return 0;
      }
    }
  } else {
    return 0;
  }
};

export const getDate = (s) => {
  if (s instanceof Date) {
    return s.toISOString().split("T")[0];
  } else {
    return s.split("T")[0];
  }
};

export const getTime = (s) => {
  if (s instanceof Date) {
    return s.toISOString().split("T")[1];
  } else {
    return s.split("T")[1];
  }
};

export const getDisplayTime = (s1) => {
  const s = new Date(s1).toISOString();
  const t = getTime(s);
  return getDate(s) + " " + t.split(".")[0];
};

export function getUnixTime(date) {
  const unixTimestamp = date.getTime();
  return unixTimestamp;
}

export function getFirstDayOfWeek() {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - today.getDay()));
}

export function getFirstDateOfWeek(date, startOfWeek = 0) {
  // startOfWeek: 0 = Sunday, 1 = Monday
  // Check if the date is valid
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }

  const dayOfWeek = date.getDay();
  const diff = (dayOfWeek < startOfWeek ? 7 : 0) + dayOfWeek - startOfWeek;

  // Calculate the first date of the week
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - diff);

  // Adjust for invalid months/days (this won't really happen due to validation)
  if (isNaN(startDate.getTime())) {
    throw new Error('Calculated an invalid date');
  }

  return startDate;
}
console.log(getFirstDateOfWeek(new Date(2024, 0, 0))); // Monday
console.log(getFirstDateOfWeek(new Date(2024, 11, 30))); // Last Tuesday of 2024
console.log(getFirstDateOfWeek(new Date())); // Invalid date error

export function getLastDateOfWeek(date, startOfWeek = 0) {
  // startOfWeek: 0 = Sunday, 1 = Monday
  // Check if the date is valid
  console.log(date.toISOString())
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }

  const dayOfWeek = date.getDay();
  const diff = (dayOfWeek < startOfWeek ? -7 : 0) + (6 - dayOfWeek + startOfWeek);

  // Calculate the last date of the week
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + diff);

  // Adjust for invalid months/days (this won't really happen due to validation)
  if (isNaN(endDate.getTime())) {
    throw new Error('Calculated an invalid date');
  }

  return endDate;
}

// Example usage:
console.log(getLastDateOfWeek(new Date(2024, 0, 1))); // Sunday, 2024-01-07
console.log(getLastDateOfWeek(new Date(2024, 11, 30))); // Sunday, 2025-01-05
console.log(getLastDateOfWeek(new Date())); // Invalid date error


export function getTargetDate(currentDate, deltaDays) {
  const targetDate = new Date(currentDate);
  targetDate.setDate(targetDate.getDate() + deltaDays);
  return targetDate;
}

export function getTimeRange(date) {
  const startTime = new Date(date);
  const endTime = new Date(date);
  startTime.setHours(0,0,0,0);
  endTime.setHours(23, 59, 59, 999);
  return {start: startTime, end: endTime};
}
