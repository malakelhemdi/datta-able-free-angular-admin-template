import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Score } from '../../features/employeeEvaluationManagement/employee-evaluation-management/employee-evaluation-management.interface';

@Pipe({
  name: 'totalScore',
  pure: false
})
export class TotalScorePipe implements PipeTransform {
  transform(evaluationScores: FormArray, attribute: 'DirectManagerScore' | 'HigherLevelManagerScore' | 'maxScore'): number {
    if (!evaluationScores || !attribute) {
      return 0;
    }

    const scores = evaluationScores.value as Score[];
    return scores.reduce((p, c) => Number(p) + (Number(c[attribute]) ? Number(c[attribute]) : 0), 0);
  }
}
