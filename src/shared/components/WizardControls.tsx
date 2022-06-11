import React from 'react'

type WizardControlsProps = {
    currentStep: number
    increaseClicked: () => void
    decreaseClicked: () => void
    saveClicked: () => void
}

export const WizardControls = ({
    currentStep,
    increaseClicked,
    decreaseClicked,
    saveClicked,
}: WizardControlsProps): JSX.Element => {
    return (
        <div className="flex">
            {currentStep > 0 && (
                <div
                    className="mr-3 cursor-pointer rounded rounded-md border border-blue-300 bg-blue-100 p-2 text-slate-700 text-sm"
                    onClick={decreaseClicked}
                >
                    Zurück
                </div>
            )}
            {currentStep < 4 && (
                <div
                    className="cursor-pointer rounded rounded-md border border-blue-300 bg-blue-100 p-2 text-slate-700 text-sm"
                    onClick={increaseClicked}
                >
                    Weiter
                </div>
            )}
            {currentStep === 4 && (
                <div
                    className="cursor-pointer rounded rounded-md border border-blue-300 bg-blue-100 p-2 text-slate-700 text-sm"
                    onClick={saveClicked}
                >
                    Speichern
                </div>
            )}
        </div>
    )
}
