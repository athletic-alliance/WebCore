import React, { useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import {
  ExerciseDetailsDto,
  ExerciseDto,
} from "../../../../dtos/exercises/exercise.dto";
import { AddWorkoutExerciseModal } from "./components/AddWorkoutExerciseModal";
import clsx from "clsx";
import { WorkoutExerciseDetails } from "./components/WorkoutExerciseDetails";
import tw from "twin.macro";
import ReactSelect from "react-select";

import { WorkoutType } from "../../../../enums/workout-type.enum";
import { useMutation } from "react-query";
import { CreateWorkoutDto } from "../../../../dtos/workout/create-workout.dto";
import { createWorkout } from "../../../../adapter/workout.adapter";
import { notifyError, notifySuccess } from "../../../../notifications";

const Styled = {
  Select: tw(ReactSelect)`rounded-lg text-center border-2`,
};

export const AddWorkoutsViews = () => {
  const [workoutToSave, setWorkoutToSave] = useState<any>({});
  const [name, setName] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<any>(null);
  const [rounds, setRounds] = useState<any>([]);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [exerciseSelectionModalOpen, setExerciseSelectionModalOpen] =
    useState<boolean>(false);

  const saveWorkoutMutation = useMutation(
    (createWorkoutDto: CreateWorkoutDto) => createWorkout(createWorkoutDto),
    {
      onSuccess: () => {
        notifySuccess("Workout erstellt");
      },
      onError: () => {
        notifyError("Workout konnte nicht erstellt werden");
      },
    }
  );

  const saveWorkout = () => {
    const allExercises = rounds.map((round: any) => round.exercises);
    let combinedArray: any = [];
    allExercises.forEach((exercises: any) => combinedArray.push(...exercises));

    const workout = {
      name,
      description: "",
      timeLimit,
      type: selectedWorkoutType.value,
      exercises: combinedArray,
    };
    setWorkoutToSave(workout);
    saveWorkoutMutation.mutate(workout);
  };

  const getStyle = (index: number) => {
    return clsx({
      "border rounded-md p-5 mt-2": true,
      "border-blue-300 border-2": selectedRound - 1 === index,
      "border-gray-100 border-2": selectedRound - 1 !== index,
    });
  };

  const onNameChanged = (workoutName: string) => {
    setName(workoutName);
  };

  const onTimeLimitChanged = (timeLimit: number) => {
    setTimeLimit(timeLimit);
  };

  const addExerciseToRound = (
    exercise: ExerciseDto,
    details: ExerciseDetailsDto
  ) => {
    const currentRound = rounds[selectedRound - 1];
    const exercises = currentRound.exercises ? currentRound.exercises : [];

    const exerciseInRound: any = {};
    exerciseInRound.exerciseId = exercise.id;
    exerciseInRound.name = exercise.name;
    exerciseInRound.type = exercise.type;
    exerciseInRound.round = selectedRound;
    exerciseInRound.order = exercises.length + 1;
    exerciseInRound.details = details;
    exercises.push(exerciseInRound);

    currentRound.exercises = exercises;
    setExerciseSelectionModalOpen(false);
  };

  const removeRound = (index: number) => {
    setRounds([...rounds.slice(0, index), ...rounds.slice(index + 1)]);
  };

  const removeExerciseFromRound = (
    roundIndex: number,
    exerciseIndex: number
  ) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].exercises = [
      ...newRounds[roundIndex].exercises.slice(0, exerciseIndex),
      ...newRounds[roundIndex].exercises.slice(exerciseIndex + 1),
    ];
    setRounds(newRounds);
  };

  const options = [
    { value: WorkoutType.EMOM, label: "EMOM" },
    { value: WorkoutType.ForTime, label: "For Time" },
    { value: WorkoutType.AMRAP, label: "AMRAP" },
  ];

  const handleWorkoutTypeChanged = (selectedItem: any, event: any) => {
    setSelectedWorkoutType(selectedItem);
  };

  return (
    <div className={"w-full p-5"}>
      <AddWorkoutExerciseModal
        isOpen={exerciseSelectionModalOpen}
        onCancel={() => setExerciseSelectionModalOpen(false)}
        onConfirm={(
          selectedExercise: ExerciseDto,
          details: ExerciseDetailsDto
        ) => addExerciseToRound(selectedExercise, details)}
      />
      <div className={"w-full"}>
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 text-sm"
          >
            Name
          </label>
          <div className="relative mt-1 w-full rounded-md">
            <input
              onChange={(e: any) => onNameChanged(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="w-full rounded rounded-md border border-gray-300 p-1 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 text-sm"
          >
            Zeitlimit (in Minuten)
          </label>
          <div className="relative mt-1 w-full rounded-md">
            <input
              type="number"
              name="name"
              id="name"
              onChange={(e: any) => onTimeLimitChanged(e.target.value)}
              className="w-full rounded rounded-md border border-gray-300 p-1 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 text-sm"
          >
            Typ
          </label>
          <Styled.Select
            options={options}
            value={selectedWorkoutType}
            onChange={handleWorkoutTypeChanged}
            getOptionLabel={(exercise: any) => exercise.label}
            getOptionValue={(exercise: any) => exercise}
          />
        </div>
        <div className={"mt-5"}>
          <div
            className={
              "cursor-pointer rounded-md border border-gray-300 p-2 text-sm hover:border-gray-400 hover:bg-gray-200"
            }
            onClick={() => setRounds(rounds.concat({}))}
          >
            Runde hinzufügen
          </div>
          <div className={"mt-3"}>
            {rounds.map((round: any, idx: number) => (
              <div
                key={idx}
                className={getStyle(idx)}
                onClick={() => setSelectedRound(idx + 1)}
              >
                <div className={"mb-3 flex items-center justify-between"}>
                  <div className={"mr-3"}>Runde {idx + 1}</div>
                  <div
                    className={"flex items-center"}
                    onClick={() => removeRound(idx)}
                  >
                    <div>
                      <XIcon className={"h-5 w-5"} />
                    </div>
                    <div>Löschen</div>
                  </div>
                </div>
                <div className={""}>
                  <div>
                    {round.exercises?.map(
                      (exercise: any, exerciseIndex: number) => (
                        <div
                          className={"flex items-center py-1"}
                          key={exerciseIndex}
                        >
                          <div
                            className={"mr-3"}
                            onClick={() =>
                              removeExerciseFromRound(idx, exerciseIndex)
                            }
                          >
                            <XIcon className={"h-5 w-5"} />
                          </div>
                          <div>
                            <WorkoutExerciseDetails
                              key={exerciseIndex}
                              exercise={exercise}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div
                    className={
                      "mt-3 flex w-48 cursor-pointer rounded-md p-1 text-sm"
                    }
                    onClick={() => setExerciseSelectionModalOpen(true)}
                  >
                    <div>
                      <PlusIcon className={"h-5 w-5"} />
                    </div>
                    <div>Übung hinzufügen</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div onClick={saveWorkout}>
          <div
            className={
              "mt-2 cursor-pointer rounded-md border border-blue-800 bg-blue-500 p-3"
            }
          >
            Speichern
          </div>
        </div>
        <div>
          <pre>{JSON.stringify(workoutToSave, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
