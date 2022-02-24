import React from 'react';
import {Outlet, Route, Routes} from 'react-router';
import {AddExerciseView} from './views/exercises/AddExerciseView';
import {ExerciseOverviewView} from './views/exercises/ExerciseOverviewView';
import {OrganizeDashboardView} from './views/OrganizeDashboardView';
import {AllWorkoutsViews} from './views/workouts/AllWorkoutsViews';
import {AddWorkoutsViews} from './views/workouts/AddWorkoutView';
import {ShowWorkoutView} from './views/workouts/ShowWorkoutView';
import {CreatePlanView} from './views/plan/create/CreatePlanView';

export const PlanView = () => {
  return (
      <div className={'flex'}>
        <div className={'w-full'}>
          <Routes>
            <Route element={<OrganizeLayout/>}>
              <Route index element={<OrganizeDashboardView/>}/>
              <Route path="create" element={<CreatePlanView/>}/>
              <Route path="workout/all" element={<AllWorkoutsViews/>}/>
              <Route path="workout/create" element={<AddWorkoutsViews/>}/>
              <Route path="workout/:workoutId" element={<ShowWorkoutView/>}/>
              <Route path="exercise/create" element={<ExerciseOverviewView/>}/>
              <Route path="exercise/all" element={<AddExerciseView/>}/>
            </Route>
          </Routes>
        </div>
      </div>
  );
};

export const OrganizeLayout = () => {
  return (
      <div className={'w-full'}>
        <Outlet/>
      </div>
  );
};
