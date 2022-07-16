import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
Vue.prototype.$mobileApp = true;

Vue.use(Buefy)

Vue.mixin({
    created() {
        if (screen.width >= 1280) this.$mobileApp = false
        window.addEventListener( 'beforeunload', function () {
            this.localStorage.clear()
        })
    },
    methods: {
        /**
         * Checks if the user is currently using desktop or mobile browser.
         * @returns { Boolean }             True if this is mobile app.
         */
        isMobileApp: function () { return this.$mobileApp === true },

        /**
         * Routes the user to a location defined in Router's indexJS
         * @param { string } pathName       Name of the path
         */
        routeByName: function (pathName, params = null) {
            if (pathName === '') return
            if (this.$route.name === pathName) return
            if (params === null) {
                this.$router.push({
                    name: pathName
                })
            }
            else if (params !== null) {
                this.$router.push({
                    name: pathName,
                    params: params
                })
            }
        },

        /**
         * Compares two dates.
         * @param { Date } lhs 
         * @param { Date } rhs 
         * @returns { Boolean } True if date is same.
         */
        compareDates(lhs, rhs) {
            if ( !(lhs instanceof Date) && !(rhs instanceof Date) ) return false
            if ( lhs.getDate() !== rhs.getDate() ) return false
            if ( lhs.getMonth() !== rhs.getMonth() ) return false
            if ( lhs.getFullYear() !== rhs.getFullYear() ) return false
            return true
        },

        /**
         * Checks if a date is bigger than the other.
         * @param { Date } compareFrom 
         * @param { Date } compareTo 
         * @returns { Boolean | null }
         */
        isDateBiggerThan(compareFrom, compareTo) {
            if ( !( compareFrom instanceof Date ) && !( compareTo instanceof Date ) ) return null
            return compareFrom.getTime() > compareTo.getTime()
        }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
