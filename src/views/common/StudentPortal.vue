<template>
    <div class='base'>
        <AppHeader group='STUDENT'></AppHeader>
        <div class='content'>
            <div class='view-controls'>
                <FButton 
                label='View'
                icon='common/edit-white.png'
                color='warning'
                @clicked='viewClasses()'
                :disabled='TABLE_OPTIONS.selected === null'>
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
            </template>

            <template v-else>
                <FStatusResponses
                :code='TABLE_OPTIONS.code'
                message='There are no units enroled!'/>
            </template>
        </div>
    </div>
</template>

<script>

import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { AInstance } from '@/toolbox/TAxios.js'
import { convertDate } from '@/utilities/date.utility.js'

export default {
    name: 'Portal',
    components: {
        AppHeader,
        FButton,
        FStatusResponses
    },
    props: {
        account_id: {
            type: Number,
            default: 0
        }
    },

    mounted() {
        this.getStudentEnrolment()
        localStorage.setItem( 'account_id', this.account_id )
        
    },

    data() {

        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'unit',
                    label: 'Unit'
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
                    field: 'start_date',
                    label: 'Start Date',
                    searchable: true
                },
                {
                    field: 'end_date',
                    label: 'End Date',
                    searchable: true
                },
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }

        return {
            TABLE_OPTIONS
        }
    },

    methods: {

        getStudentEnrolment () {

            let accountId = 0
            if ( localStorage.account_id !== null && localStorage.account_id !== undefined ) accountId = Number.parseInt(localStorage.account_id)
            else accountId = this.account_id

            AInstance.get( '/api/enrolment/student', {
                params: {
                    account_id: accountId
                }
            } )
            .then( ( response ) => {
                if ( response.status === 200 ) {
                    
                    this.TABLE_OPTIONS.code = response.data.code
                    this.TABLE_OPTIONS.message = response.data.message
                    response.data.data.forEach( item => {
                        this.TABLE_OPTIONS.data.push(
                            {
                                unit_id: item.unit_id,
                                unit: item.unit_code + ' ' + item.unit_name,
                                trimester: item.trimester,
                                year: item.year,
                                start_date: convertDate( item.start_date, true ),
                                end_date: convertDate( item.end_date, true ),
                                enrolment_id: item.enrolment_id
                            }
                        )
                    })
                }
            })
            .catch((error) => {
                this.TABLE_OPTIONS.code = error.response.data.code
                this.TABLE_OPTIONS.message = error.response.data.message
            }) 
        },

        viewClasses() {
            
            let accountId = 0
            if ( localStorage.account_id !== null && localStorage.account_id !== undefined ) accountId = Number.parseInt(localStorage.account_id)
            else accountId = this.account_id
            this.routeByName( 'StudentClasses', {
                account_id: accountId,
                unit_id: this.TABLE_OPTIONS.selected.unit_id,
                enrolment_id: this.TABLE_OPTIONS.selected.enrolment_id
            } )
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
    gap: 25px;
}

.content .controls {
    position: relative;
    display: flex;
    align-items: center;
    gap: 25px;
    width: 100px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

</style>


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