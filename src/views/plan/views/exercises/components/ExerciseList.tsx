import React, {useState} from 'react'
import {ExerciseDto} from '../../../../../dtos/exercises/exercise.dto';
import {useMutation, useQueryClient} from 'react-query';
import {deleteExercise} from '../../../../../adapter';
import {notifyError, notifySuccess} from '../../../../../notifications';
import {ConfirmationModal} from '../../../../../shared/components/modals/ConfirmationModal';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline';
import {usePagination, useTable} from 'react-table';
import clsx from 'clsx';

type ExerciseListProps = {
    exercises: ExerciseDto[]
}

export const ExerciseList = ({exercises}: ExerciseListProps) => {
    const queryClient = useQueryClient()

    const [open, setOpen] = useState<boolean>(false)
    const [exerciseId, setExerciseId] = useState<number>(0)

    const deleteMutation = useMutation((id: number) => deleteExercise(id),
        {
            onSuccess: () => {
                notifySuccess('Übung gelöscht')
                queryClient.invalidateQueries('fetchExercises')
            },
            onError: () => {
                notifyError('Übung konnte nicht gelöscht werden')
            },
        });

    const openCloseDialog = (exerciseId: number) => {
        setExerciseId(exerciseId)
        setOpen(true)
    }

    const onCloseDialogConfirm = () => {
        setOpen(false)
        deleteMutation.mutate(exerciseId)
    }

    const onCloseDialogCancel = () => {
        setOpen(false)
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Übungen',
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
            data: exercises,
            initialState: {pageIndex: 0},
        },
        usePagination
    )

    const getStyle = (index: number) => {
        return clsx({
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium': true,
            'z-10 bg-blue-50 border-blue-500 text-blue-600': pageIndex === index,
            'border-gray-300 text-gray-500 hover:bg-gray-50': pageIndex !== index,
        });
    };

    return (<>
        <ConfirmationModal title={'Wirklich löschen'} text={'Übung wirklich löschen'} isOpen={open}
                           onCancel={onCloseDialogCancel} onConfirm={onCloseDialogConfirm}/>
        <div className="w-full">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
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
            <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-8">
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
                            <span className="font-medium">{exercises.length}</span> results
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
                            {Array.from(Array(pageCount), (e, i) => (
                                <a
                                    href="#"
                                    aria-current="page"
                                    className={getStyle(i)}
                                >
                                    {i + 1}
                                </a>
                            ))}
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

type ExerciseListItemProps = {
    exercise: ExerciseDto
    deleteClicked: (id: number) => void
}

export const ExerciseListItem = ({exercise, deleteClicked}: ExerciseListItemProps) => {
    return (<div className="py-1 px-2 border border-gray-300 w-full rounded-sm my-1 text-sm flex justify-between">
        <div>
            <span className={'block font-bold'}>{exercise.name}</span>
            <span className={'block'}>{exercise.type}</span>
        </div>
        <div className="self-center" onClick={() => deleteClicked(exercise.id)}>
            Löschen
        </div>
    </div>)
}
