import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'sumAllScores',
  pure: true, // Ensures performance by recalculating only when input changes
})
export class SumAllScoresPipe implements PipeTransform {
  transform(evaluationScores: FormArray, attribute: string): number {
    if (!evaluationScores || !attribute) return 0;

    return evaluationScores.controls.reduce((totalSum, evaluationGroup) => {
      const evaluationItemType = (evaluationGroup as FormGroup).get('evaluationItemType')?.value;

      // Skip this evaluationGroup if the type is not 'Number'
      if (evaluationItemType !== 'Number') return totalSum;

      const scoresArray = (evaluationGroup as FormGroup).get('scores') as FormArray;
      if (!scoresArray) return totalSum;

      const groupSum = scoresArray.controls.reduce((groupTotal, scoreGroup) => {
        const value = scoreGroup.get(attribute)?.value;

        // Ensure the value is numeric
        return groupTotal + (typeof value === 'number' && !isNaN(value) ? value : 0);
      }, 0);

      return totalSum + groupSum;
    }, 0);
  }
}
