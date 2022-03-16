import React from 'react'
import { useQuery } from 'react-query'
import { fetchWorkouts } from '../../../../adapter/workout.adapter'
import { Loader } from '../../../../shared/components/Loader'
import { WorkoutList } from './components/WorkoutList'

export const AllWorkoutsViews = (): JSX.Element => {
    const { data, isLoading } = useQuery('fetchWorkouts', () =>
        fetchWorkouts(true)
    )

    return (
        <div className="w-full">
            {isLoading && <Loader />}
            {data && <WorkoutList workouts={data} />}
        </div>
    )
}
