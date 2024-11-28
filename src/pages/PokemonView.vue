<script setup>
import { usePokeStore } from '@/stores/pokemons';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ColorThief from 'colorthief';
import LoadingSect from '@/components/common/loading/LoadingSect.vue';
import NoOne from '@/components/common/noOne/NoOne.vue';

const route = useRoute();
const pokeStore = usePokeStore();
const routeValue = ref('')
const loading = ref(false)

const img = ref('')
const pokemon = ref({});
const bgColor = ref([])

const loadImageAndColor = async ()=> {
    if(route.params.value) {
        loading.value = true

        await pokeStore.loadAllPokes()
        await pokeStore.getPoke(route.params.value).then(res => pokemon.value = res)
        img.value = pokemon.value.sprites.other['official-artwork'].front_default
    
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = img.value 
    
        return new Promise((resolve) => {
            image.onload = () => {
                const colorThief = new ColorThief();
                bgColor.value = colorThief.getColor(image)
                loading.value = false
                resolve()
            }
        })
    } else{
        routeValue.value = ''
    } 
        
}   

onBeforeMount( async ()=> {
    routeValue.value = route.params.value
    await loadImageAndColor()})

watch(()=> route.params.value , async (novo)=> {
    routeValue.value = novo
    await loadImageAndColor()
})
</script>

<template>
    <section class="conteiner">
        <NoOne v-if="!routeValue"/>
        <LoadingSect v-if="loading"/>
        <div>
            
        </div>
        <h1>{{ pokemon.name }}</h1>
        <img :src="img" alt="" ref=""> 
        <div :style="{
            width: '20px', height: '20px', backgroundColor: `rgb(${bgColor.join(',')})`
        }"></div>
    </section>
</template>

<style scoped>
    @import '/src/styles/pageStyles/pokeView.scss';
</style>