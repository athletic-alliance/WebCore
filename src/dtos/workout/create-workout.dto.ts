import { ExerciseInRoundDto } from '../exercises/exercise-in-round.dto'
import { WorkoutType } from '../../enums/workout-type.enum'

export interface CreateWorkoutDto {
    name: string
    description: string
    type: WorkoutType
    timeLimit: number
    exercises: ExerciseInRoundDto[]
}
