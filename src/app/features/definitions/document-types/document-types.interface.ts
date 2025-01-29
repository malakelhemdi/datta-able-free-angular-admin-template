export interface GetDocumentTypeCommand{
    id :string;
    name :string;
    isDecision: boolean;
    haveExpireDate: boolean;
  isActive: boolean;
}
export interface AddDocumentTypeCommand{
    name :string;
    isDecision: boolean;
    haveExpireDate: boolean;
}
