import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { AddExerciseForm } from './components/AddExerciseForm'
import { createExercise } from '../../../../adapter'
import { CreateExerciseDto } from '../../../../dtos/exercises/create-exercise.dto'
import { notifyError, notifySuccess } from '../../../../notifications'

export const AddExerciseView = (): JSX.Element => {
    const navigation = useNavigate()

    const createExerciseMutation = useMutation(
        (createExerciseDto: CreateExerciseDto) =>
            createExercise(createExerciseDto),
        {
            onSuccess: () => {
                notifySuccess('Übung erstellt')
                navigation('/plan/exercise/all')
            },
            onError: () => {
                notifyError('Übung konnte nicht erstellt werden')
            },
        }
    )

    const saveExercise = (exerciseValues: CreateExerciseDto): void => {
        createExerciseMutation.mutate(exerciseValues)
    }

    return (
        <div>
            <h1 className="mb-5 text-5xl">Neuen Übung erstellen</h1>
            <AddExerciseForm formSubmitted={saveExercise} />
        </div>
    )
}
