export default function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const days = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
  ];
  return days[dayOfWeek];
}

export function dateComparison(date1, date2) {
  const date1Spaces = [];
  const date2Spaces = [];
  for (let i = 0; i < date1.length; i++) {
    if (date1[i] === " ") {
      date1Spaces.push(i);
    }
  }
  for (let i = 0; i < date2.length; i++) {
    if (date2[i] === " ") {
      date2Spaces.push(i);
    }
  }
  const year1 = Number(date1.substring(0, date1Spaces[0] - 1));
  const year2 = Number(date2.substring(0, date2Spaces[0] - 1));
  const month1 = Number(date1.substring(date1Spaces[0], date1Spaces[1]));
  const month2 = Number(date2.substring(date2Spaces[0], date2Spaces[1]));
  const day1 = Number(date1.substring(date1Spaces[1] + 1, date1.length - 1));
  const day2 = Number(date2.substring(date2Spaces[1] + 1, date2.length - 1));
  return year1 <= year2 && month1 <= month2 && day1 <= day2;
}
