<script setup>
import { usePokeStore } from '@/stores/pokemons';
import PokeGrid from '@/components/common/pokeGrid/PokeGrid.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';

onMounted(async ()=> {
    const res = await  pokeStore.getSkills()
    skills.value = res.results.map(obj=> obj.name).sort()
    document.addEventListener('click', handleClickOutside);
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
const myDiv = ref(null);
const handleClickOutside = (event) => {
  if (myDiv.value && !myDiv.value.contains(event.target)) {
    abilityFiltContent.value = false
  }
};

const handleClickInside = () => {
  abilityFiltContent.value = !abilityFiltContent.value
};

const pokeStore = usePokeStore()
const filterContent = ref(false)
const abilityFiltContent = ref(false)
const abilitySelected = ref('Todas')

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
    {name: 'grass', active: false},
    {name: 'ground', active: false},
    {name: 'ice', active: false},
    {name: 'normal', active: false},
    {name: 'poison', active: false},
    {name: 'psychic', active: false},
    {name: 'rock', active: false},
    {name: 'steel', active: false},
    {name: 'water', active: false}
])
const skills = ref([])

watch(filterContent, ()=>{
    typeFilters.value = typeFilters.value.map((obj)=>({
        ...obj,
        active : false
    }) )
})

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
                    
                    class="typeContent">
                        <div
                        @click="type.active = !type.active" class="checkbox">
                            <img
                            v-if="type.active"
                            src="/src/assets/images/icons/pokeball.png" alt="pokeball">
                        </div>
                        <label
                        @click="type.active = !type.active" :class="`type ${type.name}` ">{{type.name[0].toUpperCase()+type.name.substring(1)}}</label>
                    </div>
                </div>
                <div class="aspectsFilterContent">
                    <div class="abilityContent">
                        <h2>Habilidade</h2>
                        <div
                        ref="myDiv" @click="handleClickInside"
                        class="selectContent">
                            <li class="option-selected " value="all">{{abilitySelected}}</li>
                            <div
                            v-if="abilityFiltContent"
                            class="optionsContent">
                                <li class="option" v-for="(ability, index) in skills"
                                :key="index"
                                :value="ability">{{ ability }}</li>

                            </div>
                        </div>
                    </div>
                    <div class="heightContent">
                        <h2>Altura</h2>
                    </div>  
                    <div class="weightContent">
                        <h2>Peso</h2>

                    </div>
                    <div class="sendfiltsContent">

                    </div>
                </div>
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