<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='content'>
            <div class='header'> Units </div>
            <div class='view-controls'>
                <FButton 
                label='Create'
                icon='common/add-white.png'
                color='success'
                @clicked='routeByName("UnitForm")'>
                </FButton>
                <FButton 
                label='View'
                icon='common/edit-white.png'
                color='warning'
                :disabled='TABLE_OPTIONS.selected === null'
                @clicked='routeByName("UnitView", {
                    unit_id: TABLE_OPTIONS.selected.unit_id
                })'>
                </FButton>
            </div>
            
            <template v-if='TABLE_OPTIONS.code === 200'>
                <b-table
                :data='TABLE_OPTIONS.data'
                :columns='TABLE_OPTIONS.columns'
                :selected.sync='TABLE_OPTIONS.selected'
                
                :paginated='true'
                :per-page='TABLE_OPTIONS.perPage'
                :total='TABLE_OPTIONS.data.length'
                aria-next-label="Next"
                aria-previos-label="Previous"
                aria-page-label="Page"
                aria-current-label="Current">

                </b-table>

                <div>
                    <b-button
                    type='is-info'
                    @click='downloadUnitReport()'>
                        Download Units Report
                    </b-button>
                </div>
            </template>
            <template v-else>
                <FStatusResponses
                :code='TABLE_OPTIONS.code'
                :message='TABLE_OPTIONS.message'/>
            </template>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { convertDate, convertYear } from '@/utilities/date.utility.js'
import { AInstance } from '@/toolbox/TAxios.js'
import fileDownload from 'js-file-download'

export default {
    name: 'Units',
    components: {
        AppHeader,
        FButton,
        FStatusResponses
    },

    created() {

    },

    mounted() {
        AInstance.get('/api/units/all')
        .then((response) => {
            this.TABLE_OPTIONS.code = response.data.code
            this.TABLE_OPTIONS.data = response.data.data
            this.TABLE_OPTIONS.message = response.data.message

            this.TABLE_OPTIONS.data.forEach(item => {
                item.year = convertYear(item.year)
                item.start_date = convertDate(item.start_date, true)
                item.end_date = convertDate(item.end_date, true)
            })
        })
        .catch((error) => {
            this.TABLE_OPTIONS.code = error.response.data.code
            this.TABLE_OPTIONS.message = error.response.data.message
        })
    },

    data() {
        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'unit_code',
                    label: 'Unit Code',
                    searchable: true
                },
                {
                    field: 'unit_name',
                    label: 'Unit Name',
                    searchable: true
                },
                {
                    field: 'trimester',
                    label: 'Trimester',
                    searchable: true
                },
                {
                    field: 'year',
                    label: 'Year',
                    searchable: true
                },
                {
                    field: 'uc.full_name',
                    label: 'Unit Coordinator',
                    searchable: true
                },
                {
                    field: 'uc.user_id',
                    label: 'User Id',
                    searchable: true
                },
                {
                    field: 'status',
                    label: 'Status'
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }
        
        return {
            TABLE_OPTIONS,
        }
    },

    methods: {
        isTableSelected() {
            return this.selected === null
        },

        /**
         * Changes the view of tab.
         */
        changeTabView(key) {
            if (key === this.currentTab) return
            this.TABS_OPTIONS[this.currentTab].selected = false
            this.TABS_OPTIONS[key].currentTab = true
            this.currentTab = key
        },

        downloadUnitReport() {

            AInstance.get( '/api/download/all-units', {
                responseType: 'blob'
            } )
            .then( response => {
                fileDownload(response.data, 'report.csv')
            })
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

.content .view-controls {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
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

    .content .view-controls {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 25px;
    }
}

.content .view-controls * {
    width: 100px;
}

</style>