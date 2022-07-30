<template>
    <div class='base'>
        <AppHeader group='STUDENT'></AppHeader>
        <div class='content'>
            <div class='header' v-if='!proceedCheckIn'> Learning Activities </div>
            <div class='view-controls' v-if='!proceedCheckIn'>
                <FButton 
                label='Check In'
                icon='common/edit-white.png'
                color='success'
                @clicked='toProceedCheckIn()'
                :disabled='TABLE_OPTIONS.selected === null || TABLE_OPTIONS.selected.status === 1'>
                </FButton>
            </div>

            <template v-if='proceedCheckIn'>
                <div class='label'> Please enter 6 digit code </div>
                <div class='view-controls'>
                    <FButton 
                    label='Return'
                    color='danger'
                    @clicked='cancelProceedCheckIn()'
                    outlined>
                    </FButton>
                    <FButton 
                    label='Submit'
                    color='success'
                    :disabled='PINInput.value.length < 6'
                    @clicked='submitCode()'>
                    </FButton>
                </div>

                <b-input type=''
                    v-model='PINInput.value'
                    pattern='[0-9]*'
                    :maxlength='PINInput.pinLength'>
                </b-input>

                <div>
                    <p>This is only for demonstration purposes to highlight the PIN number.</p>
                    {{ PINInput.received }}
                </div>
            </template>

            <template v-else>
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
            </template>
            
        </div>
    </div>
</template>

<script>

import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { AInstance } from '@/toolbox/TAxios.js'
import { convertDateTime } from '@/utilities/date.utility.js'
export default {
    name: 'StudentLearningActivity',
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
        },

        class_list_id: {
            type: Number,
            default: 0
        },
        class_id: {
            type: Number,
            default: 0
        }
    },

    mounted() {
        this.getLearningActivities()
        console.log(localStorage)
    },

    data() {

        var proceedCheckIn = false

        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'start_date',
                    label: 'Lesson Start'
                },
                
                {
                    field: 'end_date',
                    label: 'Lesson End',
                },

                {
                    field: 'attended_field',
                    label: 'Attendance Checked'
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }

        var PINInput = {
            value: '',
            pinLength: 6,
            received: ''
        }

        return {
            proceedCheckIn,
            TABLE_OPTIONS,
            PINInput
        }
    },

    methods: {

        getLearningActivities() {
            AInstance.get( '/api/learning-activity/student-activities', {
                params: {
                    class_list_id: this.class_list_id,
                    class_id: this.class_id
                }
            } )
            .then( ( response ) => {
                if ( response.status === 200 ) {
                    
                    this.TABLE_OPTIONS.code = response.data.code
                    this.TABLE_OPTIONS.data = response.data.data
                    this.TABLE_OPTIONS.message = response.data.message
                    
                    this.TABLE_OPTIONS.data.forEach( item => {
                        console.log(item)
                        item.start_date = convertDateTime(item.start_date)
                        item.end_date = convertDateTime(item.end_date)
                        if ( item.attended === 0 || item.attended === null || item.attended === undefined ) {
                            item.attended_field = 'No'
                        } else item.attended_field = 'Yes'
                    } )
                }
            })
            .catch((error) => {
                this.TABLE_OPTIONS.code = error.response.data.code
                this.TABLE_OPTIONS.message = error.response.data.message
            })
        },

        generateCode() {
            AInstance.post( '/api/attendance/generate', {
                attendance_id: this.TABLE_OPTIONS.selected.attendance_id
            } )
            .then( (response) => {
                console.log(response)
                if ( response.status === 201 ) {
                    this.PINInput.received = response.data.PIN
                    console.log( response.data )
                    console.log(this.PINInput.received)
                }
            } )
        },

        submitCode() {
            AInstance.post( '/api/attendance/attend', {
                attendance_id: this.TABLE_OPTIONS.selected.attendance_id,
                pin: this.PINInput.value
            } )
            .then( (response) => {
                if ( response.status === 201 ) {
                    this.cancelProceedCheckIn()
                    this.$buefy.toast.open({
                        duration: 5000,
                        type: 'is-success',
                        message: 'Your attendance has been taken!'
                    })

                    this.getLearningActivities()
                }
            } )
            .catch( () => {
                this.$buefy.toast.open({
                    duration: 5000,
                    type: 'is-danger',
                    message: 'Invalid PIN. If problem persists, please contact your administrator for assistance!'
                })
            })
        },

        toProceedCheckIn() { 
            if ( this.TABLE_OPTIONS.selected === null || this.TABLE_OPTIONS.selected === undefined ) return
            if ( this.TABLE_OPTIONS.selected.status === 1 ) return
            this.proceedCheckIn = true
            this.generateCode()
        },
        cancelProceedCheckIn() { 
            this.proceedCheckIn = false
            this.TABLE_OPTIONS.selected = null
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