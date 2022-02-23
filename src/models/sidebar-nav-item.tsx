import {UserRole} from '../enums/user-role.enum';

export interface SidebarNavItem {
    name: string;
    sub: SidebarSubNavItem[];
}

export interface SidebarSubNavItem {
    name: string;
    href: string;
    visibleFor: UserRole[]
}
