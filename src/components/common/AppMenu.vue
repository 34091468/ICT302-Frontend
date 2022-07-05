<template>
    <div>
        <!-- ELEMENTS: MOBILE APP -->
        <template v-if='isMobileApp()'>
            <div class='appMenu-mobile'>
                <div class='card-header'>
                    <img src='@/assets/app/app-banner-center-main.png' alt=''>
                    <div class='sidebar'>
                        <Sidebar :menuData='MOBILE_MENU_OPTIONS'></Sidebar>
                    </div>
                    <div class='menu'>
                        <img class='menuIcon' src='@/assets/icons/accounts/account-white.png' alt=''>
                    </div>
                </div>                
            </div>
        </template>
        
        <!-- ELEMENTS: MOBILE APP -->
        <!-- END -->

        <!-- ELEMENTS: DESKTOP APP -->
        <template v-else>
            <div class='appMenu'>
                <div class='card-header'>
                    <img src='@/assets/app/app-banner-center-main.png' alt=''>
                </div>

                <div class='menu'>
                    <template v-for='item in DESKTOP_MENU_OPTIONS'>
                        <FButton
                            :key='item.label'
                            :label='item.label'
                            :expanded='true'
                            color='primary'
                            @clicked='routeByName(item.route)'
                        ></FButton>
                    </template>
                </div>
            </div>
        </template>
        <!-- ELEMENTS: DESKTOP APP -->
        <!-- END -->
    </div>
</template>

<script>

import FButton from '@/components/common/FButton.vue'
import Sidebar from '@/components/navigations/sidebar.vue'

export default {
    name: 'AppMenu',

    props: {},

    components: {
        FButton,
        Sidebar
    },

    data() {
        /**
         * Configuration for desktop menu in home page for administrator 
         * @type { object }
         */
        const DESKTOP_MENU_OPTIONS = [
            {
                label: 'Account Management',
                route: 'Accounts'
            },
            {
                label: 'Unit',
                route: ''
            },
            {
                label: 'Teaching Space',
                route: ''
            },
            {
                label: 'Reports',
                route: ''
            },
            {
                label: 'About',
                route: ''
            },
            {
                label: 'Profile',
                route: ''
            }
        ]

        /** 
         * Configuration for mobile menu in home page for administrator 
         * @type { object }
         */
        const MOBILE_MENU_OPTIONS = {
            openOnStart: false,
            items: [
                {
                    icon: 'login-black.png',
                    label: 'Account Management',
                    route: 'Accounts'
                },
                {
                    icon: 'login-black.png',
                    label: 'Unit',
                    route: ''
                },
                {
                    icon: 'login-black.png',
                    label: 'Teaching Space',
                    route: ''
                },
                {
                    icon: 'login-black.png',
                    label: 'Reports',
                    route: ''
                },
                {
                    icon: 'login-black.png',
                    label: 'About',
                    route: ''
                }
            ]
        }

        return {
            DESKTOP_MENU_OPTIONS,
            MOBILE_MENU_OPTIONS
        }
    }
}
</script>

<style scoped lang='scss'>

// --------------------------------------------------
// MOBILE STYLE(S)
// --------------------------------------------------

.appMenu-mobile .card-header {
    display: block;
    position: relative;
    width: 100%;
    border-bottom: 1px solid $color-scheme-base;
    box-sizing: content-box;
}

.appMenu-mobile .card-header .sidebar {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
}

.appMenu-mobile .card-header > img {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
}

.appMenu-mobile .card-header .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 100%;
}

.appMenu-mobile .card-header .menu > img {
    width: 25px;
    height: auto;
}

// --------------------------------------------------
// MOBILE STYLE(S) - END
// --------------------------------------------------

// --------------------------------------------------
// DESKTOP STYLE(S)
// --------------------------------------------------

.appMenu {
    // position: relative;
    // display: flex;
    // flex-direction: column;
    // gap: 25px;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
}

.appMenu .card-header {
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

.appMenu .card-header > img {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
}

.appMenu .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 60px;
}

.appMenu .menu > * {
    flex-grow: 5;
}

// --------------------------------------------------
// DESKTOP STYLE(S) - END
// --------------------------------------------------

</style>