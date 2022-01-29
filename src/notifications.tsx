import toast from 'react-hot-toast';
import React from 'react';

import './index.css';
import {CheckCircleIcon, ExclamationIcon} from '@heroicons/react/outline';

export const notifySuccess = (message: string) =>
    toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                }  bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <CheckCircleIcon className="w-8 h-8 text-green-600"/>
                        </div>
                        <div className="ml-3 flex-1 h-full self-center">
                            <p className="text-sm font-medium text-gray-900">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    );

export const notifyError = (message: string) =>
    toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <ExclamationIcon className="w-5 h-5 text-red-400"/>
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    );
