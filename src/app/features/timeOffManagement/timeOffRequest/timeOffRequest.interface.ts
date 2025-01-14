export interface GetTimeOffRequestCommand{
  id: string,
  employeeId: string,
  employeeName: string,
  startDate: string,
  endDate: string,
  createdDate: string,
  description: string,
  halfDay: boolean,
  halfDayValue: number,
  duration: number,
  isApproved: number,
  rejectById: string,
  deletedById: string,
  lastModifiedDate: string,
  directSupervisorId: string,
  directSupervisorName: string,
  directSupervisorApprovedDate: string,
  departmentManagerId: string,
  departmentManagerApprovedDate: string,
  departmentManagerName: string,
  personnelAffairsId: string,
  personnelAffairsApprovedDate: string,
  personnelAffairsName: string,
  vacationTypeId: string,
  vacationTypeName: string
}
export interface addUserCommand{
    employeeId :string;
    name :string;
    userName :string;
    roleId :string;
    password :string;
    isActive :boolean;
}
export interface updateUserCommand{
    id :string;
    employeeId :string;
    name :string;
    userName :string;
    roleId :string;
    password :string;
    isActive :boolean;
}
export interface ListItem {
    label: string;
    value: string;
}
