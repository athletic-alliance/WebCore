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

const navItems = [
    { name: 'Workouts', to: 'workout/all' },
    { name: 'Workout erstellen', to:'workout/add' },
    { name: 'Übungen', to: 'exercise/all' },
    { name: 'Übungen erstellen', to: 'exercise/add' },
]

export const OrganizeLayout = () => {
    return (
        <div className={'w-full'}>
            <div className={'flex'}>
                <ul className="text-sm font-semibold text-gray-700 px-2 py-3">
                    {navItems.map((item: any, index: number) =>
                        (<li key={index} className="block px-2 py-2 border border-transparent whitespace-nowrap hover:text-blue-500 hover:border hover:border-gray-300 rounded rounded-sm cursor-pointer">
                            <NavLink to={item.to} key={index}>
                                {item.name}
                            </NavLink>
                        </li>)
                    )}
                </ul>
                <Outlet/>
            </div>
        </div>
    );
}
