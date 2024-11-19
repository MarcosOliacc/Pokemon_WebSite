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
const heightFilterSelected = ref([])
const weightFilterSelected = ref([])
const minPokNumber = ref(1)
const maxPokNumber = ref(1025)

// variável que altera o estado de acordo com a resposta :
const resFilts = ref(false)

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


function handleHeightFilter(num) {
    const i = heightFilterSelected.value.indexOf(num)
    if(i > -1) {
        heightFilterSelected.value.splice(i, 1)
    } else {
        heightFilterSelected.value.push(num)
    }
    heightFilterSelected.value = [...heightFilterSelected.value].sort()
}
function handleWeightFilter(num) {
    const i = weightFilterSelected.value.indexOf(num)
    if(i > -1) {
        weightFilterSelected.value.splice(i, 1)
    } else {
        weightFilterSelected.value.push(num)
    }
    weightFilterSelected.value = [...weightFilterSelected.value].sort()
}
function resetParams() {
    abilitySelected.value = 'Todas'
    typeFilters.value
    heightFilterSelected.value = []
    weightFilterSelected.value = []
    minPokNumber.value = 1
    maxPokNumber.value = 1025
    typeFilters.value = typeFilters.value.map((obj)=>({
        ...obj,
        active : false
    }) )
    handleSubmitfiltsParams()
}

async function handleSubmitfiltsParams() {
    const res = await pokeStore.filterPokemons({
        typeFilters: typeFilters.value,
        minMaxNumber: [minPokNumber.value, maxPokNumber.value],
        abilitySelected: abilitySelected.value,
        heightFilterSelected: heightFilterSelected.value,
        weightFilterSelected: weightFilterSelected.value
    })
    resFilts.value = res
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
                    <div class="limitsNumberContent">
                        <h2>Intervalo de numeros</h2>
                        <input type="number" class="interv" v-model="minPokNumber">
                        <p>-</p>
                        <input type="number" class="interv" v-model="maxPokNumber">
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
                                        background: heightFilterSelected.includes('1') ? 'url(/pokeHeightRed1.png)' : 'url(/pokeHeightDark1.png)',
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
                                        backgroundImage: heightFilterSelected.includes('2') ? 'url(/pokeHeightRed2.png)' : 'url(/pokeHeightDark2.png)',
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
                                        backgroundImage: heightFilterSelected.includes('3') ? 'url(/pokeHeightRed3.png)' : 'url(/pokeHeightDark3.png)',
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
                            <div
                                @click="()=> handleWeightFilter('1')"
                                :style="{backgroundColor: weightFilterSelected.includes('1') ? '#121212' : '#edf2fc'}"
                                class="weightContent">
                                <div    
                                    class="weightImg"
                                    :style="{
                                        backgroundImage: weightFilterSelected.includes('1') ? 'url(/weightRed1.png)' : 'url(/weightDark1.png)',
                                        width: '30px',
                                        height: '30px',
                                        backgroundSize: '30px'
                                    }">
                                </div>
                            </div>
                            <div
                                @click="()=> handleWeightFilter('2')"
                                :style="{backgroundColor: weightFilterSelected.includes('2') ? '#121212' : '#edf2fc'}"
                                class="weightContent">
                                <div    
                                    class="weightImg"
                                    :style="{
                                        backgroundImage: weightFilterSelected.includes('2') ? 'url(/weightRed2.png)' : 'url(/weightDark2.png)',
                                        width: '50px',
                                        height: '50px',
                                        backgroundSize: '50px'
                                    }">
                                </div>
                            </div>
                            <div
                                @click="()=> handleWeightFilter('3')"
                                :style="{backgroundColor: weightFilterSelected.includes('3') ? '#121212' : '#edf2fc'}"
                                class="weightContent">
                                <div    
                                    class="weightImg"
                                    :style="{
                                        backgroundImage: weightFilterSelected.includes('3') ? 'url(/weightRed3.png)' : 'url(/weightDark3.png)',
                                        width: '60px',
                                        height: '60px',
                                        backgroundSize: '60px'
                                    }">
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <div class="sendfiltsContent">
                        <button class="refreshParams"
                        @click="resetParams"
                        >
                            Redefinir
                        </button>
                        <button class="sendParams" @click="handleSubmitfiltsParams">
                            Pesquisar
                        </button>
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
        <PokeGrid v-if="resFilts" :pokemons="pokeStore.filteredPokes"/>
        <PokeGrid v-else-if="pokeStore.pokemonsPerPage.length > 1" :origin="'homePage'" :pokemons="pokeStore.pokemonsPerPage"/>
    </div>
</template>
<style scoped>
@import './styles.scss';
</style>