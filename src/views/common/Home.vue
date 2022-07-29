<template>
    <div class='base'>
        <!-- ELEMENTS: MOBILE APP -->
        <template v-if='isMobileApp()'>
            <div class='root-mobile'>
                <div class='card-header'>
                    <img src='@/assets/app/app-mu-banner-left-black.png' alt=''>
                    <div class='menu'>
                        <img class='menuIcon' src='@/assets/icons/navigations/login-white.png' alt='' @click='routeByName("Login")'>
                    </div>
                </div>
            </div>
        </template>
        
        <!-- ELEMENTS: MOBILE APP -->
        <!-- END -->

        <!-- ELEMENTS: DESKTOP APP -->
        <template v-else>
            <div class='root'>
                <div class='card-header'>
                    <img src='@/assets/app/app-mulong-banner-left-black.png' alt=''>
                </div>

                <div class='menu'>
                    <div class='menu-login '>
                        <FButton
                        label='Login'
                        color='primary'
                        outlined
                        @clicked='routeByName("Login")'></FButton>
                    </div>
                </div>
            </div>
            

        </template>
        <!-- ELEMENTS: DESKTOP APP -->
        <!-- END -->
    </div>
</template>

<script>

// import { AInstance } from '../toolbox/TAxios.js'

import FButton from '@/components/common/FButton.vue'

export default {
    name: 'Home',
    components: {
        FButton
    },

    mounted() {
        if ( localStorage.group_type !== null && localStorage.group_type !== undefined ) {
            if ( localStorage.group_type === 5 || localStorage.group_type === 'STUDENT' ) this.routeByName( 'StudentPortal', {
                account_id: localStorage.account_id
            } )

            else {
                this.routeByName( 'Portal' )
            }
        }
    },

    methods: {

    }
}
</script>

<style scoped lang='scss'>

// --------------------------------------------------
// MOBILE STYLE(S)
// --------------------------------------------------

.root-mobile .card-header {
    display: block;
    position: relative;
    width: 100%;
    border-bottom: 1px solid $color-scheme-base;
    box-sizing: content-box;
}

.root-mobile .card-header > img {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
}

.root-mobile .card-header .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 100%;
}

.root-mobile .card-header .menu > img {
    width: 25px;
    height: auto;
}

// --------------------------------------------------
// MOBILE STYLE(S) - END
// --------------------------------------------------

// --------------------------------------------------
// DESKTOP STYLE(S)
// --------------------------------------------------

.root {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    height: 100%;
}

.root .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: calc(100vw * (1 / 6));
    border-bottom: 1px solid $color-scheme-base;
    box-sizing: content-box;
    background-color: $color-main;
}

.root .card-header > img {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
}

.root .menu {
    position: relative;
    display: block;
    width: 100%;
    height: 50px;
}

.root .menu-login {
    position: absolute;
    display: block;
    width: 150px;
    height: 100%;
    right: 25px;
    top: 0;
}

// --------------------------------------------------
// DESKTOP STYLE(S) - END
// --------------------------------------------------

</style>