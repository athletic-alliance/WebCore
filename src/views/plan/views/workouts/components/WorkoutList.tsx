import React, {useState} from 'react'
import {WorkoutDto} from '../../../../../dtos/workout/workout.dto';
import {useMutation, useQueryClient} from 'react-query';
import {notifyError, notifySuccess} from '../../../../../notifications';
import {deleteWorkout} from '../../../../../adapter/workout.adapter';
import {usePagination, useTable} from 'react-table';
import {ConfirmationModal} from '../../../../../shared/components/modals/ConfirmationModal';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline';

type WorkoutListProps = {
    workouts: WorkoutDto[]
}

export const WorkoutList = ({workouts}: WorkoutListProps) => {
    const queryClient = useQueryClient()

    const [open, setOpen] = useState<boolean>(false)
    const [workoutId, setWorkoutId] = useState<number>(0)

    const deleteMutation = useMutation((id: number) => deleteWorkout(id),
        {
            onSuccess: () => {
                notifySuccess('Workout gelöscht')
                queryClient.invalidateQueries('fetchWorkout')
            },
            onError: () => {
                notifyError('Workout konnte nicht gelöscht werden')
            },
        });

    const columns = React.useMemo(
        () => [
            {
                Header: 'Workouts',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Type',
                        accessor: 'type',
                    },
                ],
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data: workouts,
            initialState: {pageIndex: 0},
        },
        usePagination
    )

    const openCloseDialog = (id: number) => {
        setWorkoutId(id)
        setOpen(true)
    }

    const onCloseDialogConfirm = () => {
        setOpen(false)
        deleteMutation.mutate(workoutId)
    }

    const onCloseDialogCancel = () => {
        setOpen(false)
    }

    return (<>
        <ConfirmationModal title={'Wirklich löschen'} text={'Übung wirklich löschen'} isOpen={open}
                           onCancel={onCloseDialogCancel} onConfirm={onCloseDialogConfirm}/>
        <div className="w-full">
            {/*{workouts.map((workout: WorkoutDto, index: number) => (*/}
            {/*    <WorkoutListItem deleteClicked={() => openCloseDialog(workout.id)} key={index}*/}
            {/*                     workout={workout}/>))}*/}
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                {page.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td {...cell.getCellProps()}
                                                           className="px-6 py-4 whitespace-nowrap">{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span
                            className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                             aria-label="Pagination">
                            <span
                                onClick={() => previousPage()}
                                className="relative inline-flex cursor-pointer items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                            </span>
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                            <a
                                href="#"
                                aria-current="page"
                                className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                            >
                                3
                            </a>
                            <span
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                9
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                10
                            </a>
                            <span
                                onClick={() => nextPage()}
                                className="relative inline-flex cursor-pointer items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                            </span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
