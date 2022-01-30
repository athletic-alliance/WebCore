import React from 'react'
import {useQuery} from 'react-query';
import {fetchExercises} from '../../../../adapter';
import {ExerciseList} from './components/ExerciseList';

export const ExerciseOverviewView = () => {

    const fetchExercisesQuery = useQuery('fetchExercises', fetchExercises);

    return (<div className={`w-full`}>Exercises
            {(fetchExercisesQuery.data && !fetchExercisesQuery.isLoading) &&
              <ExerciseList exercises={fetchExercisesQuery.data}/>
            }
    </div>)
}
