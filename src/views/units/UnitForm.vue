<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <template v-if='isLoading'>
            <b-loading :is-full-page='true' v-model='isLoading'></b-loading>
        </template>
        <template v-else>
            <div class='form'>
                <template v-for='form in unitForm'>
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

                        <!-- Drop-down Field Form Component -->

                        <template v-else-if='form.type === "drop-down"'>
                            <b-field :label='form.label' :type='form.color' :message='form.message'>
                                <b-dropdown aria-role='list' expanded v-model='form.value'>
                                    <template #trigger='{ active }'>
                                        <b-button
                                        :label='form.value'
                                        :type='form.color'
                                        :icon-right='active ? "menu-up" : "menu-down"'
                                        outlined
                                        expanded/>
                                    </template>

                                    
                                    <template v-for='listitem in form.selection'>
                                        <b-dropdown-item :key='listitem' :value='listitem' aria-role="listitem"> {{ listitem }} </b-dropdown-item>
                                    </template>                                
                                </b-dropdown>
                            </b-field>
                        </template>
                        <!-- Drop-down Field Form Component -->
                        <!-- END -->

                        <!-- Date picker (Full) Form Component -->
                        <template v-else-if='form.type === "date"'>
                            <b-field :label='form.label' :type='form.color' :message='form.message'>
                                <b-datepicker
                                    expanded
                                    v-model='form.value'
                                    :locale='locale'
                                    trap-focus>
                                </b-datepicker>
                            </b-field>
                        </template>
                        <!-- Date picker (Full) Form Component -->
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
                        <!-- END -->
                    </div>
                </template>
                <div class='controls'>
                    <FButton
                    label='Cancel'
                    color='danger'
                    outlined
                    @clicked='routeByName("Units")'></FButton>
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
import { ACCOUNT_GROUP_TYPE } from '@/utilities/account.utility.js'
import { errorSameDateMessage, errorDateBiggerThanMessage } from '@/utilities/date.utility.js'
import { emptyInputMessage, noMinimumLengthMessage, emptyDropdownMessage } from '@/utilities/field.messages.js'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'UnitForm',
    components: {
        AppHeader,
        FButton
    },

    mounted() {
        AInstance.get('/api/accounts/', {
            params: {
                group_type: ACCOUNT_GROUP_TYPE.UNIT_COORDINATOR.group_num
            }
        })
        .then((response) => {
            if (response.status === 200) {
                this.unitForm.unit_coordinator.data = response.data.data
            }
            else if (response.status === 204) {
                this.$buefy.toast.open({
                    duration: 3000,
                    type: 'is-warning',
                    message: 'There are no Unit Coordinators!'
                })
            }
            this.isLoading = false
        })
    },

    data() {

        var isLoading = true

        var unitForm = {

            unit_code: {
                label: 'Unit Code',
                placeholder: 'Enter Unit Code...',
                type: 'input-field',
                input_type: 'text',
                minlength: 3,
                maxlength: 10,
                value: '',
                color: '',
                message: ''
            },

            unit_name: {
                label: 'Unit Name',
                placeholder: 'Enter Unit Name...',
                type: 'input-field',
                input_type: 'text',
                maxlength: 200,
                value: '',
                color: '',
                message: ''
            },

            trimester: {
                label: 'Trimester',
                type: 'drop-down',
                drop_type: 'full',
                selection: [
                    'TJA',
                    'TMA',
                    'TSA'
                ],
                value: 'Trimester',
                color: '',
                message: ''
            },

            start_date: {
                label: 'Date of Commencement',
                type: 'date',
                value: null,
                color: '',
                message: ''
            },

            end_date: {
                label: 'Date of Completion',
                type: 'date',
                value: null,
                color: '',
                message: ''
            },

            unit_coordinator: {
                label: 'Unit Coordinator',
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
            unitForm,
            locale: 'en-CA'
        }
    },

    methods: {
        validate() {

            let success = true

            // >!
            // Unit Code Validation
            // --------------------------------------------------

            if (this.unitForm.unit_code.value === '' ||
                this.unitForm.unit_code.value === null ||
                this.unitForm.unit_code.value === undefined) {

                this.unitForm.unit_code.color = 'is-danger'
                this.unitForm.unit_code.message = emptyInputMessage(this.unitForm.unit_code.label)
                success = false
            }

            else if (this.unitForm.unit_code.value.length < this.unitForm.unit_code.minlength) {
                this.unitForm.unit_code.color = 'is-danger'
                this.unitForm.unit_code.message = noMinimumLengthMessage(this.unitForm.unit_code.minlength)
                success = false
            }

            else {
                this.unitForm.unit_code.color = 'is-success'
                this.unitForm.unit_code.message = ''
            }

            // >!
            // Unit Name Validation
            // --------------------------------------------------

            console.log(this.unitForm.unit_name.value)
            if (this.unitForm.unit_name.value === '' ||
                this.unitForm.unit_name.value === null ||
                this.unitForm.unit_name.value === undefined) {

                this.unitForm.unit_name.color = 'is-danger'
                this.unitForm.unit_name.message = emptyInputMessage(this.unitForm.unit_name.label)
                success = false
            }

            else {
                this.unitForm.unit_name.color = 'is-success'
                this.unitForm.unit_name.message = ''
            }

            // >!
            // Trimester Validation
            // --------------------------------------------------

            if (this.unitForm.trimester.value.toLowerCase() === 'trimester') {
                this.unitForm.trimester.color = 'is-danger'
                this.unitForm.trimester.message = emptyDropdownMessage(this.unitForm.trimester.label)
                success = false
            }

            else {
                this.unitForm.trimester.color = 'is-success'
                this.unitForm.trimester.message = ''
            }

            // >!
            // Start Date & End Date Validation
            // --------------------------------------------------

            let continueDateCheck = true
            if (this.unitForm.start_date.value === null ||
                this.unitForm.start_date.value === undefined) {

                this.unitForm.start_date.color = 'is-danger'
                this.unitForm.start_date.message = 'Please select a date!'
                continueDateCheck = false
                success = false
            }

            if (this.unitForm.end_date.value === null ||
                this.unitForm.end_date.value === undefined) {

                this.unitForm.end_date.color = 'is-danger'
                this.unitForm.end_date.message = 'Please select a date!'
                continueDateCheck = false
                success = false
            } 

            if (continueDateCheck) {
                if ( this.compareDates( this.unitForm.start_date.value, this.unitForm.end_date.value ) ) {
                    let message = errorSameDateMessage(this.unitForm.start_date.label, this.unitForm.end_date.label)
                    this.unitForm.start_date.color = 'is-danger'
                    this.unitForm.start_date.message = message
                    this.unitForm.end_date.color = 'is-danger'
                    this.unitForm.end_date.message = message
                    success = false
                }

                else if ( this.isDateBiggerThan( this.unitForm.start_date.value, this.unitForm.end_date.value) ) {
                    let message = errorDateBiggerThanMessage(this.unitForm.start_date.label, this.unitForm.end_date.label)
                    this.unitForm.start_date.color = 'is-danger'
                    this.unitForm.start_date.message = message
                    this.unitForm.end_date.color = 'is-danger'
                    this.unitForm.end_date.message = message
                    success = false
                }

                else {
                    this.unitForm.start_date.color = 'is-success'
                    this.unitForm.start_date.message = ''
                    this.unitForm.end_date.color = 'is-success'
                    this.unitForm.end_date.message = ''
                }

                if ( this.unitForm.trimester.value.toLowerCase() === 'trimester' ) {
                    this.unitForm.trimester.color = 'is-danger'
                    this.unitForm.trimester.message = 'Date of commencement and Trimester do not match!'
                    this.unitForm.start_date.color = 'is-danger'
                    this.unitForm.start_date.message = 'Date of commencement and Trimester do not match!'
                }

                else if ( this.unitForm.trimester.value === 'TJA' ) {
                    if (this.unitForm.start_date.value.getMonth() !== 0) {
                        this.unitForm.start_date.color = 'is-danger'
                        this.unitForm.start_date.message = 'Date should only be in January!'
                        success = false
                    }
                }

                else if ( this.unitForm.trimester.value === 'TMA' ) {
                    if (this.unitForm.start_date.value.getMonth() !== 4) {
                        this.unitForm.start_date.color = 'is-danger'
                        this.unitForm.start_date.message = 'Date should only be in May!'
                        success = false
                    }
                }

                else if ( this.unitForm.trimester.value === 'TSA' ) {
                    if (this.unitForm.start_date.value.getMonth() !== 8) {
                        this.unitForm.start_date.color = 'is-danger'
                        this.unitForm.start_date.message = 'Date should only be in September!'
                        success = false
                    }
                }

                else {
                    this.unitForm.start_date.color = 'is-success'
                    this.unitForm.start_date.message = ''
                    this.unitForm.end_date.color = 'is-success'
                    this.unitForm.end_date.message = ''
                }
            }

            if (success) {
                let insertedYear = this.unitForm.start_date.value.getFullYear()
                AInstance.post('/api/units/create', {
                    unit_code: this.unitForm.unit_code.value,
                    unit_name: this.unitForm.unit_name.value,
                    trimester: this.unitForm.trimester.value,
                    year: insertedYear,
                    start_date: this.unitForm.start_date.value.toDateString(),
                    end_date: this.unitForm.end_date.value.toDateString(),
                    unit_coordinator: this.unitForm.unit_coordinator.value
                })
                .then((response) => {
                    if (response.status === 201) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-success',
                            message: response.data.messgae
                        })
                    }

                    this.routeByName('Units')
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