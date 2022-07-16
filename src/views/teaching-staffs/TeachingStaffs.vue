<template>
    <div class='base'>
        <div class='content'>

                <template v-if='!addTeacher'>
                    <div class='label'> Teaching Staff Information </div>
                    <div class='controls'>
                        <FButton
                        label='To Add'
                        icon='common/add-white.png'
                        color='success'
                        @clicked='switchTSView()'></FButton>
                        <FButton
                        label='Remove'
                        icon='common/trash-white.png'
                        color='danger'
                        @clicked='removeTS()'></FButton>
                    </div>

                    <b-table
                    :data='TS_TABLE.data'
                    :columns='TS_TABLE.columns'
                    :selected.sync='TS_TABLE.selected'></b-table>
                </template>

                <template v-else>
                    <div class='label'> Assign Teaching Staff </div>
                    <div class='controls'>
                        <FButton
                        label='Return'
                        color='danger'
                        outlined
                        @clicked='switchTSView()'></FButton>
                        <FButton
                        label='Create'
                        icon='common/add-white.png'
                        color='success'
                        @clicked='addTS()'></FButton>
                    </div>

                    <div class='form'>
                        <b-table
                        :data='FULL_TS_TABLE.data'
                        :columns='FULL_TS_TABLE.columns'
                        :selected.sync='FULL_TS_TABLE.selected'></b-table>
                    </div>
                </template>


        </div>
    </div>
</template>

<script>

import FButton from '@/components/common/FButton.vue'
// import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'TeachingStaffs',
    props: {
        unit_id: {
            type: String,
            required: true
        }
    },

    components: {
        FButton,
        // FStatusResponses
    },

    mounted() {
        this.getTeachingStaffs()
    },

    data() {

        var TS_TABLE = {
            data: [],
            columns: [
                {
                    field: 'user_id',
                    label: 'Teacher Id',
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
                }
            ],
            status: 0,
            message: '',
            selected: null
        }

        var FULL_TS_TABLE = {
            data: [],
            columns: [
                {
                    field: 'user_id',
                    label: 'Teacher Id',
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
                }
            ],
            status: 0,
            message: '',
            selected: null
        }

        var addTeacher = false

        return {
            TS_TABLE,
            FULL_TS_TABLE,
            addTeacher
        }
    },

    methods: {

        switchTSView() {
            this.addTeacher = !this.addTeacher
            this.TS_TABLE.selected = null
            this.FULL_TS_TABLE.selected = null
        },

        getTeachingStaffs() {
            AInstance.get('/api/teaching-staffs/', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.TS_TABLE.data = response.data.data
                    this.TS_TABLE.status = response.status
                    this.TS_TABLE.message = response.data.message
                }
            })
            .catch((error) => {
                this.TS_TABLE.status = error.response.status
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
                })
            })

            AInstance.get('/api/teaching-staffs/not', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.FULL_TS_TABLE.data = response.data.data
                    this.FULL_TS_TABLE.status = response.status
                    this.FULL_TS_TABLE.message = response.data.message
                }
            })
            .catch((error) => {
                this.FULL_TS_TABLE.status = error.response.status
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
                })
            })
        },

        addTS() {
            if (this.FULL_TS_TABLE.selected === null) return
            AInstance.post('/api/teaching-staffs/create', {
                unit_id: this.unit_id,
                account_id: this.FULL_TS_TABLE.selected.account_id
            })
            .then((response) => {
                if (response.status === 201) {
                    this.$buefy.toast.open({
                        duration: 3000,
                        type: 'is-success',
                        message: response.data.message
                    })

                    this.getTeachingStaffs()
                    this.switchTSView()
                }
            })
            .catch((error) => {
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
                })
            })
        },

        removeTS() {
            if (this.TS_TABLE.selected === null) return

            AInstance.delete('api/teaching-staffs/remove', {
                data: {
                    teacher_id: this.TS_TABLE.selected.account_id,
                    unit_id: this.unit_id
                }
                
            })
            .then((response) => {
                if (response.status === 200) {
                    this.$buefy.toast.open({
                        duration: 3000,
                        type: 'is-success',
                        message: response.data.message
                    })

                    this.getTeachingStaffs()
                }
            })
            .catch((error) => {
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
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