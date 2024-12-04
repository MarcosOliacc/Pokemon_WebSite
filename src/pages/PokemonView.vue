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
const pokeText = ref('')
const pokeSkills = ref([])
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

        await pokeStore.getGerena(pokemon.value.id).then(res=> {
            pokeGenera.value = res.genera
            japName.value = res.japName
            pokeText.value = res.text['flavor_text'].replaceAll("\\", ' ').normalize('NFC')
        })
        await pokeStore.getPokeSkills(pokemon.value.id).then(res=> pokeSkills.value = res)
        pokeHeight.value = String(pokemon.value.height).length > 1? String(pokemon.value.height).slice(0,1)+'.'+ String(pokemon.value.height).slice(1) : '0.'+ String(pokemon.value.height).slice(0)

        pokeweight.value =String(pokemon.value.weight).slice(0,-1)+'.'+ String(pokemon.value.weight).slice(-1)
        return new Promise((resolve, reject) => {
        image.onload = () => {
            try {
            const colorThief = new ColorThief();
            const plt = colorThief.getPalette(image, 4);
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
            loading.value = false;
            resolve();
            } catch (err) {
            console.error("Erro ao processar a imagem:", err);
            loading.value = false;
            reject(err);
            }
        };

        image.onerror = () => {
            console.error("Erro ao carregar a imagem.");
            loading.value = false;
            reject(new Error("Falha ao carregar a imagem"));
        };
        })
    } else{
        routeValue.value = ''
    } 
        
}   

onBeforeMount(async () => {
  routeValue.value = route.params.value;
  try {
    await loadImageAndColor();
  } catch (err) {
    console.error("Erro no carregamento:", err);
  }
});

watch(() => route.params.value, async (novo, antigo) => {
  if (novo !== antigo) {
    routeValue.value = novo;
    try {
      await loadImageAndColor();
    } catch (err) {
      console.error("Erro no watch:", err);
    }
  }
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
                    <h1 class="secondaryColor no-interaction" contenteditable="false">{{ japName }}</h1>
                </div>
                <div class="infosPokeSect no-interaction"
                contenteditable="false">
                    <div class="infosHeader" >
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
                        <p class="pstat primaryColor">{{ pokeText}}</p>
                    </div>

                </div>
            </div>
            <div class="bottomBlock">
                <div class="seconContent">
                    <h3 class="secondaryColor secunTitle">
                        habilidades 
                    </h3>
                    <div class="skillsContent">
                        <div  v-for="skill of pokeSkills" :key="skill.name">

                            <p class="thirdyColor">{{ skill.name.replaceAll('-', ' ') }}</p>
                            <div class="skillInfo">
                                <p>{{ skill.text }}</p>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div class="secunContent">
                    <h3 class="secondaryColor secunTitle">
                        familia 
                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secondaryColor secunTitle">
                        fraqueza 
                    </h3>
                </div>
                <div class="secunContent">
                    <h3 class="secondaryColor secunTitle">
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