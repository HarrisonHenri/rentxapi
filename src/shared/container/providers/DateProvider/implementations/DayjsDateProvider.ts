import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  private formatToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const formattedEndDate = this.formatToUTC(endDate);
    const formattedStartDate = this.formatToUTC(startDate);

    return dayjs(formattedEndDate).diff(formattedStartDate, "days");
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const formattedEndDate = this.formatToUTC(endDate);
    const formattedStartDate = this.formatToUTC(startDate);

    return dayjs(formattedEndDate).diff(formattedStartDate, "hours");
  }

  addDays(days: number): Date {
    return dayjs(new Date()).add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs(new Date()).add(hours, "hour").toDate();
  }

  checkIsBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
