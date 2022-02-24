import React, {useState} from 'react';
import {ExerciseDetailsDto, ExerciseDto,} from '../../../../dtos/exercises/exercise.dto';
import clsx from 'clsx';
import Select from 'react-select';

import {WorkoutType} from '../../../../enums/workout-type.enum';
import {useMutation} from 'react-query';
import {CreateWorkoutDto} from '../../../../dtos/workout/create-workout.dto';
import {createWorkout} from '../../../../adapter/workout.adapter';
import {notifyError, notifySuccess} from '../../../../notifications';
import {XIcon} from '@heroicons/react/outline';
import {WorkoutExerciseDetails} from './components/WorkoutExerciseDetails';
import {AddWorkoutExerciseModal} from './components/AddWorkoutExerciseModal';

export const AddWorkoutsViews = () => {
  const [workoutToSave, setWorkoutToSave] = useState<any>({});
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<any>(null);
  const [rounds, setRounds] = useState<any>([]);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [exerciseSelectionModalOpen, setExerciseSelectionModalOpen] =
      useState<boolean>(false);

  const saveWorkoutMutation = useMutation(
      (createWorkoutDto: CreateWorkoutDto) => createWorkout(createWorkoutDto),
      {
        onSuccess: () => {
          notifySuccess('Workout erstellt');
        },
        onError: () => {
          notifyError('Workout konnte nicht erstellt werden');
        },
      }
  );

  const saveWorkout = () => {
    const allExercises = rounds.map((round: any) => round.exercises);
    let combinedArray: any = [];
    allExercises.forEach((exercises: any) => combinedArray.push(...exercises));

    const workout = {
      name,
      description: '',
      timeLimit,
      type: selectedWorkoutType.value,
      exercises: combinedArray,
    };
    setWorkoutToSave(workout);
    saveWorkoutMutation.mutate(workout);
  };

  const getStyle = (index: number) => {
    return clsx({
      'border rounded-md p-5 shadow-sm mb-3': true,
      // 'border-blue-300': selectedRound - 1 === index,
      // 'border-gray-100 border-1': selectedRound - 1 !== index,
    });
  };

  const onNameChanged = (workoutName: string) => {
    setName(workoutName);
  };

  const onDescriptionChanged = (workoutDescription: string) => {
    setDescription(workoutDescription);
  };

  const onTimeLimitChanged = (timeLimit: number) => {
    setTimeLimit(timeLimit);
  };

  const addExerciseToRound = (
      exercise: ExerciseDto,
      details: ExerciseDetailsDto
  ) => {
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
    setExerciseSelectionModalOpen(false);
  };

  const removeRound = (index: number) => {
    setRounds([...rounds.slice(0, index), ...rounds.slice(index + 1)]);
  };

  const removeExerciseFromRound = (
      roundIndex: number,
      exerciseIndex: number
  ) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].exercises = [
      ...newRounds[roundIndex].exercises.slice(0, exerciseIndex),
      ...newRounds[roundIndex].exercises.slice(exerciseIndex + 1),
    ];
    setRounds(newRounds);
  };

  const options = [
    {value: WorkoutType.EMOM, label: 'EMOM'},
    {value: WorkoutType.ForTime, label: 'For Time'},
    {value: WorkoutType.AMRAP, label: 'AMRAP'},
  ];

  const handleWorkoutTypeChanged = (selectedItem: any, event: any) => {
    setSelectedWorkoutType(selectedItem);
  };

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
                  {rounds.map((round: any, idx: number) => (
                      <div
                          key={idx}
                          className={getStyle(idx)}
                          onClick={() => setSelectedRound(idx + 1)}
                      >
                        <div className={'mb-3 flex items-center justify-between'}>
                          <div className={'mr-3 text-sm font-medium text-gray-700'}>Runde {idx + 1}</div>
                          <div
                              className={'flex items-center cursor-pointer text-red-500 hover:text-red-700 '}
                              onClick={() => removeRound(idx)}
                          >
                            <div className={'text-sm font-medium'}>Löschen</div>
                          </div>
                        </div>
                        <div className={''}>
                          <div>
                            {round.exercises?.map(
                                (exercise: any, exerciseIndex: number) => (
                                    <div
                                        className={'flex items-center py-1'}
                                        key={exerciseIndex}
                                    >
                                      <div
                                          className={'mr-3'}
                                          onClick={() =>
                                              removeExerciseFromRound(idx, exerciseIndex)
                                          }
                                      >
                                        <XIcon className={'h-5 w-5'}/>
                                      </div>
                                      <div>
                                        <WorkoutExerciseDetails
                                            key={exerciseIndex}
                                            exercise={exercise}
                                        />
                                      </div>
                                    </div>
                                )
                            )}
                          </div>
                          <div
                              className={
                                'mt-3 flex w-48 cursor-pointer rounded-md p-1 text-sm'
                              }
                              onClick={() => setExerciseSelectionModalOpen(true)}
                          >
                            <div className={''}>Übung hinzufügen</div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
                <button
                    onClick={() => setRounds(rounds.concat({}))}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Runde hinzufügen
                </button>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="workout-name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            onChange={(e: any) => onNameChanged(e.target.value)}
                            type="text"
                            name="workout-name"
                            id="workout-name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-sm sm:text-sm border-gray-300"
                            placeholder="Name des Workouts"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="workout-timelimit" className="block text-sm font-medium text-gray-700">
                        Zeitlimit
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            onChange={(e: any) => onTimeLimitChanged(e.target.value)}
                            type="number"
                            name="workout-timelimit"
                            id="workout-timelimit"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-sm sm:text-sm border-gray-300"
                            placeholder="Zeitlimit"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Typ
                    </label>
                    <div className="mt-1">
                      <Select
                          placeholder={'Typ'}
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
                            option: (provided, state) => ({
                              ...provided,
                              fontSize: '12px',
                              color: 'black'
                            }),
                          }}
                          options={options}
                          value={selectedWorkoutType}
                          onChange={handleWorkoutTypeChanged}
                          getOptionLabel={(exercise: any) => exercise.label}
                          getOptionValue={(exercise: any) => exercise}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Beschreibung
                    </label>
                    <div className="mt-1">
                      <textarea
                          onChange={(e: any) => onDescriptionChanged(e.target.value)}
                          id="description"
                          name="description"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Zusätzliche Informationen zum Workout"
                          defaultValue={''}
                      />
                    </div>
                  </div>


                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                      onClick={saveWorkout}
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
};
