<script setup>
import { onMounted, ref, watch } from 'vue';
import getRandonPoke from '@/getters/getRandomPoke';

const response = ref(false)
const inputValue = ref('')
const randomPoke = ref({})
const atual = ref({})
onMounted(async ()=>{randomPoke.value = await getRandonPoke()})

watch(randomPoke,(novo)=>{atual.value = novo; if(novo.id < 100) {
    atual.value.id = atual.value.id.toString().padStart(3, '0')
}})

</script>
<template>
    <section class="conteiner">
        <div class="podiumConteiner">
            <div class="podiumContent">
                <div class="pokeImg" :style="{
                    background:`url(https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${atual.id}.png)`
                }"></div>
                <button class="ShowPoke">Ver Pokemon</button>
            </div>
        </div>
        <div class="infosConteiner">
            <div class="infosContent">
                <h2 v-if="!response">Quem é esse pokemon?</h2>
                <h2 v-if="response">Dizendo se acertou ou não</h2>
                <p v-if="!response">observe a imagem ao lado e tente descobrir o nome dele :)</p>
                <p v-if="response">Esse pokemon se chama <strong>fadiuh</strong> : b</p>
                <input v-model="inputValue" v-if="!response" type="text" placeholder="Digite o nome do Pokemon...">
                <div class="btnContent">
                    <button v-if="!response" class="sendBtn">Enviar</button>
                    <button v-if="!response" class="tipBtn">Dica</button>
                    <button v-if="response" class="tryAgainBtn">Tentar novamente</button>

                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>@import './styles.scss'; </style>