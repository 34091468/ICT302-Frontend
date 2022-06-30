<template>
    <div class='base'>
        <div class='root'>
            <div class='table'>
                <div class='columns'>
                    <template v-for='item in columns'>
                        <div class='content' :key='item'>
                            <div class='label'> {{ item.label }} </div>
                            <div v-if='isItemSearchable()' class='searchable'>
                                <img src='@/assets/icons/login-black.png'>
                                <input type='text'>
                            </div>
                        </div>
                    </template>
                </div>
                <div class='content'></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FTable',

    props: {
        columns: {
            type: Array,
            required: true,
            default() {
                return []
            }
        },

        data: {
            type: Array,
            required: true,
            default() {
                return []
            }
        }
    },

    components: {

    },

    mounted() {

    },

    data() {
        return {

        }
    },

    methods: {
        isItemSearchable(item) {
            if (item.searchable === null || item.searchable === undefined) return false
            return item.searchable
        }
    }
}
</script>

<style scoped lang='scss'>

.root {
    position: relative;
    display: block;
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

.root .columns {
    display: flex;
    width: 100%;
    min-height: 65px;
}

.root .columns .content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.root .columns .content .label {
    font-family: $font-family-secondary;
    font-size: 0.8rem;
    font-weight: 700;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
}

.root .columns .content .searchable {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid $font-color-primary;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.root .columns .content .searchable img {
    width: auto;
    height: 50%;
}

.root .columns .content .searchable input {
    position: relative;
    border: none;
}

</style>