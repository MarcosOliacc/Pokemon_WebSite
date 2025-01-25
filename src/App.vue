<script setup>
import { onMounted, ref } from 'vue';
import HeaderSect from './components/Header/HeaderSect.vue';
import FooterSect from './components/footer/FooterSect.vue';
import { usePokeStore } from './stores/pokemons';
const pokeStore = usePokeStore()
onMounted(async()=> {
  if(!sessionStorage.getItem('pokesLoad')) {
      await pokeStore.loadPokesPerPage()
      await pokeStore.loadAllPokes()
      sessionStorage.setItem('pokesLoad', true)
    }
})
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('pokesLoad');
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
      <FooterSect/>
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
