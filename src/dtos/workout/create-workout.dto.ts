export interface CreateWorkoutDto {
  name: string;
  description: string;
  type: number;
  timeLimit: number;
  exercises: [];
}
