export interface SequenceVm {
  id: string
  from: number
  to: number
  organizationStructureId: string
  organizationStructureName: string
  isActive: boolean
}

export interface AddSequenceCommand {
  from: number
  to: number
  organizationStructureId: string
}

