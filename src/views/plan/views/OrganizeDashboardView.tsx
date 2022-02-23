import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Loader from '../../../shared/components/Loader';
import {fetchUserPlan} from '../../../adapter/plan.adapter';
import {format} from 'date-fns'
import {ShowWorkout} from './workouts/components/ShowWorkout';

export const OrganizeDashboardView = () => {
    const {data, isLoading} = useQuery(['fetchUserPlan'], () => fetchUserPlan());
    const [currentDay, setCurrentDay] = useState<any>(null);

    return (
        <div>
            <div>
                <div>Aktueller Trainingsplan</div>
                <div>
                    {isLoading && <Loader/>}
                    {data &&
                      <>
                        <h1 className={'text-5xl font-light'}>{data.name}</h1>
                        <div
                          className={'text-slate-700'}>{format(new Date(data.startDate), 'dd.MM.yyyy')} - {format(new Date(data.endDate), 'dd.MM.yyyy')}</div>
                        <div className={'mt-5'}>
                          <div className={'mb-2'}>Dein heutiges Training</div>
                          <h2 className={'text-2xl font-light'}>Warm-Up</h2>
                            {data.trainingDays[0].warmUp.description}
                          <h2 className={'text-2xl font-light'}>Zusätzliches Training</h2>
                            {data.trainingDays[0].additionalTraining.description}
                          <h2 className={'text-2xl font-light mt-4'}>Workout</h2>
                          <div>
                            <ShowWorkout workout={data.trainingDays[0].workout}/>
                          </div>
                        </div>
                      </>
                    }
                </div>
            </div>
        </div>
    );
};
