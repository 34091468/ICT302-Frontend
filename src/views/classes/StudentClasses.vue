<template>
    <div class='base'>
        <AppHeader group='STUDENT'></AppHeader>
        <div class='content'>
            <div class='header'> Classes </div>
            <div class='view-controls'>
                <FButton 
                label='View'
                icon='common/edit-white.png'
                color='warning'
                @clicked='toLearningActivity()'
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

export default {
    name: 'StudentClasses',
    components: {
        AppHeader,
        FButton,
        FStatusResponses
    },
    props: {
        account_id: {
            type: Number,
            default: 0
        },
        unit_id: {
            type: String,
            default: ''
        },
        enrolment_id: {
            type: Number,
            default: 0
        }
        
    },

    mounted() {
        this.getStudentClasses()
        
    },

    data() {

        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'class_name',
                    label: 'Class'
                },
                
                {
                    field: 'teacher',
                    label: 'Teacher',
                }
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

        getStudentClasses() {
            AInstance.get( '/api/classes/student-classes', {
                params: {
                    unit_id: this.unit_id,
                    enrolment_id: this.enrolment_id
                }
            } )
            .then( ( response ) => {
                if ( response.status === 200 ) {
                    
                    this.TABLE_OPTIONS.code = response.data.code
                    this.TABLE_OPTIONS.data = response.data.data
                    this.TABLE_OPTIONS.message = response.data.message
                }
            })
            .catch((error) => {
                this.TABLE_OPTIONS.code = error.response.data.code
                this.TABLE_OPTIONS.message = error.response.data.message
            })
        },

        toLearningActivity() {
            this.routeByName( 'StudentLearningActivity', {
                account_id: this.account_id,
                unit_id: this.unit_id,
                enrolment_id: this.enrolment_id,
                class_list_id: this.TABLE_OPTIONS.selected.class_list_id,
                class_id: this.TABLE_OPTIONS.selected.class_id
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