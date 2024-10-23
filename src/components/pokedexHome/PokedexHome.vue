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
const weightFilterSelected = ref([])

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


const heightFilterSelected = ref([])
function handleHeightFilter(num) {
    const i = heightFilterSelected.value.indexOf(num)
    if(i > -1) {
        heightFilterSelected.value.splice(i, 1)
    } else {
        heightFilterSelected.value.push(num)
    }
    heightFilterSelected.value = [...heightFilterSelected.value].sort()
    console.log(heightFilterSelected.value)
}

watch(filterContent, ()=>{
    typeFilters.value = typeFilters.value.map((obj)=>({
        ...obj,
        active : false
    }) )
    abilitySelected.value = 'Todas'
})

</script>

<template>
    <div class="conteiner">
        <div 
        :style="{height: filterContent? '700px' : '60px'}"
        class="filterConteiner">
            <div
            :style="{top: filterContent ? '0': '-600px'}"
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
                    <div class="abilityContent filt">
                        <h2>Habilidade</h2>
                        <div
                        ref="myDiv" @click="handleClickInside"
                        :style="{borderRadius: abilityFiltContent ? '10px 10px 0px 0px': '10px'}"
                        class="selectContent">
                            <li class="optionSelected">            
                                {{abilitySelected[0].toUpperCase()+abilitySelected.substring(1)}}
                                
                                <img
                                :style="{rotate: abilityFiltContent ? '-90deg' : '90deg'}"
                                src="/src/assets/images/icons/rightArrow.svg" alt="seta">
                            </li>
                            <div
                            v-if="abilityFiltContent"
                            class="optionsContent">
                                <li 
                                class="option"
                                @click="()=> abilitySelected = 'Todas'"
                                >Todas</li>
                                <li class="option" v-for="(ability, index) in skills"
                                :key="index"
                                @click="()=> abilitySelected = ability"
                                >{{ ability[0].toUpperCase()+ability.substring(1) }}</li>
                            </div>
                        </div>
                    </div>
                    <div class="heightfilt filt">
                        <h2>Altura</h2>
                        <div class="heightConteiner">
                            <div
                            @click="()=> handleHeightFilter('1')"
                            :style="{backgroundColor: heightFilterSelected.includes('1') ? '#121212' : '#edf2fc'}"
                            class="heightContent">
                                <div    
                                    class="heightImg"
                                    :style="{
                                        backgroundImage: heightFilterSelected.includes('1') ? 'url(/src/assets/images/pokeHeightRed1.png)' : 'url(/src/assets/images/pokeHeightDark1.png)',
                                        width: '25px',
                                        height: '25px',
                                        backgroundSize: '25px'
                                    }">
                                </div>
                            </div>
                            <div
                            @click="()=> handleHeightFilter('2')" 
                            :style="{backgroundColor: heightFilterSelected.includes('2') ? '#121212' : '#edf2fc'}"
                            class="heightContent">
                                <div    
                                    class="heightImg"
                                    :style="{
                                        backgroundImage: heightFilterSelected.includes('2') ? 'url(/src/assets/images/pokeHeightRed2.png)' : 'url(/src/assets/images/pokeHeightDark2.png)',
                                        width: '40px',
                                        height: '40px',
                                        backgroundSize: '40px'
                                    }">
                                </div>
                            </div>
                            <div
                                @click="()=> handleHeightFilter('3')"
                                :style="{backgroundColor: heightFilterSelected.includes('3') ? '#121212' : '#edf2fc'}"
                                class="heightContent">
                                <div    
                                    class="heightImg"
                                    :style="{
                                        backgroundImage: heightFilterSelected.includes('3') ? 'url(/src/assets/images/pokeHeightRed3.png)' : 'url(/src/assets/images/pokeHeightDark3.png)',
                                        width: '60px',
                                        height: '60px',
                                        backgroundSize: '60px'
                                    }">
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="weightfilt filt">
                        <h2>Peso</h2>
                        <div class="weightConteiner">
                            <div class="weightContent">
                                <img class="weightImg" src="/src/assets/images/icons/feather.svg" alt="pesopena">
                            </div>
                            <div class="weightContent">
                                <svg class="weightImg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" :fill="'#0c3b79'"><path d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"/></svg>
                            </div>
                            <div class="weightContent">
                                <img class="weightImg" src="/src/assets/images/icons/anvil.svg" alt="pesopesado">
                            </div>
                        </div>
                    </div>
                    <div class="sendfiltsContent">

                    </div>
                </div>
            </div>
            <div
            :style="{top: filterContent ? '600px': '0px'}"            
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