import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'sumLargestScores',
  pure: false,
})
export class SumLargestScoresPipe implements PipeTransform {
  transform(evaluationScores: FormArray): number {
    if (!evaluationScores) return 0;

    return evaluationScores.controls.reduce((totalSum, evaluationGroup) => {
      const evaluationItemType = (evaluationGroup as FormGroup).get('evaluationItemType')?.value;

      // Skip this evaluationGroup if the type is not 'Number'
      if (evaluationItemType !== 'Number') return totalSum;

      const scoresArray = (evaluationGroup as FormGroup).get('scores') as FormArray;
      if (!scoresArray) return totalSum;

      const groupSum = scoresArray.controls.reduce((groupTotal, scoreGroup) => {
        let directManagerScore = scoreGroup.get('directManagerScore')?.value;
        let higherLevelSupervisorScore = scoreGroup.get('higherLevelSupervisorScore')?.value;

        // Ensure the values are numbers; otherwise, treat them as 0
        directManagerScore = this.toNumber(directManagerScore);
        higherLevelSupervisorScore = this.toNumber(higherLevelSupervisorScore);

        // Use the larger score between directManagerScore and higherLevelSupervisorScore
        const maxScore = Math.max(directManagerScore, higherLevelSupervisorScore);

        return groupTotal + maxScore;
      }, 0);

      return totalSum + groupSum;
    }, 0);
  }

  // Helper function to ensure the value is a number
  private toNumber(value: any): number {
    return typeof +(value) === 'number' && !isNaN(value) ? value : 0;
  }
}