import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useTable,
} from 'react-table'
import clsx from 'clsx'
import { TrashIcon } from '@heroicons/react/outline'
import { deleteExercise } from '../../../../../adapter'
import { notifyError, notifySuccess } from '../../../../../notifications'
import { ExerciseDto } from '../../../../../dtos/exercises/exercise.dto'
import { Pagination } from '../../../../../shared/components/Pagination'
import IndeterminateCheckbox from '../../../../../shared/IndeterminateCheckbox'

type ExerciseListProps = {
    exercises: ExerciseDto[]
}

const DefaultColumnFilter = ({
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
            placeholder="Alle durchsuchen..."
        />
    )
}

export const ExerciseList = ({ exercises }: ExerciseListProps): JSX.Element => {
    const queryClient = useQueryClient()

    const onDelete = (selectedFlatRows: any): void => {
        console.log(selectedFlatRows.map((x: any) => x.original.id))
    }

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
                        Header: 'ID',
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
        filteredRows,
        prepareRow,
        gotoPage,
        page,
        pageCount,
        nextPage,
        previousPage,
        selectedFlatRows,
        state: { pageIndex, selectedRowIds },
    } = useTable(
        {
            columns,
            data: exercises,
            initialState: { pageIndex: 0 },
            defaultColumn, // Be sure to pass the defaultColumn option
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((clmns) => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox
                                name="headCheckBox"
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                    Cell: ({ row }: any) => (
                        <div>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                        </div>
                    ),
                },
                ...clmns,
            ])
        }
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
            <div className="flex items-center justify-between rounded-t-lg border border-slate-300 border-b-slate-300 bg-slate-100 p-3">
                <h1 className="text-md font-light text-slate-800">
                    Alle Übungen
                </h1>
            </div>
            <div className="border-x border-slate-300 p-3">
                <div className="flex">
                    <div
                        className="cursor-pointer rounded rounded-md border border-gray-400 bg-white p-2 text-red-700 hover:bg-gray-100 hover:text-red-600"
                        onClick={() => onDelete(selectedFlatRows)}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="border border-slate-300 border-t-transparent shadow">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps()}
                                                        className="text-left font-medium uppercase text-gray-500 text-xs tracking-wider"
                                                    >
                                                        <div className="p-1 ">
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
                                    {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                className="cursor-pointer hover:bg-gray-100"
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 text-sm"
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
                itemCount={filteredRows.length}
            />
        </div>
    )
}
