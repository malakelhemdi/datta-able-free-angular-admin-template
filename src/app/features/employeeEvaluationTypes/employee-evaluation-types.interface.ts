export interface EvaluationData {
  EvaluationItems: EvaluationItem[];
}

export interface EvaluationItem {
  ItemName: string;
  disabled: boolean;
  type: ElementType;
  Elements: Element[];
}

export interface Element {
  ElementName: string;
  Value: any;
}

export enum ElementType {
  Text = 'Text',
  Number = 'Number',
  Range = 'Range',
  Boolean = 'Boolean'
}
