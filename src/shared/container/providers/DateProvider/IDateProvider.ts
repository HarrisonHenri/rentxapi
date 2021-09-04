interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  checkIsBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
