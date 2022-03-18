import { CreateExerciseDto } from '../dtos/exercises/create-exercise.dto'
import { ExerciseDto } from '../dtos/exercises/exercise.dto'
import instance from '../services/api.service'

export const createExercise = async (
    exercise: CreateExerciseDto
): Promise<ExerciseDto> => {
    const response = await instance.post<ExerciseDto>(`/exercise`, exercise)
    return response.data
}

export const deleteExercise = async (id: number): Promise<void> => {
    const response = await instance.delete(`/exercise/${id}`)
    return response.data
}

export const fetchExercises = async (): Promise<ExerciseDto[]> => {
    const response = await instance.get<ExerciseDto[]>(`/exercise`)
    return response.data
}
