import React from 'react'
import {Outlet, Route, Routes} from 'react-router';
import {AddExerciseView} from './views/exercises/AddExerciseView';
import {ExerciseOverviewView} from './views/exercises/ExerciseOverviewView';
import {OrganizeDashboardView} from './views/OrganizeDashboardView';
import {NavLink} from 'react-router-dom';
import {AllWorkoutsViews} from './views/workouts/AllWorkoutsViews';
import {AddWorkoutsViews} from './views/workouts/AddWorkoutView';

export const PlanView = () => {
    return (<div className={'flex'}>
        <div className={'w-full'}>
            <Routes>
                <Route element={<OrganizeLayout/>}>
                    <Route index element={<OrganizeDashboardView/>}/>
                    <Route path="workout/all" element={<AllWorkoutsViews/>}/>
                    <Route path="workout/add" element={<AddWorkoutsViews/>}/>
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
            <div className={'flex'}>
                <div>
                    <div>Plan</div>
                    <div>
                        <NavLink
                            to={'workout/all'}
                            key={'allWorkouts'}>
                            Alle Workouts
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to={'workout/add'}
                            key={'addWorkout'}>
                            Workout erstellen
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to={'exercise/all'}
                            key={'allExercises'}>
                            Alle Übungen
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to={'exercise/add'}
                            key={'addExercise'}>
                            Übung hinzufügen
                        </NavLink>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}
