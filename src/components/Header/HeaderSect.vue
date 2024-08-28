<script setup>
import { ref } from 'vue';
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const theme = ref(prefersDarkScheme.matches ? 'dark' : 'light')
function changeTheme() {
  if(theme.value == 'light'){theme.value = 'dark'} else{theme.value = 'light'}
  console.log(theme.value)
    emit('theme',theme.value)
}
const emit = defineEmits(['theme'])
emit('theme',theme.value)

const searchInput = ref('')
function handleSubmit(ev) {
    ev.preventDefault()
    searchInput.value = ''
}
</script>

<template>
    <!----------- // Header Section // ----------->
    <header class="conteiner">
        <nav class="content">
            <div class="pokeImgContent">
                <RouterLink :to="{name:'home'}">
                    <img src="/src/assets/images/logos/pokeLogo.png" alt="">
                </RouterLink>
            </div>
            <div class="searchContent">
                <form>
                    <input type="text" class="searchInput"
                    placeholder="Procurando Pokemons?"
                    v-model="searchInput">
                    <RouterLink @click="handleSubmit" :to="{name:'search', params:{name: searchInput}}">
                      <button class="searchBtn">
                        <img class="searchIcon" src="/src/assets/images/icons/searchIcon.svg" alt="">
                    </button>  
                    </RouterLink>
                    
                </form>
            </div>
            <div class="linksConteiner"> 
                <RouterLink to="/" class="linksContent">
                    Home
                    <img  class="linkArrow icon" src="/src/assets/images/icons/rightArrow.svg" alt="rightArrow"></RouterLink>
                <RouterLink to="/about" class="linksContent">
                    About
                    <img  class="linkArrow icon" src="/src/assets/images/icons/rightArrow.svg" alt="rightArrow"></RouterLink>
                <a class="linksContent" 
                href="https://github.com/MarcosOliacc/vuejs/tree/main/03-treinandoConteudos/02-pokemons" 
                target="_blank">
                    Repositório
                    <img  class="linkArrow icon" src="/src/assets/images/icons/rightArrow.svg" alt="rightArrow">
                </a>
            </div>
            <div class="extraContent">
                <button class="themeBtn" @click="changeTheme">tema</button>
            </div>
        </nav> 
    </header>
</template>
<style scoped>
@import './style.scss';
</style>