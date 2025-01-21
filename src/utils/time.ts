import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentTime = (timezone: string): string => {
  return dayjs().tz(timezone).format("HH:mm:ss z");
};
