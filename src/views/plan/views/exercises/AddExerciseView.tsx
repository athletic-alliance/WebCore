import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { DocumentDuplicateIcon } from '@heroicons/react/outline'
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
        <div className="rounded-md bg-white">
            <div className="flex items-center justify-between rounded-t-lg border border-slate-300 border-b-slate-200 bg-slate-100 p-3">
                <h1 className="text-md font-light text-slate-800">
                    Neue Übung erstellen
                </h1>
            </div>
            <div className="p-3 shadow">
                <AddExerciseForm formSubmitted={saveExercise} />
            </div>
        </div>
    )
}
