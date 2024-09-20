<script setup>
import { onMounted, ref, watch } from 'vue';
import HeaderSect from './components/Header/HeaderSect.vue';
import { usePokeStore } from './stores/pokemons';
import { useRoute } from 'vue-router';
const pokeStore = usePokeStore()
const router = useRoute()
onMounted(async()=> {
  if(!sessionStorage.getItem('pokesLoad')) {
      await pokeStore.loadPokesPerPage(router.params.page? (Number(router.params.page) - 1) * 12: 0)
      await pokeStore.loadAllPokes()
      sessionStorage.setItem('pokesLoad', true)
    }
})
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('pokesLoad');
})
watch(()=>router.params.page, async()=> {
  await pokeStore.loadPokesPerPage(router.params.page? (Number(router.params.page) - 1) * 12: 0)
})
const theme = ref('')
  const newTheme = (valor) => {
    theme.value = valor
  }
</script>

<template>
  <div id="body" :class="theme">
    <div id="conteiner">
      <HeaderSect @theme="newTheme"/>
      <RouterView/>

    </div>
  </div>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

</style>
