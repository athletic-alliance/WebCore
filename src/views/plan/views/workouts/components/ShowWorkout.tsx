import React from "react";
import { ExerciseType } from "../../../../../enums/exercise-type.enum";

type ShowWorkoutProps = {
  workout: any;
};

export const ShowWorkout = ({ workout }: ShowWorkoutProps) => {
  const renderDetails = (exercise: any) => {
    switch (+ExerciseType[exercise.exercise.type]) {
      case ExerciseType.None:
        return <>{exercise.exercise.name}</>;
      case ExerciseType.Cardio:
        return (
          <>
            {exercise.details.repetitions}m {exercise.exercise.name}
          </>
        );
      case ExerciseType.Strength:
        return (
          <>
            {exercise.details.repetitions} {exercise.exercise.name} mit{" "}
            {exercise.details.weight} kg
          </>
        );
      case ExerciseType.Bodyweight:
        return (
          <>
            {exercise.details.repetitions} {exercise.exercise.name}
          </>
        );
    }
  };

  return (
    <div>
      <div>
        <div className={"mb-2"}>
          <h2 className={"text-1xl font-sans font-light mb-2"}>{workout?.type}</h2>
          <h1 className={"font-sans font-light text-5xl text-blue-500"}>{workout?.name}</h1>
        </div>
        <div className={'text-slate-500 mb-3'}>
          {workout?.description}
        </div>
        <div>Timelimit {workout?.timeLimit}</div>
      </div>
      <div className={"mt-4 w-full"}>
        {workout?.exercises.map((exercise: any, index: number) => (
          <div
            key={index}
            className={"mb-2 w-full rounded-md border border-gray-200 p-3"}
          >
            <div className={"mb-1 font-bold"}>Runde {index + 1}</div>
            {renderDetails(exercise)}
          </div>
        ))}
      </div>
    </div>
  );
};
