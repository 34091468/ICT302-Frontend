<template>
    <div class='root' id='hello'>
        <div id='menu-opener'>
            <img src='@/assets/icons/navigations/side-bar-white.png' alt='' @click='enableMenu(true)'>
        </div>
        <transition name='slide'>
            <div class='menu-items' v-if='menuOpened'>
                <ul class='listview'>
                    <li v-for='item in menuData.items' :key='item.label'>
                        <div class='item' @click='routeByName(item.route)'>
                            <img v-if='hasIcon(item.icon)' :src='getIcon(item.icon)' alt="">
                            <div class='label'>
                                {{ item.label }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>

        <transition name='fade'>
            <div class='overlay' v-if='menuOpened' @click='enableMenu(false)'>

            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'SideBar',

    props: {
        /**
         * An Object of information of an item
         * @type { Object }       Empty by default.
         */
        menuData: {
            type: Object,
            required: true,
            default() {
                return {}
            }
        },
    },

    computed: {

        /**
         * Checks whether the menu bar is opened.
         * @return { Boolean }          True if it is opened.
         */
        menuOpened() { return this.isMenuOpened === true }
    },

    data() {

        /**
         * Checks if the menu is opened
         * @type { Boolean }            False by default.
         */
        var isMenuOpened = false

        return {
            isMenuOpened
        }
    },

    methods: {

        /**
         * Turns on or off the menu through enabling.
         * @type { Boolean } enabled        True to turn on Menu
         */
        enableMenu(enabled) {
            this.isMenuOpened = enabled
        },

        /**
         * Checks if there is a designated icon for the list of menu.
         * @param { string } iconPath       String path to insert for checking.
         */
        hasIcon(iconPath) {
            return (iconPath !== null && iconPath !== undefined && iconPath !== '')
        },

        /**
         * Returns the icon path.
         * @returns { string }
         */
        getIcon(iconPath) {
            return require('@/assets/icons/navigations/' + iconPath)
        }
    }
}
</script>

<style scoped lang='scss'>

.root {
    display: block;
    position: relative;
    z-index: 10;
}

.root #menu-opener {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.root #menu-opener:active {
    background-color: $color-scheme-base-active;
}

.root #menu-opener > img {
    width: 20px;
    height: 20px;
}

.root .menu-items {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    max-height: 100%;
    border: 1px solid $color-scheme-base-active;
    background-color: $color-scheme-base;
    border-radius: 0 0 0 5px;
    box-sizing: content-box;
    z-index: 10;
}

.root .menu-items > ul {
    list-style-type: none;
}

.root .menu-items .listview {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

.root .menu-items .listview li {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
}

.root .menu-items .listview li .item {
    display: flex;
    position: relative;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 50px;
    padding: 5px;
}

.root .menu-items .listview li .item:active {
    background: $color-scheme-base-active;
}

.root .menu-items .listview li .item:active::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: $color-scheme-base-active;
}

.root .menu-items .listview li .item::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: #BABABA;
}

.root .menu-items .listview li:last-child::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: none;
    height: 0;
}

.root .menu-items .listview li .item img {
    width: 15px;
    height: auto;
}

.root .menu-items .listview li .item .label {
    display: block;
    width: 100%;
    font-size: $font-size-list-item;
    line-height: 0.95rem;
}

.root .menu-items .listview li .item:active .label {
    color: $font-color-primary !important;
}

.root .menu-items .menu-flap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -21px;
    top: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: $color-scheme-base;
}

.root .menu-items .menu-flap img {
    width: 70%;
    height: auto;
}

.overlay {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 32, 41, 0.6);
    z-index: 1;
}

.slide-leave-active,
.slide-enter-active {
    transition: all 0.25s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
}

.fade-leave-active,
.fade-enter-active {
    transition: all 0.25s ease;
}

.fade-enter,
.fade-leave-to {
    background-color: rgba(0, 32, 41, 0);
}

.fade-enter-to,
.fade-leave-from {
    background-color: rgba(0, 32, 41, 0.6);
}
</style>