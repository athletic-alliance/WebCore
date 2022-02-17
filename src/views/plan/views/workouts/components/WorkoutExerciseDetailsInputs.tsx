import React, {ChangeEvent} from 'react'

type WorkoutExerciseDetailsInputProps = {
    exercise: any;
    onDetailsChanged: (value: number) => void;
}

export const WorkoutExerciseDetailsInputs = ({
                                                 exercise,
                                                 onDetailsChanged,
                                             }: WorkoutExerciseDetailsInputProps) => {

    const renderNone = () => {
        return <div>none</div>;
    }

    const onRepsChanged = (e: number) => {
        const exerciseDetails = {...exercise.details};
        exerciseDetails.repetitions = e;
        onDetailsChanged(exerciseDetails);
    }

    const onWeightChanged = (e: number) => {
        const exerciseDetails = {...exercise.details};
        exerciseDetails.weight = e;
        onDetailsChanged(exerciseDetails);
    }

    const onDistanceChanged = (e: number) => {
        const exerciseDetails = {...exercise.details};
        exerciseDetails.distance = e;
        onDetailsChanged(exerciseDetails);
    }

    const renderBodyweight = () => {
        return <div className={'flex'}>
            <div>
                <label htmlFor="reps" className="block text-sm font-medium text-gray-700">
                    Wiederholungen
                </label>
                <div className="mt-1 relative rounded-md">
                    <div>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onRepsChanged(+e.target.value)}
                            type="number"
                            name="reps"
                            id="reps"
                            className="p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>;
    }

    const renderStrength = () => {
        return <div className={'flex'}>
            <div className={'mr-2'}>
                <label htmlFor="reps" className="block text-sm font-medium text-gray-700">
                    Wiederholungen
                </label>
                <div className="mt-1 relative rounded-md">
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onRepsChanged(+e.target.value)}
                        type="number"
                        name="reps"
                        id="reps"
                        className="p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Gewicht
                </label>
                <div className="mt-1 relative rounded-md">
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onWeightChanged(+e.target.value)}
                        type="number"
                        name="weight"
                        id="weight"
                        className="p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                    />
                </div>
            </div>
        </div>;
    }

    const renderCardio = () => {
        return <div className={'flex'}>
            <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                    Distanz
                </label>
                <div className="mt-1 relative rounded-md">
                    <div>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onDistanceChanged(+e.target.value)}
                            type="number"
                            name="distance"
                            id="distance"
                            className="p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>;
    }

    const renderInputs = (type: string) => {
        switch (type) {
            case 'None':
                return renderNone();
            case 'Cardio':
                return renderCardio();
            case 'Strength':
                return renderStrength();
            case 'Bodyweight':
                return renderBodyweight();
        }
    }
    return (<>{renderInputs(exercise.type)}</>);
}
