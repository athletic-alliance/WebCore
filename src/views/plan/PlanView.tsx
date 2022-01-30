import React from 'react'
import {Outlet, Route, Routes} from 'react-router';
import {AddExerciseView} from './views/exercises/AddExerciseView';
import {ExerciseOverviewView} from './views/exercises/ExerciseOverviewView';
import {OrganizeDashboardView} from './views/OrganizeDashboardView';
import {NavLink} from 'react-router-dom';

export const PlanView = () => {
    return (<div className={'flex'}>
        <div className={'w-full'}>
            <Routes>
                <Route element={<OrganizeLayout/>}>
                    <Route index element={<OrganizeDashboardView/>}/>
                    <Route path="all" element={<ExerciseOverviewView/>}/>
                    <Route path="add" element={<AddExerciseView formSubmitted={(values: any) => {
                        console.log(values)
                    }}/>}/>
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
                    <div>Workout</div>
                    <div>
                        <NavLink
                            to={'all'}
                            key={'allExercises'}>
                            Alle Übungen
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to={'add'}
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
