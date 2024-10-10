<script setup>
import { usePokeStore } from '@/stores/pokemons';
import PokeGrid from '@/components/common/pokeGrid/PokeGrid.vue';
import { onMounted, ref } from 'vue';

onMounted(async ()=> {
    const skills = await  pokeStore.getSkills()
    console.log(skills)
})
const pokeStore = usePokeStore()
const filterContent = ref(false)

const typeFilters = ref([
    {name: 'bug', active: false},
    {name: 'dark', active: false},
    {name: 'dragon', active: false},
    {name: 'electric', active: false},
    {name: 'fairy', active: false},
    {name: 'fighting', active: false},
    {name: 'fire', active: false},
    {name: 'flying', active: false},
    {name: 'ghost', active: false},
    {name: 'Grass', active: false},
    {name: 'ground', active: false},
    {name: 'ice', active: false},
    {name: 'normal', active: false},
    {name: 'poison', active: false},
    {name: 'psychic', active: false},
    {name: 'rock', active: false},
    {name: 'steel', active: false},
    {name: 'water', active: false}
])



</script>

<template>
    <div class="conteiner">
        <div 
        :style="{height: filterContent? '500px' : '60px'}"
        class="filterConteiner">
            <div
            :style="{top: filterContent ? '0': '-400px'}"
            class="filtParamsConteiner">
                <div class="typeFilterContent">
                    <div
                    v-for="(type, index) in typeFilters"
                    :key="index"
                    @click="type.active = !type.active"
                    class="typeContent">
                        <div class="checkbox">
                            <img
                            v-if="type.active"
                            src="/src/assets/images/icons/pokeball.png" alt="pokeball">
                        </div>
                        <label :class="`type ${type.name}` ">{{type.name[0].toUpperCase()+type.name.substring(1)}}</label>
                    </div>
                </div>
                <div></div>
                <h2>parametros de filtragem</h2>
            </div>
            <div
            :style="{top: filterContent ? '400px': '0px'}"            
            @click="()=>filterContent = !filterContent"
            class="activeFiltersContent">
                <div class="subContent">
                    <img class="img1" src="/src/assets/images/large-notch-darkgray.png" alt="">
                    <p class="activeFh2">Pesquisa Avançada</p>
                    <img class="img2" src="/src/assets/images/large-notch-darkgray.png" alt="">
                </div>
            </div>
        </div>
      <PokeGrid v-if="pokeStore.pokemonsPerPage.length > 1" :origin="'homePage'" :pokemons="pokeStore.pokemonsPerPage"/>
    </div>
</template>
<style scoped>
@import './styles.scss';
</style>