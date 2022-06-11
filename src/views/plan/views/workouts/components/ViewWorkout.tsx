import React from 'react'

import { nanoid } from 'nanoid'
import { ExerciseType } from '../../../../../enums/exercise-type.enum'
import { WorkoutDto } from '../../../../../dtos/workout/workout.dto'
import { ViewWorkoutRoundDto } from '../../../../../dtos/workout/workout-round-exercise.dto'
import { ViewWorkoutRoundExercisesDto } from '../../../../../dtos/workout/ViewWorkoutRoundExercises'

type ShowWorkoutProps = {
    workout: WorkoutDto
}

export const ViewWorkout = ({ workout }: ShowWorkoutProps): JSX.Element => {
    const renderDetails = (
        exercise: ViewWorkoutRoundExercisesDto
    ): JSX.Element => {
        switch (+ExerciseType[exercise.exercise.type]) {
            case ExerciseType.None:
                return <span>{exercise.exercise.name}</span>
            case ExerciseType.Cardio:
                return (
                    <>
                        {exercise.details.repetitions}m {exercise.exercise.name}
                    </>
                )
            case ExerciseType.Strength:
                return (
                    <>
                        {exercise.details.repetitions} {exercise.exercise.name}{' '}
                        mit {exercise.details.weight} kg
                    </>
                )
            case ExerciseType.Bodyweight:
                return (
                    <>
                        {exercise.details.repetitions} {exercise.exercise.name}
                    </>
                )
            default:
                return <div>Not Set</div>
        }
    }

    return (
        <div>
            <div>
                <div className="mb-2">
                    <h2 className="text-1xl mb-2 font-sans font-light">
                        {workout?.type}
                    </h2>
                    <h1 className="font-sans font-light text-blue-500 text-5xl">
                        {workout?.name}
                    </h1>
                </div>
                <div className="mb-3 text-slate-500">
                    {workout?.description}
                </div>
                <div>Timelimit {workout?.timeLimit}</div>
            </div>
            <div className="mt-4 w-full">
                {workout?.rounds.map(
                    (round: ViewWorkoutRoundDto, index: number) => (
                        <div
                            key={nanoid()}
                            className="mb-2 w-full rounded-md border border-gray-200 bg-white p-3 shadow shadow-sm"
                        >
                            <div className="mb-1 font-bold">
                                Runde {index + 1}
                            </div>
                            {round.exercises.map(
                                (ex: ViewWorkoutRoundExercisesDto) => {
                                    return (
                                        <div className="pl-1" key={nanoid()}>
                                            {renderDetails(ex)}
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
