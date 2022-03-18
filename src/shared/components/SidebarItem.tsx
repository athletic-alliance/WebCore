import React, { useContext } from 'react'

import { nanoid } from 'nanoid'
import {
    SidebarNavItem,
    SidebarSubNavItem,
} from '../../models/sidebar-nav-item'
import { SidebarSubItem } from './SidebarSubItem'
import { TokenContext } from '../../context/token.context'
import { UserRole } from '../../enums/user-role.enum'

type SidebarItemProps = {
    item: SidebarNavItem
}

export const SidebarItem = ({ item }: SidebarItemProps): JSX.Element => {
    const { roles } = useContext(TokenContext)

    const itemVisible = (subItem: SidebarSubNavItem): boolean => {
        if (roles.includes(UserRole.Admin)) {
            return true
        }
        const roleNames = subItem.visibleFor.map((role: UserRole) =>
            role.toString()
        )
        return roleNames.some((roleName: string) => roles.includes(roleName))
    }

    return (
        <li className="mt-12 lg:mt-8">
            <h5 className="mb-8 font-semibold text-white lg:mb-3">
                {item.name}
            </h5>
            <ul className="space-y-6 border-l border-slate-100 lg:space-y-2">
                {item.sub
                    ?.filter((itm: SidebarSubNavItem) => itemVisible(itm))
                    .map((subItem: SidebarSubNavItem) => (
                        <SidebarSubItem item={subItem} key={nanoid()} />
                    ))}
            </ul>
        </li>
    )
}
