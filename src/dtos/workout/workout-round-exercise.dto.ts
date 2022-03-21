import { ExerciseDetailsDto, ExerciseDto } from '../exercises/exercise.dto'

export interface WorkoutRoundExerciseDto {
    id: number
    exercise: ExerciseDto
    details: ExerciseDetailsDto
    exerciseId: number
    order: number
    round: number
}
