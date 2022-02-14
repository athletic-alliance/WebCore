import {Listbox, Transition} from '@headlessui/react'
import React, {Fragment, useState} from 'react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/outline';
import {ExerciseType} from '../../../../enums/exercise-type.enum';
import {ExerciseDto} from '../../../../dtos/exercises/exercise.dto';
import {AddWorkoutExerciseModal} from './components/AddWorkoutExerciseModal';
import clsx from 'clsx';
import {WorkoutExerciseDetails} from './components/WorkoutExerciseDetails';

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const AddWorkoutsViews = () => {
    const [selected, setSelected] = useState<String>(ExerciseType[2])
    const [rounds, setRounds] = useState<any>([]);
    const [selectedRound, setSelectedRound] = useState<number>(0);
    const [exerciseSelectionModalOpen, setExerciseSelectionModalOpen] = useState<boolean>(false);

    const getStyle = (index: number) => {
        return clsx({
            'border rounded-md p-5 mt-2': true,
            'border-blue-300': selectedRound === index,
            'border-gray-300': selectedRound !== index,
        });
    };

    const addExerciseToRound = (exercise: ExerciseDto) => {
        const currentRound = rounds[selectedRound - 1];
        const exercises = currentRound.exercises ? currentRound.exercises : [];

        const exerciseInRound: any = {};
        exerciseInRound.exerciseId = exercise.id;
        exerciseInRound.name = exercise.name;
        exerciseInRound.type = exercise.type;
        exerciseInRound.round = selectedRound;
        exerciseInRound.order = exercises.length + 1;
        exerciseInRound.details = {
            weight: 0,
            distance: 0,
            repetitions: 0
        }
        exercises.push(exerciseInRound);

        currentRound.exercises = exercises;
        setExerciseSelectionModalOpen(false)
    }

    return (
        <>
            <AddWorkoutExerciseModal isOpen={exerciseSelectionModalOpen}
                                     onCancel={() => setExerciseSelectionModalOpen(false)}
                                     onConfirm={(selectedExercise: any) => addExerciseToRound(selectedExercise)}/>
            <div className={'w-full'}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <div className="mt-1 relative rounded-md">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="p-1 border border-gray-300 rounded rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <Listbox value={selected} onChange={setSelected}>
                        {({open}) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">Typ</Listbox.Label>
                                <div className="mt-1 relative">
                                    <Listbox.Button
                                        className="relative bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected}</span>
              </span>
                                        <span
                                            className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {Object.keys(ExerciseType).filter((key: any) => !isNaN(Number(ExerciseType[key]))).map((person) => (
                                                <Listbox.Option
                                                    key={person}
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={person}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                            <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                            {person}
                          </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
                <div className={'mt-5'}>
                    <div
                        className={'cursor-pointer border border-gray-300 rounded-md p-2 text-sm hover:bg-gray-200 hover:border-gray-400'}
                        onClick={() => setRounds(rounds.concat({}))}>Runde hinzufügen
                    </div>
                    <div className={'mt-3'}>
                        {rounds.map((round: any, idx: number) => (
                            <div className={getStyle(idx)} onClick={() => setSelectedRound(idx + 1)}>
                                <div className={'flex justify-between'}>
                                    <div>Runde {idx + 1}</div>
                                    <div>Löschen</div>
                                </div>
                                <div className={''}>
                                    <div className={'w-48 bg-gray-200 cursor-pointer rounded-md p-1'}
                                         onClick={() => setExerciseSelectionModalOpen(true)}>Übung hinzufügen
                                    </div>
                                    <div>
                                        {round.exercises?.map((exerciseDetails: any) => <WorkoutExerciseDetails
                                            details={exerciseDetails}/>)}
                                        <pre>{JSON.stringify(round.exercises, null, 2)}</pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>)
}
