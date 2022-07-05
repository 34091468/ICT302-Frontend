<template>
    <div class='root-input'>
        <p v-if='hasLabel' class='label'> {{ label }} </p>
        <div class='input-card' :class='[ inputCardState, validation.result, { round } ]'>
            <input 
            :type='getType'
            :minlength='minlength'
            :maxlength='maxlength'
            :readonly='readonly'
            :disabled='disabled'
            :placeholder='placeholder'
            :value='inputValue'
            @mouseenter='setInputState($event)'
            @mouseleave='setInputState($event)'
            @click='setInputState($event)' 
            @blur='setInputState($event)'
            @input='updateInput($event)'>
            <!-- VALIDATION -->
            <!-- Shows a success or failure logo -->
            <template v-if='isValidationSuccess'>
                <img src="@/assets/icons/alerts/success-tick.png" alt="">
            </template>
            <template v-else-if='isValidationFail'>
                <img src="@/assets/icons/alerts/danger-cross.png" alt="">
            </template>
            <!-- VALIDATION: END -->
        </div>
    
        <!-- MESSAGE -->
        <!-- Shows a message if validation object has a key message. Receives only string -->
        <template v-if='hasMessage'>
            <div class='input-message' :class='[ validation.result ]'>
                {{ validation.message }}
            </div>
        </template>
        <!-- MESSAGE: END -->
    </div>
</template>

<script>
export default {
    name: 'FInputField',
    props: {
        label: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String,
            default: ''
        },

        minlength: {
            type: Number,
            default: 0
        },

        maxlength: {
            type: Number,
            default: 524288
        },

        type: {
            type: String,
            default: 'text'
        },

        round: {
            type: Boolean,
            default: false
        },

        readonly: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        validation: {
            type: Object,
            default () {
                return {
                    result: '',
                    message: ''
                }
            }
        }
    },

    mounted() {
        this.$emit( 'update:modelValue', this.inputValue )
    },

    computed: {
        /**
         * Checks if a a label has been defined.
         */
        hasLabel() {
            return this.label !== ''
        },

        /**
         * Gets the type defined for the input.
         * @returns { string } Only allows 'text', 'password' or 'email'. Any other types will return a 'text' type.
         */
        getType() {
            if (this.type !== 'text' &&
                this.type !== 'password' &&
                this.type !== 'email') return 'text'
            
            return this.type
        },

        /**
         * Checks if this inputfield passes the validation.
         */
        isValidationSuccess() {
            return this.validation.result === 'success'
        },

        /**
         * Checks if this inputfield fails the validation.
         */
        isValidationFail() {
            return this.validation.result === 'danger'
        },

        /**
         * Checks if a message will appear on validation.
         */
        hasMessage() {
            return ( this.validation.message !== '' && this.validation.message !== null )
        }
    },

    data() {
        /**
         * The state of the card based on mouse event (e.g. hover, active, selected, pressed).
         * @type { String }
         */
        var inputCardState = ''

        /**
         * The value of the input.
         * @type { String }
         */
        var inputValue = ''

        return {
            inputCardState,
            inputValue
        }
    },

    methods: {
        /**
         * Retrieves and defines the class based on the state of the input.
         */
        setInputState(event) {
            // >!
            // MOUSE ENTER EVENT
            // --------------------------------------------------
            if (event.type === 'mouseenter') {
                if (this.inputCardState === '') {
                    this.inputCardState = 'hover'
                }

                return
            }

            // >!
            // MOUSE LEAVE EVENT
            // --------------------------------------------------
            if (event.type === 'mouseleave') {
                if (this.inputCardState === 'hover' || this.inputCardSate === 'active' || this.inputCardState === 'click' || this.inputCardState === undefined) {
                    this.inputCardState = ''
                }

                return
            }

            // >!
            // POINTER CLICK EVENT
            // --------------------------------------------------
            if (event.type === 'click') {
                if (this.inputCardState !== 'active') {
                    this.inputCardState = 'active'
                }

                return
            }

            // >!
            // BLUR EVENT
            // --------------------------------------------------
            if (event.type === 'blur') {
                if (this.inputCardState === 'active') {
                    this.inputCardState = ''
                }

                return
            }
        },

        updateInput (event) {
            this.inputValue = event.target.value
            this.$emit('update:modelValue', this.inputValue)
        }
    }
}
</script>

<style scoped lang='scss'>
input {
    font-family: inherit;
    background: none;
    border: none;
    pointer-events: auto !important;
    font-size: $font-size-input;
    padding: 2px 0 2px 5px;
}

input::-webkit-input-placeholder {
    font-family: inherit;
    font-size: $font-size-placeholder;
    font-style: oblique;
}

input:focus,
input:active,
input:active:before,
input:active:after  {
    background: none;
    border: none;
    outline: none;
}

.root-input {
    display: flex;
    flex-direction: column;
    min-width: 150px;
    width: 100%;
}

.root-input .label {
    margin: 0 0 5px 0;
    padding: 0;
    border: 0;
    font-size: $font-size-label;
}

.root-input .input-card {
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: 3px;
    background: $color-input-bg;
    border: 1px solid $color-scheme-base;
    border-radius: 3px;
    transition: $transition-mouse-events;
    width: 100%;
    height: 30px;
}

.root-input .input-card.success {
    border: 1px solid $color-scheme-success !important;
}

.root-input .input-card.success.hover {
    border: 1px solid $color-scheme-success-hover !important;
}

.root-input .input-card.success.active {
    border: 1px solid $color-scheme-success-active !important;
}

.root-input .input-card.danger {
    border: 1px solid $color-scheme-danger !important;
}

.root-input .input-card.danger.hover {
    border: 1px solid $color-scheme-danger-hover !important;
}

.root-input .input-card.danger.active {
    border: 1px solid $color-scheme-danger-active !important;
}

.root-input .input-card.hover {
    border: 1px solid $color-scheme-base-hover;
}

.root-input .input-card.active {
    border: 1px solid $color-scheme-base-active;
}

.root-input .input-card.round {
    border-radius: 20px !important;
}

.root-input .input-card > input {
    flex-grow: 9;
}

.root-input .input-card > img {
    width: 12px;
    height: 12px;
    object-fit: contain;
    padding: 0 5px 0 0;
    pointer-events: none;
}

.root-input .input-message {
    width: 100%;
    font-size: $font-size-message;
    position: relative;
    padding-left: 5px;
    margin-top: 2px;
    font-style: italic;
}

.root-input .input-message.success {
    color: $color-scheme-success;
}

.root-input .input-message.danger {
    color: $color-scheme-danger;
}
</style>