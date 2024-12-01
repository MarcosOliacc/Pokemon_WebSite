<script setup>
import { usePokeStore } from '@/stores/pokemons';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ColorThief from 'colorthief';
import LoadingSect from '@/components/common/loading/LoadingSect.vue';
import NoOne from '@/components/common/noOne/NoOne.vue';

const route = useRoute();
const pokeStore = usePokeStore();
const routeValue = ref('')
const loading = ref(false)

const img = ref('')
const pokemon = ref({});
const bgColor = ref([])

const loadImageAndColor = async ()=> {
    if(route.params.value) {
        loading.value = true

        await pokeStore.loadAllPokes()
        await pokeStore.getPoke(route.params.value).then(res => pokemon.value = res)
        img.value = pokemon.value.sprites.other['official-artwork'].front_default
    
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = img.value 
    
        return new Promise((resolve) => {
            image.onload = () => {
                const colorThief = new ColorThief();
                bgColor.value = colorThief.getColor(image)
                loading.value = false
                resolve()
            }
        })
    } else{
        routeValue.value = ''
    } 
        
}   

onBeforeMount( async ()=> {
    routeValue.value = route.params.value
    await loadImageAndColor()})

watch(()=> route.params.value , async (novo)=> {
    routeValue.value = novo
    await loadImageAndColor()
})
</script>

<template>
    <section class="conteiner">
        <NoOne v-if="!routeValue"/>
        <LoadingSect v-if="loading"/>
        <div class="pokeConteiner">
            <div class="topBlock">
                <div class="figurePokeSect">
                    <img :src="img" :alt="`${pokemon.name} imagem`">
                    <h1 class="japones">Nome em japones</h1>
                </div>
                <div class="infosPokeSect">
                    <div class="infosHeader">
                        <div class="leftBit">pequenas infos</div>
                        <h2>Nome do pokemon</h2>
                        <h1>id do pokemon</h1>
                    </div>
                    <div class="secunInfos">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptas, praesentium vel dolore temporibus labore architecto fuga porro facere aliquam dolorum ipsum debitis sit aspernatur quo possimus incidunt blanditiis accusamus.</p>
                    </div>
                    <div class="statiSect">
                        <div class="statcContent">
                            <img class="icon statcIcon" src="" alt="">
                            <p class="staticTitle"><span>sfhuasdf</span> - <span> 34</span></p>
                        </div>
                        <div class="statcContent">
                            <img class="icon statcIcon" src="" alt="">
                            <p class="staticTitle"><span>sfhuasdf</span> - <span> 34</span></p>
                        </div>
                        <div class="statcContent">
                            <img class="icon statcIcon" src="" alt="">
                            <p class="staticTitle"><span>sfhuasdf</span> - <span> 34</span></p>
                        </div>
                        <div class="statcContent">
                            <img class="icon statcIcon" src="" alt="">
                            <p class="staticTitle"><span>sfhuasdf</span> - <span> 34</span></p>
                        </div>
                        <div class="statcContent">
                            <img class="icon statcIcon" src="" alt="">
                            <p class="staticTitle"><span>sfhuasdf</span> - <span> 34</span></p>
                        </div>
                        <div class="statcContent">
                            <img class="icon statcIcon" src="" alt="">
                            <p class="staticTitle"><span>sfhuasdf</span> - <span> 34</span></p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="bottomBlock">
                <div class="secunContent">
                    <h3 class="secunTitle">
                        
                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secunTitle">

                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secunTitle">

                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secunTitle">

                    </h3>
                </div>
            </div>
        </div>
        
        <h1>{{ pokemon.name }}</h1>
        <div :style="{
            width: '20px', height: '20px', backgroundColor: `rgb(${bgColor.join(',')})`
        }"></div>
    </section>
</template>

<style scoped>
    @import '/src/styles/pageStyles/pokeView.scss';
</style>