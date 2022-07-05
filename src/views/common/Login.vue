<template>
    <div class='base'>
        <div class='root'>
            <img :class='{ mobile: isMobileApp() }' src='@/assets/app/app-icon-main.png'>

            <div class='content' :class='{ mobile: isMobileApp() }'>
                <div class='inputs'>
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
    flex-direction: column;
    width: 100%;
    height: 100%;
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