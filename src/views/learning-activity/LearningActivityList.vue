<template>
    <div>
        <template v-if='!addLearningActivity'>
            <div class='content'>
                <div class='header'> Learning Activities </div>
                <div class='view-controls'>
                    <FButton 
                    label='Add'
                    icon='common/add-white.png'
                    color='success'
                    @clicked='switchView()'>
                    </FButton>
                </div>

                <template v-if='TABLE_OPTIONS.code === 200'>
                    <b-table
                    :data='TABLE_OPTIONS.data'
                    :columns='TABLE_OPTIONS.columns'
                    
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
                    :message='TABLE_OPTIONS.message'/>
                </template>
            </div>
        </template>

        <template v-else>
            <div class='content'>
                <div class='header'> Add Learning Activitiy </div>
                    <template v-for='key in formData'>

                        <div class='form-content' :key='key.label'>

                            <template v-if='key.type === "input-field"'>
                                <b-field :label='key.label' :type='key.color' :message='key.message'>
                                    <b-input 
                                    v-model='key.value'
                                    expanded
                                    :has-counter='false'
                                    :maxlength='key.maxlength'
                                    :type='key.input_type'></b-input>
                                </b-field>
                            </template>

                            <template v-else-if='key.type === "datetime"'>
                                <b-field :label='key.label' :type='key.color' :message='key.message'>
                                    <b-datetimepicker
                                        expanded
                                        v-model='key.value'
                                        :locale='undefined'
                                        trap-focus>
                                    </b-datetimepicker>
                                </b-field>
                                
                            </template>
                        </div>

                    </template>

                    <b-table
                        :data='TS_TABLE_OPTIONS.data'
                        :columns='TS_TABLE_OPTIONS.columns'
                        :selected.sync='TS_TABLE_OPTIONS.selected'
                        
                        :paginated='true'
                        :per-page='TS_TABLE_OPTIONS.perPage'
                        :total='TS_TABLE_OPTIONS.data.length'
                        aria-next-label="Next"
                        aria-previos-label="Previous"
                        aria-page-label="Page"
                        aria-current-label="Current">

                    </b-table>

                    <div class='view-controls'>
                        <FButton 
                        label='Return'
                        color='danger'
                        outlined
                        @clicked='switchView()'>
                        </FButton>

                        <div class='view-controls'>
                            <FButton 
                            label='Submit'
                            icon='common/add-white.png'
                            color='success'
                            @clicked='createLearningActivity()'>
                            </FButton>
                        </div>
                    </div>
            </div>
            
        </template>
        
    </div>
</template>

<script>

import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { AInstance } from '@/toolbox/TAxios.js'
import { convertDateTime } from '@/utilities/date.utility.js'
export default {
    name: 'LearningActivityList',
    components: {
        FButton,
        FStatusResponses
    },

    props: {
        class_id: {
            type: String,
            required: true
        },

        class_list_ids: {
            type: Array,
            default( ) {
                return [ ]
            }
        }
    },

    mounted() {
        this.getLearningActivities()
        this.getTeachingSpace()
    },

    data() {

        var addLearningActivity = false

        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'start_date',
                    label: 'Lesson Start'
                },
                {
                    field: 'end_date',
                    label: 'Lesson End'
                },
                {
                    field: 'building_number',
                    label: 'Building Number',
                    searchable: true
                },
                {
                    field: 'floor_number',
                    label: 'Floor Number',
                    searchable: true
                },
                {
                    field: 'room_number',
                    label: 'Room Number',
                    searchable: true
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }

        var TS_TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'building_number',
                    label: 'Building Number',
                    searchable: true
                },
                {
                    field: 'floor_number',
                    label: 'Floor Number',
                    searchable: true
                },
                {
                    field: 'room_number',
                    label: 'Room Number',
                    searchable: true
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }

        var formData = {
            start_date: {
                label: 'Lesson Start Date & Time',
                type: 'datetime',
                value: new Date(),
                color: '',
                message: ''
            },
            end_date: {
                label: 'Lesson End Date & Time',
                type: 'datetime',
                value: new Date(),
                color: '',
                message: ''
            },
            label: {
                label: 'Activity Name',
                type: 'input-field',
                input_type: 'text',
                minlength: 0,
                maxlength: 100,
                value: '',
                color: '',
                message: ''
            }
        }

        return {
            addLearningActivity,
            TABLE_OPTIONS,
            TS_TABLE_OPTIONS,
            formData
        }
    },

    methods: {

        switchView() {
            this.addLearningActivity = !this.addLearningActivity
        },

        getLearningActivities() {
            AInstance.get( '/api/learning-activity', {
                params: {
                    class_id: this.class_id
                }
            } )
            .then( (response) => {

                if ( response.status === 200 ) {
                    this.TABLE_OPTIONS.code = response.data.code
                    this.TABLE_OPTIONS.data = response.data.data
                    this.TABLE_OPTIONS.message = response.data.message

                    this.TABLE_OPTIONS.data.forEach( (item) => {
                        item.start_date = convertDateTime(item.start_date)
                        item.end_date = convertDateTime(item.end_date)
                    } )
                }
            })
            .catch((error) => {
                this.TABLE_OPTIONS.code = error.response.data.code
                this.TABLE_OPTIONS.message = error.response.data.message
            })
        },

        getTeachingSpace() {
            AInstance.get( '/api/teaching-spaces/' )
            .then( (response) => {
                if ( response.status === 200 ) {
                    this.TS_TABLE_OPTIONS.code = response.data.code
                    this.TS_TABLE_OPTIONS.data = response.data.data
                    this.TS_TABLE_OPTIONS.message = response.data.message
                    
                }
            } )
        },

        createLearningActivity() {

            AInstance.post( '/api/learning-activity/create', {
                teaching_space_id: this.TS_TABLE_OPTIONS.selected.teaching_space_id,
                class_id: this.class_id,
                start_date: this.formData.start_date.value,
                end_date: this.formData.end_date.value,
                label: this.formData.label.value,
                class_list_ids: this.class_list_ids
            } )
            .then( (response) => {
                if ( response.status === 201 ) {
                    
                    this.getLearningActivities()
                    this.switchView()
                }
            } )
            .catch ((error) => {
                console.log(error)
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

.form-content * {
    padding-bottom: 25px;
}

</style>