import { Dialog, Transition } from '@headlessui/react'
import React, { ChangeEvent, Fragment, useRef, useState } from 'react'
import Select, { InputActionMeta } from 'react-select'
import debounce from 'lodash.debounce'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select/dist/declarations/src/types'
import { Loader } from '../../../../../shared/components/Loader'

import { fetchExercises } from '../../../../../adapter'
import {
    ExerciseDetailsDto,
    ExerciseDto,
} from '../../../../../dtos/exercises/exercise.dto'
import { ExerciseType } from '../../../../../enums/exercise-type.enum'

type ModalProps = {
    isOpen: boolean
    onConfirm: (
        selectedExercise: ExerciseDto,
        details: ExerciseDetailsDto
    ) => void
    onCancel: () => void
}

export const AddWorkoutExerciseModal = ({
    isOpen,
    onCancel,
    onConfirm,
}: ModalProps): JSX.Element => {
    const [selectedExercise, setSelectedExercise] =
        useState<ExerciseDto | null>(null)
    const [selectedReps, setSelectedReps] = useState<number>(0)
    const [selectedWeight, setSelectedWeight] = useState<number>(0)
    const [selectedDistance, setSelectedDistance] = useState<number>(0)
    const [searchText, setSearchText] = useState<string>('')
    const [inputText, setInputText] = useState<string>('')
    const setSearchTextDebounced = useRef(
        debounce((searchValue: string) => setSearchText(searchValue), 500)
    ).current

    const cancelButtonRef = useRef(null)

    const confirm = (): void => {
        if (selectedExercise) {
            const details: ExerciseDetailsDto = {
                weight: selectedWeight,
                repetitions: selectedReps,
                distance: selectedDistance,
            }
            setSelectedDistance(0)
            setSelectedReps(0)
            setSelectedWeight(0)
            onConfirm(selectedExercise, details)
        }
    }

    const cancel = (): void => {
        setSelectedExercise(null)
        onCancel()
    }

    const renderNone = (): JSX.Element => {
        return <div>none</div>
    }

    const renderBodyweight = (): JSX.Element => {
        return (
            <div className="flex">
                <div>
                    <label
                        htmlFor="reps"
                        className="block font-medium text-gray-700 text-sm"
                    >
                        Wiederholungen
                    </label>
                    <div className="relative mt-1 rounded-md">
                        <div>
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSelectedReps(+e.target.value)
                                }
                                value={selectedReps}
                                type="number"
                                name="reps"
                                id="reps"
                                className="rounded rounded-md border border-gray-300 p-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderStrength = (): JSX.Element => {
        return (
            <div className="flex">
                <div className="mr-2">
                    <label
                        htmlFor="reps"
                        className="block font-medium text-gray-700 text-sm"
                    >
                        Wiederholungen
                    </label>
                    <div className="relative mt-1 rounded-md">
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSelectedReps(+e.target.value)
                            }
                            type="number"
                            value={selectedReps}
                            name="reps"
                            id="reps"
                            className="rounded rounded-md border border-gray-300 p-1 focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="weight"
                        className="block font-medium text-gray-700 text-sm"
                    >
                        Gewicht
                    </label>
                    <div className="relative mt-1 rounded-md">
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSelectedWeight(+e.target.value)
                            }
                            type="number"
                            value={selectedWeight}
                            name="weight"
                            id="weight"
                            className="rounded rounded-md border border-gray-300 p-1 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        )
    }

    const renderCardio = (): JSX.Element => {
        return (
            <div className="flex">
                <div>
                    <label
                        htmlFor="distance"
                        className="block font-medium text-gray-700 text-sm"
                    >
                        Distanz
                    </label>
                    <div className="relative mt-1 rounded-md">
                        <div>
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSelectedDistance(+e.target.value)
                                }
                                type="number"
                                value={selectedDistance}
                                name="distance"
                                id="distance"
                                className="rounded rounded-md border border-gray-300 p-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderInputs = (type: ExerciseType): JSX.Element => {
        switch (+ExerciseType[type]) {
            case ExerciseType.None:
                return renderNone()
            case ExerciseType.Cardio:
                return renderCardio()
            case ExerciseType.Bodyweight:
                return renderBodyweight()
            case ExerciseType.Strength:
                return renderStrength()
            default:
                return <div>Not set</div>
        }
    }

    const handleExerciseChanged = (
        selectedItem: SingleValue<ExerciseDto>
    ): void => {
        setSelectedExercise(selectedItem)
    }

    const handleExerciseInputValueChanged = (
        searchValue: string,
        event: InputActionMeta
    ): void => {
        // prevent outside click from resetting inputText to ""
        if (event.action !== 'input-blur' && event.action !== 'menu-close') {
            setInputText(searchValue)
            setSearchTextDebounced(searchValue)
        }
    }

    const { data, isLoading } = useQuery('fetchExercises', fetchExercises)

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={isOpen}
                onClose={() => cancel}
            >
                <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block transform rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <div className="w-full">
                                                    <label
                                                        htmlFor="name"
                                                        className="block font-medium text-gray-700 text-sm"
                                                    >
                                                        Übung
                                                    </label>
                                                    {isLoading && <Loader />}
                                                    <Select
                                                        className="w-full"
                                                        getOptionLabel={(
                                                            exercise: ExerciseDto
                                                        ) => exercise.name}
                                                        getOptionValue={(
                                                            exercise: ExerciseDto
                                                        ) => exercise.name}
                                                        options={data}
                                                        isLoading={isLoading}
                                                        isClearable
                                                        value={selectedExercise}
                                                        placeholder="Übungen durchsuchen"
                                                        onChange={
                                                            handleExerciseChanged
                                                        }
                                                        onInputChange={
                                                            handleExerciseInputValueChanged
                                                        }
                                                        noOptionsMessage={() =>
                                                            'Keine Übung gefunden'
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    {selectedExercise &&
                                                        renderInputs(
                                                            selectedExercise.type
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 font-medium text-white shadow-sm text-base hover:bg-green-700 focus:outline-none focus:ring-0 disabled:opacity-25 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirm}
                                >
                                    Speichern
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm text-base hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={cancel}
                                    ref={cancelButtonRef}
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
