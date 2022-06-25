<template>
    <div class='base'>
        <!-- ELEMENTS: MOBILE APP -->
        <template v-if='isMobileApp()'>
            <div class='root-mobile'>
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
            <div class='root'>
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

import Sidebar from '@/components/navigations/sidebar.vue'
import FButton from '@/components/common/FButton.vue'

export default {
    name: 'Home',
    components: {
        Sidebar,
        FButton
    },

    mounted() {

    },

    data() {

        /**
         * Configuration for desktop menu in home page for administrator 
         * @type { object }
         */
        const DESKTOP_MENU_OPTIONS = [
            {
                icon: 'login-black.png',
                label: 'Account Management',
                route: ''
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
            },
            {
                icon: 'login-black.png',
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
                    route: ''
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
    },

    methods: {

        /**
         * Event to determine if the item is hovered Used in Menu Item.
         */
        onMenuItemHovered(item, hovered) {
            item.hovered = hovered
        },
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

.root-mobile .card-header .sidebar {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
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
    // position: relative;
    // display: flex;
    // flex-direction: column;
    // gap: 25px;
    position: relative;
    display: block;
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 60px;
}

.root .menu > * {
    flex-grow: 5;
}

// --------------------------------------------------
// DESKTOP STYLE(S) - END
// --------------------------------------------------

</style>