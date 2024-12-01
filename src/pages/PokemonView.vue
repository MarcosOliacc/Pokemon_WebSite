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
const pokeGenera = ref('')
const japName = ref('')
const pokeweight = ref('')
const pokeHeight = ref('')
function rgb(r,g,b) {
    return `rgb(${r}, ${g}, ${b})`
}

const loadImageAndColor = async ()=> {
    if(route.params.value) {
        loading.value = true

        await pokeStore.loadAllPokes()
        await pokeStore.getPoke(route.params.value).then(res => pokemon.value = res)
        img.value = pokemon.value.sprites.other['dream_world'].front_default
    
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = img.value 

        await pokeStore.getGerena(3).then(res=> {
            pokeGenera.value = res.genera
            japName.value = res.japName
        })
        pokeHeight.value = String(pokemon.value.height).length > 1? String(pokemon.value.height).slice(0,1)+'.'+ String(pokemon.value.height).slice(1) : '0.'+ String(pokemon.value.height).slice(0)

        pokeweight.value =String(pokemon.value.weight).slice(0,-1)+'.'+ String(pokemon.value.weight).slice(-1)

        return new Promise((resolve) => {
            image.onload = () => {
                const colorThief = new ColorThief();
                var plt = colorThief.getPalette(image, 4);
            var bgChannels, primaryChannels, secondaryChannels, thirdyChannels;
            [bgChannels, primaryChannels, secondaryChannels, thirdyChannels] = plt;
            var bgColor = rgb(bgChannels[0] + 30, bgChannels[1] + 30, bgChannels[2] + 30);
            var bgColorEnd = rgb(bgChannels[0] - 30, bgChannels[1] - 30, bgChannels[2] - 30);
            var primaryColor = rgb(primaryChannels[0], primaryChannels[1], primaryChannels[2]);
            var secondaryColor = rgb(secondaryChannels[0], secondaryChannels[1], secondaryChannels[2]);
            var thirdyColor = rgb(thirdyChannels[0], thirdyChannels[1], thirdyChannels[2]);
            var invertedColor = rgb(255 - thirdyChannels[0], 255 - thirdyChannels[1], 255 - thirdyChannels[2]);
            var css = document.createElement('style');
            css.innerHTML = `   .bgColor { 
                                background: linear-gradient( -45deg, ${bgColor}, ${bgColorEnd} );
                                     }
                            .primaryColor { color: ${primaryColor}; }
                            .secondaryColor { color: ${secondaryColor}; } 
                            .thirdyColor { color: ${thirdyColor}; }
                            .borderColor { 
                                text-shadow: -1px 0 ${bgColor}, 0 1px ${bgColor}, 1px 0 ${bgColor}, 0 -1px ${bgColor};
                            }
                            .tooltipColor {
                                background: ${bgColor};
                                border-bottom: 56px solid ${secondaryColor};
                            }
                            .invertedColor {
                                background: ${invertedColor}
                            }
                            `;
            document.body.appendChild(css);
            console.log(pokemon.value.stats)
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
        <div v-if="!loading" class="pokeConteiner bgColor">
            <div class="topBlock">
                <div class="figurePokeSect">
                    <img :src="img" :alt="`${pokemon.name} imagem`">
                    <h1 class="secondaryColor">{{ japName }}</h1>
                </div>
                <div class="infosPokeSect">
                    <div class="infosHeader">
                        <p class="secondaryColor leftBit">{{pokeGenera.genus}}</p>
                        <h2 class="borderColor primaryColor">{{String(pokemon.name).charAt(0).toUpperCase() + String(pokemon.name).slice(1)}}</h2>
                        <h1 class="pokeId secondaryColor">{{ pokemon.id }}</h1>
                    </div>
                    <div class="seconInfos">
                        <div class="typesConteiner">
                            <div class="typeHapp">
                                <div
                                v-for="types of pokemon.types"
                                :key="types.type.name"
                                :class="`type ${types.type.name}`"
                                >
                                    <p>{{types.type.name}}</p>
                                </div>
                            </div>
                            <p class="primaryColor">
                                Blooms when it is absorbing solar energy.
                            </p>
                        </div>
                        <div class="dimensConteiner">
                            <p class="primaryColor">Altura: {{pokeHeight}} m</p>
                            <p class="primaryColor">Peso: {{ pokeweight }} kg</p>
                        </div>  
                    
                    </div>
                    <div class="statiSect">
                        <div class="statcContent" v-for="stat of pokemon.stats" :key="stat.name">
                            <p class="staticTitle"><span class="thirdyColor">{{String(stat.stat.name).charAt(0).toUpperCase() + String(stat.stat.name).slice(1)}}</span><span class="secondaryColor"> - {{stat['base_stat']}}</span></p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="bottomBlock">
                <div class="secunContent">
                    <h3 class="secunTitle">
                        habilidades 
                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secunTitle">
                        familia 
                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secunTitle">
                        fraqueza 
                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secunTitle">
                        item
                    </h3>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    @import '/src/styles/pageStyles/pokeView.scss';
</style>