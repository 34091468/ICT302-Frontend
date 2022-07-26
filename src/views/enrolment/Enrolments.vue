<template>
    <div class='base'>
        <div class='content'>

            <template v-if='!addEnrolment'>

                <div class='label'> Enrolment List </div>
                <div class='controls'>
                    <FButton
                    label='Create'
                    icon='common/add-white.png'
                    color='success'
                    @clicked='switchView()'></FButton>
                    <FButton
                    label='Remove'
                    icon='common/trash-white.png'
                    color='danger'></FButton>
                </div>

                <b-table
                :data='enrolmentTable.data'
                :columns='enrolmentTable.columns'
                :selected.sync='enrolmentTable.selected'></b-table>

            </template>

            <template v-else>

                <div class='label'> Enrol Students </div>
                <div class='controls'>
                    <FButton
                    label='Return'
                    color='danger'
                    outlined
                    @clicked='switchView()'></FButton>
                    <FButton
                    label='Add'
                    icon='common/add-white.png'
                    color='success'
                    @clicked='enrolStudent()'></FButton>
                </div>

                <b-table
                :data='studentsTable.data'
                :columns='studentsTable.columns'
                :selected.sync='studentsTable.selected'></b-table>

            </template>

        </div>
    </div>
</template>

<script>
import FButton from '@/components/common/FButton.vue'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'Enrolment',
    props: {
        unit_id: {
            type: String,
            required: true
        }
    },

    components: {
        FButton
    },

    mounted() {
        this.getEnrolment()
        this.getUnenroledStudents()
    },

    data() {

        /**
         * View on toggling enroled students/ to enrol students.
         */
        var addEnrolment = false

        /**
         * List of students enroled.
         */
        var enrolmentTable = {
            data: [],
            columns: [
                {
                    field: 'user_id',
                    label: 'User Id',
                    searchable: true
                },

                {
                    field: 'first_name',
                    label: 'First Name',
                    searchable: true
                },

                {
                    field: 'last_name',
                    label: 'Last Name',
                    searchable: true
                },

                {
                    field: 'enrolment_date',
                    label: 'Date of Enrolment'
                },

                {
                    field: 'status',
                    label: 'Status'
                }
            ],

            status: 0,
            message: '',
            selected: null
        }

        var studentsTable = {
            data: [],
            columns: [
                {
                    field: 'user_id',
                    label: 'User Id',
                    searchable: true
                },

                {
                    field: 'first_name',
                    label: 'First Name',
                    searchable: true
                },

                {
                    field: 'last_name',
                    label: 'Last Name',
                    searchable: true
                },

                {
                    field: 'status',
                    label: 'Status'
                }
            ],

            status: 0,
            message: '',
            selected: null
        }

        return {
            addEnrolment,
            enrolmentTable,
            studentsTable
        }
    },

    methods: {
        switchView() {
            this.addEnrolment = !this.addEnrolment
            this.enrolmentTable.selected = null
            this.studentsTable.selected = null
        },

        /**
         * Retrieve students who are enroled into this unit.
         */
        getEnrolment() {
            AInstance.get('/api/enrolment', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.enrolmentTable.data = response.data.data
                    this.enrolmentTable.status = response.status
                    this.enrolmentTable.message = response.data.message
                }
            })
            .catch((error) => {
                this.enrolmentTable.status = error.response.status
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
                })
            })
        },

        getUnenroledStudents() {
            AInstance.get('/api/enrolment/unenroled', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.studentsTable.data = response.data.data
                    this.studentsTable.status = response.status
                    this.studentsTable.message = response.data.message
                }
            })
            .catch((error) => {
                this.studentsTable.status = error.response.status
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
                })
            })
        },

        enrolStudent() {
            AInstance.post('/api/enrolment/create', {
                account_id: this.studentsTable.selected.account_id,
                unit_id: this.unit_id
            })
            .then((response) => {
                if ( response.status === 201 ) {
                    this.$buefy.toast.open({
                        duration: 3000,
                        type: 'is-success',
                        message: response.data.message
                    })

                    this.getEnrolment( )
                    this.studentsTable.data = []
                    this.studentsTable.selected = null
                    this.getUnenroledStudents( )
                    this.addEnrolment = false
                }
            })
            .catch( (error) => {
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error
                })
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