import React, { useMemo } from 'react'
import { nanoid } from 'nanoid'
import jwtDecode from 'jwt-decode'
import { UserRole } from '../../enums/user-role.enum'
import { AUTHTOKENKEY, ROLESCHEMAKEY } from '../../constants'
import { SidebarItem } from './SidebarItem'
import { SidebarNavItem } from '../../models/sidebar-nav-item'
import { TokenContext } from '../../context/token.context'

const navigation: SidebarNavItem[] = [
    {
        name: 'Home',
        sub: [
            {
                name: 'Mein Dashboard',
                href: '/dashboard',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
        ],
    },
    {
        name: 'Training',
        sub: [
            {
                name: 'Mein Plan',
                href: '/plan',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
            {
                name: 'Plan erstellen',
                href: '/plan/create',
                visibleFor: [UserRole.Coach],
            },
            {
                name: 'Workouts',
                href: '/plan/workout/all',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
            {
                name: 'Workout erstellen',
                href: '/plan/workout/create',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
            {
                name: 'Übungen',
                href: '/plan/exercise/all',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
            {
                name: 'Übungen erstellen',
                href: '/plan/exercise/create',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
        ],
    },
    {
        name: 'Administration',
        sub: [
            {
                name: 'Mitglieder verwalten',
                href: '/plan',
                visibleFor: [UserRole.Athlete, UserRole.Coach],
            },
        ],
    },
    // {name: 'Meine Box', href: '/my-box', icon: <CgLayoutPin className={'w-5 h-5'}/>},
    // {name: 'Mein Plan', href: '/my-plan', icon: <CgFormatSeparator className={'w-5 h-5'}/>},
    // {name: 'Kalendar', href: '/calendar', icon: <CgCalendar className={'w-5 h-5'}/>},
]

export const Sidebar = (): JSX.Element => {
    const jwt = localStorage.getItem(AUTHTOKENKEY) as string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken = jwtDecode(jwt) as any

    const roles = useMemo(() => decodedToken[ROLESCHEMAKEY], [decodedToken])

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <TokenContext.Provider value={{ roles }}>
            <div>
                <nav>
                    <ul className="px-5">
                        {navigation.map((item: SidebarNavItem) => (
                            <SidebarItem item={item} key={nanoid()} />
                        ))}
                    </ul>
                </nav>
            </div>
        </TokenContext.Provider>
    )
}
