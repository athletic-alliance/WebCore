import { WorkoutType } from '../../enums/workout-type.enum'
import { ViewWorkoutRoundDto } from './workout-round-exercise.dto'

export interface WorkoutDto {
    id: number
    name: string
    type: WorkoutType
    timeLimit: number
    description: string
    rounds: ViewWorkoutRoundDto[]
}
