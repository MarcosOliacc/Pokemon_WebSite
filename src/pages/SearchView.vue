<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokeStore } from '@/stores/pokemons';
import PokeGrid from '@/components/common/pokeGrid/PokeGrid.vue';
const param = ref('')
const route = useRoute()
const pokeStore = usePokeStore()
const foundPokes = ref([])

onMounted(async()=>{
    if(pokeStore.allPokemons.length > 12) {
        foundPokes.value = await pokeStore.searchPokes(param.value)
    }
})

watch(()=>pokeStore.allPokemons, async ()=> {
    foundPokes.value = await pokeStore.searchPokes(param.value)
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
        <div>
            <p v-if="param == ''"> - Digite o nome desejado na barra de pesquisa a cima.</p>
            <p v-else> - Procurando por: "{{param}}"</p>

        </div>
        <div class="PokeGridConteiner">
            <PokeGrid :pokemons="foundPokes"/>
        </div>
    </section>
</template>