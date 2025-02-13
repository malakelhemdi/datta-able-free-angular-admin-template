export interface UnitsCommand {
  id: string;
  name: string;
  number: string;
  costCenter: string;
}
export interface UnitTypeCommand {
  id: string;
  name: string;
}

export interface AddOrganizationalUnitCommand {
  name: string;

}
export interface UpdateOrganizationalUnitCommand {
  id: string;
  name: string;
}
export interface ListItem {
  label: string;
  value: string;
}
