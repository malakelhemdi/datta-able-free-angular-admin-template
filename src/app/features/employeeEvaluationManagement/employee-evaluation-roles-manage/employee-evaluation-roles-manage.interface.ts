export interface DefineManagersForTheOrganizationalUnitDTO {
  id: string;
  directManagerId: string;
  higherLevelManagerId: string;
  departmentManagerId: string;
}

export interface ManagersForTheOrganizationalUnitCommand {
  organizationStructureId: string;
  directManagerId: DirectManagerId;
  higherLevelManagerId: HigherLevelManagerId;
  departmentManagerId: DepartmentManagerId;
}

export interface DirectManagerId {
  id: string;
  name: string;
}

export interface HigherLevelManagerId {
  id: string;
  name: string;
}

export interface DepartmentManagerId {
  id: string;
  name: string;
}
