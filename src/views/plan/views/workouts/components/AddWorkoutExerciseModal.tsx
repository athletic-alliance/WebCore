import {Dialog, Transition} from '@headlessui/react';
import React, {ChangeEvent, Fragment, useRef, useState} from 'react';
import Loader from '../../../../../shared/components/Loader';
import Select from 'react-select';
import debounce from 'lodash.debounce';
import {useQuery} from 'react-query';
import {fetchExercises} from '../../../../../adapter';
import {ExerciseDetailsDto, ExerciseDto} from '../../../../../dtos/exercises/exercise.dto';

type ModalProps = {
    isOpen: boolean;
    onConfirm: (selectedExercise: ExerciseDto, details: ExerciseDetailsDto) => void;
    onCancel: () => void;
}

export const AddWorkoutExerciseModal = ({isOpen, onCancel, onConfirm}: ModalProps) => {
    const [selectedExercise, setSelectedExercise] = useState<any>(null);
    const [selectedReps, setSelectedReps] = useState<number>(0);
    const [selectedWeight, setSelectedWeight] = useState<number>(0);
    const [selectedDistance, setSelectedDistance] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const setSearchTextDebounced = useRef(
        debounce((searchText: string) => setSearchText(searchText), 500)
    ).current;

    const cancelButtonRef = useRef(null);

    const confirm = () => {
        setSelectedExercise(null);
        const details: ExerciseDetailsDto = {
            weight: selectedWeight,
            repetitions: selectedReps,
            distance: selectedDistance
        }
        setSelectedDistance(0)
        setSelectedReps(0)
        setSelectedWeight(0)
        onConfirm(selectedExercise, details);
    };

    const cancel = () => {
        setSelectedExercise(null);
        onCancel();
    };

    const renderNone = () => {
        return <div>none</div>;
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedReps(+e.target.value)}
                            value={selectedReps}
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedReps(+e.target.value)}
                        type="number"
                        value={selectedReps}
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedWeight(+e.target.value)}
                        type="number"
                        value={selectedWeight}
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedDistance(+e.target.value)}
                            type="number"
                            value={selectedDistance}
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

    const handleExerciseChanged = (selectedItem: any, event: any) => {
        setSelectedExercise(selectedItem);
    };

    const handleExerciseInputValueChanged = (inputText: string, event: any) => {
        // prevent outside click from resetting inputText to ""
        if (event.action !== 'input-blur' && event.action !== 'menu-close') {
            setInputText(inputText);
            setSearchTextDebounced(inputText);
        }
    };

    const {data, isLoading} = useQuery('fetchExercises', fetchExercises);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={isOpen}
                onClose={() => cancel}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <div className="w-full">
                                                    <label htmlFor="name"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Übung
                                                    </label>
                                                    {isLoading && <Loader/>}
                                                    <Select
                                                        className={'w-full'}
                                                        getOptionLabel={(exercise: any) => exercise.name}
                                                        getOptionValue={(exercise: any) => exercise}
                                                        options={data}
                                                        isLoading={isLoading}
                                                        value={selectedExercise}
                                                        isClearable={true}
                                                        placeholder={'Übungen durchsuchen'}
                                                        onChange={handleExerciseChanged}
                                                        onInputChange={handleExerciseInputValueChanged}
                                                        noOptionsMessage={() => 'Keine Übung gefunden'}/>
                                                </div>
                                                <div className={'w-full'}>
                                                    {selectedExercise && renderInputs(selectedExercise.type)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="disabled:opacity-25 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirm}
                                >
                                    Speichern
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
    );
}
