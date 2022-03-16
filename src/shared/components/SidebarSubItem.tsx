import React from 'react'
import {SidebarSubNavItem} from '../../models/sidebar-nav-item';
import {NavLink} from 'react-router-dom';

type SidebarSubItemProps = {
    item: SidebarSubNavItem,
}

export const SidebarSubItem = ({item}: SidebarSubItemProps) => {
    return (<NavLink
        to={item.href}
        className={'-ml-px block flex border-l border-transparent pl-4 text-slate-700 text-sm hover:border-slate-400 hover:text-blue-500'}
    >
        {/*<div className={'mr-2'}>{subItem.icon}</div>*/}
        <div className={''}>{item.name}</div>
    </NavLink>)
}
