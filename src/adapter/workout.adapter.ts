import instance from '../services/api.service';
import {WorkoutDto} from '../dtos/workout/workout.dto';

export const fetchWorkouts = async (): Promise<WorkoutDto[]> => {
    const response = await instance.get<WorkoutDto[]>(`/workout`);
    return response.data;
}

export const deleteWorkout = async (id: number): Promise<void> => {
    const response = await instance.delete(`/workout/${id}`);
    return response.data;
};
