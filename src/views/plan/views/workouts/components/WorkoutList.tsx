import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Row, usePagination, useTable } from 'react-table'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { generatePath, useNavigate } from 'react-router'
import { ConfirmationModal } from '../../../../../shared/components/modals/ConfirmationModal'
import { deleteWorkout } from '../../../../../adapter/workout.adapter'
import { notifyError, notifySuccess } from '../../../../../notifications'
import { WorkoutDto } from '../../../../../dtos/workout/workout.dto'

type WorkoutListProps = {
    workouts: WorkoutDto[]
}

export const WorkoutList = ({ workouts }: WorkoutListProps) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [open, setOpen] = useState<boolean>(false)
    const [workoutId, setWorkoutId] = useState<number>(0)

    const deleteMutation = useMutation((id: number) => deleteWorkout(id), {
        onSuccess: () => {
            notifySuccess('Workout gelöscht')
            queryClient.invalidateQueries('fetchWorkout')
        },
        onError: () => {
            notifyError('Workout konnte nicht gelöscht werden')
        },
    })

    const columns = React.useMemo(
        () => [
            {
                Header: 'Workouts',
                columns: [
                    {
                        Header: 'Id',
                        accessor: 'id',
                    },
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
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: workouts,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    const onCloseDialogConfirm = (): void => {
        setOpen(false)
        deleteMutation.mutate(workoutId)
    }

    const onCloseDialogCancel = (): void => {
        setOpen(false)
    }

    const viewWorkout = (workout: Row<WorkoutDto>): void => {
        navigate(generatePath('/plan/workout/:id', { id: workout.values.id }))
    }

    return (
        <>
            <ConfirmationModal
                title="Wirklich löschen"
                text="Übung wirklich löschen"
                isOpen={open}
                onCancel={onCloseDialogCancel}
                onConfirm={onCloseDialogConfirm}
            />
            <div className="w-full">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                <table
                                    {...getTableProps()}
                                    className="min-w-full divide-y divide-gray-200"
                                >
                                    <thead className="bg-gray-50">
                                        {headerGroups.map(
                                            (headerGroup, hgsIndex: number) => (
                                                <tr
                                                    {...headerGroup.getHeaderGroupProps()}
                                                    key={hgsIndex}
                                                >
                                                    {headerGroup.headers.map(
                                                        (
                                                            column,
                                                            hgIndex: number
                                                        ) => (
                                                            <th
                                                                {...column.getHeaderProps()}
                                                                key={hgsIndex}
                                                                className="px-6 py-3 text-left font-medium uppercase text-gray-500 text-xs tracking-wider"
                                                            >
                                                                {column.render(
                                                                    'Header'
                                                                )}
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                            )
                                        )}
                                    </thead>
                                    <tbody
                                        {...getTableBodyProps()}
                                        className="divide-y divide-gray-200 bg-white"
                                    >
                                        {page.map((row: Row<WorkoutDto>, i) => {
                                            prepareRow(row)
                                            return (
                                                <tr
                                                    className="cursor-pointer hover:bg-gray-100"
                                                    onClick={() =>
                                                        viewWorkout(row)
                                                    }
                                                    {...row.getRowProps()}
                                                    key={i}
                                                >
                                                    {row.cells.map(
                                                        (cell, index) => {
                                                            return (
                                                                <td
                                                                    {...cell.getCellProps()}
                                                                    className="whitespace-nowrap px-6 py-4"
                                                                    key={index}
                                                                >
                                                                    {cell.render(
                                                                        'Cell'
                                                                    )}
                                                                </td>
                                                            )
                                                        }
                                                    )}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination
                    pageIndex={pageIndex}
                    nextClicked={nextPage}
                    previousClicked={previousPage}
                    goToClicked={gotoPage}
                    pageCount={pageCount}
                    itemCount={workouts.length}
                />
            </div>
        </>
    )
}

type PaginationProps = {
    pageIndex: number
    itemCount: number
    pageCount: number
    nextClicked: () => void
    previousClicked: () => void
    goToClicked: (i: number) => void
}

const Pagination = ({
    itemCount,
    pageCount,
    pageIndex,
    nextClicked,
    previousClicked,
    goToClicked,
}: PaginationProps) => {
    const getStyle = (index: number): string => {
        return clsx({
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:cursor-pointer':
                true,
            'z-10 bg-blue-50 border-blue-500 text-blue-600':
                pageIndex === index,
            'border-gray-300 text-gray-500 hover:bg-gray-50':
                pageIndex !== index,
        })
    }

    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-8">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-gray-700 text-sm">
                        <span className="font-medium">1</span> -{' '}
                        <span className="font-medium">10</span> von{' '}
                        <span className="font-medium">{itemCount}</span>{' '}
                        Ergebnissen
                    </p>
                </div>
                <div>
                    <nav
                        className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <span
                            onClick={previousClicked}
                            className="relative inline-flex cursor-pointer items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 font-medium text-gray-500 text-sm hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                        {Array.from(Array(pageCount), (e, i) => (
                            <span
                                key={i}
                                onClick={() => goToClicked(i)}
                                aria-current="page"
                                className={getStyle(i)}
                            >
                                {i + 1}
                            </span>
                        ))}
                        <span
                            onClick={nextClicked}
                            className="relative inline-flex cursor-pointer items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 font-medium text-gray-500 text-sm hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    )
}
