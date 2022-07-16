<template>
    <div class='base'>
        <div class='root'>
            <img :class='{ mobile: isMobileApp() }' src='@/assets/app/app-mu-icon-black.png'>

            <div class='content' :class='{ mobile: isMobileApp() }'>
                <div class='inputs'>
                    <!-- Username Input -->
                    <b-field 
                    :label='usernameField.label' 
                    :type='usernameField.color' 
                    :message='usernameField.message'>
                        <b-input 
                        v-model='usernameField.value'
                        expanded
                        :has-counter='false'
                        :maxlength='usernameField.maxlength'
                        ></b-input>
                    </b-field>
                    <!-- Username Input -->
                    <!-- END -->

                    <!-- Password Input -->
                    <b-field 
                    :label='passwordField.label' 
                    :type='passwordField.color' 
                    :message='passwordField.message'>
                        <b-input 
                        v-model='passwordField.value'
                        expanded
                        :has-counter='false'
                        :maxlength='passwordField.maxlength'
                        type='password'
                        ></b-input>
                    </b-field>
                    <!-- Password Input -->
                    <!-- END -->
                </div>

                <div class='navigations' :class='{ mobile: isMobileApp() }'>

                    <!-- Button Submission -->
                    <FButton
                    label='Return'
                    color='danger'
                    outlined
                    round
                    @clicked='routeByName("Home")'></FButton>
                    <!-- Button Submission -->
                    <!-- END -->

                    <!-- Button Submission -->
                    <FButton
                    label='Log In'
                    color='primary'
                    round
                    @clicked='doLogin'></FButton>
                    <!-- Button Submission -->
                    <!-- END -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import FButton from '@/components/common/FButton.vue'
import { emptyInputMessage } from '@/utilities/field.messages.js'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'Login',
    components: {
        FButton
    },

    mounted() {
        
    },

    data() {

        /**
         * The information of a username's input field.
         * @type { Object }
         */
        var usernameField = {
            label: 'Username',
            placeholder: 'Please enter your Murdoch Id',
            maxlength: 8,
            input: '',
            validation: {
                result: '',
                message: ''
            }
        }

        /**
         * The information of a password's input field.
         * @type { Object }
         */
        var passwordField = {
            label: 'Password',
            placeholder: 'Please enter your password',
            input: '',
            color: ''
        }

        return {
            usernameField,
            passwordField,
        }
    },

    methods: {
        /**
         * Creates a Login API request. Also handles success or fail factor.
         */
        doLogin () {
            let success = true

            if (this.usernameField.value === '' ||
                this.usernameField.value === null ||
                this.usernameField.value === undefined) {
                this.usernameField.color = 'is-danger'
                this.usernameField.message = emptyInputMessage('Username')
                success = false
            }

            else {
                this.usernameField.color = ''
                this.usernameField.message = ''
            }

            if (this.passwordField.value === '' ||
                this.passwordField.value === null ||
                this.passwordField.value === undefined) {
                this.passwordField.color = 'danger'
                this.passwordField.message = emptyInputMessage('Password')
                success = false
            }

            else {
                this.passwordField.color = ''
                this.passwordField.message = ''
            }

            if (success) {
                console.log('Success')
                let encodedPassword = Buffer.from(this.passwordField.value).toString('base64')
                AInstance.post('/api/user/login', {
                    user_id: this.usernameField.value,
                    password: encodedPassword
                })
                .then((response) => {
                    this.$buefy.toast.open({
                        duration: 3000,
                        type: 'is-success',
                        message: response.data.message
                    })
                    localStorage.token = response.data.token
                    this.routeByName('Portal')
                })
                .catch((error) => {
                    console.log('error')
                    this.usernameField.color = 'is-danger'
                    this.usernameField.message = error.response.data.message

                    this.passwordField.color = 'is-danger'
                    if (error.response.data.code === 403) this.passwordField.message = error.response.data.message
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
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    padding: 25px;
    gap: 50px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.root img {
    position: relative;
    display: block;
    width: 15%;
    height: auto;
    border-radius: 15px;
}

.root img.mobile {
    width: 45% !important;
    height: auto !important;
}

.root .content {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
    gap: 25px;
}

.root .content.mobile {
    width: 80% !important;
}

.root .content .inputs {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
}

.root .content .navigations {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 50px;
}

.root .content .navigations > * {
    padding: 0 !important;
}

</style>