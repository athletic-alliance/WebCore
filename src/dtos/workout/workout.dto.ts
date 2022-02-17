import { WorkoutType } from "../../enums/workout-type.enum";

export interface WorkoutDto {
  id: number;
  name: string;
  type: WorkoutType;
  timeLimit: number;
  description: string;
  exercises: any;
}
