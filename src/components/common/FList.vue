<template>
    <div class='base'>
        <div class='root'>
            <ul class='listview' :class='[getListViewColor]'>
                <template v-for='item in listItems'>
                    <li :key='item.label' :class='[getListViewColor]'>
                        <div class='item'>
                            <div class='in'>
                                <template v-if='hasHeaderAndFooter(item)'>
                                    <header> {{ item.header }} </header>
                                </template>
                                <span> {{ item.content }} </span>
                                <template v-if='hasHeaderAndFooter(item)'>
                                    <footer> {{ item.footer }} </footer>
                                </template>
                            </div>

                            <template v-if='item.navigationIcon'>
                                <img :src='item.navitationIcon' alt="">
                            </template>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FList',
    props: {

        /**
         * An array of items which contains objects for rendering.
         * @type { Array.object }
         */
        listItems: {
            type: Array,
            required: true,
            default() {
                return []
            }
        },
        round: {
            type: Boolean,
            required: false,
            default: false
        },
        color: {
            type: String,
            required: false,
            default: 'primary'
        }
    },

    computed: {

        /**
         * Retrieves the color of the listview.
         * @returns { string }
         */
        getListViewColor() {
            if (this.color !== 'primary' && this.color !== 'base') return 'base'
            return this.color
        }
    },

    methods: {
        /**
         * Checks if header AND footer exists
         * @returns { boolean }
         */
        hasHeaderAndFooter(item) {
            return (item.header !== null && item.footer !== null)
        },
    }
}
</script>

<style scoped lang='scss'>

.root {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
}

.root .listview {
    position: relative;
    width: 100%;
    background: $color-scheme-base;
    border: 1px solid $color-scheme-base-alternate;
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.root .listview.primary {
    background: $color-scheme-primary !important;
    border: 1px solid $color-scheme-primary-alternate !important;
}

.root .listview > li {
    position: relative;
    width: 100%;
    height: 75px;
    background: $color-scheme-base;
    list-style: none;
}

.root .listview > li:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: $color-scheme-base-alternate;
}

.root .listview > li.primary:after {
    background: $color-scheme-primary-alternate !important;
}

.root .listview > li:hover {
    background: $color-scheme-base-hover;
}

.root .listview > li.primary:hover {
    background: $color-scheme-primary-hover;
}

.root .listview > li:active {
    background: $color-scheme-base-active;
}

.root .listview > li.primary:active {
    background: $color-scheme-primary-active;
}

.root .listview > li .item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.root .listview > li .item .in {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    flex-grow: 8;
    border: 0;
    margin: 0;
    padding: 5px 0 5px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.root .listview > li .item .in > header {
    position: relative;
    font-weight: 700;
    font-size: 0.7rem;
}

.root .listview > li .item .in > span {
    position: relative;
    font-size: 0.8rem;
    padding: 5px 0;
}

.root .listview > li .item .in > footer {
    position: relative;
    font-size: 0.65rem;
    font-style: italic;
    color: $font-color-footer;
}

.root .listview > li .item .navigation {
    position: relative;
    display: block;
    height: 100%;
    flex-grow: 2;
}

.root .listview > li .item .navigation > img {
    position: relative;
    display: block;
    width: auto;
    height: 100%;
}

</style>