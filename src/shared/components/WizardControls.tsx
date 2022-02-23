import React from 'react'

type WizardControlsProps = {
    currentStep: number,
    increaseClicked: () => void,
    decreaseClicked: () => void,
    saveClicked: () => void,
}

export const WizardControls = ({currentStep, increaseClicked, decreaseClicked, saveClicked}: WizardControlsProps) => {
    return (<div className={'flex'}>
        {currentStep > 0 &&
          <div className={'border border-slate-300 rounded rounded-md px-2 py-1 text-sm mr-3 cursor-pointer'}
               onClick={decreaseClicked}>Zurück
          </div>
        }
        {currentStep < 4 &&
          <div className={'border border-slate-300 rounded rounded-md px-2 py-1 text-sm cursor-pointer'}
               onClick={increaseClicked}>Weiter
          </div>
        }
        {currentStep === 4 &&
          <div className={'border border-slate-300 rounded rounded-md px-2 py-1 text-sm cursor-pointer'}
               onClick={saveClicked}>Speichern
          </div>
        }
    </div>)
}
