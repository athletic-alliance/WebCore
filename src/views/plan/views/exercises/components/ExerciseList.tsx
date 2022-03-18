import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
    useFilters,
    useGlobalFilter,
    usePagination,
    useTable,
} from 'react-table'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { deleteExercise } from '../../../../../adapter'
import { notifyError, notifySuccess } from '../../../../../notifications'
import { ExerciseDto } from '../../../../../dtos/exercises/exercise.dto'
import { Pagination } from '../../../../../shared/components/Pagination'

type ExerciseListProps = {
    exercises: ExerciseDto[]
}

export const DefaultColumnFilter = ({
    column: { filterValue, setFilter },
}: {
    column: {
        filterValue: string
        setFilter: (filterValue: string | undefined) => void
    }
}): JSX.Element => {
    return (
        <input
            className="my-2 block w-full rounded-md border border-gray-300 border-gray-300 py-1 px-2 sm:text-sm"
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder="Alle durchsuchen ..."
        />
    )
}

export const ExerciseList = ({ exercises }: ExerciseListProps): JSX.Element => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation((id: number) => deleteExercise(id), {
        onSuccess: () => {
            notifySuccess('Übung gelöscht')
            queryClient.invalidateQueries('fetchExercises')
        },
        onError: () => {
            notifyError('Übung konnte nicht gelöscht werden')
        },
    })

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
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        gotoPage,
        page,
        pageCount,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: exercises,
            initialState: { pageIndex: 0 },
            defaultColumn, // Be sure to pass the defaultColumn option
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination
    )

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
        <div className="w-full">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                            key={nanoid()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps()}
                                                        key={nanoid()}
                                                        className="px-6 py-3 text-left font-medium uppercase text-gray-500 text-xs tracking-wider"
                                                    >
                                                        {column.render(
                                                            'Header'
                                                        )}
                                                        <div>
                                                            {column.canFilter
                                                                ? column.render(
                                                                      'Filter'
                                                                  )
                                                                : null}
                                                        </div>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="divide-y divide-gray-200 bg-white"
                                >
                                    {page.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                key={nanoid()}
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            key={nanoid()}
                                                            className="whitespace-nowrap px-6 py-4 text-sm"
                                                        >
                                                            {cell.render(
                                                                'Cell'
                                                            )}
                                                        </td>
                                                    )
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
            <Pagination
                pageIndex={pageIndex}
                nextClicked={nextPage}
                previousClicked={previousPage}
                goToClicked={gotoPage}
                pageCount={pageCount}
                itemCount={exercises.length}
            />
        </div>
    )
}
