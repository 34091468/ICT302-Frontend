import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Common scripts importation
 */

import Home from '../views/common/Home.vue'
import AdminHome from '../views/common/AdminHome.vue'
import Login from '../views/common/Login.vue'

import AccountsMain from '../views/accounts/AccountsMain.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/administrator',
        name: 'Administrator',
        component: AdminHome
    },
    {
        path: '/accounts',
        name: 'accounts',
        component: AccountsMain
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
