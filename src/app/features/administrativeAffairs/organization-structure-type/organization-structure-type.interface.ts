export interface OrganizationStructureTypes {
  id: string;
  name: string;
}

export interface AddOrganizationStructureTypesCommand {
  name: string;
}

export interface UpdateOrganizationStructureTypeCommand {
  id: string;
  name: string;
}
