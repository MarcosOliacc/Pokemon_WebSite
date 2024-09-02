<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
const barPosition = ref('')
const PokeballPosition = ref('')
const searchInput = ref('')
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const theme = ref(prefersDarkScheme.matches ? 'dark' : 'light')
const router = useRouter()
const route = useRoute()
const emit = defineEmits(['theme'])
emit('theme',theme.value)

watch(()=> route.name, (novo)=>{changeGadgets(novo)})

function changeGadgets(novo) {
    switch (novo) {
        case 'home': barPosition.value = '0'; PokeballPosition.value = '10px';
        break
        case 'search': barPosition.value = '97px';
        PokeballPosition.value = '110px';
        break
        case 'about': barPosition.value = '200px';
        PokeballPosition.value = '215px';
        break
        
    }
}
function changeTheme() {
  if(theme.value == 'light'){theme.value = 'dark'} else{theme.value = 'light'}
  console.log(theme.value)
    emit('theme',theme.value)
}

function handleSubmit(ev) {
        ev.preventDefault()
        router.push(`/search/${searchInput.value}`)
    
}
function changeInput() {
    searchInput.value = ''
}
function pokeballMove(posit) {
    PokeballPosition.value = posit
}

</script>

<template>
    <!----------- // Header Section // ----------->
    <header class="conteiner">
        
        <nav class="content">
            <div class="pokeImgContent">
                <RouterLink :to="{name:'home'}">
                    <img class="pokeLogo" src="/src/assets/images/logos/pokeLogo.png" alt="">
                </RouterLink>
            </div>
            <div class="searchConteiner">
                <form @submit="handleSubmit" class="searchContent">
                    <input type="text" class="searchInput"
                    placeholder="Procurando Pokemons?"
                    v-model="searchInput"
                    @focusout="changeInput"
                    @input="handleSubmit"
                    maxlength="20"
                    >
                      <button type="submit" class="searchBtn">
                        <img class="searchIcon" src="/src/assets/images/icons/searchIcon.svg" alt="">
                    </button>  
                    
                </form>
            </div>
            <div class="linksConteiner" @mouseleave="()=>{changeGadgets(route.name)}"> 
                <div class="pokeballContent" :style="{
                            left: PokeballPosition
                        }">
                    <img src="/src/assets/images/icons/pokeball.png" alt="pokebolpng">
                </div>
                <div class="linksContent">
                    <RouterLink @mouseover="()=>{pokeballMove('10px')}" to="/" class="linksLi">
                        Inicio
                    </RouterLink>
                    <RouterLink @mouseover="()=>{pokeballMove('110px')}" to="/search" class="linksLi">
                        Procurar
                    </RouterLink>
                    <RouterLink @mouseover="()=>{pokeballMove('215px')}" to="/about" class="linksLi">
                        Sobre
                    </RouterLink>
                    <a @mouseover="()=>{pokeballMove('325px')}" class="linksLi" 
                    href="https://github.com/MarcosOliacc/vuejs/tree/main/03-treinandoConteudos/02-pokemons" 
                    target="_blank">
                        Repositório
                    </a>

                </div>
                <div class="slideContent">
                    
                    <div class="slideBar">
                        
                        <div class="redContent" :style="{
                            left: barPosition
                        }"></div>

                    </div>
                </div>
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