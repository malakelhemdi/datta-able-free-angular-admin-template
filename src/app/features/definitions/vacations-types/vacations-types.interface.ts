export interface AddVacationsTypeCommand {
  name: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  salaryDiscountRate: number;
  gender: number;
  isGrantedOnlyOnce: boolean;
  exceptionHoliday: boolean;
  minAgeForIncreasedDuration: any;
  minYearsOfServiceForIncreasedDuration?: number;
  requiresOneYearOfService: boolean;
  isSalaryBased: boolean;
}

export interface GetVacationsTypeCommand extends AddVacationsTypeCommand {
  id: string;
}
