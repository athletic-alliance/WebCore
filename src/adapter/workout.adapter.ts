import instance from "../services/api.service";
import { WorkoutDto } from "../dtos/workout/workout.dto";
import { CreateWorkoutDto } from "../dtos/workout/create-workout.dto";

export const fetchWorkout = async (workoutId: number): Promise<WorkoutDto> => {
  const response = await instance.get<WorkoutDto>(`/workout/${workoutId}`);
  return response.data;
};

export const fetchWorkouts = async (includeDetails: boolean): Promise<WorkoutDto[]> => {
  const response = await instance.get<WorkoutDto[]>(`/workout?includeDetails=${includeDetails}`);
  return response.data;
};

export const deleteWorkout = async (id: number): Promise<void> => {
  const response = await instance.delete(`/workout/${id}`);
  return response.data;
};

export const createWorkout = async (createWorkoutDto: CreateWorkoutDto) => {
  const response = await instance.post("/workout", createWorkoutDto);
  return response.data;
};
