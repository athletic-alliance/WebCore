import React, {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react';
import debounce from 'lodash.debounce';
import Select from 'react-select';
import {useQuery} from 'react-query';
import {fetchWorkouts} from '../../../../adapter/workout.adapter';
import Loader from '../../../../shared/components/Loader';
import DatePicker from 'react-datepicker';

type ModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export const CreateTrainingDayModal = ({
                                           isOpen,
                                           onCancel,
                                           onConfirm,
                                       }: ModalProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
    const setSearchTextDebounced = useRef(
        debounce((searchText: string) => setSearchText(searchText), 500)
    ).current;

    const cancelButtonRef = useRef(null);

    const {data, isLoading} = useQuery('fetchWorkouts', () => fetchWorkouts(false));

    const confirm = () => {
        onConfirm();
    };

    const cancel = () => {
        onCancel();
    };

    const handleWorkoutChanged = (selectedItem: any, event: any) => {
        setSelectedWorkout(selectedItem);
    };

    const handleWorkoutInputValueChanged = (inputText: string, event: any) => {
        // prevent outside click from resetting inputText to ""
        if (event.action !== 'input-blur' && event.action !== 'menu-close') {
            setInputText(inputText);
            setSearchTextDebounced(inputText);
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={isOpen}
                onClose={() => cancel}
            >
                <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                    <span
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    >
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
                            className="inline-block transform rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <div className="w-full">
                                                    <div className={'flex'}>
                                                        <div className={'mr-5'}>
                                                            <div>
                                                                <label htmlFor="plan-name"
                                                                       className="block text-sm font-medium text-gray-700">
                                                                    Warm Up
                                                                </label>
                                                                <textarea rows={10}
                                                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-sm sm:text-sm border-gray-300"/>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="plan-name"
                                                                       className="block text-sm font-medium text-gray-700">
                                                                    Kraft & Sonstiges
                                                                </label>
                                                                <textarea rows={10}
                                                                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-sm sm:text-sm border-gray-300"/>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={'w-96'}>
                                                                <div>
                                                                    <label htmlFor="plan-name"
                                                                           className="block text-sm font-medium text-gray-700">
                                                                        Workout
                                                                    </label>
                                                                    {isLoading && <Loader/>}
                                                                    <Select
                                                                        className={'w-full'}
                                                                        getOptionLabel={(workout: any) => workout.name}
                                                                        getOptionValue={(workout: any) => workout}
                                                                        options={data}
                                                                        isLoading={isLoading}
                                                                        value={selectedWorkout}
                                                                        isClearable={true}
                                                                        placeholder={'Workout durchsuchen'}
                                                                        onChange={handleWorkoutChanged}
                                                                        onInputChange={handleWorkoutInputValueChanged}
                                                                        noOptionsMessage={() => 'Kein Workout gefunden'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="plan-name"
                                                                       className="block text-sm font-medium text-gray-700">
                                                                    Datum
                                                                </label>
                                                                <DatePicker
                                                                    selected={date}
                                                                    nextMonthButtonLabel=">"
                                                                    previousMonthButtonLabel="<"
                                                                    locale="de"
                                                                    dateFormat="dd.MM.yyyy"
                                                                    onChange={(update: Date) => {

                                                                    }}
                                                                    isClearable={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 font-medium text-white shadow-sm text-base hover:bg-green-700 focus:outline-none focus:ring-0 disabled:opacity-25 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirm}
                                >
                                    Speichern
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm text-base hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
};
