import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Common scripts importation
 */

import Home from '../views/common/Home.vue'
import Login from '../views/common/Login.vue'

/**
 * Logged In scripts importation
 */

import Portal from '../views/common/Portal.vue'
import Accounts from '../views/accounts/Accounts.vue'
import AccountsForm from '../views/accounts/AccountsForm.vue'

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
        path: '/portal',
        name: 'Portal',
        component: Portal
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts
    },
    {
        path: '/register/:account_type',
        name: 'Register',
        component: AccountsForm,
        props: true
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
