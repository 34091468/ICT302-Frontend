<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='content'>
            <div class='header'> Accounts </div>
                <div class='view-tabs'>
                    <div class='tabs' :class='[ { mobile: isMobileApp() } ]' >
                        <template v-for='option in Object.keys(TABS_OPTIONS)'>
                            <div class='tab' 
                            :class='[ {selected: TABS_OPTIONS[option].selected, mobile: isMobileApp() } ]' 
                            :key='TABS_OPTIONS[option].key'
                            @click='changeTabView(TABS_OPTIONS[option].key)'>
                                {{ TABS_OPTIONS[option].label }}
                            </div>
                        </template>
                    </div>
                </div>
            
            <template v-for='option in Object.keys(TABS_OPTIONS)'>
                <div class='view' 
                v-if='TABS_OPTIONS[option].selected' 
                :key='TABS_OPTIONS[option].key'>

                    <div class='view-options'>
                        <div class='option'>
                            <FButton
                            label='Create'
                            icon='common/add-white.png'
                            color='success'
                            @clicked='routeToRegister(TABS_OPTIONS[selected].slug)'></FButton>
                        </div>
                        <div class='option'>
                            <FButton
                            label='Edit'
                            icon='common/edit-white.png'
                            color='warning'
                            disabled></FButton>
                        </div>
                        <div class='option'>
                            <FButton
                            label='Delete'
                            icon='common/trash-white.png'
                            color='danger'
                            disabled></FButton>
                        </div>
                    </div>

                    <b-table :data="data" :columns="columns"></b-table>

                </div>
            </template>
        </div>
    </div>
</template>

<script>

import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'

export default {
    name: 'Accounts',

    components: {
        AppHeader,
        FButton
    },

    mounted() {
        this.selected = 'ADMINISTRATOR'
    },

    data() {

        const TABS_OPTIONS = {

            'ADMINISTRATOR': {
                label: 'Administrator',
                key: 'ADMINISTRATOR',
                icon: '',
                slug: 'administrator',
                selected: true
            },

            'UNIT_COORDINATOR': {
                label: 'Unit Coordinator',
                key: 'UNIT_COORDINATOR',
                icon: '',
                slug: 'unit_coordinator',
                selected: false
            },

            'TEACHER': {
                label: 'Teacher',
                key: 'TEACHER',
                icon: '',
                slug: 'teacher',
                selected: false
            },

            'STUDENT': {
                label: 'Student',
                key: 'STUDENT',
                icon: '',
                slug: 'student',
                selected: false
            }
        }

        /**
         * Selected Tab View in string. Holds the key to the options
         * @type { String }
         */
        let selected = 'ADMINISTRATOR'

        return {
            TABS_OPTIONS,
            selected,

            data: [
                    { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                    { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                    { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                    { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                    { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
                ],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'first_name',
                        label: 'First Name',
                    },
                    {
                        field: 'last_name',
                        label: 'Last Name',
                    },
                    {
                        field: 'date',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                    }
                ]
        }
    },

    methods: {

        /**
         * Changes the view of tab.
         */
        changeTabView(key) {
            if (key === this.selected) return
            this.TABS_OPTIONS[this.selected].selected = false
            this.TABS_OPTIONS[key].selected = true
            this.selected = key
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

.content .view {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.content .view .view-options {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    gap: 10px;
}

.content .view .option {
    position: relative;
    display: block;
    border: 0;
    margin: 0;
    padding: 0;
    width: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

</style>