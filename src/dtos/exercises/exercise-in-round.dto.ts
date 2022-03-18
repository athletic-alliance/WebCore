import { ExerciseType } from '../../enums/exercise-type.enum'
import { ExerciseDetailsDto } from './exercise.dto'

export interface ExerciseInRoundDto {
    exerciseId: number
    name: string
    type: ExerciseType
    round: number
    order: number
    details: ExerciseDetailsDto
}
