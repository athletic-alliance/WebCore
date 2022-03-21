import { WorkoutType } from '../../enums/workout-type.enum'
import { WorkoutRoundExerciseDto } from './workout-round-exercise.dto'

export interface WorkoutDto {
    id: number
    name: string
    type: WorkoutType
    timeLimit: number
    description: string
    exercises: WorkoutRoundExerciseDto[]
}
