import { EvaluationData } from '../employee-evaluation-types.interface';

export interface GetEmployeeEvaluationTypeCommand {
  id: string;
  name: string;
  isForCitizens: boolean;
  evaluationData?: EvaluationData;
}
