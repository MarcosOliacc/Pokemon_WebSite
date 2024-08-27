<script setup>
import { ref } from 'vue';
import HeaderSect from './components/Header/HeaderSect.vue';
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
