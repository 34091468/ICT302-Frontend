<template>
    <div class='base'>
        <AppMenu/>
        <div class='root'>
            <div class='header'>Edit Account</div>
            <div class='account-form' :class='{ mobile: isMobileApp() }'>
                <template
                v-for='key in accountForm'>
                    <div :key='key.label' class='form-content'>
                        <template v-if='key.type === "drop-down"'>
                            <b-field 
                            :label='key.label'
                            :type='key.color'
                            :message='key.message'>
                                <b-dropdown
                                aria-role='list'
                                expanded
                                v-model='key.value'>
                                    <template #trigger='{ active }'>
                                        <b-button
                                        :label='key.value'
                                        :type='key.color'
                                        :icon-right='active ? "menu-up" : "menu-down"'
                                        outlined
                                        expanded/>
                                    </template>

                                    <template v-for='listitem in key.selection'>
                                        <b-dropdown-item :key='listitem.index' :value='listitem.status' aria-role="listitem"> {{ listitem.status }} </b-dropdown-item>
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
                    </div>
                </template>

                <div class='controls-content'>
                    <FButton
                    label='Cancel'
                    color='danger'
                    outlined
                    @clicked='routeByName("Accounts")'></FButton>
                    <FButton
                    label='Update'
                    color='success'
                    @clicked='validateUpdate()'></FButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import FInputField from '@/components/FInputField.vue'
import FButton from '@/components/common/FButton.vue'
import AppMenu from '@/components/common/AppMenu.vue'
import { ACCOUNT_STATUS } from '@/utilities/account.utility.js'
import { noMinimumLengthMessage } from '@/utilities/field.messages.js'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'AccountsEdit',
    props: {
        accountId: {
            type: Number,
            default: -1,
            required: true
        }
    },
    components: {
        // FInputField
        AppMenu,
        FButton 
    },

    data() {
        var accountForm = {
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
            },
            status: {
                label: 'Status',
                type: 'drop-down',
                drop_type: 'full',
                selection: ACCOUNT_STATUS,
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
        validateUpdate() {

            if (this.accountForm.password.value !== ''&&
                this.accountForm.status.value === '') {

                this.accountForm.password.color = 'is-danger'
                this.accountForm.password.message = 'One of the fields must not be empty!'

                this.accountForm.status.color = 'is-danger'
                this.accountForm.password.message = 'One of the fields must not be empty!'
                return
            }

                        let success = true

            if (this.accountForm.password.value !== '') {

                if (this.accountForm.password.value.length < this.accountForm.password.minlength) {
                    this.accountForm.password.color = 'is-danger'
                    this.accountForm.password.message = noMinimumLengthMessage(this.accountForm.password.minlength, 'Password')
                    success = false
                }
            }

            if (success) {
                let encodedPassword = ''
                let statusIndex = ''
                if (this.accountForm.password.value !== '' &&
                    this.accountForm.password.value !== null &&
                    this.accountForm.password.value !== undefined) {

                    encodedPassword = window.btoa(this.accountForm.password.value)
                }

                if (this.accountForm.status.value !== '') {
                    for (let index = 0; index < ACCOUNT_STATUS.length; ++index) {
                        if (ACCOUNT_STATUS[index].status === this.accountForm.status.value) {
                            statusIndex = ACCOUNT_STATUS[index].index.toString()
                            break
                        }
                    }
                }

                AInstance.put('/api/accounts/update', {
                    'accountId': this.accountId,
                    'password': encodedPassword,
                    'status': statusIndex
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-success',
                            message: response.data.message
                        })
                        this.routeByName('Accounts')
                    }
                })
                .catch((error) => {
                    console.log(error)
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

.root {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    gap: 25px;
    padding: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.root .account-form {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    width: 100%;
}

.root .account-form.mobile {
    flex-direction: column;
    justify-content: center;
}

.root .account-form .form-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
}

.root .account-form .form-content *,
.root .account-form.mobile .form-content * {
    flex-grow: 1;
}

.root .account-form.mobile .form-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.root .account-form .controls-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 30%;
    gap: 25px;
}

.root .account-form.mobile .controls-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 25px;
}

</style>