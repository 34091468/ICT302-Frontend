<template>
    <div class='root-status'>
        <img :src='getIcon' alt='@/assets/icons/alerts/warning.png'>
        <p :class='[getResponseColor]'> {{ message }} </p>
    </div>
</template>

<script>
export default {
    name: 'FStatusResponses',
    props: {
        code: {
            type: Number,
            default: 0,
            required: true
        },

        message: {
            type: String,
            default() {
                return 'Status respond with a status code: ' + this.code
            }
        }
    },

    computed: {
        getIcon() {
            if (this.code < 400) return require('@/assets/icons/alerts/warning.png')
            return require('@/assets/icons/alerts/danger-cross.png')
        },

        getResponseColor() {
            if (this.code < 400) return 'warning'
            return 'danger'
        }
    },

    mounted() {
        
    },

    methods: {

    }
}
</script>

<style scoped lang='scss'>

.root-status {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    width: 100%;
}

.root-status img {
    position: relative;
    display: block;
    width: 75px;
    height: auto;
}

.root-status p {
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 0.9rem;
    font-family: $font-family-secondary;
    font-weight: 700;
}

.root-status p.warning {
    color: $color-scheme-warning-active;
}

</style>