import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { nanoid } from 'nanoid'
import React from 'react'

type PaginationProps = {
    pageIndex: number
    itemCount: number
    pageCount: number
    nextClicked: () => void
    previousClicked: () => void
    goToClicked: (i: number) => void
}

export const Pagination = ({
    itemCount,
    pageCount,
    pageIndex,
    nextClicked,
    previousClicked,
    goToClicked,
}: PaginationProps): JSX.Element => {
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
        <div className="flex items-center justify-between rounded-b-lg  border-b border-r border-l border-gray-200 bg-white px-4 py-3 sm:px-8">
            <div className="flex flex-1 justify-between sm:hidden">
                <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50">
                    Previous
                </span>
                <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50">
                    Next
                </span>
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
                                key={nanoid()}
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
