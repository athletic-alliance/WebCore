import React, {useState} from 'react'
import {WizardProgress} from '../../../shared/components/WizardProgress';
import {WizardControls} from '../../../shared/components/WizardControls';

const wizardSteps = [
    {
        caption: 'Details'
    },
    {
        caption: 'Trainingstage'
    },
    {
        caption: 'Zuweisen'
    },
    {
        caption: 'Vorschau'
    },
]

export const CreatePlanView = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const increaseStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const decreaseStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const save = () => {

    }

    return (<div>
        <div>
            <h1 className={'text-5xl mb-5'}>Neuen Plan erstellen</h1>
            <div className={'flex'}>
                <div className={'p-3'}>
                    <WizardProgress currentStep={currentStep} wizardSteps={wizardSteps}/>
                </div>
                <div className={'mb-5 py-3 px-6'}>
                    {currentStep === 0 && <div>Details des Plans</div>}
                    {currentStep === 1 && <div>Tage erstellen</div>}
                    {currentStep === 2 && <div>Zuweisen</div>}
                    {currentStep === 3 && <div>Vorschau</div>}
                </div>
            </div>
            <div className={'flex justify-end'}>
                <WizardControls currentStep={currentStep} increaseClicked={increaseStep} decreaseClicked={decreaseStep}
                                saveClicked={save}/>
            </div>
        </div>
    </div>)
}
