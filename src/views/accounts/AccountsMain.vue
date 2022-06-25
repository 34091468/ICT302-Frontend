<template>
    <div class='base'>
        <FList
        :listItems='accountList'></FList>
    </div>
</template>

<script>
import FList from '@/components/common/FList.vue'
import { ACCOUNT_GROUP_TYPE } from '@/utilities/toolbox/TAccounts.js'
export default {
    name: 'AccountsMain',
    components: {
        FList
    },
    mounted() {},
    data() {

        var accountList = [
            {
                header: '34091468',
                content: 'Ng Jun Guo',
                footer: ACCOUNT_GROUP_TYPE[ '1' ].label
            }
        ]

        return {
            accountList
        }
    },
    methods: {
        getAccountList() {

        }
    }
}
</script>

<style scoped lang='scss'>



</style>