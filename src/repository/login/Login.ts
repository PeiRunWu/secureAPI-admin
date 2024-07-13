export interface LoginEntity {
    username: string,
    password: string
}

export interface MenuItem {
    id: string;
    path: string;
    name: string;
    icon: string;
    hideInMenu: boolean;
    routes: MenuItem[];
}