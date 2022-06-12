<template>
    <div class='root'>
        <div class='card' :class='[{mobile: isMobileApp()}]'>
            <div class='card-header'>
                <img src='@/assets/app/app-icon-main.png' alt="" @click='routeByName("Home")'>
            </div>
            <div class='card-content'>

                <div class='input-body'>
                    <!-- Username Input -->
                    <FInputField
                    :label='usernameField.label'
                    :placeholder='usernameField.placeholder'
                    :maxlength='usernameField.maxlength'
                    :validation='loginValidation'
                    @update:modelValue='newValue => usernameField.input = newValue'
                    ></FInputField>
                    <!-- Username Input -->
                    <!-- END -->

                    <!-- Password Input -->
                    <FInputField
                    :label='passwordField.label'
                    :placeholder='passwordField.placeholder'
                    type='password'
                    :validation='loginValidation'
                    @update:modelValue='newValue => passwordField.input = newValue'
                    ></FInputField>
                    <!-- Password Input -->
                    <!-- END -->
                </div>

                <div class='forget-password-link'
                @click='routeToName("ResetPassword")'>
                    Forget password?
                </div>

                <div class='button-body'>
                    <!-- Button Submission -->
                    <FButton
                    label='Log In'
                    color='primary'
                    @clicked='doLogin'></FButton>
                    <!-- Button Submission -->
                    <!-- END -->
                </div>
                

                
            </div>
        </div>
    </div>
    
</template>

<script>

import FInputField from '@/components/common/FInputField.vue'
import FButton from '@/components/common/FButton.vue'

export default {
    name: 'Login',
    components: {
        FInputField,
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
            placeholder: 'Please enter your username',
            maxlength: 8,
            input: ''
        }

        /**
         * The information of a password's input field.
         * @type { Object }
         */
        var passwordField = {
            label: 'Password',
            placeholder: 'Please enter your password',
            input: ''
        }

        var loginValidation = {
            result: ''
        }

        return {
            usernameField,
            passwordField,
            loginValidation
        }
    },

    methods: {
        /**
         * Creates a Login API request. Also handles success or fail factor.
         */
        doLogin () {
            console.log('Hello')
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
    width: 100%;
    height: 100%;
}

.root .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    position: relative;
    width: 50%;
}

.root .card.mobile {
    width: 100% !important;
}

.root .card .card-header {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
}

.root .card .card-header > img {
    display: block;
    position: relative;
    width: 20%;
    height: auto;
    border-radius: 5%;
}

.root .card.mobile .card-header > img {
    width: 30% !important;
    height: auto;
}

.root .card .card-content {
    position: relative;
    width: 70%;
}

.root .card .card-content .input-body {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
}

.root .card .card-content .forget-password-link {
    font-size: $font-size-link;
    font-style: italic;
    height: 25px;
}

.root .card .card-content .button-body {
    margin-top: 15px;
}

</style>