<script setup>
import WhoIsPoke from '@/components/whoIsPoke/WhoIsPoke.vue';
import { usePokeStore } from '@/stores/pokemons';
import { onMounted } from 'vue';

const pokemon = usePokeStore()
onMounted(()=> pokemon.loadAllPokes())
</script>

<template>
  <main>
    <WhoIsPoke/>

    <h1>esta é a Home Page</h1>
    <pre>{{pokemon.allPokemons[0]}}</pre>
  </main>
</template>
