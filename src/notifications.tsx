import toast from 'react-hot-toast'
import React from 'react'

import './index.css'
import {
    CheckCircleIcon,
    ExclamationIcon,
    XCircleIcon,
} from '@heroicons/react/outline'

export const notifySuccess = (message: string): string =>
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            }  pointer-events-auto flex rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-3 h-full flex-1 self-center">
                        <p className="font-medium text-gray-900 text-sm">
                            {message}
                        </p>
                    </div>
                    <div>
                        <XCircleIcon
                            className="h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-600"
                            onClick={() => toast.dismiss(t.id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    ))

export const notifyError = (message: string): string =>
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
            <div className="w-0 flex-1 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <ExclamationIcon className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                            {message}
                        </p>
                    </div>
                    <div>
                        <XCircleIcon
                            className="h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-600"
                            onClick={() => toast.dismiss(t.id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    ))
