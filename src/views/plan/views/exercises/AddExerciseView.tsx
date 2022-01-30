import React from 'react'
import {AddExerciseForm} from './components/AddExerciseForm';
import {useMutation} from 'react-query';
import {createExercise} from '../../../../adapter/exercise.adapter';
import {CreateExerciseDto} from '../../../../dtos/exercises/create-exercise.dto';
import {notifyError, notifySuccess} from '../../../../notifications';

type AddExerciseViewProps = {
    formSubmitted: (values: any) => void;
}

export const AddExerciseView = ({formSubmitted}: AddExerciseViewProps) => {

    const createExerciseMutation = useMutation((createExerciseDto: CreateExerciseDto) => createExercise(createExerciseDto),
        {
            onSuccess: () => {
                notifySuccess('Übung erstellt');
            },
            onError: () => {
                notifyError('Übung konnte nicht erstellt werden');
            },
        });

    const saveExercise = (exerciseValues: CreateExerciseDto) => {
        createExerciseMutation.mutate(exerciseValues);
    }

    return (<AddExerciseForm formSubmitted={saveExercise}/>)
}
