import React, {useState} from 'react'
import {CreateTrainingDayModal} from '../../CreateTrainingDayModal';

type AddPlanDayViewProps = {}

export const AddPlanDayView = ({}: AddPlanDayViewProps) => {
    const [createDayModalOpen, setCreateDayModalOpen] =
        useState<boolean>(false);

    return (<div>
        <CreateTrainingDayModal isOpen={createDayModalOpen}
                                onCancel={() => setCreateDayModalOpen(false)}
                                onConfirm={() => setCreateDayModalOpen(false)}/>
        <div>Trainingstage</div>
        <button
            onClick={() => setCreateDayModalOpen(true)}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Tag erstellen
        </button>
        <div>Tage</div>
    </div>)
}
