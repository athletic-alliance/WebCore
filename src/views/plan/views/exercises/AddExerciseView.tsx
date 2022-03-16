import React from 'react';
import {AddExerciseForm} from './components/AddExerciseForm';
import {useMutation} from 'react-query';
import {createExercise} from '../../../../adapter';
import {CreateExerciseDto} from '../../../../dtos/exercises/create-exercise.dto';
import {notifyError, notifySuccess} from '../../../../notifications';
import {useNavigate} from 'react-router';

export const AddExerciseView = () => {
    const navigation = useNavigate();

    const createExerciseMutation = useMutation(
        (createExerciseDto: CreateExerciseDto) => createExercise(createExerciseDto),
        {
            onSuccess: () => {
                notifySuccess('Übung erstellt');
                navigation('/plan/exercise/all');
            },
            onError: () => {
                notifyError('Übung konnte nicht erstellt werden');
            },
        }
    );

    const saveExercise = (exerciseValues: CreateExerciseDto) => {
        createExerciseMutation.mutate(exerciseValues);

    };

    return <div>
        <h1 className={'text-5xl mb-5'}>Neuen Übung erstellen</h1>
        <AddExerciseForm formSubmitted={saveExercise}/>
    </div>
};
