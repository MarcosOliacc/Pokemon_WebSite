<script setup>
import getMultipliers from '@/getters/getMultipliers';
import { onMounted, ref, watch } from 'vue';

    const props = defineProps({
        pokeType: {
            type: Array
        }
    })
    let types = []
    const multipliers = ref({})

    onMounted(()=>{
        props.pokeType.forEach((item)=> {
            types.push(item.type.name)
        })
        multipliers.value = getMultipliers(types)
        console.log(multipliers.value)
    }) 
    watch(props.pokeType, (newProps)=> {
        types = []
        newProps.forEach((item)=> {
            types.push(item.type.name)
        })
        multipliers.value = getMultipliers(types)
        console.log(multipliers.value)
    })


    // proximo passo: colocar um botao que altera a key exibida (ataque ou defesa), depois fazer um v-if com as divs de acordo com a key ativada, depois separar os valores de verdade, com value e key de cada multiplo usando v-for para cada um
</script>

<template>
    <section class="cantet">
        <div class="multConteiner">

            <p v-for="(value, key) of multipliers" :key="key" >{{ value }}: {{ key }}</p>
        </div>
    </section>
</template>
<style scoped>
@import './styles.scss';
</style>