import React from 'react'
import {ExerciseDto} from '../../../../../dtos/exercises/exercise.dto';
import {useMutation, useQueryClient} from 'react-query';
import {deleteExercise} from '../../../../../adapter';
import {notifyError, notifySuccess} from '../../../../../notifications';

type ExerciseListProps = {
    exercises: ExerciseDto[]
}

export const ExerciseList = ({exercises}: ExerciseListProps) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation((id: number) => deleteExercise(id),
        {
            onSuccess: () => {
                notifySuccess('Übung gelöscht')
                queryClient.invalidateQueries('fetchExercises')
            },
            onError: () => {
                notifyError('Übung konnte nicht gelöscht werden')
            },
        });

    return (<div className="w-full">
        {exercises.map((exercise: ExerciseDto, index: number) => (
            <ExerciseListItem deleteClicked={(id: number) => deleteMutation.mutate(id)} key={index}
                              exercise={exercise}/>))}
    </div>);
}

type ExerciseListItemProps = {
    exercise: ExerciseDto
    deleteClicked: (id: number) => void
}

export const ExerciseListItem = ({exercise, deleteClicked}: ExerciseListItemProps) => {
    return (<div className="py-1 px-2 border border-gray-300 w-full rounded-sm my-1 text-sm flex justify-between">
        <div>
            <span className={'block font-bold'}>{exercise.name}</span>
            <span className={'block'}>{exercise.type}</span>
        </div>
        <div className="self-center" onClick={() => deleteClicked(exercise.id)}>
            Löschen
        </div>
    </div>)
}
