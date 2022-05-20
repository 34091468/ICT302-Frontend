<template>
    <div class='root'>
       
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

<style scoped>

.root {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.root .card-header {
    display: block;
    position: relative;
    width: 100%;
    height: 25vh;
}

</style>