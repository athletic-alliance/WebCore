import React, { useState } from 'react'
import { WizardProgress } from '../../../../../shared/components/WizardProgress'
import { WizardControls } from '../../../../../shared/components/WizardControls'
import { PlanDetailsView } from './wizard-steps/PlanDetailsView'
import { AddPlanDayView } from './wizard-steps/AddPlanDayView'
import { AssignPlanToUserView } from './wizard-steps/AssignPlanToUserView'
import { PlanPreviewView } from './wizard-steps/PlanPreviewView'

const wizardSteps = [
    {
        caption: 'Details',
    },
    {
        caption: 'Trainingstage',
    },
    {
        caption: 'Zuweisen',
    },
    {
        caption: 'Vorschau',
    },
]

export const CreatePlanView = (): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [planName, setPlanName] = useState<string>('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const increaseStep = (): void => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const decreaseStep = (): void => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const save = (): void => {
        console.log('saved it')
    }

    return (
        <div>
            <div>
                <h1 className="mb-5 text-2xl">Neuen Plan erstellen</h1>

                <div>
                    <WizardProgress
                        currentStep={currentStep}
                        wizardSteps={wizardSteps}
                    />
                </div>
                <div className="flex">
                    <div className="mb-5 py-3 px-6">
                        {currentStep === 0 && (
                            <PlanDetailsView
                                planName={planName}
                                nameChanged={setPlanName}
                                startDate={startDate}
                                startDateChanged={setStartDate}
                                endDate={endDate}
                                endDateChanged={setEndDate}
                            />
                        )}
                        {currentStep === 1 && <AddPlanDayView />}
                        {currentStep === 2 && <AssignPlanToUserView />}
                        {currentStep === 3 && <PlanPreviewView />}
                    </div>
                </div>
                <div className="flex justify-end">
                    <WizardControls
                        currentStep={currentStep}
                        increaseClicked={increaseStep}
                        decreaseClicked={decreaseStep}
                        saveClicked={save}
                    />
                </div>
            </div>
        </div>
    )
}
