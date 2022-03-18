import React from 'react'

import { Navigate, Outlet, Routes } from 'react-router'
import { HashRouter, Route } from 'react-router-dom'

import './App.css'

import { AuthProvider } from './context/auth.context'
import { LoginView } from './views/login/LoginView'
import { PageNotFoundView } from './views/PageNotFoundView'
import { DashboardView } from './views/dashboard/DashboardView'
import { Navbar } from './shared/components/Navbar'
import { RequireAuth } from './shared/components/RequireAuth'
import { MyBoxView } from './views/my-box/MyBoxView'
import { MyPlanView } from './views/my-plan/MyPlanView'
import { CalendarView } from './views/calendar/CalendarView'
import { PlanView } from './views/plan/PlanView'
import { Sidebar } from './shared/components/Sidebar'

const SignedInLayout = (): JSX.Element => {
    return (
        <RequireAuth>
            <>
                <Navbar />
                <main className="flex flex-auto bg-slate-800">
                    <div className="max-w-container relative mx-auto flex w-full">
                        <div className="w-full flex-none lg:grid lg:grid-cols-6 lg:gap-8">
                            <div className="-mx-4 py-4 px-4 sm:-mx-6 sm:py-4 sm:px-6  lg:mx-0 lg:pl-0 lg:pr-8">
                                <Sidebar />
                            </div>
                            <div className="relative col-span-5 bg-white lg:-ml-8 lg:shadow-md">
                                <div className="relative py-8 px-12 sm:py-12">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        </RequireAuth>
    )
}

const App = (): JSX.Element => {
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route>
                        <Route path="login" element={<LoginView />} />
                        <Route element={<SignedInLayout />}>
                            <Route
                                index
                                element={<Navigate replace to="/dashboard" />}
                            />
                            <Route
                                path="dashboard"
                                element={<DashboardView />}
                            />
                            <Route path="plan/*" element={<PlanView />} />
                            <Route path="my-box/*" element={<MyBoxView />} />
                            <Route path="my-plan/*" element={<MyPlanView />} />
                            <Route path="calendar" element={<CalendarView />} />
                        </Route>
                        <Route path="*" element={<PageNotFoundView />} />
                    </Route>
                </Routes>
            </HashRouter>
        </AuthProvider>
    )
}

export default App
