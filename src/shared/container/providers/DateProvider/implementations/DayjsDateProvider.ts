import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const formattedEndDate = dayjs(endDate).utc().local().format();
    const formattedStartDate = dayjs(startDate).utc().local().format();

    return dayjs(formattedEndDate).diff(formattedStartDate, "hours");
  }
}

export { DayjsDateProvider };
