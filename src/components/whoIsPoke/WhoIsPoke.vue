<script setup>
import { onMounted, ref, watch } from 'vue';
import getRandonPoke from '@/getters/getRandomPoke';

const response = ref(false)
const tip = ref(false)
const inputValue = ref('')
const randomPoke = ref({})
const atual = ref({})
const testResult = ref(false)
const reload = ref(false)
onMounted(async ()=>{randomPoke.value = await getRandonPoke()})

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
        <div class="podiumConteiner">
            <div class="podiumContent" :style="{
                background: response?`url('/src/assets/images/podiumOn.jpg')`:`url('/src/assets/images/podium.jpg')`
            }">
                <div class="pokeImg" :style="{
                    background:`url(https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${atual.id}.png)`,
                    filter: response? 'none' : 'contrast(0%) brightness(0.1)'
                }"></div>
                <button v-if="response" class="showPokeBtn">Ver Pokemon</button>
                <button :class="`refreshBtn ${reload?'loading':''}`" @click="refresh"><img class="refreshIcon" src="/src/assets/images/icons/refreshIcon.svg" alt=""></button>
            </div>
        </div>
        <div class="infosConteiner">
            <div class="infosContent">
                <h2 v-if="!response">Quem é esse pokemon?</h2>
                <h2 v-if="response">{{ testResult ? 'Parabéns!!! Você acertou o pokemon &#128513;': 'Ops.. Parece que você errou o nome do pokemon &#128557;'}}</h2>
                <p v-if="!response">
                    {{ tip ? `O nome do pokemon começa com a letra: ${atual.name} &#129296;`: 'Observe a imagem ao lado e tente descobrir o nome dele &#128512;' }}
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