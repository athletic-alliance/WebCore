import React, {useState} from 'react'
import {WizardProgress} from '../../../../../shared/components/WizardProgress';
import {WizardControls} from '../../../../../shared/components/WizardControls';
import {PlanDetailsView} from './wizard-steps/PlanDetailsView';
import {AddPlanDayView} from './wizard-steps/AddPlanDayView';
import {AssignPlanToUserView} from './wizard-steps/AssignPlanToUserView';
import {PlanPreviewView} from './wizard-steps/PlanPreviewView';

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
    const [planName, setPlanName] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


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
                <div className={'p-3 border-r border-gray-200 pr-10'}>
                    <WizardProgress currentStep={currentStep} wizardSteps={wizardSteps}/>
                </div>
                <div className={'mb-5 py-3 px-6'}>
                    {currentStep === 0 &&
                      <PlanDetailsView planName={planName} nameChanged={setPlanName}
                                       startDate={startDate} startDateChanged={setStartDate}
                                       endDate={endDate} endDateChanged={setEndDate}/>}
                    {currentStep === 1 && <AddPlanDayView/>}
                    {currentStep === 2 && <AssignPlanToUserView/>}
                    {currentStep === 3 && <PlanPreviewView/>}
                </div>
            </div>
            <div className={'flex justify-end'}>
                <WizardControls currentStep={currentStep} increaseClicked={increaseStep} decreaseClicked={decreaseStep}
                                saveClicked={save}/>
            </div>
        </div>
    </div>)
}
