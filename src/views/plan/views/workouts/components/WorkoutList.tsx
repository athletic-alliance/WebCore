import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Row, usePagination, useTable } from 'react-table'
import { nanoid } from 'nanoid'
import { generatePath, useNavigate } from 'react-router'
import { deleteWorkout } from '../../../../../adapter'
import { notifyError, notifySuccess } from '../../../../../notifications'
import { WorkoutDto } from '../../../../../dtos/workout/workout.dto'
import { Pagination } from '../../../../../shared/components/Pagination'

type WorkoutListProps = {
    workouts: WorkoutDto[]
}

export const WorkoutList = ({ workouts }: WorkoutListProps): JSX.Element => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

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

    const viewWorkout = (workout: Row<WorkoutDto>): void => {
        navigate(generatePath('/plan/workout/:id', { id: workout.values.id }))
    }

    return (
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
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                            key={nanoid()}
                                        >
                                            {headerGroup.headers.map(
                                                (column, hgIndex: number) => (
                                                    <th
                                                        {...column.getHeaderProps()}
                                                        key={nanoid()}
                                                        className="px-6 py-3 text-left font-medium uppercase text-gray-500 text-xs tracking-wider"
                                                    >
                                                        {column.render(
                                                            'Header'
                                                        )}
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
                                    {page.map((row: Row<WorkoutDto>) => {
                                        prepareRow(row)
                                        return (
                                            <tr
                                                className="cursor-pointer hover:bg-gray-100"
                                                onClick={() => viewWorkout(row)}
                                                {...row.getRowProps()}
                                                key={nanoid()}
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="whitespace-nowrap px-6 py-4"
                                                            key={nanoid()}
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
                itemCount={workouts.length}
            />
        </div>
    )
}
