<script setup>
import PokeGrid from '@/components/common/pokeGrid/PokeGrid.vue';
import WhoIsPoke from '@/components/whoIsPoke/WhoIsPoke.vue';
import { usePokeStore } from '@/stores/pokemons';

const pokeStore = usePokeStore()

</script>

<template>
  <main>
    <WhoIsPoke/>

    <h1>esta é a Home Page</h1>
    <div class="PokeGridConteiner">
            <PokeGrid v-if="pokeStore.pokemonsPerPage.length > 1" :pokemons="pokeStore.pokemonsPerPage"/>
        </div>
  </main>
</template>
