import React from 'react'
import {WizardStep} from '../../models/wizard-step';
import {CheckCircleIcon} from '@heroicons/react/solid';

type WizardProgressProps = {
    currentStep: number,
    wizardSteps: WizardStep[]
}

export const WizardProgress = ({wizardSteps, currentStep}: WizardProgressProps) => {
    return (
        <div>
            <ul>
                {wizardSteps.map((step: WizardStep, index: number) => (<li key={index}>
                    <ShowWizardStep active={currentStep === index} done={currentStep > index} caption={step.caption}/>
                </li>))}
            </ul>
        </div>
    )
}

type WizardStepProps = {
    caption: string,
    active: boolean,
    done: boolean
}

const ShowWizardStep = ({caption, active, done}: WizardStepProps) => {
    const renderIcon = () => {

        if (done) {
            return <div className={'relative mr-3'}>
                <CheckCircleIcon className={'w-4 h-4 text-blue-700'}/>
            </div>
        }

        if (active) {
            return <div className={'relative mr-3'}>
                <div className="w-4 h-4 rounded-full bg-blue-400 opacity-50"/>
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-blue-400"/>
            </div>
        }

        return (<div className={'relative mr-3'}>
            <div className="w-4 h-4 rounded-full bg-blue-400 opacity-0"/>
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-blue-400"/>
        </div>);
    }

    const renderCaption = () => {
        if (active) {
            return <div className={'text-sm text-blue-700'}>{caption}</div>
        }

        return <div className={'text-sm'}>{caption}</div>
    }

    return (<div className={'flex items-center mb-3'}>
        {renderIcon()}
        {renderCaption()}
    </div>);
}
