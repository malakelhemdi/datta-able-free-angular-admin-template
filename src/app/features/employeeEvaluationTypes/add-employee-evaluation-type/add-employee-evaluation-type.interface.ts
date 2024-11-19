import { EvaluationData } from "../employee-evaluation-types.interface";

export interface AddEvaluationTypeCommand {
  name: string;
  isForCitizens: boolean;
  evaluationData: EvaluationData;
}

export interface UpdateEvaluationTypeCommand extends AddEvaluationTypeCommand {
  id: string;
}