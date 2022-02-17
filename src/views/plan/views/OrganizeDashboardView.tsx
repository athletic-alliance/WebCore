import React from 'react'
import {useQuery} from 'react-query';
import {fetchWorkout} from '../../../adapter/workout.adapter';
import Loader from '../../../shared/components/Loader';
import {ShowWorkout} from './workouts/components/ShowWorkout';

export const OrganizeDashboardView = () => {

    const {data, isLoading} = useQuery(['fetchWorkout'], () => fetchWorkout(1));

    return (<div>
        <div>
            <div>Heutiges Workout</div>
            <div>
                {isLoading && <Loader/>}
                {data &&
                  <ShowWorkout workout={data}/>
                }
            </div>
        </div>
    </div>)
}
