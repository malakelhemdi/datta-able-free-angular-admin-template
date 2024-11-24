export interface FormEvaluationItem {
  evaluationItemName: string
  evaluationItemType: string
  scores: Score[]
}

export interface Score {
  elementName: string
  maxScore: number
  higherLevelSupervisorScore : number
  directManagerScore: number
}

export interface EmployeesCommand {
  employees: Managers;
}

export interface Managers {
  DirectManager: UnderEmployee[];
}

export interface UnderEmployee {
  id: string;
  name: string;
  evaluationTypeId: string;
}

export interface GetEmployeeCommand {
  id: string;
  name: string;
  employeeCode: string;
  procedureCode: number;
  procedureCodeName: string;
  positionId: string;
  jobClassificationName: string;
  positionCode: string;
  nid: string;
  nameEn: string;
  birthDate: string;
  socialStatus: number;
  familyData: any;
  gender: number;
  genderName: string;
  nationalityID: string;
  nationalityIDName: string;
  identificationCardNumber: string;
  passportNumber: string;
  overtime: number;
  hireDate: string;
  socialStatusSalaries: number;
  basicSalary: number;
  financialNumber: number;
  socialSecurityNumber: number;
  phoneNumber: string;
  grossSalary: string;
  bonus: [];
  effDate: string;
  procedureDateLast: string;
  costCenter: string;
  managementName: string;
  locationName: string;
  jobCode: string;
  jobTitleId: string;
  jobTitleName: string;
  upgradeDate: string;
  payrollStatus: number;
}

export interface AddEmployeeEvaluationDTO {
  employeeId: string
  year: number
  isApproved: number
  totalScore: number
  percentage: number
  evaluationId: number
  evaluationTypeId: string
  evaluationDate: string
  evaluationScores: any
}
