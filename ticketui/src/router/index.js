import Vue from 'vue'
import VueRouter from 'vue-router'
import {musteri, admin} from './auth-guard';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home')
    },
    {
        path: '/dashboard/ticket/:id',
        name: 'ticket',
        component: () => import('@/components/ticket')
    },
    {
        path: '/dashboard/admin/alltickets',
        name: 'ticketlist',
        component: () => import('@/components/admin/ticketList'),
        beforeEnter: admin,
    },
   
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard/Layout'),
        beforeEnter: musteri,
        children: [
            {
                path: 'item/adem',
                name: 'dashboard.ticket',
                component: () => import('../views/Dashboard/ActiveTickets'),
                beforeEnter: musteri,
            },
            {
                path: 'alltickets',
                name: 'dashboard.alltickets',
                component: () => import('../views/Dashboard/AllTickets'),
                beforeEnter: musteri,
            },
            {
                path: 'activetickets',
                name: 'dashboard.activetickets',
                component: () => import('../views/Dashboard/ActiveTickets'),
                beforeEnter: musteri,
            },
            {
                path: 'continuingtickets',
                name: 'dashboard.continuingtickets',
                component: () => import('../views/Dashboard/ContTickets'),
                beforeEnter: musteri,
            },
            {
                path: 'passivetickets',
                name: 'dashboard.logs',
                component: () => import('../views/Dashboard/PassiveTickets'),
                beforeEnter: musteri,
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
