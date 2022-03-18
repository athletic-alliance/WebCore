import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import { fetchWorkout } from '../../../../adapter'
import { Loader } from '../../../../shared/components/Loader'
import { ShowWorkout } from './components/ShowWorkout'

export const ShowWorkoutView = (): JSX.Element => {
    const { workoutId } = useParams()

    const { data, isLoading } = useQuery(['fetchWorkout', workoutId], () =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fetchWorkout(workoutId!)
    )

    return (
        <div className="w-full">
            {isLoading && <Loader />}
            {data && <ShowWorkout workout={data} />}
        </div>
    )
}
