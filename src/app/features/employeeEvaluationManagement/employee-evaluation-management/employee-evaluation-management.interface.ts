export interface FormEvaluationItem {
  evaluationItemName: string;
  evaluationItemType: string;
  scores: Score[];
}

export interface Score {
  elementName: string;
  maxScore: number;
  HigherLevelManagerScore: number;
  DirectManagerScore: number;
}

export interface EmployeesCommand {
  employees: Managers;
}

export interface Managers {
  DirectManager?: UnderEmployee[];
  HigherLevelManager?: UnderEmployee[];
  DepartmentManager?: UnderEmployee[];
}

export interface UnderEmployee {
  id: string;
  name: string;
  evaluationTypeId: string;
}

export interface AddEmployeeEvaluationDTO {
  employeeId: string;
  year: string;
  isApproved: number;
  totalScore: number;
  percentage: number;
  evaluationId?: number;
  evaluationTypeId: string;
  evaluationDate: string;
  evaluationScores: any;
}

export interface UpdateEmployeeEvaluationDTO extends AddEmployeeEvaluationDTO {
  id: string;
}

//  Final Form Types

export interface FinalFormTypes {
  employee: Employee;
  evaluationType: EvaluationType;
  year: string;
  approvals: Approvals;
  evaluationScores: EvaluationScore[];
}

export interface Employee {
  id: string;
  name: string;
  evaluationTypeId: string;
}

export interface EvaluationType {
  id: string;
  name: string;
  isForCitizens: boolean;
  evaluationData: EvaluationData;
}

export interface EvaluationData {
  EvaluationItems: EvaluationItem[];
}

export interface EvaluationItem {
  ItemName: string;
  disabled: boolean;
  type: string;
  Elements: Element[];
}

export interface Element {
  ElementName: string;
  Value: number;
}

export interface Approvals {
  DirectManager: DirectManager;
  HigherLevelManager: HigherLevelManager;
  DepartmentManager: DepartmentManager;
  PersonnelAffairs: PersonnelAffairs;
}

export interface DirectManager {
  status: boolean;
  approvedDate: any;
}

export interface HigherLevelManager {
  status: boolean;
  approvedDate: any;
}

export interface DepartmentManager {
  status: boolean;
  approvedDate: any;
}

export interface PersonnelAffairs {
  status: boolean;
  approvedDate: any;
}

export interface EvaluationScore {
  evaluationItemName: string;
  evaluationItemType: string;
  scores: Score[];
}

export interface Score {
  elementName: string;
  DirectManagerScore: number;
  HigherLevelManagerScore: number;
  maxScore: number;
}

// Final Form Types

export default interface SelectedEmployeeEvaluationInterface {
  id: string;
  employeeId: string;
  employeeName: string;
  year: number;
  evaluationId: number;
  evaluationName: string;
  isApproved: number;
  totalScore: number;
  percentage: number;
  evaluationTypeId: string;
  evaluationTypeName: string;
  evaluationDate: string;
  evaluationScores: EvaluationScores;
  lastApprovedDate: any;
  directSupervisorId: string;
  directSupervisorEmployeeName: string;
  directSupervisorApprovedDate: any;
  higherLevelManagerId: any;
  higherLevelManagerName: any;
  higherLevelApprovedDate: any;
  departmentManagerId: any;
  departmentManagerName: any;
  departmentManagerApprovedDate: any;
  personnelAffairsId: any;
  personnelAffairsName: any;
  personnelAffairsApprovedDate: any;
  lastModifiedDate: string;
}

export interface EvaluationScores {
  employee: Employee;
  evaluationType: EvaluationType;
  year: string;
  approvals: Approvals;
  evaluationScores: EvaluationScore[];
}

export interface Employee {
  id: string;
  name: string;
  evaluationTypeId: string;
}

export interface EvaluationType {
  id: string;
  name: string;
  isForCitizens: boolean;
  evaluationData: EvaluationData;
}

export interface EvaluationData {
  EvaluationItems: EvaluationItem[];
}

export interface EvaluationItem {
  ItemName: string;
  disabled: boolean;
  type: string;
  Elements: Element[];
}

export interface Element {
  ElementName: string;
  Value: number;
}

export interface Approvals {
  DirectManager: DirectManager;
  higherLevelSupervisor: HigherLevelSupervisor;
  departmentManager: DepartmentManager;
  PersonnelAffairs: PersonnelAffairs;
}

export interface DirectManager {
  status: boolean;
  approvedDate: any;
}

export interface HigherLevelSupervisor {
  status: boolean;
  approvedDate: any;
}

export interface DepartmentManager {
  status: boolean;
  approvedDate: any;
}

export interface PersonnelAffairs {
  status: boolean;
  approvedDate: any;
}

export interface EvaluationScore {
  evaluationItemName: string;
  evaluationItemType: string;
  scores: Score[];
}

export interface Score {
  elementName: string;
  directManagerScore: any;
  higherLevelSupervisorScore: number;
  maxScore: number;
}
