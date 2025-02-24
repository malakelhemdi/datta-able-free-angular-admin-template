export interface GetEmployeeBonusesCommand {
  id: string;
  employeeCode: string;
  positionId: string;
  positionCode: string;
  name: string;
  NID: string;
  nameEn: string;
  phoneNumber: string;
  basicSalary: string;
  grossSalary: string;
  bonus: BonusInfoDataModel[];
  bonusHistory: BonusInfoDataModel[];
}

export interface BonusInfoDataModel {
  id: string;
  name: string;
  amount: string;
  dateOfGet: string;
  expiryDate: string;
  createdBy: string;
  createdDate: string;
  deleteDate: string;
  isActive: number;
}
