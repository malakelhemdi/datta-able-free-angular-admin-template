import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'totalScore'
})
export class TotalScorePipe implements PipeTransform {
  transform(evaluationScores: FormArray, attribute: string): number {
    if (!evaluationScores || !attribute) {
      return 0;
    }

    return evaluationScores.controls.reduce((total, evaluationControl) => {
      const scores = evaluationControl.get('scores') as FormArray;
      const scoreTotal = scores.controls.reduce((subTotal, scoreControl) => {
        const value = scoreControl.get(attribute)?.value || 0;
        return subTotal + value;
      }, 0);
      return total + scoreTotal;
    }, 0);
  }
}
