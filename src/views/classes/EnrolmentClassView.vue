<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='content'>
            <div class='header'> Class Information </div>
            <template>
                
            </template>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppMenu.vue'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'ClassView',
    props: {
        unit_id: {
            type: String,
            default: ''
        },
        class_id: {
            type: String,
            default: ''
        }
    },

    components: {
        AppHeader
    },

    data() {
        return {}
    },

    methods: {

        getEnroledStudents() {
            AInstance.get('/api/class/get-classes', {
            })
        },

        getAvailableStudents() {

        }
    }
}
</script>

<style scoped lang='scss'>

.content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px 25px;
    gap: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.content .info {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    height: 50px;
}

.content .info div {
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: 700;
}

@media only screen and (min-width:1280px) {
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 25px 50px;
        gap: 25px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .content .info {
        position: relative;
        display: flex;
        align-items: center;
        gap: 20px;
        width: 100%;
        height: 50px;
    }
}

.content .view-tabs {
    position: relative;
    display: block;
    width: 100%;
}

.content .view-tabs .tabs {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #DBDBDB;
}

.content .view-tabs .tabs.mobile {
    overflow-x: auto !important;
}

.content .view-tabs .tabs.mobile::-webkit-scrollbar {
    display: none;
}

.content .view-tabs .tabs .tab {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    min-width: 150px;
    height: 100%;
    font-size: $font-size-list-item;
    font-weight: 700;
    border-bottom: 2px solid transparent;
    transition: font-size 0.25s ease, border-bottom 0.25s ease;
}

.content .view-tabs .tabs .tab.selected {
    font-size: $font-size-list-item-selected;
    border-bottom: 2px solid $color-scheme-primary-active;
}

.content .unit-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
}

.content .unit-card .view-controls {
    position: relative;
    display: block;
    width: 100%;
}

.content .unit-card .unit-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
}

.content .unit-card .unit-info .key {
    position: relative;
    font-weight: 700;
    font-size: 0.925rem;
    flex-grow: 5;
}

.content .unit-card .unit-info .value {
    position: relative;
    font-size: 0.85rem;
}

@media only screen and (min-width:1280px) {
    .content .unit-card .view-controls {
        position: relative;
        display: block;
        width: 100px;
    }

    .content .unit-card .unit-info .key {
        position: relative;
        font-weight: 700;
        font-size: 1.05rem;
        max-width: 300px;
    }

    .content .unit-card .unit-info .value {
        position: relative;
    }
}

</style>