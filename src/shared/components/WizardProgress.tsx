import React from 'react'
import { WizardStep } from '../../models/wizard-step'
import { WizardProgressStep } from '../wizard/WizardProgressStep'

type WizardProgressProps = {
    wizardSteps: WizardStep[]
    currentStep: number
}

export const WizardProgress = ({
    wizardSteps,
    currentStep,
}: WizardProgressProps): JSX.Element => {
    return (
        <div className="flex p-12">
            {wizardSteps.map((step: WizardStep, stepIndex: number) => (
                <WizardProgressStep
                    stepIndex={stepIndex}
                    currentStepIndex={currentStep}
                    wizardSteps={wizardSteps}
                />
            ))}
        </div>
    )
}
