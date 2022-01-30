import {ExerciseType} from '../../enums/exercise-type.enum';

export interface ExerciseDto {
    id: number
    name: string
    type: ExerciseType
}
