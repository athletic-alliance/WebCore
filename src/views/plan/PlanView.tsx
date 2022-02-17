import React from 'react'
import {Outlet, Route, Routes} from 'react-router';
import {AddExerciseView} from './views/exercises/AddExerciseView';
import {ExerciseOverviewView} from './views/exercises/ExerciseOverviewView';
import {OrganizeDashboardView} from './views/OrganizeDashboardView';
import {NavLink} from 'react-router-dom';
import {AllWorkoutsViews} from './views/workouts/AllWorkoutsViews';
import {AddWorkoutsViews} from './views/workouts/AddWorkoutView';
import {ShowWorkoutView} from './views/workouts/ShowWorkoutView';

export const PlanView = () => {
    return (<div className={'flex'}>
        <div className={'w-full'}>
            <Routes>
                <Route element={<OrganizeLayout/>}>
                    <Route index element={<OrganizeDashboardView/>}/>
                    <Route path="workout/all" element={<AllWorkoutsViews/>}/>
                    <Route path="workout/add" element={<AddWorkoutsViews/>}/>
                    <Route path="workout/:workoutId" element={<ShowWorkoutView/>}/>
                    <Route path="exercise/all" element={<ExerciseOverviewView/>}/>
                    <Route path="exercise/add" element={<AddExerciseView/>}/>
                </Route>
            </Routes>
        </div>
    </div>)
}


export const OrganizeLayout = () => {
    return (
        <div className={'w-full'}>
            <Outlet/>
        </div>
    );
}
