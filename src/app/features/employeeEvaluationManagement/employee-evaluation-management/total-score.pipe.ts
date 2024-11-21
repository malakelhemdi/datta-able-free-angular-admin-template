import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormEvaluationItem, Score } from './employee-evaluation-management.interface';

@Pipe({
  name: 'totalScore',
  pure: false
})
export class TotalScorePipe implements PipeTransform {
  transform(evaluationScores: FormArray, attribute: 'directManagerScore' | 'higherLevelSupervisorScore' | 'maxScore'): number {
    if (!evaluationScores || !attribute) {
      return 0;
    }

    // return evaluationScores.controls.reduce((total, evaluationControl) => {
    const scores = evaluationScores.value as Score[];
    return scores.reduce((p, c) => Number(p) + Number(c[attribute]), 0);

    // const scoreTotal = scores.controls.reduce((subTotal, scoreControl) => {
    //   const value = scoreControl.get(attribute)?.value || 0;
    //   return subTotal + value;
    // }, 0);
    //   return total + scoreTotal;
    // }, 0);
  }
}
