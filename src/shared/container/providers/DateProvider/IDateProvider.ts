interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
}

export { IDateProvider };
