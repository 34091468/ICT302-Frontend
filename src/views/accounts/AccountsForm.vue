<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='account-form'>
            <template v-for='key in accountForm'>
                
                <div class='form-content' :key='key.label'>
                    <template v-if='key.type === "drop-down"'>
                        <b-field :label='key.label' :type='key.color' :message='key.message'>
                            <b-dropdown aria-role='list' expanded v-model='key.value'>
                                <template #trigger='{ active }'>
                                    <b-button
                                    :label='key.value'
                                    :type='key.color'
                                    :icon-right='active ? "menu-up" : "menu-down"'
                                    outlined
                                    expanded/>
                                </template>

                                
                                <template v-for='listitem in key.selection'>
                                    <b-dropdown-item :key='listitem' :value='listitem' aria-role="listitem"> {{ listitem }} </b-dropdown-item>
                                </template>
                                
                                
                            </b-dropdown>
                        </b-field>
                    </template>

                    <template v-else-if='key.type === "input-field"'>
                        <b-field :label='key.label' :type='key.color' :message='key.message'>
                            <b-input 
                            v-model='key.value'
                            expanded
                            :has-counter='false'
                            :maxlength='key.maxlength'
                            :type='key.input_type'></b-input>
                        </b-field>
                    </template>

                    <template v-else-if='key.type === "date"'>
                        <b-field :label='key.label' :type='key.color' :message='key.message'>
                            <b-datepicker
                                expanded
                                v-model='key.value'
                                :locale='undefined'
                                :icon-right='key.value ? "close-circle" : ""'
                                icon-right-clickable
                                @icon-right-click='clearDate'
                                trap-focus>
                            </b-datepicker>
                        </b-field>
                        
                    </template>
                </div>                
            </template>
            
            <div class='controls-content'>
                <FButton
                label='Cancel'
                color='danger'
                outlined
                @clicked='routeByName("Accounts")'></FButton>
                <FButton
                label='Register'
                color='success'
                @clicked='validateRegistration()'></FButton>
            </div>
        </div>
    </div>
</template>

<script>

import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import { NAME_REGEX, NRIC_REGEX, CONTACT_NUMBER_REGEX } from '@/utilities/regex.utility.js'
import { ACCOUNT_GROUP_TYPE, GENDER_TYPE, MINIMUM_AGE } from '@/utilities/account.utility.js'
import { emptyInputMessage, noMinimumLengthMessage, alphabetsOnlyMessage, errorIdentityNumberMessage, onlyNumericMessage, emptyDropdownMessage } from '@/utilities/field.messages.js'
import { noMinimumAgeMessage } from '@/utilities/date.messages.js'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'AccountsForm',

    props: {
        account_type: {
            type: String,
            required: true,
            default: 'student'
        }
    },

    components: {
        AppHeader,
        FButton
    },

    data() {

        var accountForm = {

            salutation: {
                label: 'Salutation',
                type: 'drop-down',
                drop_type: 'full',
                selection: [
                    'Mr',
                    'Miss',
                    'Ms',
                    'Dr'
                ],
                value: 'Salutation',
                color: '',
                message: ''
            },

            firstName: {
                label: 'First Name',
                placeholder: 'Enter first name...',
                type: 'input-field',
                input_type: 'text',
                minlength: 0,
                maxlength: 100,
                value: '',
                color: '',
                message: ''
            },

            lastName: {
                label: 'Last Name',
                placeholder: 'Enter last name...',
                type: 'input-field',
                input_type: 'text',
                minlength: 0,
                maxlength: 100,
                value: '',
                color: '',
                message: ''
            },

            gender: {
                label: 'Gender',
                type: 'drop-down',
                drop_type: 'index',
                selection: [
                    'Female',
                    'Male'
                ],
                value: 'Gender',
                color: '',
                message: ''
            },
            
            dob: {
                label: 'Date of Birth',
                type: 'date',
                value: new Date(),
                color: '',
                message: ''
            },

            nationality: {
                label: 'Nationality',
                type: 'drop-down',
                drop_type: 'full',
                selection: [
                    'Singaporean',
                    'PR',
                    'Foreigner'
                ],
                value: 'Nationality',
                color: '',
                message: ''
            },

            identityNo: {
                label: 'NRIC',
                placeholder: 'Enter NRIC...',
                type: 'input-field',
                input_type: 'text',
                minlength: 9,
                maxlength: 9,
                value: '',
                color: '',
                message: ''
            },

            contactNo: {
                label: 'Contact Number',
                placeholder: 'Enter contact number...',
                type: 'input-field',
                input_type: 'text',
                minlength: 8,
                maxlength: 8,
                value: '',
                color: '',
                message: ''
            },
            password: {
                label: 'Password',
                placeholder: 'Enter password...',
                type: 'input-field',
                input_type: 'password',
                minlength: 8,
                maxlength: 100,
                value: '',
                color: '',
                message: ''
            }        
        }

        return {
            accountForm
        }
    },

    methods: {
        clearDate() {
            this.accountForm.dob.value = new Date()
        },

        validateRegistration() {

            let success = true

            // >!
            // Salutation Validation
            // --------------------------------------------------

            if (this.accountForm.salutation.value.toLowerCase() === 'salutation') {
                this.accountForm.salutation.color = 'is-danger'
                this.accountForm.salutation.message = emptyDropdownMessage('salutation')
                success = false
            }

            else {
                this.accountForm.salutation.color = ''
                this.accountForm.salutation.message
            }

            // >!
            // First Name Validation
            // --------------------------------------------------

            if (this.accountForm.firstName.value === '' ||
                this.accountForm.firstName.value === null ||
                this.accountForm.firstName.value === undefined) {
                
                this.accountForm.firstName.color = 'is-danger'
                this.accountForm.firstName.message = emptyInputMessage('First Name')
                success = false
            }

            else if (!this.accountForm.firstName.value.match(NAME_REGEX)) {
                this.accountForm.firstName.color = 'is-danger'
                this.accountForm.firstName.message = alphabetsOnlyMessage('First Name')
                success = false
            }

            else {
                this.accountForm.firstName.color = 'is-success'
                this.accountForm.firstName.message = ''
            }

            // >!
            // Last Name Validation
            // --------------------------------------------------

            if (this.accountForm.lastName.value === '' ||
                this.accountForm.lastName.value === null ||
                this.accountForm.lastName.value === undefined) {
                
                this.accountForm.lastName.color = 'is-danger'
                this.accountForm.lastName.message = emptyInputMessage('First Name')
                success = false
            }

            else if (!this.accountForm.lastName.value.match(NAME_REGEX)) {
                this.accountForm.lastName.color = 'is-danger'
                this.accountForm.lastName.message = alphabetsOnlyMessage('First Name')
                success = false
            }

            else {
                this.accountForm.lastName.color = 'is-success'
                this.accountForm.lastName.message = ''
            }

            // >!
            // Gender Validation
            // --------------------------------------------------

            if (this.accountForm.gender.value.toLowerCase() === 'gender') {
                this.accountForm.gender.color = 'is-danger'
                this.accountForm.gender.message = emptyDropdownMessage('gender')
                success = false
            }

            else {
                this.accountForm.gender.color = ''
                this.accountForm.gender.message = ''
            }

            // >!
            // Date of Birth Validation
            // --------------------------------------------------

            let currentYear = new Date().getFullYear()
            if (currentYear - this.accountForm.dob.value.getFullYear() < MINIMUM_AGE) {

                this.accountForm.dob.color = 'is-danger'
                this.accountForm.dob.message = noMinimumAgeMessage(MINIMUM_AGE)
                success = false
            }

            else {
                this.accountForm.dob.color = ''
                this.accountForm.dob.message = ''
            }

            // >!
            // nationality Validation
            // --------------------------------------------------

            if (this.accountForm.nationality.value.toLowerCase() === 'nationality') {
                this.accountForm.nationality.color = 'is-danger'
                this.accountForm.nationality.message = emptyDropdownMessage('nationality')
                success = false
            }

            else {
                this.accountForm.nationality.color = ''
                this.accountForm.nationality.message = ''
            }

            // >!
            // NRIC Validation
            // --------------------------------------------------

            if (this.accountForm.identityNo.value === '' ||
                this.accountForm.identityNo.value === null ||
                this.accountForm.identityNo.value === undefined) {
                
                this.accountForm.identityNo.color = 'is-danger'
                this.accountForm.identityNo.message = emptyInputMessage('Identity Number')
                success = false
            }

            else if (!this.accountForm.identityNo.value.match(NRIC_REGEX)) {
                this.accountForm.identityNo.color = 'is-danger'
                this.accountForm.identityNo.message = errorIdentityNumberMessage('Identity Number')
                success = false
            }

            else {
                this.accountForm.identityNo.color = 'is-success'
                this.accountForm.identityNo.message = ''
            }

            // >!
            // Contact Number Validation
            // --------------------------------------------------

            if (this.accountForm.contactNo.value === '' ||
                this.accountForm.contactNo.value === null ||
                this.accountForm.contactNo.value === undefined) {
                
                this.accountForm.contactNo.color = 'is-danger'
                this.accountForm.contactNo.message = emptyInputMessage('Contact')
                success = false
            }

            else if (!this.accountForm.contactNo.value.match(CONTACT_NUMBER_REGEX)) {
                this.accountForm.contactNo.color = 'is-danger'
                this.accountForm.contactNo.message = onlyNumericMessage('Contact')
                success = false
            }

            else {
                this.accountForm.contactNo.color = 'is-success'
                this.accountForm.contactNo.message = ''
            }

            // >!
            // Password Validation
            // --------------------------------------------------

            if (this.accountForm.password.value === '' ||
                this.accountForm.password.value === null ||
                this.accountForm.password.value === undefined) {
                
                this.accountForm.password.color = 'is-danger'
                this.accountForm.password.message = emptyInputMessage('Password')
                success = false
            }

            else if (this.accountForm.password.value.length < this.accountForm.password.minlength) {
                this.accountForm.password.color = 'is-danger'
                this.accountForm.password.message = noMinimumLengthMessage(this.accountForm.password.minlength, 'Password')
                success = false
            }

            else {
                this.accountForm.password.color = 'is-success'
                this.accountForm.password.message = ''
            }

            if (success) {
                let encodedPassword = window.btoa(this.accountForm.password.value)
                let contactNumber = window.btoa(this.accountForm.contactNo.value)
                let identityNumber = window.btoa(this.accountForm.identityNo.value)
                AInstance.post('/api/user/register', {
                    salutation: this.accountForm.salutation.value,
                    first_name: this.accountForm.firstName.value,
                    last_name: this.accountForm.lastName.value,
                    date: this.accountForm.dob.value.getDate(),
                    month: this.accountForm.dob.value.getMonth(),
                    year: this.accountForm.dob.value.getFullYear(),
                    contact_number: contactNumber,
                    identity_number: identityNumber,
                    nationality: this.accountForm.nationality.value,
                    group_type: ACCOUNT_GROUP_TYPE[ this.account_type.toUpperCase() ].group_num,
                    password: encodedPassword,
                    gender: GENDER_TYPE[ this.accountForm.gender.value.toUpperCase() ].index
                }, 2000)
                .then((response) => {
                    if (response.data.code === 201) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-success',
                            message: response.data.message
                        })

                        this.routeByName('Accounts')
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

.account-form {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    gap: 50px;
    padding: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.account-form .form-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
}

.account-form .controls-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    gap: 25px;
}

@media only screen and (min-width:1280px) {
    .account-form {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: auto;
        gap: 50px;
        padding: 50px 10%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .account-form .form-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 30%;
    }

    .account-form .controls-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 30%;
        gap: 25px;
    }
}

</style>