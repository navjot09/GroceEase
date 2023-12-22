export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDay();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().substring(2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "pm" : "am";

  return `${dayOfWeek}, ${dayOfMonth} ${month} '${year}, ${hours % 12 || 12}:${
    minutes >= 10 ? minutes : `0${minutes}`
  } ${amPm}`;
}
