export interface GetPositionCommand {
  id: string;
  positionCode: string;
  locationId: number;
  locationCode: string;
  locationName: string;
  positionType: number;
  positionTypeName: string;
  jobTitleId: string;
  jobTitleName: string;
  jobClassificationName: string;
  jobCode: string;
  organizationStructureId: string;
  organizationStructureName: string;
  costCenter: string;
  organizationStructureList: OrganizationStructureList[];
  outsideStaffing: boolean;
  approvalDate: any;
  notes: any[];
  positionStatus: number;
  positionStatusName: string;
  lastModifiedBy: any;
  lastModifiedByName: string;
  lastModifiedDate: string;
  classSalary: string;
}

export interface OrganizationStructureList {
  id: string;
  name: string;
  number: string;
  code: number;
  level: number;
  costCenter: string;
  isEmployeeAffairs: boolean;
  classificationId: any;
  classificationsName: any;
}

export interface GetLocationsCommand {
  id: number;
  locationCode: string;
  name: string;
}
export interface AddPositionCommand {
  positionCode: string;
  locationId: number;
  costCenterCode: string;
  positionType: number;
  jobTitleId: string;
  organizationStructureId: string;
  isAdmin: boolean;
  outsideStaffing: boolean;
  approvalDate: string;
  notes: [];
}
export interface UpdatePositionCommand {
  id: string;
  name: string;
  authorizedToAccredit: boolean;
  jobClassificationId: number;
  organizationStructureId: string;
  organizationStructureName: string;
  isAdmin: boolean;
  outsideStaffing: boolean;
  approvalDate: string;
  notes: [];
}
export interface ListItem {
  label: string;
  value: string;
}
export interface Bank {
  id: string;
  name: string;
}

export interface BankGroup {
  name: string;
  banks: Bank[];
}

export const BANKS: Bank[] = [
  { name: 'Bank A (Switzerland)', id: 'A' },
  { name: 'Bank B (Switzerland)', id: 'B' },
  { name: 'Bank C (France)', id: 'C' },
  { name: 'Bank D (France)', id: 'D' },
  { name: 'Bank E (France)', id: 'E' },
  { name: 'Bank F (Italy)', id: 'F' },
  { name: 'Bank G (Italy)', id: 'G' },
  { name: 'Bank H (Italy)', id: 'H' },
  { name: 'Bank I (Italy)', id: 'I' },
  { name: 'Bank J (Italy)', id: 'J' },
  { name: 'Bank Kolombia (United States of America)', id: 'K' },
  { name: 'Bank L (Germany)', id: 'L' },
  { name: 'Bank M (Germany)', id: 'M' },
  { name: 'Bank N (Germany)', id: 'N' },
  { name: 'Bank O (Germany)', id: 'O' },
  { name: 'Bank P (Germany)', id: 'P' },
  { name: 'Bank Q (Germany)', id: 'Q' },
  { name: 'Bank R (Germany)', id: 'R' }
];
