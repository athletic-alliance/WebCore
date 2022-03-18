import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { nanoid } from 'nanoid'
import { WizardStep } from '../../models/wizard-step'

type WizardStepProps = {
    caption: string
    active: boolean
    done: boolean
}

const ShowWizardStep = ({
    caption,
    active,
    done,
}: WizardStepProps): JSX.Element => {
    const renderIcon = (): JSX.Element => {
        if (done) {
            return (
                <div className="relative mr-3">
                    <CheckCircleIcon className="h-4 w-4 text-blue-700" />
                </div>
            )
        }

        if (active) {
            return (
                <div className="relative mr-3">
                    <div className="h-4 w-4 rounded-full bg-blue-400 opacity-50" />
                    <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-blue-400" />
                </div>
            )
        }

        return (
            <div className="relative mr-3">
                <div className="h-4 w-4 rounded-full bg-blue-400 opacity-0" />
                <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-blue-400" />
            </div>
        )
    }

    const renderCaption = (): JSX.Element => {
        if (active) {
            return <div className="text-blue-700 text-sm">{caption}</div>
        }

        return <div className="text-sm">{caption}</div>
    }

    return (
        <div className="mb-3 flex items-center">
            {renderIcon()} {renderCaption()}
        </div>
    )
}

type WizardProgressProps = {
    currentStep: number
    wizardSteps: WizardStep[]
}

export const WizardProgress = ({
    wizardSteps,
    currentStep,
}: WizardProgressProps): JSX.Element => {
    return (
        <div>
            <ul>
                {wizardSteps.map((step: WizardStep, index: number) => (
                    <li key={nanoid()}>
                        <ShowWizardStep
                            active={currentStep === index}
                            done={currentStep > index}
                            caption={step.caption}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
