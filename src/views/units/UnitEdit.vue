<template>
    <div class='base'>
        <template v-if='isLoading'>
            <b-loading :is-full-page='true' v-model='isLoading'></b-loading>
        </template>
        <template v-else>
            <div class='form'>
                <template v-for='form in formOption'>
                    <div class='content' :key='form.label'>
                        <template v-if='form.type === "date"'>
                            <b-field :label='form.label' :type='form.color' :message='form.message'>
                                <b-datepicker
                                    expanded
                                    v-model='form.value'
                                    :locale='locale'
                                    trap-focus>
                                </b-datepicker>
                            </b-field>
                        </template>

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

                        <template v-else-if='form.type === "table"'>
                            <template v-if='form.data.length > 0'>
                                <b-field :label='form.label'>
                                </b-field>

                                <b-button
                                label='Clear'
                                type='is-danger'
                                @click='clearUnitCoordinatorSelection()'></b-button>

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
                    </div>
                </template>

                <div class='form-controls'>
                    <FButton
                    label='Cancel'
                    color='danger'
                    outlined
                    @clicked='returnToView(false)'></FButton>
                    <FButton
                    label='Update'
                    color='success'
                    @clicked='validate()'></FButton>
                </div>
            </div>
        </template>
        
    </div>
</template>

<script>

import { AInstance } from '@/toolbox/TAxios.js'
import FButton from '@/components/common/FButton.vue'
import { ACCOUNT_GROUP_TYPE } from '@/utilities/account.utility.js'
import { errorSameDateMessage, errorDateBiggerThanMessage } from '@/utilities/date.utility.js'

export default {
    name: 'UnitEdit',
    props: {
        unit: {
            type: Object,
            required: true
        }
    },

    components: {
        FButton,
    },

    mounted() {
        AInstance.get('/api/accounts/active/', {
            params: {
                group_type: ACCOUNT_GROUP_TYPE.UNIT_COORDINATOR.group_num
            }
        })
        .then((response) => {
            if (response.status === 200) {
                this.formOption.unit_coordinator.data = response.data.data
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

        var formOption = {
            start_date: {
                label: 'Date of Commencement',
                type: 'date',
                value: new Date(this.unit.start_date),
                color: '',
                message: ''
            },
            
            end_date: {
                label: 'Date of Completion',
                type: 'date',
                value: new Date(this.unit.end_date),
                color: '',
                message: ''
            },

            status: {
                label: 'Status',
                type: 'drop-down',
                drop_type: 'index',
                selection: [
                    'Active',
                    'Inactive',
                    'Deleted'
                ],
                value: this.unit.status,
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
                default: {
                    account_id: this.unit.uc.account_id,
                    user_id: this.unit.uc.user_id
                },
                value: null,
                perPage: 5,
                color: '',
                message: ''
            }
        }

        return {
            isLoading,
            formOption,
            locale: 'en-CA'
        }
    },

    methods: {

        clearUnitCoordinatorSelection() {
            this.formOption.unit_coordinator.value = null
        },

        returnToView(onRefresh) {
            this.$emit('return', {
                refresh: onRefresh,
                tab: 'UNIT'
            })
        },

        validate() {
            let success = true

            // >!
            // Start Date & End Date Validation
            // --------------------------------------------------

            let continueDateCheck = false
            if ( this.compareDates( this.formOption.start_date.value, this.formOption.end_date.value ) ) {
                let message = errorSameDateMessage(this.formOption.start_date.label, this.formOption.end_date.label)
                this.formOption.start_date.color = 'is-danger'
                this.formOption.start_date.message = message
                this.formOption.end_date.color = 'is-danger'
                this.formOption.end_date.message = message
                success = false
            }

            else if ( this.isDateBiggerThan( this.formOption.start_date.value, this.formOption.end_date.value) ) {
                let message = errorDateBiggerThanMessage(this.formOption.start_date.label, this.formOption.end_date.label)
                this.formOption.start_date.color = 'is-danger'
                this.formOption.start_date.message = message
                this.formOption.end_date.color = 'is-danger'
                this.formOption.end_date.message = message
                success = false
            }

            else {
                this.formOption.start_date.color = 'is-success'
                this.formOption.start_date.message = ''
                this.formOption.end_date.color = 'is-success'
                this.formOption.end_date.message = ''
                continueDateCheck = true
            }

            if (continueDateCheck) {
                if ( this.unit.trimester === 'TJA' ) {
                    if (this.formOption.start_date.value.getMonth() !== 0) {
                        this.formOption.start_date.color = 'is-danger'
                        this.formOption.start_date.message = 'Date should only be in January!'
                        success = false
                    }
                }

                else if ( this.unit.trimester === 'TMA' ) {
                    if (this.formOption.start_date.value.getMonth() !== 4) {
                        this.formOption.start_date.color = 'is-danger'
                        this.formOption.start_date.message = 'Date should only be in May!'
                        success = false
                    }
                }

                else if ( this.unit.trimester === 'TSA' ) {
                    if (this.formOption.start_date.value.getMonth() !== 8) {
                        this.formOption.start_date.color = 'is-danger'
                        this.formOption.start_date.message = 'Date should only be in September!'
                        success = false
                    }
                }

                else {
                    this.formOption.start_date.color = 'is-success'
                    this.formOption.start_date.message = ''
                    this.formOption.end_date.color = 'is-success'
                    this.formOption.end_date.message = ''
                }
            }
            
            if (success) {

                let statusIndex = this.formOption.status.selection.length;
                let found = false
                for (statusIndex; statusIndex > 0; --statusIndex) {
                    if (this.formOption.status.value === this.formOption.status.selection[statusIndex - 1]) {
                        found = true
                        break
                    }
                }

                if (!found) {
                    for (let index = 0; index < this.formOption.status.selection.length; ++index) {
                        if (this.unit.status.toLowerCase() === this.formOption.status.selection[index].toLowerCase()) {
                            statusIndex = index + 1
                            break
                        }
                    }
                }

                let ucId = null
                if (this.formOption.unit_coordinator.value !== null) {
                    ucId = this.formOption.unit_coordinator.value.account_id
                } else ucId = this.formOption.unit_coordinator.default.account_id

                AInstance.put('/api/units/update', {
                    unit_id: this.unit.unit_id,
                    start_date: this.formOption.start_date.value.toDateString(),
                    end_date: this.formOption.end_date.value.toDateString(),
                    status: statusIndex,
                    unit_coordinator: ucId
                })
                .then((response) => {
                    if (response.status === 200) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-success',
                            message: 'Unit has been updated successfully!'
                        })
                        this.returnToView(true)
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
}
</script>

<style scoped lang='scss'>

.form {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    gap: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form .content {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    gap: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form .form-controls {
    position: relative;
    display: flex;
    align-items: center;
    gap: 25px;
    width: 100%;
    height: 50px;
}

@media only screen and (min-width:1280px) {
    .form .form-controls * {
        position: relative;
        width: 100px;
    }
}

</style>