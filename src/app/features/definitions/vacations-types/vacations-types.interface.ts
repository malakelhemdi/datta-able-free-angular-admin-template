export interface AddVacationsTypeCommand {
  name: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  salaryDiscountRate: number;
  gender: number;
  ageRange: String;
  isGrantedOnlyOnce: boolean;
  exceptionHoliday: boolean;
  // minAgeForIncreasedDuration: any;
  minYearsOfServiceForIncreasedDuration?: number;
  requiresOneYearOfService: boolean;
  isSalaryBased: boolean;
}

export interface GetVacationsTypeCommand extends AddVacationsTypeCommand {
  id: string;
  isActive: boolean;
}
