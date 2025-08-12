import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        link: '/',
    },
    {
        id: 3,
        label: 'MENUITEMS.POSTS.TEXT',
        icon: 'sliders',
        link: '/post',
    },
    {
        id: 4,
        label: 'MENUITEMS.RESERVATIONS.TEXT',
        icon: 'cpu',
        link: '/reservation',
    },
    {
        id: 5,
        label: 'MENUITEMS.CALENDARS.TEXT',
        icon: 'pie-chart',
        link: '/calendrier',
    },
];

