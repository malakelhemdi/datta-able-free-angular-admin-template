export interface GetEmployeeEvaluationTypeCommand {
    id: string
    name: string
    isForCitizens: boolean
    evaluationData?: EvaluationData
  }
  
  export interface EvaluationData {
    EvaluationItems: EvaluationItem[]
  }
  
  export interface EvaluationItem {
    ItemName: string
    Elements: Element[]
  }
  
  export interface Element {
    ElementName: string
    Value: any
  }
  