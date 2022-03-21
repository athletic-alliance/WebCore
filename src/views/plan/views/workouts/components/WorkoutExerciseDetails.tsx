import React from 'react'
import { ExerciseType } from '../../../../../enums/exercise-type.enum'

export interface WorkoutExerciseDetail {
    exerciseId: number
    name: string
    round: number
    order: number
    type: ExerciseType
    details: {
        weight: number
        distance: number
        repetitions: number
    }
}

type WorkoutExerciseDetailsProps = {
    exercise: WorkoutExerciseDetail
}

export const WorkoutExerciseDetails = ({
    exercise,
}: WorkoutExerciseDetailsProps): JSX.Element => {
    const renderDetails = (
        exerciseDetail: WorkoutExerciseDetail
    ): JSX.Element => {
        switch (+ExerciseType[exerciseDetail.type]) {
            case ExerciseType.None:
                return <span>{exerciseDetail.name}</span>
            case ExerciseType.Cardio:
                return (
                    <>
                        {exerciseDetail.details.distance}m {exerciseDetail.name}
                    </>
                )
            case ExerciseType.Strength:
                return (
                    <>
                        {exerciseDetail.details.repetitions}{' '}
                        {exerciseDetail.name} mit{' '}
                        {exerciseDetail.details.weight} kg
                    </>
                )
            case ExerciseType.Bodyweight:
                return (
                    <>
                        {exerciseDetail.details.repetitions}{' '}
                        {exerciseDetail.name}
                    </>
                )
            default:
                return <div>Not set</div>
        }
    }

    return <div>{renderDetails(exercise)}</div>
}
