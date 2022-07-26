<template>
    <div class='base'> 
        <AppHeader></AppHeader>
        <template v-if='isLoading'>
            <b-loading :is-full-page='true' v-model='isLoading'></b-loading>
        </template>
        <template v-else>
            <div class='form'>
                <template v-for='form in formData'>
                    <div class='content' :key='form.label'>

                        <!-- Input Field Form Component -->
                        <template v-if='form.type === "input-field"'>
                            <b-field :label='form.label' :type='form.color' :message='form.message'>
                                <b-input 
                                v-model='form.value'
                                expanded
                                :has-counter='false'
                                :maxlength='form.maxlength'
                                :type='form.input_type'></b-input>
                            </b-field>
                        </template>
                        <!-- Input Field Form Component -->
                        <!-- END -->

                        <!-- Table Picker Form Component -->
                        <template v-else-if='form.type === "table"'>
                            <template v-if='form.data.length > 0'>
                                <b-field :label='form.label'>
                                </b-field>
                                <b-table
                                :data='form.data'
                                :columns='form.columns'
                                :selected.sync='form.value'
                                
                                :paginated='true'
                                :per-page='form.data.length'
                                aria-next-label="Next"
                                aria-previos-label="Previous"
                                aria-page-label="Page"
                                aria-current-label="Current"></b-table>
                            </template>
                        </template>
                        <!-- Table Picker Form Component -->

                    </div>
                </template>
                <div class='controls'>
                    <FButton
                    label='Cancel'
                    color='danger'
                    outlined
                    @clicked='routeByName("UnitView", {
                        unit_id: unit_id
                    })'></FButton>
                    <FButton
                    label='Register'
                    color='success'
                    @clicked='validate()'></FButton>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import { emptyInputMessage, noMinimumLengthMessage } from '@/utilities/field.messages.js'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'EnrolmentClassForm',
    components: {
        AppHeader,
        FButton
    },

    props: {
        unit_id: {
            type: String,
            default: ''
        }
    },

    mounted() {
        this.getTeachingStaffs()
    },

    methods: {

        getTeachingStaffs() {
            AInstance.get('/api/teaching-staffs/', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if ( response.status === 200 ) {
                    this.formData.teacher.data = response.data.data
                    console.log(response.data.data)
                }
            })
            .catch((error) => {
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-danger',
                    message: error.response.data.message
                })
            })

            this.isLoading = false
        },

        validate() {

            let success = true

            // >!
            // Class name validation
            // --------------------------------------------------

            if (this.formData.class_name.value === '' ||
                this.formData.class_name.value === null ||
                this.formData.class_name.value === undefined) {

                this.formData.class_name.color = 'is-danger'
                this.formData.class_name.message = emptyInputMessage(this.formData.class_name.label)
                success = false
            }

            else if (this.formData.class_name.value.length < this.formData.class_name.minlength) {
                this.formData.class_name.color = 'is-danger'
                this.formData.class_name.message = noMinimumLengthMessage(this.formData.class_name.minlength)
                success = false
            }

            else {
                this.formData.class_name.color = 'is-success'
                this.formData.class_name.message = ''
            }

            // >!
            // Capacity
            // --------------------------------------------------

            if (this.formData.capacity.value === '' ||
                this.formData.capacity.value === null ||
                this.formData.capacity.value === undefined) {

                this.formData.capacity.color = 'is-danger'
                this.formData.capacity.message = emptyInputMessage(this.formData.capacity.label)
                success = false
            }

            else if (this.formData.capacity.value.length < this.formData.capacity.minlength) {
                this.formData.capacity.color = 'is-danger'
                this.formData.capacity.message = noMinimumLengthMessage(this.formData.capacity.minlength)
                success = false
            }

            else {
                this.formData.capacity.color = 'is-success'
                this.formData.capacity.message = ''
            }

            // >!
            // Teacher Validation
            // --------------------------------------------------

            if ( this.formData.teacher.value === null ) success = false

            if ( success ) {
                AInstance.post( '/api/class/create', {
                    class_name: this.formData.class_name.value,
                    capacity: this.formData.capacity.value,
                    teacher: this.formData.teacher.value.teaching_staff_id,
                    unit_id: this.unit_id
                } )
                .then((response) => {
                    if ( response.status === 201 ) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-success',
                            message: response.data.message
                        })

                        this.routeByName( 'UnitView', {
                            unit_id: this.unit_id
                        } )
                    }

                    else if ( response.status === 204 ) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-danger',
                            message: response.data.message
                        })
                    }

                    else if ( response.status === 403 ) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-danger',
                            message: response.data.message
                        })
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
    },

    data() {
        var isLoading = true

        var formData = {

            class_name: {
                label: 'Class Name',
                placeholder: 'Enter class name...',
                type: 'input-field',
                input_type: 'text',
                minlength: 3,
                maxlength: 10,
                value: '',
                color: '',
                message: ''
            },

            capacity: {
                label: 'Capacity',
                placeholder: 'Maximum students...',
                type: 'input-field',
                input_type: 'text',
                maxlength: 3,
                value: '',
                color: '',
                message: ''
            },

            teacher: {
                label: 'Teacher',
                type: 'table',
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
                    }
                ],
                data: [],
                value: null,
                perPage: 5,
                color: '',
                message: ''
            }
        }

        return {
            isLoading,
            formData
        }
    }
}
</script>

<style scoped lang='scss'>

.form {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 25px;
    padding: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form .content {
    position: relative;
    width: 90%;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form .controls {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    gap: 25px;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

@media only screen and (min-width:1280px) {
    .form .content {
        position: relative;
        width: 40%;
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .form .controls {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 40%;
        gap: 25px;
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
}

</style>