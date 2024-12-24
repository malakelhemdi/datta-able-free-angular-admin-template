export interface GetClinicsCommand {
  id: string;
  name: string;
  employeeCode: string;
  procedureCode: number;
  procedureCodeName: string;
  positionId: string;
  positionCode: string;
  nid: string;
  nameEn: string;
  birthDate: string;
  socialStatus: number;
  familyData: [];
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
}
export interface AddClinicCommand {
  id: string;
  employeeId: string;
}
export interface UpdateClinicCommand {
  id: string;
  employeeId: string;
}
