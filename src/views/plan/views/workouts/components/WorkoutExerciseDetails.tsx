import React from "react";
import { ExerciseType } from "../../../../../enums/exercise-type.enum";

export interface WorkoutExerciseDetail {
  exerciseId: number;
  name: string;
  round: number;
  order: number;
  type: ExerciseType;
  details: {
    weight: number;
    distance: number;
    repetitions: number;
  };
}

type WorkoutExerciseDetailsProps = {
  exercise: WorkoutExerciseDetail;
};

export const WorkoutExerciseDetails = ({
  exercise,
}: WorkoutExerciseDetailsProps) => {
  const renderDetails = (exercise: WorkoutExerciseDetail) => {
    switch (+ExerciseType[exercise.type]) {
      case ExerciseType.None:
        return <>{exercise.name}</>;
      case ExerciseType.Cardio:
        return (
          <>
            {exercise.details.distance}m {exercise.name}
          </>
        );
      case ExerciseType.Strength:
        return (
          <>
            {exercise.details.repetitions} {exercise.name} mit{" "}
            {exercise.details.weight} kg
          </>
        );
      case ExerciseType.Bodyweight:
        return (
          <>
            {exercise.details.repetitions} {exercise.name}
          </>
        );
    }
  };

  return <div>{renderDetails(exercise)}</div>;
};
