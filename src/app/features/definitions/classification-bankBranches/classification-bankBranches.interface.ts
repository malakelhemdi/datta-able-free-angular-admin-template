export interface GetClassificationBranchCommand {
  id: string;
  name: string;
  isFamilyBonuse: boolean;
  isActive: boolean;

}
export interface AddClassificationBranchCommand {
  name: string;
}
export interface UpdateClassificationBranchCommand {
  id: string;
  name: string;
}
