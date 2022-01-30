import React from 'react'

import {Navigate, Outlet, Routes} from 'react-router';
import {HashRouter, Route} from 'react-router-dom'

import './App.css'

import {AuthProvider} from './context/auth.context'
import {LoginView} from './views/login/LoginView';
import {PageNotFoundView} from './views/PageNotFoundView';
import {DashboardView} from './views/dashboard/DashboardView';
import {Navbar} from './shared/components/Navbar';
import {RequireAuth} from './shared/components/RequireAuth';
import {MyBoxView} from './views/my-box/MyBoxView';
import {MyPlanView} from './views/my-plan/MyPlanView';
import {CalendarView} from './views/calendar/CalendarView';
import {PlanView} from './views/plan/PlanView';

function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route>
                        <Route path="login" element={<LoginView/>}/>
                        <Route element={<SignedInLayout/>}>
                            <Route index element={<Navigate replace to="/dashboard"/>}/>
                            <Route
                                path="dashboard"
                                element={
                                    <DashboardView/>
                                }
                            />
                            <Route
                                path="plan/*"
                                element={
                                    <PlanView/>
                                }
                            />
                            <Route
                                path="my-box/*"
                                element={
                                    <MyBoxView/>
                                }
                            />
                            <Route
                                path="my-plan/*"
                                element={
                                    <MyPlanView/>
                                }
                            />
                            <Route
                                path="calendar"
                                element={
                                    <CalendarView/>
                                }
                            />
                        </Route>
                        <Route path="*" element={<PageNotFoundView/>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </AuthProvider>
    );
}

export default App;

const SignedInLayout = () => {
    return (
        <RequireAuth>
            <div className={'w-full'}>
                <Navbar/>
                <div className={'p-5'}>
                    <Outlet/>
                </div>
            </div>
        </RequireAuth>
    );
};
