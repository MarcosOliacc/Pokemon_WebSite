<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokeStore } from '@/stores/pokemons';
import PokeGrid from '@/components/common/pokeGrid/PokeGrid.vue';
const param = ref('')
const route = useRoute()
const pokeStore = usePokeStore()
const loading = ref(true)
const foundPokes = ref([])

onMounted(async()=>{
    if(pokeStore.allPokemons.length > 0) {
        try {
    foundPokes.value = await pokeStore.searchPokes(param.value);
  } catch (error) {
    console.error("Erro ao buscar pokémons:", error);
  } finally {
    loading.value = false;
  }
    }

})

watch(()=>pokeStore.allPokemons, async ()=> {
    try {
    foundPokes.value = await pokeStore.searchPokes(param.value);
  } catch (error) {
    console.error("Erro ao buscar pokémons:", error);
  } finally {
    loading.value = false;
  }
})

watch( ()=> route.params.name, async (novo) => {
    if(novo !== '') {
        param.value = novo
        foundPokes.value = await pokeStore.searchPokes(param.value)
    } else {
        foundPokes.value = []
        param.value = ''
        foundPokes.value = await pokeStore.searchPokes(param.value)
    }
})

</script>

<template>
    <section class="conteiner">
        <div class="searchParams">
            <p v-if="param == ''"> - Digite o nome desejado na barra de pesquisa a cima.</p>
            <p v-else> - Procurando por: "{{param}}"</p>

        </div>
        <div class="PokeGridConteiner">
            <div v-if="loading"><h1>loading</h1></div>
            <PokeGrid v-else :pokemons="foundPokes"/>
        </div>
    </section>
</template>
<style scoped>
.conteiner {
    display: flex;
    flex-direction: column;
    gap: 40px;
}
</style>