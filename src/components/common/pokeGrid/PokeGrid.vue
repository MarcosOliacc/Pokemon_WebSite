<script setup>
import { onMounted, ref, watch } from 'vue';
import PokeCard from '../pokeCard/PokeCard.vue';
import { usePokeStore } from '@/stores/pokemons';
const pokeStore = usePokeStore()

import autoAnimate from '@formkit/auto-animate';
const takeAnimation = ref()

onMounted(()=> {
  autoAnimate(takeAnimation.value)
})

const props = defineProps({
  pokemons: {
    type: Array,
    default: () => []
  },
  origin: {
    type: String
  }
});
const perPageNumber = ref(12)
const allPokes = ref([]);
const pokesPerPage = ref([])
const visiblePokes = ref([])

watch(
  () => props.pokemons,
  (newPokemons) => {
    let count = 0
    visiblePokes.value = []
    perPageNumber.value = 12
    pokesPerPage.value = []
    allPokes.value = [...newPokemons];
    console.log(perPageNumber.value)
    pokesPerPage.value = allPokes.value.slice(0, perPageNumber.value)
  
    pokesPerPage.value.forEach((poke)=> {
    setTimeout(()=> {
      visiblePokes.value.push(poke)

    }, count)
    count += 150
  })
  },
  { immediate: true }
);

watch(()=>perPageNumber.value, async (novo)=> {
  let count = 0
  
  if(props.origin === 'homePage') {
    
    const res = await pokeStore.loadPokesPerPage(novo)
    res.forEach((poke)=> {
      setTimeout(()=> {
        visiblePokes.value.push(poke)
  
      }, count)
      count += 150
    })
  } else {
      allPokes.value.slice(novo, novo + 12).forEach((poke)=> {
        setTimeout(()=> {
          visiblePokes.value.push(poke)
    
        }, count)
        count += 150

      })
  }
})


function nextPage() {
  perPageNumber.value = ((perPageNumber.value / 12)+ 1)* 12  
}

</script>

<template>
    <section class="conteiner">
      <div class="shadowBoxX">
        <div class="shadowBoxY">
          <div ref="takeAnimation" v-if="pokesPerPage.length > 0" class="gridcontent">
            <PokeCard ref="takeAnimation" v-for="pok of visiblePokes" :key="pok.id" :pokemon="pok"/>
          </div>
          <div v-else><h1>Nenhum pokemon encontrado :(</h1></div>

          <div v-if="perPageNumber < allPokes.length && props.origin !== 'homePage'" class="pagsContent">
              <button @click="nextPage">Mostrar mais</button>
          </div>
          <div v-if="props.origin == 'homePage'" class="pagsContent">
              <button @click="nextPage">Mostrar mais</button>
          </div>

        </div>
      </div>
    </section>
</template>
<style scoped>
@import './styles.scss';
</style>