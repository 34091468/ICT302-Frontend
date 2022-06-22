<template>
    <div class='base'>
        <!-- ELEMENTS: MOBILE APP -->
        <template v-if='isMobileApp()'>
            <div class='root-mobile'>
                <div class='card-header'>
                    <img src='@/assets/app/app-banner-left-main.png' alt=''>
                    <div class='menu'>
                        <img class='menuIcon' src='@/assets/icons/navigations/login-white.png' alt='' @click='routeByName("Login")'>
                    </div>
                </div>

                <!-- Account Logged In: Administrator -->
                <!-- Account Logged In: Administrator -->

                <!-- Account Logged In: Unit Coordinator -->
                <!-- Account Logged In: Unit Coordinator -->

                <!-- Account Logged In: Teacher -->
                <!-- Account Logged In: Teacher -->

                <!-- Account Logged In: Student -->
                <!-- Account Logged In: Student -->
                
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
                    <ul class='listview'>
                        <template v-for="(item, index) in DESKTOP_MENU_OPTIONS">
                            <li :key="index">
                                <div class='item'
                                @mouseenter="onMenuItemHovered(item, true)"
                                @mouseleave="onMenuItemHovered(item, false)"
                                @click='routeByName(item.route)'
                                >
                                    <div class='content'>
                                        {{ item.label }}
                                    </div>
                                    
                                    <div class='icon'>
                                        <transition name='expand'>
                                            <img :class='[{ hovered: item.hovered }]' src='@/assets/icons/navigations/enter-black.png' alt=''>
                                        </transition>
                                    </div>
                                    
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            

        </template>
        <!-- ELEMENTS: DESKTOP APP -->
        <!-- END -->
    </div>
</template>

<script>

// import { AInstance } from '../toolbox/TAxios.js'

export default {
    name: 'Home',
    components: {

    },

    mounted() {
        // AInstance.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        // .then(function (response) {
        //     console.log(response)
        // })
        // .catch(function(error) {
        //     console.log(error)
        // })
    },

    data() {

        // var menuData = {
        //     openOnStart: false,
        //     items: [
        //         {
        //             icon: 'login-black.png',
        //             label: 'Hello',
        //             route: ''
        //         },
        //         {
        //             icon: 'login-black.png',
        //             label: 'World',
        //             route: ''
        //         },
        //         {
        //             icon: 'login-black.png',
        //             label: 'Bye',
        //             route: ''
        //         }
        //     ]
        // }

        /**
         * The available options that will be used to generate the list
         * of menu items. ONLY for desktop.
         * @type { Array.Object }
         */
        const DESKTOP_MENU_OPTIONS = [
            {
                label: "Announcement",
                route: "",
                hovered: false
            },
            {
                label: "Portal",
                route: "Login",
                hovered: false
            }
        ]

        return {
            // menuData,
            DESKTOP_MENU_OPTIONS
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
}

.root .menu > ul {
    list-style: none;
    background: $color-scheme-primary;
    border-radius: 5px;
}

.root .menu .listview {
    width: 350px;
    padding: 0;
    border: 1px solid $color-scheme-primary-alternate;
    box-sizing: content-box;
}

.root .menu .listview > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
}

.root .menu .listview > li:not(:last-child):after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 50px;
    bottom: 0;
    height: 1px;
    background: $color-scheme-primary-alternate;
}

.root .menu .listview > li .item {
    display: block;
    width: 100%;
    height: 35px;
    padding-left: 5px;
}

.root .menu .listview > li .item .content {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    font-size: $font-size-list-item;
    font-weight: 700;
}

.root .menu .listview > li .item .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 100%;
}

.root .menu .listview > li .item .icon > img {
    display: block;
    width: 15px;
    height: auto;
}

.root .menu .listview > li .item .icon > img.hovered {
    display: block;
    width: 18px;
    height: auto;
    transition: 0.25s ease;
}

// --------------------------------------------------
// DESKTOP STYLE(S) - END
// --------------------------------------------------

</style>