import React, {useContext} from 'react'
import {SidebarNavItem, SidebarSubNavItem} from '../../models/sidebar-nav-item';
import {SidebarSubItem} from './SidebarSubItem';
import {TokenContext} from '../../context/token.context';
import {UserRole} from '../../enums/user-role.enum';

type SidebarItemProps = {
    item: SidebarNavItem,
}

export const SidebarItem = ({item}: SidebarItemProps) => {
    const {roles} = useContext(TokenContext)

    const itemVisible = (subItem: SidebarSubNavItem) => {
        const roleNames = subItem.visibleFor.map((role: UserRole) => role.toString());
        return roleNames.some((roleName: string) => roles.includes(roleName));
    }

    return (
        <li className={'mt-12 lg:mt-8'}>
            <h5
                className={
                    'mb-8 font-semibold text-slate-900 dark:text-slate-200 lg:mb-3'
                }
            >
                {item.name}
            </h5>
            <ul
                className={
                    'space-y-6 border-l border-slate-100 dark:border-slate-800 lg:space-y-2'
                }
            >
                {item.sub?.filter((item: SidebarSubNavItem) => itemVisible(item)).map((subItem: SidebarSubNavItem, idx: number) => (<SidebarSubItem item={subItem} key={idx}/>))}
            </ul>
        </li>
    )
}
