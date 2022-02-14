import React from 'react'

import './Loader.css';

type LoaderProps = {
    loadingCaption?: string;
}

export default function Loader({loadingCaption = 'Daten werden geladen...'}: LoaderProps) {
    return (
        <div className="w-full text-center">
            <div className="w-full inline-flex justify-center">
                <svg
                    className="animate-spin -ml-1 h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className=""
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#FFCC01"
                        strokeWidth="2"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </div>
            <div>
                <span className="text-sm">{loadingCaption}</span>
            </div>
        </div>
    );
}