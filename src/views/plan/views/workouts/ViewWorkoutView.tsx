import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import { fetchWorkout } from '../../../../adapter'
import { Loader } from '../../../../shared/components/Loader'
import { ViewWorkout } from './components/ViewWorkout'

export const ViewWorkoutView = (): JSX.Element => {
    const { workoutId } = useParams()

    const { data, isLoading } = useQuery(['fetchWorkout', workoutId], () =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fetchWorkout(workoutId!)
    )

    return (
        <div className="w-full">
            {isLoading && <Loader />}
            {data && <ViewWorkout workout={data} />}
        </div>
    )
}
