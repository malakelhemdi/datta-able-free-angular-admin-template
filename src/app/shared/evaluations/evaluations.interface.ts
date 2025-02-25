export interface GetEmployeeEvaluationCommand {
  id: string
  employeeId: string
  employeeName: string
  year: number
  evaluationId: number
  evaluationName: string
  isApproved: number
  totalScore: number
  percentage: number
  evaluationTypeId: string
  evaluationTypeName: string
  evaluationDate: string
  evaluationScores: EvaluationScores
  lastApprovedDate?: string
  directSupervisorId: string
  directSupervisorEmployeeName: string
  directSupervisorApprovedDate?: string
  higherLevelManagerId?: string
  higherLevelManagerName?: string
  higherLevelApprovedDate?: string
  departmentManagerId?: string
  departmentManagerName?: string
  departmentManagerApprovedDate?: string
  personnelAffairsId?: string
  personnelAffairsName?: string
  personnelAffairsApprovedDate?: string
  lastModifiedDate: string
}

export interface EvaluationScores {
  employee: Employee
  evaluationType: EvaluationType
  year: string
  approvals: Approvals
  evaluationScores: EvaluationScore[]
}

export interface Employee {
  name: string
  id: string
  evaluationTypeId: any
}

export interface EvaluationType {
  id: string
  name: string
  isForCitizens: boolean
  evaluationData: EvaluationData
  isActive?: boolean
}

export interface EvaluationData {
  EvaluationItems: EvaluationItem[]
}

export interface EvaluationItem {
  ItemName: string
  disabled: boolean
  type: string
  Elements: Element[]
}

export interface Element {
  ElementName: string
  Value: number
}

export interface Approvals {
  DirectManager: DirectManager
  HigherLevelManager: HigherLevelManager
  DepartmentManager: DepartmentManager
  PersonnelAffairs: PersonnelAffairs
}

export interface DirectManager {
  status: boolean
  approvedDate: string
}

export interface HigherLevelManager {
  status: boolean
  approvedDate?: string
}

export interface DepartmentManager {
  status: boolean
  approvedDate?: string
}

export interface PersonnelAffairs {
  status: boolean
  approvedDate?: string
}

export interface EvaluationScore {
  evaluationItemName: string
  evaluationItemType: string
  scores: Score[]
}

export interface Score {
  elementName: string
  DirectManagerScore: any
  HigherLevelManagerScore: any
  maxScore: number
}




