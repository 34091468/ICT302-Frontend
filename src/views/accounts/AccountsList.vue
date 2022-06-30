<template>
    <div class='base'>
        <div class='root'>
            <div class='header'> {{ header }} </div>
            <div class='content'>
                <template v-if='isMobileApp()'>
                    <FList></FList>
                </template>
                <template v-else>

                </template>
            </div>
        </div>
    </div>
</template>

<script>

import FList from '@/components/common/FList.vue'

export default {
    name: 'AccountsList',
    props: {
        header: {
            type: String,
            required: true,
            default: 'Account'
        },
        accountsData: {
            type: Array,
            required: true,
            default() {
                return []
            }
        }
    },

    components: {
        FList
    },
}
</script>

<style scoped lang='scss'>

.root {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.root .header {
    position: relative;
    width: 100%;
    height: 35px;
    font-family: $font-family-header;
    font-size: 1.1rem;
    border-bottom: 1px solid $color-scheme-base-alternate;
}

.root .content {
    position: relative;
    display: block;
    width: 100%;
}

</style>