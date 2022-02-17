import React, {useState} from 'react'
import {PlusIcon, XIcon} from '@heroicons/react/outline';
import {ExerciseDetailsDto, ExerciseDto} from '../../../../dtos/exercises/exercise.dto';
import {AddWorkoutExerciseModal} from './components/AddWorkoutExerciseModal';
import clsx from 'clsx';
import {WorkoutExerciseDetails} from './components/WorkoutExerciseDetails';
import tw from 'twin.macro';
import ReactSelect from 'react-select';

import {WorkoutType} from '../../../../enums/workout-type.enum';
import {useMutation} from 'react-query';
import {CreateWorkoutDto} from '../../../../dtos/workout/create-workout.dto';
import {createWorkout} from '../../../../adapter/workout.adapter';
import {notifyError, notifySuccess} from '../../../../notifications';

const Styled = {
    Select: tw(ReactSelect)`rounded-lg text-center border-2`
};

export const AddWorkoutsViews = () => {
    const [workoutToSave, setWorkoutToSave] = useState<any>({});
    const [name, setName] = useState<string>('');
    const [timeLimit, setTimeLimit] = useState<number>(0);
    const [selectedWorkoutType, setSelectedWorkoutType] = useState<any>(null);
    const [rounds, setRounds] = useState<any>([]);
    const [selectedRound, setSelectedRound] = useState<number>(0);
    const [exerciseSelectionModalOpen, setExerciseSelectionModalOpen] = useState<boolean>(false);

    const saveWorkoutMutation = useMutation((createWorkoutDto: CreateWorkoutDto) => createWorkout(createWorkoutDto),
        {
            onSuccess: () => {
                notifySuccess('Workout erstellt')
            },
            onError: () => {
                notifyError('Workout konnte nicht erstellt werden')
            },
        });

    const saveWorkout = () => {
        const allExercises = rounds.map((round: any) => round.exercises);
        let combinedArray: any = []
        allExercises.forEach((exercises: any) => combinedArray.push(...exercises));

        const workout = {
            name,
            description: '',
            timeLimit,
            type: selectedWorkoutType.value,
            exercises: combinedArray
        }
        setWorkoutToSave(workout);
        saveWorkoutMutation.mutate(workout);
    }

    const getStyle = (index: number) => {
        return clsx({
            'border rounded-md p-5 mt-2': true,
            'border-blue-300 border-2': selectedRound - 1 === index,
            'border-gray-100 border-2': selectedRound - 1 !== index,
        });
    };

    const onNameChanged = (workoutName: string) => {
        setName(workoutName)
    }

    const onTimeLimitChanged = (timeLimit: number) => {
        setTimeLimit(timeLimit)
    }

    const addExerciseToRound = (exercise: ExerciseDto, details: ExerciseDetailsDto) => {
        const currentRound = rounds[selectedRound - 1];
        const exercises = currentRound.exercises ? currentRound.exercises : [];

        const exerciseInRound: any = {};
        exerciseInRound.exerciseId = exercise.id;
        exerciseInRound.name = exercise.name;
        exerciseInRound.type = exercise.type;
        exerciseInRound.round = selectedRound;
        exerciseInRound.order = exercises.length + 1;
        exerciseInRound.details = details;
        exercises.push(exerciseInRound);

        currentRound.exercises = exercises;
        setExerciseSelectionModalOpen(false)
    }

    const removeRound = (index: number) => {
        setRounds([
            ...rounds.slice(0, index),
            ...rounds.slice(index + 1)
        ]);
    }

    const removeExerciseFromRound = (roundIndex: number, exerciseIndex: number) => {
        const newRounds = [...rounds]
        newRounds[roundIndex].exercises = [
            ...newRounds[roundIndex].exercises.slice(0, exerciseIndex),
            ...newRounds[roundIndex].exercises.slice(exerciseIndex + 1)
        ]
        setRounds(newRounds);
    }

    const options = [
        {value: WorkoutType.EMOM, label: 'EMOM'},
        {value: WorkoutType.ForTime, label: 'For Time'},
        {value: WorkoutType.AMRAP, label: 'AMRAP'},
    ]

    const handleWorkoutTypeChanged = (selectedItem: any, event: any) => {
        setSelectedWorkoutType(selectedItem);
    };

    return (
        <div className={'p-5 w-full'}>
            <AddWorkoutExerciseModal
                isOpen={exerciseSelectionModalOpen}
                onCancel={() => setExerciseSelectionModalOpen(false)}
                onConfirm={(selectedExercise: ExerciseDto, details: ExerciseDetailsDto) => addExerciseToRound(selectedExercise, details)}/>
            <div className={'w-full'}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <div className="mt-1 relative rounded-md w-full">
                        <input
                            onChange={(e: any) => onNameChanged(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Zeitlimit (in Minuten)
                    </label>
                    <div className="mt-1 relative rounded-md w-full">
                        <input
                            type="number"
                            name="name"
                            id="name"
                            onChange={(e: any) => onTimeLimitChanged(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Typ
                    </label>
                    <Styled.Select options={options} value={selectedWorkoutType} onChange={handleWorkoutTypeChanged}
                                   getOptionLabel={(exercise: any) => exercise.label}
                                   getOptionValue={(exercise: any) => exercise}/>
                </div>
                <div className={'mt-5'}>
                    <div
                        className={'cursor-pointer border border-gray-300 rounded-md p-2 text-sm hover:bg-gray-200 hover:border-gray-400'}
                        onClick={() => setRounds(rounds.concat({}))}>Runde hinzufügen
                    </div>
                    <div className={'mt-3'}>
                        {rounds.map((round: any, idx: number) => (
                            <div key={idx} className={getStyle(idx)} onClick={() => setSelectedRound(idx + 1)}>
                                <div className={'flex justify-between items-center mb-3'}>
                                    <div className={'mr-3'}>Runde {idx + 1}</div>
                                    <div className={'flex items-center'} onClick={() => removeRound(idx)}>
                                        <div><XIcon className={'w-5 h-5'}/></div>
                                        <div>Löschen</div>
                                    </div>
                                </div>
                                <div className={''}>
                                    <div>
                                        {round.exercises?.map((exercise: any, exerciseIndex: number) =>
                                            <div className={'flex items-center py-1'} key={exerciseIndex}>
                                                <div
                                                    className={'mr-3'}
                                                    onClick={() => removeExerciseFromRound(idx, exerciseIndex)}>
                                                    <XIcon className={'w-5 h-5'}/>
                                                </div>
                                                <div><WorkoutExerciseDetails
                                                    key={exerciseIndex}
                                                    exercise={exercise}/>
                                                </div>
                                            </div>)}
                                    </div>
                                    <div className={'flex w-48 cursor-pointer rounded-md p-1 mt-3 text-sm'}
                                         onClick={() => setExerciseSelectionModalOpen(true)}>
                                        <div><PlusIcon className={'w-5 h-5'}/></div>
                                        <div>Übung hinzufügen</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div onClick={saveWorkout}>
                    <div className={'cursor-pointer mt-2 rounded-md border bg-blue-500 border-blue-800 p-3'}>Speichern
                    </div>
                </div>
                <div>
                    <pre>
                        {JSON.stringify(workoutToSave, null, 2)}
                    </pre>
                </div>
            </div>
        </div>)
}
