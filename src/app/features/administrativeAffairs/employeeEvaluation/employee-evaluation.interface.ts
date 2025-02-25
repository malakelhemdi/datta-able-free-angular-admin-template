
export interface AddEmployeeEvaluationCommand{
    employeeId :string;
    year :number;
    evaluationId :number;
}
export interface UpdateEmployeeEvaluationCommand{
    id :string;
    employeeId :string;
    year :number;
    evaluationId :number;
}
export interface ListItem {
    label: string;
    value: string;
}