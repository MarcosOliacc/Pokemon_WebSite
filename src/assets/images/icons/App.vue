<script setup>
import { ref } from 'vue';
import SearchForm from './components/common/searchForm/SearchForm.vue'

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const theme = ref(prefersDarkScheme.matches ? 'dark' : 'light')
function changeTheme() {
  if(theme.value == 'light'){theme.value = 'dark'} else{theme.value = 'light'}
  console.log(theme.value)

}


</script>

<template>
  <div id="body" :class="theme">
    <div id="conteiner">
      <header class="header">
        <img class="pokeLogo" src="/pokeLogo.png" alt="PokemonLogo">
        <div class="searchContent">
          <SearchForm/>
        </div>
        <nav class="nav">
            <RouterLink class="routerContent" to="/">
              <a href="#">Home</a>
              <img  class="linkArrow icon" src="/rightArrow.svg" alt="rightArrow">
            </RouterLink>

            <RouterLink class="routerContent" to="/about">
              <a href="#">Sobre</a>
              <img  class="linkArrow icon" src="/rightArrow.svg" alt="rightArrow">
            </RouterLink>

            <a class="routerContent" href="">
              <a href="https://github.com/MarcosOliacc/vuejs/tree/main/03-treinandoConteudos/02-pokemons" target="_blank">Repositório</a>
              <img  class="linkArrow icon" src="/rightArrow.svg" alt="rightArrow">
            </a>
          
          
          
          <button class="themeBtn" @click="changeTheme">tema</button>
        </nav>
      </header>
    
      <RouterView/>

    </div>
  </div>
</template>

<style scoped>
@import '@/styles/compStyles/appStyles.scss';
</style>