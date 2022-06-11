import React from 'react'
import { useQuery } from 'react-query'
import { format } from 'date-fns'
import { Loader } from '../../../shared/components/Loader'
import { fetchUserPlan } from '../../../adapter'
import { ViewWorkout } from './workouts/components/ViewWorkout'
import { notifyError } from '../../../notifications'

export const OrganizeDashboardView = (): JSX.Element => {
    const { data, isLoading } = useQuery(
        ['fetchUserPlan'],
        () => fetchUserPlan(),
        {
            onError: () =>
                notifyError('Trainingsplan konnte nicht geladen werden'),
        }
    )

    return (
        <div>
            <div>
                <div>Aktueller Trainingsplan</div>
                <div>
                    {isLoading && <Loader />}
                    {data && (
                        <>
                            <h1 className="font-light text-5xl">{data.name}</h1>
                            <div className="text-slate-700">
                                {format(new Date(data.startDate), 'dd.MM.yyyy')}{' '}
                                - {format(new Date(data.endDate), 'dd.MM.yyyy')}
                            </div>
                            <div className="mt-5">
                                <div className="mb-2">
                                    Dein heutiges Training
                                </div>
                                <h2 className="font-light text-2xl">Warm-Up</h2>
                                {data.trainingDays[0].warmUp.description}
                                <h2 className="font-light text-2xl">
                                    Zusätzliches Training
                                </h2>
                                {
                                    data.trainingDays[0].additionalTraining
                                        .description
                                }
                                <h2 className="mt-4 font-light text-2xl">
                                    Workout
                                </h2>
                                <div>
                                    <ViewWorkout
                                        workout={data.trainingDays[0].workout}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
