import React from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarSubNavItem } from '../../models/sidebar-nav-item'

type SidebarSubItemProps = {
    item: SidebarSubNavItem
}

export const SidebarSubItem = ({ item }: SidebarSubItemProps): JSX.Element => {
    return (
        <NavLink
            to={item.href}
            className="-ml-px block flex border-l border-transparent pl-4 text-slate-300 text-sm hover:border-slate-400 hover:text-blue-500"
        >
            <div className="">{item.name}</div>
        </NavLink>
    )
}
