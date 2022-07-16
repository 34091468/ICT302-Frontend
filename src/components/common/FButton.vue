<template>
    <div class='root-button'>
        <!-- Button: Icon Only -->
        <template 
        v-if='isIconOnly'>
            <button class='icon-only' :class='[ { outlined, round, expanded }, color ]' :disabled='disabled' @click='fireClickedEvent'>
                <img :src='getIcon' alt=''>
                <!-- <img  src='@/assets/logos/logo.png' alt=""> -->
            </button>
        </template>

        <!-- Button: Label & Icon -->
        <template 
        v-else-if='hasIcon'>
            <button class='iconed' :class='[ { outlined, round, expanded }, color ]' :disabled='disabled' @click='fireClickedEvent'>
                <img :src='getIcon' alt="">
                <p> {{ getLabel }} </p>
            </button>
        </template>

        <!-- Button: Label Only -->
        <template
        v-else>
            <button :class='[ { outlined, round, expanded }, color ]' :disabled='disabled' @click='fireClickedEvent'>
                {{ getLabel }}
            </button>
        </template>
    </div>

</template>

<script>
export default {
    name: 'FButton',

    props: {
        label: {
            type: String,
            default: ''
        },
        
        icon: {
            type: String,
            default: ''
        },

        color: {
            type: String,
            default: 'base'
        },

        outlined: {
            type: Boolean,
            default: false
        },

        round: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        expanded: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        /**
         * Checks if this button only accepts icon.
         */
        isIconOnly() {
            return (this.label.length === 0 && this.icon.length > 0)
        },

        /**
         * Checks if this button has an icon.
         */
        hasIcon() {
            return (this.label.length > 0 && this.icon.length > 0)
        },

        /**
         * Retrieves the label of the button
         * @returns { string } Label in string
         */
        getLabel() {
            if (this.label === '') return 'Button'
            return this.label
        },

        /**
         * Retrieves the icon of interest.
         * @returns { string }
         */
        getIcon() {
            return require('@/assets/icons/' + this.icon)
        }
    },

    mounted() {
    },

    methods: {
        fireClickedEvent() {
            this.$emit('clicked')
        }
    }
}
</script>

<style scoped lang='scss'>

.root-button {
    width: 100%;
    height: 100%;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 25px;
    width: 100%;
    height: 35px;
    gap: 8px;
    box-sizing: border-box;
    pointer-events: auto !important;
    font-weight: 700;
    font-family: $font-family-main;
    font-size: $font-size-button;
    letter-spacing: 0.075rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

button.icon-only {
    width: 25px !important;
}

button.icon-only > img {
    width: 50%;
    height: 50%;
}

button.iconed {
    justify-content: flex-start !important;
    min-width: 100px;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

button.iconed > img {
    width: 12px;
    height: 12px;
}

button.round {
    border-radius: 20px;
}

button.expanded {
    width: 100% !important;
    height: 100% !important;
}

/* --------------------------------------------------
BUTTON - BASE
-------------------------------------------------- */

button.base,
button.base.outlined {
    color: $color-scheme-primary;
    background: white;
    border: 1px solid $color-scheme-base;
}

@media only screen and (min-width:1280px) {
    button.base:hover,
    button.base.outlined:hover {
        border: 1px solid $color-scheme-base-hover;
        transition: 0.2s;
    }
}

button.base:active,
button.base.outlined:active {
    border: 1px solid $color-scheme-base-active;
}

button.base:disabled,
button.base.outlined:disabled {
    color: $font-color-primary-alternate;
    border: 1px solid $color-scheme-base-disabled;
    background: $color-scheme-base-disabled;
}

/* --------------------------------------------------
BUTTON - BASE
-------------------------------------------------- */

/* --------------------------------------------------
BUTTON - PRIMARY
-------------------------------------------------- */

button.primary {
    background: $color-scheme-primary;
    color: $font-color-primary;
    border: none;
}

button.primary.outlined {
    color: $font-color-primary-alternate;
    background: white;
    border: 1px solid $color-scheme-primary;
}

@media only screen and (min-width:1280px) {
    button.primary:hover {
        color: $font-color-primary;
        background: $color-scheme-primary-hover;
        transition: 0.2s;
    }

    button.primary.outlined:hover {
        color: $font-color-primary;
        background: $color-scheme-primary-hover;
        transition: 0.2s;
    }
}


button.primary:active {
    background: $color-scheme-primary-active;
    color: $color-secondary;
}

button.primary.outlined:active {
    background: $color-scheme-primary-active;
}

button.primary:disabled {
    background: $color-scheme-primary-disabled;
}

button.primary.outlined:disabled {
    color: $font-color-primary-alternate;
    border: 1px solid $color-scheme-primary-disabled;
    background: $color-scheme-base-disabled;
}

/* --------------------------------------------------
BUTTON - PRIMARY
-------------------------------------------------- */

/* --------------------------------------------------
BUTTON - SUCCESS
-------------------------------------------------- */

button.success {
    background: $color-scheme-success;
    color: $color-secondary;
    border: none;
}

button.success.outlined {
    color: $color-scheme-success;
    background: white;
    border: 1px solid $color-scheme-success;
}
@media only screen and (min-width:1280px) {
    button.success:hover {
        background: $color-scheme-success-hover;
        transition: 0.2s;
    }

    button.success.outlined:hover {
        color: $color-secondary;
        background: $color-scheme-success-hover;
        transition: 0.2s;
    }
}


button.success:active {
    background: $color-scheme-success-active;
}

button.success.outlined:active {
    background: $color-scheme-success-active;
}

button.success:disabled {
    background: $color-scheme-success-disabled;
}

button.success.outlined:disabled {
    color: $font-color-primary-alternate;
    border: 1px solid $color-scheme-success-disabled;
    background: $color-scheme-base-disabled;
}

/* --------------------------------------------------
BUTTON - SUCCESS
-------------------------------------------------- */

/* --------------------------------------------------
BUTTON - WARNING
-------------------------------------------------- */

button.warning {
    background: $color-scheme-warning;
    color: $color-secondary;
    border: none;
}

button.warning.outlined {
    color: $color-scheme-warning;
    background: white;
    border: 1px solid $color-scheme-warning;
}

@media only screen and (min-width:1280px) {
    button.warning:hover {
        background: $color-scheme-warning-hover;
        transition: 0.2s;
    }

    button.warning.outlined:hover {
        color: $color-scheme-primary-alternate;
        background: $color-scheme-warning-hover;
        transition: 0.2s;
    }
}

button.warning:active {
    background: $color-scheme-warning-active;
}

button.warning.outlined:active {
    background: $color-scheme-warning-active;
}

button.warning:disabled {
    background: $color-scheme-warning-disabled;
}

button.warning.outlined:disabled {
    color: $font-color-primary-alternate;
    border: 1px solid $color-scheme-warning-disabled;
    background: $color-scheme-base-disabled;
}

/* --------------------------------------------------
BUTTON - WARNING
-------------------------------------------------- */

/* --------------------------------------------------
BUTTON - DANGER
-------------------------------------------------- */

button.danger {
    background: $color-scheme-danger;
    color: $color-secondary;
    border: none;
}

button.danger.outlined {
    color: $color-scheme-danger;
    background: white;
    border: 1px solid $color-scheme-danger;
}

@media only screen and (min-width:1280px) {
    button.danger:hover {
        color: $color-secondary;
        background: $color-scheme-danger-hover;
        transition: 0.2s;
    }

    button.danger.outlined:hover {
        color: $color-secondary;
        background: $color-scheme-danger-hover;
        transition: 0.2s;
    }
}

button.danger:active {
    color: $color-secondary;
    background: $color-scheme-danger-active;
}

button.danger.outlined:active {
    background: $color-scheme-danger-active;
}

button.danger:disabled {
    background: $color-scheme-danger-disabled;
}

button.danger.outlined:disabled {
    color: $color-scheme-danger-disabled;
    border: 1px solid $color-scheme-danger-disabled;
    background: $font-color-primary;
}

/* --------------------------------------------------
BUTTON - DANGER
-------------------------------------------------- */

</style>