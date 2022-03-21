import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import { AddExerciseView } from './views/exercises/AddExerciseView'
import { ExerciseOverviewView } from './views/exercises/ExerciseOverviewView'
import { OrganizeDashboardView } from './views/OrganizeDashboardView'
import { AllWorkoutsViews } from './views/workouts/AllWorkoutsViews'
import { AddWorkoutViews } from './views/workouts/AddWorkoutView'
import { ShowWorkoutView } from './views/workouts/ShowWorkoutView'
import { CreatePlanView } from './views/plan/create/CreatePlanView'

export const OrganizeLayout = (): JSX.Element => {
    return (
        <div className="w-full">
            <Outlet />
        </div>
    )
}

export const PlanView = (): JSX.Element => {
    return (
        <div className="flex">
            <div className="w-full">
                <Routes>
                    <Route element={<OrganizeLayout />}>
                        <Route index element={<OrganizeDashboardView />} />
                        <Route path="create" element={<CreatePlanView />} />
                        <Route
                            path="workout/all"
                            element={<AllWorkoutsViews />}
                        />
                        <Route
                            path="workout/create"
                            element={<AddWorkoutViews />}
                        />
                        <Route
                            path="workout/:workoutId"
                            element={<ShowWorkoutView />}
                        />
                        <Route
                            path="exercise/all"
                            element={<ExerciseOverviewView />}
                        />
                        <Route
                            path="exercise/create"
                            element={<AddExerciseView />}
                        />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
