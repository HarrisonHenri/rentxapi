import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
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

  private formatToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
