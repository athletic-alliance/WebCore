import React, { useState } from 'react'
import { CreateTrainingDayModal } from '../../CreateTrainingDayModal'

export const AddPlanDayView = (): JSX.Element => {
    const [createDayModalOpen, setCreateDayModalOpen] = useState<boolean>(false)

    return (
        <div>
            <CreateTrainingDayModal
                isOpen={createDayModalOpen}
                onCancel={() => setCreateDayModalOpen(false)}
                onConfirm={() => setCreateDayModalOpen(false)}
            />
            <div>Trainingstage</div>
            <button
                onClick={() => setCreateDayModalOpen(true)}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Tag erstellen
            </button>
            <div>Tage</div>
        </div>
    )
}
