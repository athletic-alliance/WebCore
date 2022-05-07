import React from 'react'
import { WizardStep } from '../../models/wizard-step'

const FinishedIcon = (): JSX.Element => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-check"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#FFFFFF"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M5 12l5 5l10 -10" />
        </svg>
    )
}

const FirstStep = (currentStep: number): JSX.Element => {
    return (
        <div
            className={`duration-800 flex h-1 grow items-center transition-all duration-700 ${
                currentStep === 0 ? 'bg-gray-200' : 'bg-blue-700'
            }`}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 shadow">
                {currentStep !== 0 ? (
                    <FinishedIcon />
                ) : (
                    <div className="text-md flex items-center text-center text-white">
                        {currentStep + 1}
                    </div>
                )}
            </div>
        </div>
    )
}

const LastStep = ({
    wizardSteps,
    currentStepIndex,
    stepIndex,
}: WizardProgressStepProps): JSX.Element => {
    return (
        <div
            className={`duration-800 flex h-1 grow items-center transition-all duration-700 ${
                currentStepIndex <= stepIndex ? 'bg-gray-200' : 'bg-blue-700'
            }`}
        >
            <div className="flex w-full justify-end">
                <div className="flex h-8 w-8 items-center justify-center justify-items-center rounded-full bg-blue-700 shadow">
                    {currentStepIndex === wizardSteps.length ? (
                        <FinishedIcon />
                    ) : (
                        <div className="text-md flex items-center text-center text-white">
                            {stepIndex + 1}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

type WizardProgressStepProps = {
    currentStepIndex: number
    stepIndex: number
    wizardSteps: WizardStep[]
}

export const WizardProgressStep = ({
    wizardSteps,
    currentStepIndex,
    stepIndex,
}: WizardProgressStepProps): JSX.Element => {
    if (stepIndex === 0) {
        return FirstStep(currentStepIndex)
    }

    if (stepIndex === wizardSteps.length - 1) {
        return LastStep({
            wizardSteps,
            currentStepIndex,
            stepIndex,
        })
    }

    return (
        <div
            className={`duration-800 flex h-1 grow-[2] items-center transition-all duration-700 ${
                currentStepIndex <= stepIndex ? 'bg-gray-200' : 'bg-blue-700'
            }`}
        >
            <div className="mx-auto flex h-8 w-8 items-center justify-center justify-items-center rounded-full bg-blue-700 shadow">
                {currentStepIndex > stepIndex ? (
                    <FinishedIcon />
                ) : (
                    <div className="text-md flex items-center text-center text-white">
                        {stepIndex + 1}
                    </div>
                )}
            </div>
        </div>
    )
}
