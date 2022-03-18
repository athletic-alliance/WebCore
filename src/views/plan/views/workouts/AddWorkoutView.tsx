import React, { useState } from 'react'
import clsx from 'clsx'
import Select from 'react-select'

import { SingleValue } from 'react-select/dist/declarations/src/types'
import { nanoid } from 'nanoid'
import { useMutation } from 'react-query'
import { XIcon } from '@heroicons/react/outline'
import { WorkoutType } from '../../../../enums/workout-type.enum'
import { CreateWorkoutDto } from '../../../../dtos/workout/create-workout.dto'
import { createWorkout } from '../../../../adapter'
import { notifyError, notifySuccess } from '../../../../notifications'
import { WorkoutExerciseDetails } from './components/WorkoutExerciseDetails'
import { AddWorkoutExerciseModal } from './components/AddWorkoutExerciseModal'
import {
    ExerciseDetailsDto,
    ExerciseDto,
} from '../../../../dtos/exercises/exercise.dto'
import { ExerciseInRoundDto } from '../../../../dtos/exercises/exercise-in-round.dto'
import { WorkoutRoundDto } from '../../../../dtos/workout/workout-round.dto'

interface WorkoutTypeOption {
    value: WorkoutType
    label: string
}

const options: WorkoutTypeOption[] = [
    { value: WorkoutType.EMOM, label: 'EMOM' },
    { value: WorkoutType.ForTime, label: 'For Time' },
    { value: WorkoutType.AMRAP, label: 'AMRAP' },
]

export const AddWorkoutsViews = (): JSX.Element => {
    const [workoutToSave, setWorkoutToSave] = useState<CreateWorkoutDto>({
        name: 'Workout',
        description: 'Workout',
        type: WorkoutType.ForTime,
        timeLimit: 60,
        exercises: [],
    })
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [timeLimit, setTimeLimit] = useState<number>(0)
    const [selectedWorkoutType, setSelectedWorkoutType] =
        useState<WorkoutTypeOption>({
            value: WorkoutType.ForTime,
            label: 'For Time',
        })
    const [rounds, setRounds] = useState<WorkoutRoundDto[]>([])
    const [selectedRound, setSelectedRound] = useState<number>(0)
    const [exerciseSelectionModalOpen, setExerciseSelectionModalOpen] =
        useState<boolean>(false)

    const saveWorkoutMutation = useMutation(
        (createWorkoutDto: CreateWorkoutDto) => createWorkout(createWorkoutDto),
        {
            onSuccess: () => {
                notifySuccess('Workout erstellt')
            },
            onError: () => {
                notifyError('Workout konnte nicht erstellt werden')
            },
        }
    )

    const saveWorkout = (): void => {
        const allExercises = rounds.map(
            (round: WorkoutRoundDto) => round.exercises
        )
        const combinedArray: ExerciseInRoundDto[] = []
        allExercises.forEach((exercises: ExerciseInRoundDto[]) =>
            combinedArray.push(...exercises)
        )

        const workout = {
            name,
            description: '',
            timeLimit,
            type: selectedWorkoutType.value,
            exercises: combinedArray,
        }

        setWorkoutToSave(workout)
        saveWorkoutMutation.mutate(workout)
    }

    const getStyle = (): string => {
        return clsx({
            'border rounded-md p-5 shadow-sm mb-3': true,
        })
    }

    const onNameChanged = (workoutName: string): void => {
        setName(workoutName)
    }

    const onDescriptionChanged = (workoutDescription: string): void => {
        setDescription(workoutDescription)
    }

    const onTimeLimitChanged = (limit: number): void => {
        setTimeLimit(limit)
    }

    const addExerciseToRound = (
        exercise: ExerciseDto,
        details: ExerciseDetailsDto
    ): void => {
        const currentRound = rounds[selectedRound - 1]
        const exercises = currentRound.exercises ? currentRound.exercises : []
        const exerciseInRound: ExerciseInRoundDto = {
            exerciseId: exercise.id,
            name: exercise.name,
            type: exercise.type,
            round: selectedRound,
            order: exercises.length + 1,
            details,
        }
        exercises.push(exerciseInRound)

        currentRound.exercises = exercises
        setExerciseSelectionModalOpen(false)
    }

    const removeRound = (index: number): void => {
        setRounds([...rounds.slice(0, index), ...rounds.slice(index + 1)])
    }

    const removeExerciseFromRound = (
        roundIndex: number,
        exerciseIndex: number
    ): void => {
        const newRounds = [...rounds]
        newRounds[roundIndex].exercises = [
            ...newRounds[roundIndex].exercises.slice(0, exerciseIndex),
            ...newRounds[roundIndex].exercises.slice(exerciseIndex + 1),
        ]
        setRounds(newRounds)
    }

    const handleWorkoutTypeChanged = (
        newValue: SingleValue<WorkoutTypeOption>
    ): void => {
        if (newValue) {
            setSelectedWorkoutType({
                value: newValue.value,
                label: newValue.label,
            })
        }
    }

    return (
        <>
            <AddWorkoutExerciseModal
                isOpen={exerciseSelectionModalOpen}
                onCancel={() => setExerciseSelectionModalOpen(false)}
                onConfirm={(
                    selectedExercise: ExerciseDto,
                    details: ExerciseDetailsDto
                ) => addExerciseToRound(selectedExercise, details)}
            />
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <div>
                                {rounds.map(
                                    (round: WorkoutRoundDto, idx: number) => (
                                        <div
                                            key={nanoid()}
                                            className={getStyle()}
                                            onClick={() =>
                                                setSelectedRound(idx + 1)
                                            }
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="mr-3 font-medium text-gray-700 text-sm">
                                                    Runde {idx + 1}
                                                </div>
                                                <div
                                                    className="flex cursor-pointer items-center text-red-500 hover:text-red-700 "
                                                    onClick={() =>
                                                        removeRound(idx)
                                                    }
                                                >
                                                    <div className="font-medium text-sm">
                                                        Löschen
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div>
                                                    {round.exercises?.map(
                                                        (
                                                            exercise: ExerciseInRoundDto,
                                                            exerciseIndex: number
                                                        ) => (
                                                            <div
                                                                className="flex items-center py-1"
                                                                key={nanoid()}
                                                            >
                                                                <div
                                                                    className="mr-3"
                                                                    onClick={() =>
                                                                        removeExerciseFromRound(
                                                                            idx,
                                                                            exerciseIndex
                                                                        )
                                                                    }
                                                                >
                                                                    <XIcon className="h-5 w-5" />
                                                                </div>
                                                                <div>
                                                                    <WorkoutExerciseDetails
                                                                        key={nanoid()}
                                                                        exercise={
                                                                            exercise
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <div
                                                    className="mt-3 flex w-48 cursor-pointer rounded-md p-1 text-sm"
                                                    onClick={() =>
                                                        setExerciseSelectionModalOpen(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <div className="">
                                                        Übung hinzufügen
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <button
                                onClick={() =>
                                    setRounds(
                                        rounds.concat({
                                            exercises: [],
                                        })
                                    )
                                }
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Runde hinzufügen
                            </button>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label
                                            htmlFor="workout-name"
                                            className="block font-medium text-gray-700 text-sm"
                                        >
                                            Name
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) =>
                                                    onNameChanged(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                name="workout-name"
                                                id="workout-name"
                                                className="block w-full flex-1 rounded-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Name des Workouts"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label
                                            htmlFor="workout-timelimit"
                                            className="block font-medium text-gray-700 text-sm"
                                        >
                                            Zeitlimit
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) =>
                                                    onTimeLimitChanged(
                                                        +e.target.value
                                                    )
                                                }
                                                type="number"
                                                name="workout-timelimit"
                                                id="workout-timelimit"
                                                className="block w-full flex-1 rounded-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Zeitlimit"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="type"
                                        className="block font-medium text-gray-700 text-sm"
                                    >
                                        Typ
                                    </label>
                                    <div className="mt-1">
                                        <Select
                                            placeholder="Typ"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    borderRadius: '2px',
                                                    fontSize: '12px',
                                                }),
                                                input: (base) => ({
                                                    ...base,
                                                    fontSize: '12px',
                                                    'input:focus': {
                                                        boxShadow: 'none',
                                                    },
                                                }),
                                                option: (provided) => ({
                                                    ...provided,
                                                    fontSize: '12px',
                                                    color: 'black',
                                                }),
                                            }}
                                            options={options}
                                            value={selectedWorkoutType}
                                            onChange={handleWorkoutTypeChanged}
                                            getOptionLabel={(
                                                type: WorkoutTypeOption
                                            ) => type.label}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block font-medium text-gray-700 text-sm"
                                    >
                                        Beschreibung
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            onChange={(
                                                e: React.ChangeEvent<HTMLTextAreaElement>
                                            ) =>
                                                onDescriptionChanged(
                                                    e.target.value
                                                )
                                            }
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Zusätzliche Informationen zum Workout"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    onClick={saveWorkout}
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Speichern
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
