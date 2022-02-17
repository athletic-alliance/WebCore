import {NavLink} from 'react-router-dom';

const navigation = [
    {
        name: 'Home', sub: [
            {name: 'Mein Dashboard', href: '/dashboard'},
        ]
    },
    {
        name: 'Training', sub: [
            {name: 'Mein Plan', href: '/plan'},
            {name: 'Workouts', href: '/plan/workout/all'},
            {name: 'Workout erstellen', href: '/plan/workout/add'},
            {name: 'Übungen', href: '/plan/exercise/all'},
            {name: 'Übungen erstellen', href: '/plan/exercise/add'},
        ]
    },
    {
        name: 'Administration', sub: [
            {name: 'Mitglieder verwalten', href: '/plan'},
        ]
    },
    // {name: 'Meine Box', href: '/my-box', icon: <CgLayoutPin className={'w-5 h-5'}/>},
    // {name: 'Mein Plan', href: '/my-plan', icon: <CgFormatSeparator className={'w-5 h-5'}/>},
    // {name: 'Kalendar', href: '/calendar', icon: <CgCalendar className={'w-5 h-5'}/>},
]

export const Sidebar = () => {
    return (<div className={''}>
        <nav className={''}>
            <ul>
                {navigation.map((item, index: number) => (
                    <li className={'mt-12 lg:mt-8'}>
                        <h5 className={'mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200'}>{item.name}</h5>
                        <ul className={'space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800'}>
                            {item.sub?.map((subItem: any) => (
                                <NavLink to={subItem.href} key={index}
                                         className={'flex text-sm block border-l pl-4 -ml-px border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900'}>
                                    {/*<div className={'mr-2'}>{subItem.icon}</div>*/}
                                    <div className={''}>{subItem.name}</div>
                                </NavLink>
                            ))}
                        </ul>

                    </li>
                ))}
            </ul>
        </nav>
    </div>)
}
