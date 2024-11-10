export interface AddEvaluationTypeCommand {
  name: string;
  isForCitizens: boolean;
  evaluationData: EvaluationData;
}

export interface UpdateEvaluationTypeCommand extends AddEvaluationTypeCommand {
  id: string;
}

export interface EvaluationData {
  EvaluationItems: EvaluationItem[];
}

export interface EvaluationItem {
  ItemName: string;
  Elements: Element[];
}

export interface Element {
  ElementName: string;
  Value: number;
}
