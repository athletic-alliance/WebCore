import React from "react";
import { AddExerciseForm } from "./components/AddExerciseForm";
import { useMutation } from "react-query";
import { createExercise } from "../../../../adapter";
import { CreateExerciseDto } from "../../../../dtos/exercises/create-exercise.dto";
import { notifyError, notifySuccess } from "../../../../notifications";
import { useNavigate } from "react-router";

export const AddExerciseView = () => {
  const navigation = useNavigate();

  const createExerciseMutation = useMutation(
    (createExerciseDto: CreateExerciseDto) => createExercise(createExerciseDto),
    {
      onSuccess: () => {
        notifySuccess("Übung erstellt");
      },
      onError: () => {
        notifyError("Übung konnte nicht erstellt werden");
      },
    }
  );

  const saveExercise = (exerciseValues: CreateExerciseDto) => {
    createExerciseMutation.mutate(exerciseValues);
    navigation("/plan/exercise/all");
  };

  return <AddExerciseForm formSubmitted={saveExercise} />;
};
