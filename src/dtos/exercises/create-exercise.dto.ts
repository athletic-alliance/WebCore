import {ExerciseType} from '../../enums/exercise-type.enum';

export interface CreateExerciseDto {
    name: string
    exerciseType: ExerciseType
}
