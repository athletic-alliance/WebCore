import React from 'react'
import {ExerciseType} from '../../../../../enums/exercise-type.enum';

type ShowWorkoutProps = {
    workout: any
}

export const ShowWorkout = ({workout}: ShowWorkoutProps) => {

    const renderDetails = (exercise: any) => {
        switch (+ExerciseType[exercise.exercise.type]) {
            case ExerciseType.None:
                return (<>{exercise.exercise.name}</>)
            case ExerciseType.Cardio:
                return (<>{exercise.details.repetitions}m {exercise.exercise.name}</>)
            case ExerciseType.Strength:
                return (<>{exercise.details.repetitions} {exercise.exercise.name} mit {exercise.details.weight} kg</>)
            case ExerciseType.Bodyweight:
                return (<>{exercise.details.repetitions} {exercise.exercise.name}</>)
        }
    }

    return (<div>
        <div>
            <div className={'mb-2'}>
                <h2 className={'text-1xl font-sans font-light'}>{workout?.type}</h2>
                <h1 className={'text-5xl font-sans font-light'}>{workout?.name}</h1>
            </div>
            <div>
                <div>{workout?.description}</div>
            </div>
            <div>Timelimit {workout?.timeLimit}</div>
        </div>
        <div className={'w-full mt-4'}>
            {workout?.exercises.map((exercise: any, index: number) =>
                <div key={index} className={'border border-gray-200 w-full rounded-md mb-2 p-3'}>
                    <div className={'font-bold mb-1'}>Runde {index + 1}</div>
                    {renderDetails(exercise)}
                </div>
            )}
        </div>
    </div>);
}
