<script setup>
import { onMounted, ref, watch } from 'vue';
import PokeCard from '../pokeCard/PokeCard.vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()




const props = defineProps({
  pokemons: {
    type: Array,
    default: () => []
  }
});

const allPokes = ref([]);
const pokesPerPage = ref([])

watch(
  () => props.pokemons,
  (newPokemons) => {
    allPokes.value = [...newPokemons];
    pokesPerPage.value = allPokes.value.slice(0, 12)
  },
  { immediate: true }
);
watch(()=>route.params.page, (novo)=> {
  pokesPerPage.value = allPokes.value.slice((Number(novo) - 1)* 12, (Number(novo) + 1) * 12)
})


function nextPage() {
  router.push('/2')
}

</script>

<template>
    <section class="conteiner">
      <div class="shadowBoxX">
        <div class="shadowBoxY">
          <div v-if="allPokes.length > 12" class="gridcontent">
            <PokeCard v-for="pok of pokesPerPage" :key="pok.id" :pokemon="pok"/>
          </div>
          <div v-else class="gridcontent">
            <PokeCard v-for="pok of pokesPerPage" :key="pok.id" :pokemon="pok"/>
          </div>
          <div class="pagsContent">
              <button @click="nextPage">proxima pagina</button>
          </div>

        </div>
      </div>
    </section>
</template>
<style scoped>
@import './styles.scss';
</style>