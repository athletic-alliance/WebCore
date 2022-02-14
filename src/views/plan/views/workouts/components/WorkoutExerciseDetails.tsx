import React from 'react';
import {ExerciseType} from '../../../../../enums/exercise-type.enum';
import {WorkoutExerciseDetailsInputs} from './WorkoutExerciseDetailsInputs';

export interface WorkoutExerciseDetail {
    exerciseId: number;
    name: string;
    round: number;
    order: number;
    type: ExerciseType;
    details: {
        weight: number;
        distance: number;
        repetitions: number;
    }
}

type WorkoutExerciseDetailsProps = {
    details: WorkoutExerciseDetail;
}

export const WorkoutExerciseDetails = (workoutDetails: WorkoutExerciseDetailsProps) => {

    return (<div>
        <div>{workoutDetails.details.name}</div>
        <WorkoutExerciseDetailsInputs type={workoutDetails.details.type} details={workoutDetails.details}/>
    </div>);
}
