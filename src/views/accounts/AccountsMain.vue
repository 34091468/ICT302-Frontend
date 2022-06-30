<template>
    <div class='base'>
        <FList
        :listItems='accountList'></FList>
    </div>
</template>

<script>
import FList from '@/components/common/FList.vue'
import { AInstance } from '@/toolbox/TAxios.js'
// import { ACCOUNT_GROUP_TYPE } from '@/utilities/TAccounts.js'

export default {
    name: 'AccountsMain',
    components: {
        
    },
    mounted() {
        console.log(process.env.VUE_APP_BASEURL)
        // this.getAccountList()
    },
    data() {

        var accountList = []

        return {
            accountList
        }
    },
    methods: {
        getAccountRequests() {
            // AInstance.get('/api')
            // .then(function (response) {
            //     console.log(response)
            // })
            // .catch(function(error) {
            //     console.log(error)
            // })
        }
    }
}
</script>

<style scoped lang='scss'>



</style>