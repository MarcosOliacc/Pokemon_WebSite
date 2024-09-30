<script setup>
import { ref, watch } from 'vue';
import PokeCard from '../pokeCard/PokeCard.vue';
import { usePokeStore } from '@/stores/pokemons';
const pokeStore = usePokeStore()

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

watch(
  () => props.pokemons,
  (newPokemons) => {
    allPokes.value = [...newPokemons];
    pokesPerPage.value = allPokes.value.slice(0, perPageNumber.value)
  },
  { immediate: true }
);

watch(()=>perPageNumber.value, async (novo)=> {
  if(props.origin === 'homePage') {
    const res = await pokeStore.loadPokesPerPage(novo)
    pokesPerPage.value.push(...res)
  } else {
    pokesPerPage.value = allPokes.value.slice(0,perPageNumber.value)
    console.log('ativou ' +perPageNumber.value )

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
          <div class="gridcontent">
            <PokeCard v-for="pok of pokesPerPage" :key="pok.id" :pokemon="pok"/>
          </div>

          <div class="pagsContent">
              <button @click="nextPage">Mostrar mais</button>
          </div>

        </div>
      </div>
    </section>
</template>
<style scoped>
@import './styles.scss';
</style>