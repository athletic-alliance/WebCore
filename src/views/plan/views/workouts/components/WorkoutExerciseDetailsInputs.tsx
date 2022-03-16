import React, { ChangeEvent } from 'react'

type WorkoutExerciseDetailsInputProps = {
    exercise: any
    onDetailsChanged: (value: number) => void
}

export const WorkoutExerciseDetailsInputs = ({
    exercise,
    onDetailsChanged,
}: WorkoutExerciseDetailsInputProps): JSX.Element => {
    const renderNone = (): JSX.Element => {
        return <div>none</div>
    }

    const onRepsChanged = (e: number): void => {
        const exerciseDetails = { ...exercise.details }
        exerciseDetails.repetitions = e
        onDetailsChanged(exerciseDetails)
    }

    const onWeightChanged = (e: number): void => {
        const exerciseDetails = { ...exercise.details }
        exerciseDetails.weight = e
        onDetailsChanged(exerciseDetails)
    }

    const onDistanceChanged = (e: number): void => {
        const exerciseDetails = { ...exercise.details }
        exerciseDetails.distance = e
        onDetailsChanged(exerciseDetails)
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
                                    onRepsChanged(+e.target.value)
                                }
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
                                onRepsChanged(+e.target.value)
                            }
                            type="number"
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
                                onWeightChanged(+e.target.value)
                            }
                            type="number"
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
                                    onDistanceChanged(+e.target.value)
                                }
                                type="number"
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

    const renderInputs = (type: string): JSX.Element => {
        switch (type) {
            case 'None':
                return renderNone()
            case 'Cardio':
                return renderCardio()
            case 'Strength':
                return renderStrength()
            case 'Bodyweight':
                return renderBodyweight()
            default:
                return renderNone()
        }
    }
    return <>{renderInputs(exercise.type)}</>
}
