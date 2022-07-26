<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <template v-if='!addEnrolmentToClass'>
            <div class='content'>
                <div class='header'> Class Information </div>
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
                    :message='TABLE_OPTIONS.message'/>
                </template>

                <div class='header'> Learning Activities </div>
                <div class='view-controls'>
                    <FButton 
                    label='Create'
                    icon='common/add-white.png'
                    color='success'
                    @clicked='switchView()'>
                    </FButton>
                </div>
            </div>
        </template>

        <template v-else>
            <div class='content'>
                <div class='header'> Add Student To Class </div>
                <div class='view-controls'>
                    <FButton 
                    label='Return'
                    color='danger'
                    outlined
                    @clicked='switchView()'>
                    </FButton>
                    <FButton 
                    label='Add'
                    icon='common/add-white.png'
                    color='success'
                    @clicked='addStudent()'
                    :disabled='ADD_TABLE_OPTIONS.selected === null'>
                    </FButton>
                </div>

                <template v-if='ADD_TABLE_OPTIONS.code === 200'>
                    <b-table
                    :data='ADD_TABLE_OPTIONS.data'
                    :columns='ADD_TABLE_OPTIONS.columns'
                    :selected.sync='ADD_TABLE_OPTIONS.selected'
                    
                    :paginated='true'
                    :per-page='ADD_TABLE_OPTIONS.perPage'
                    :total='ADD_TABLE_OPTIONS.data.length'
                    aria-next-label="Next"
                    aria-previos-label="Previous"
                    aria-page-label="Page"
                    aria-current-label="Current">

                    </b-table>
                </template>
                <template v-else>
                    <FStatusResponses
                    :code='ADD_TABLE_OPTIONS.code'
                    :message='ADD_TABLE_OPTIONS.message'/>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
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
        AppHeader,
        FButton,
        FStatusResponses
    },

    mounted() {
        this.getEnroledStudents()
        this.getAvailableStudents()
    },

    data() {
        var addEnrolmentToClass = false
        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'user_id',
                    label: 'Student User Id'
                },
                {
                    field: 'first_name',
                    label: 'Student First Name',
                    searchable: true
                },
                {
                    field: 'last_name',
                    label: 'Student Last Name',
                    searchable: true
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }

        var ADD_TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'user_id',
                    label: 'Student User Id'
                },
                {
                    field: 'first_name',
                    label: 'Student First Name',
                    searchable: true
                },
                {
                    field: 'last_name',
                    label: 'Student Last Name',
                    searchable: true
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }

        return {
            addEnrolmentToClass,
            TABLE_OPTIONS,
            ADD_TABLE_OPTIONS
        }
    },

    methods: {

        switchView() {
            this.addEnrolmentToClass = !this.addEnrolmentToClass
        },

        getEnroledStudents() {
            AInstance.get('/api/classes/', {
                    params: {
                        unit_id: this.unit_id,
                        class_id: this.class_id
                    }
                })
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

        getAvailableStudents() {
            AInstance.get('/api/classes/unenroled', {
                    params: {
                        unit_id: this.unit_id
                    }
                })
                .then( ( response ) => {
                    if ( response.status === 200 ) {
                        this.ADD_TABLE_OPTIONS.code = response.data.code
                        this.ADD_TABLE_OPTIONS.data = response.data.data
                        this.ADD_TABLE_OPTIONS.message = response.data.message

                    }
                })
                .catch((error) => {
                this.ADD_TABLE_OPTIONS.code = error.response.data.code
                this.ADD_TABLE_OPTIONS.message = error.response.data.message
            })
        },

        addStudent() {

            AInstance.post('/api/classes/create', {
                    enrolment_id: this.ADD_TABLE_OPTIONS.selected.enrolment_id,
                    class_id: this.class_id
                })
                .then( ( response ) => {
                    if ( response.status === 201 ) {
                        this.getEnroledStudents()
                        this.getAvailableStudents()
                        this.switchView()
                    }
                })
                .catch((error) => {
                this.TABLE_OPTIONS.code = error.response.data.code
                this.TABLE_OPTIONS.message = error.response.data.message
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