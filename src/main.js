import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$mobileApp = true;

Vue.mixin({
    created() {
        if (screen.width >= 1280) this.$mobileApp = false
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
        routeByName: function (pathName) {
            this.$router.push({
                name: pathName
            })
        }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
