<script setup>
import { onMounted, ref, watch } from 'vue';
import getRandonPoke from '@/getters/getRandomPoke';
import { useRouter } from 'vue-router';

const response = ref(false)
const tip = ref(false)
const inputValue = ref('')
const randomPoke = ref({})
const atual = ref({})
const testResult = ref(false)
const reload = ref(false)
const windowWidth = ref()
const router = useRouter()
const updateWindowWidth = ()=> {
    windowWidth.value = window.innerWidth
}
onMounted(async ()=>{
    randomPoke.value = await getRandonPoke()
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', updateWindowWidth)
})

watch(randomPoke,(novo)=>{atual.value = novo; if(novo.id < 100) {
    atual.value.id = atual.value.id.toString().padStart(3, '0')
    
}})
function sendName() {
    if(inputValue.value !== '') {
        response.value = true
        atual.value.name == inputValue.value.toString().toLowerCase()? testResult.value = true : false
    } else {
        alert('Digite o nome do pokemon na caixa antes de enviar!')
    }
}
async function tryAgain() {
    response.value = false
    inputValue.value = ''
    testResult.value = false
    tip.value = false
    randomPoke.value = await getRandonPoke()
}
async function refresh() {
    reload.value = true
    setTimeout(() => {
        tryAgain()
        reload.value = false
    }, 300);
    
}

</script>
<template>
    <section class="conteiner">
        <h2 v-if="windowWidth < 900">Quem é esse pokemon?</h2>
        <div class="podiumConteiner">
            <div class="podiumContent" >
                <div class="pokeImg" :style="{
                    background:`url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${atual.id}.png) center center`,
                    filter: response? 'none' : 'contrast(0%) brightness(0.60)',
                    backgroundSize: '215px'
                }"></div>
                <button v-if="response" class="showPokeBtn" @click="()=>{router.push(`/pokemon/${atual.name}`)}">Ver Pokemon</button>

                <button :class="`refreshBtn ${reload?'loading':''}`" @click="refresh"><img class="refreshIcon" src="/src/assets/images/icons/refreshIcon.svg" alt=""></button>
                <div :class="`lightsPodium ${response?'on': 'off'}`" ></div>
            </div>
        </div>
        <div class="infosConteiner">
            <div class="infosContent">
                <h2 v-if="!response">Quem é esse pokemon?</h2>
                <h2 v-if="response">{{ testResult ? 'Parabéns!!! Você acertou o pokemon &#128513;': 'Ops.. Parece que você errou o nome do pokemon &#128557;'}}</h2>
                <p v-if="!response">
                    {{ tip ? `O nome do pokemon começa com a letra: ${atual.name} &#129296;`: 'Observe a imagem e tente descobrir o nome dele &#128512;' }}
                </p>
                <p v-if="response">Esse pokemon se chama <strong>{{atual.name}}</strong> &#129299;</p>
                <input v-model="inputValue" v-if="!response" type="text" placeholder="Digite o nome do Pokemon...">
                <div class="btnContent">
                    <button v-if="!response" @click="sendName" class="sendBtn">Enviar</button>
                    <button v-if="!response" class="tipBtn"
                    @click="()=>{tip = true}"
                    >
                        Dica</button>
                    <button v-if="response" @click="tryAgain" class="tryAgainBtn">Tentar novamente</button>

                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>@import './styles.scss'; </style>