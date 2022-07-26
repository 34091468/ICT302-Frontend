<template>
    <div class='base'>
        <div class='content'>
            <div class='label'> Available Classes </div>
            <div class='controls'>
                <FButton
                label='Create'
                icon='common/add-white.png'
                color='success'
                @clicked='routeByName( "classForm", { unit_id: unit_id } )'></FButton>
                <FButton
                label='View'
                icon='common/edit-white.png'
                color='warning'
                :disabled='EnrolmentTable.selected === null'
                @clicked='routeByName( "classView", {
                    unit_id: unit_id,
                    class_id: EnrolmentTable.selected.class_id.toString()
                } )'></FButton>
            </div>

            <template v-if='EnrolmentTable.data.length === 0'>
                <div class='form'>
                    <FStatusResponses :code='EnrolmentTable.code' message='There are no classes available!'></FStatusResponses>
                </div>
            </template>
            <template v-else>
                <div class='form'>
                    <b-table
                    :data='EnrolmentTable.data'
                    :columns='EnrolmentTable.columns'
                    :selected.sync='EnrolmentTable.selected'></b-table>
                </div>
            </template>
        </div>
    </div>
</template>

<script>

import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'EnrolmentClass',
    props: {
        unit_id: {
            type: String,
            required: true
        }
    },

    components: {
        FButton,
        FStatusResponses
    },

    mounted() {
        this.getClassesByUnit()
    },

    data() {

        var EnrolmentTable = {
            data: [],
            columns: [
                {
                    field: 'class_name',
                    label: 'Class',
                    searchable: true
                },
                {
                    field: 'capacity',
                    label: 'Capacity'
                },
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

        return {
            EnrolmentTable,
        }
    },

    methods: {

        getClassesByUnit() {
            AInstance.get('/api/class/', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if ( response.status === 200 ) {
                    this.EnrolmentTable.data = response.data.data
                    this.EnrolmentTable.status = response.status
                    this.EnrolmentTable.message = response.data.message
                }

                else {
                    this.EnrolmentTable.status = response.status
                    this.EnrolmentTable.message = response.data.message
                }
            })
            .catch((error) => {
                this.EnrolmentTable.status = error.response.status
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