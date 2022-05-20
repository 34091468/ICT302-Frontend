<template>
    <div>
        
    </div>
</template>

<script>

import { AInstance } from '../toolbox/TAxios.js'

export default {
    name: 'Home',
    components: {

    },

    mounted() {
        AInstance.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .then(function (response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
    }
}
</script>
