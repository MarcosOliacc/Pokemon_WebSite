<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { usePokeStore } from '@/stores/pokemons';
    const param = ref('')
    const route = useRoute()
    const pokeStore = usePokeStore()
    const foundPokes = ref([])

onMounted(async ()=>{await pokeStore.loadAllPokes();param.value = route.params.name})

watch( ()=> route.params.name, async (novo) => {
    if(novo !== '') {
        param.value = novo
        foundPokes.value = await pokeStore.searchPokes(param.value)

    } else {
        foundPokes.value = []
    }
})

</script>

<template>
    <section class="conteiner">
        <div v-if="param == ''">
            <p> - Digite o nome desejado na barra de pesquisa a cima.</p>
        </div>
        <h2 v-else>Procurando por: {{param}}</h2>
        <div class="PokeGridConteiner">
            <h2 v-for="pok of foundPokes" :key="pok.id">
                {{pok.name}}
            </h2>
        </div>
    </section>
</template>