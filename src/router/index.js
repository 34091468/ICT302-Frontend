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
import StudentPortal from '../views/common/StudentPortal.vue'
import Accounts from '../views/accounts/Accounts.vue'
import AccountsForm from '../views/accounts/AccountsForm.vue'
import AccountsEdit from '../views/accounts/AccountsEdit.vue'
import Units from '../views/units/Units.vue'
import UnitForm from '../views/units/UnitForm.vue'
import UnitView from '../views/units/UnitView.vue'
import ClassForm from '../views/classes/EnrolmentClassForm.vue'
import ClassView from '../views/classes/EnrolmentClassView.vue'
import StudentClasses from '../views/classes/StudentClasses.vue'
import TeachingSpaces from '../views/teaching-space/TeachingSpaces.vue'

import StudentLearningActivity from '../views/learning-activity/StudentLearningActivity.vue'

// import Test from '../views/Test.vue'

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
        path: '/student-portal/:account_id',
        name: 'StudentPortal',
        component: StudentPortal,
        props: true
    },
    {
        path: '/student-portal/classes/:account_id/:unit_id/:enrolment_id',
        name: 'StudentClasses',
        component: StudentClasses,
        props: true
    },
    {
        path: '/student-portal/learning-activities/:account_id/:unit_id/:enrolment_id/:class_list_id/:class_id',
        name: 'StudentLearningActivity',
        component: StudentLearningActivity,
        props: true
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
        path: '/accounts-edit/:accountId',
        name: 'EditAccount',
        component: AccountsEdit,
        props: true
    },
    {
        path: '/units',
        name: 'Units',
        component: Units
    },
    {
        path: '/units/create',
        name: 'UnitForm',
        component: UnitForm
    },
    {
        path: '/units/view/:unit_id',
        name: 'UnitView',
        component: UnitView,
        props: true
    },
    {
        path: '/class/create/:unit_id',
        name: 'classForm',
        component: ClassForm,
        props: true
    },
    {
        path: '/class/view/:unit_id/:class_id',
        name: 'classView',
        component: ClassView,
        props: true
    },
    {
        path: '/teaching-spaces',
        name: 'TeachingSpaces',
        component: TeachingSpaces,
    },
    {
        path: '/test',
        name: 'Test',
        component: UnitView
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
    routes,
    mode: 'history'
})

export default router
