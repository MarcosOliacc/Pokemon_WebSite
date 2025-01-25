<script setup>
import { usePokeStore } from '@/stores/pokemons';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ColorThief from 'colorthief';
import LoadingSect from '@/components/common/loading/LoadingSect.vue';
import NoOne from '@/components/common/noOne/NoOne.vue';
import MultplierSect from '@/components/common/multiplier/MultplierSect.vue';

const route = useRoute();
const router = useRouter()
const pokeStore = usePokeStore();
const routeValue = ref('')
const loading = ref(false)
const pokeError = ref(false)
const body = ref(null)

const img = ref('')
const pokeContent = ref({});
const pokeGenera = ref('')
const japName = ref('')
const pokeweight = ref('')
const pokeHeight = ref('')
const pokeText = ref('')
const pokeSkills = ref([])
const actSkillSect = ref(null)
const pokeFamily = ref({})
const pokeItems = ref([])
const actItemSect = ref(null)
function rgb(r,g,b) {
    return `rgb(${r}, ${g}, ${b})`
}

const loadImageAndColor = async ()=> {
    if(route.params.value) {
        loading.value = true

        await pokeStore.loadAllPokes()
        await pokeStore.getPoke(route.params.value).then(res => {
            pokeContent.value = res
            pokeGenera.value = res.infos.genera
            pokeText.value = res.infos.text['flavor_text'].replaceAll("\\", ' ').normalize('NFC')
            japName.value = res.infos.japName
            pokeFamily.value = res.family
            pokeSkills.value = res.skills
            pokeItems.value = res.items
        }).catch(()=>{
            
            pokeError.value = true
            loading.value = false
        })
        img.value = pokeContent.value.pokemon.sprites.other['dream_world'].front_default ? //----
        pokeContent.value.pokemon.sprites.other['dream_world'].front_default : //----
        pokeContent.value.pokemon.sprites.other['official-artwork'].front_default

        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = img.value 
        
        pokeHeight.value = String(pokeContent.value.pokemon.height).length > 1? String(pokeContent.value.pokemon.height).slice(0,1)+'.'+ String(pokeContent.value.pokemon.height).slice(1) : '0.'+ String(pokeContent.value.pokemon.height).slice(0)

        pokeweight.value =String(pokeContent.value.pokemon.weight).slice(0,-1)+'.'+ String(pokeContent.value.pokemon.weight).slice(-1)

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
                            .bgABC {
                                background: ${bgColor};
                            }
                            .borderA {
                                border: 2px solid ${secondaryColor};
                            }
                            .tooltipColor {
                                background: ${bgColor};
                                border-bottom: 30px solid ${secondaryColor};
                            }
                                .invertSwit {
                                background: ${secondaryColor};
                                color: ${bgColor};
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
onMounted(()=> {
    if (body.value) {
    body.value.scrollIntoView({ behavior: 'smooth' });
  }
})

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
    <section class="conteiner" ref="body">
        <NoOne v-if="!routeValue"/>
        <LoadingSect v-if="loading"/>
        <div v-if="!loading" class="pokeConteiner bgColor">
            <div v-if="pokeError == true" class="errorPoke">
                <h1>Ops, o tadinho esta com defeito &#128557; </h1>
                <p>Infelizmente alguns pokemons não estão completos na api oficial, então ficarão trancados por enquanto :(</p>
                <img src="/src/assets/images/pikachu-triste.jpeg" alt="">
            </div>
            <div v-else>
                <div class="topBlock">
                    <div class="figurePokeSect">
                        <img :src="img" :alt="`${pokeContent.pokemon.name} imagem`">
                        <h1 class="secondaryColor no-interaction" contenteditable="false">{{ japName }}</h1>
                    </div>
                    <div class="infosPokeSect no-interaction"
                    contenteditable="false">
                        <div class="infosHeader" >
                            <p class="secondaryColor leftBit">{{pokeGenera.genus}}</p>
                            <h2 class="borderColor primaryColor">{{String(pokeContent.pokemon.name).charAt(0).toUpperCase() + String(pokeContent.pokemon.name).slice(1)}}</h2>
                            <h1 class="pokeId secondaryColor">{{ pokeContent.pokemon.id }}</h1>
                        </div>
                        <div class="seconInfos">
                            <div class="typesConteiner">
                                <div class="typeHapp">
                                    <div
                                    v-for="types of pokeContent.pokemon.types"
                                    :key="types.type.name"
                                    :class="`type ${types.type.name}`"
                                    >
                                        <p>{{types.type.name}}</p>
                                    </div>
                                </div>
                                <p class="primaryColor">
                                    I'm still looking for this information..
                                </p>
                            </div>
                            <div class="dimensConteiner">
                                <p class="primaryColor">Altura: {{pokeHeight}} m</p>
                                <p class="primaryColor">Peso: {{ pokeweight }} kg</p>
                            </div>  
                        
                        </div>
                        <div class="statiSect">
                            <div class="statcContent" v-for="stat of pokeContent.pokemon.stats" :key="stat.name">
                                <p class="staticTitle"><span class="thirdyColor">{{String(stat.stat.name).charAt(0).toUpperCase() + String(stat.stat.name).slice(1)}} - </span><span class="secondaryColor">{{stat['base_stat']}}</span></p>
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
                            <div 
                            
                                class="skillPok" 
                                v-for="skill of pokeSkills" 
                                :key="skill.name" 
                                style="position: relative;"
                                
                            >
                                <!-- Nome da Habilidade -->
                                <p
                                class="thirdyColor skill"
                                @mouseenter="actSkillSect = skill.name"
                                @mouseleave="actSkillSect = null"
                                :style="{ zIndex: actSkillSect === skill.name ? 3 : 1,
                                position: 'relative',
                                marginLeft: actSkillSect === skill.name ? '30px' : '0px',
    
                                 }"
                                >
                                {{ skill.name.replaceAll('-', ' ') }}
                                </p>
    
                                <!-- Texto da Habilidade -->
                                <transition name="fade">
                                    <div
                                    @mouseenter="actSkillSect = skill.name"
                                    @mouseleave="actSkillSect = null"
                                    v-show="actSkillSect === skill.name"
                                    class="skillInfo tooltipColor"
                                    :style="{ zIndex: 2, position: 'absolute', bottom: '-10%' }"
                                    >
                                    <p class="primaryColor skillTxt">{{ skill.text }}</p>
                                    </div>
    
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div class="seconContent">
                        <h3 class="secondaryColor secunTitle">
                            familia 
                        </h3>
                        <div class="familyContent">
                            <img @click="()=>router.push(`/pokemon/${member}`) " v-for="member of pokeFamily" :key="member" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${member}.svg`" alt="">
                        </div>
                    </div>
                    <div class="seconContent">
                        <MultplierSect :poke-type="pokeContent.pokemon.types"/>
                    </div>
                    <div class="seconContent">
                        <h3 class="secondaryColor secunTitle">
                            Held Items
                        </h3>
                        <div class="itemContent " v-if="pokeItems.length > 0" >
                            <div 
                                
                                    class="itemPoke" 
                                    v-for="item of pokeItems" 
                                    :key="item.itemName" 
                                    style="position: relative;"
                                    @mouseenter="actItemSect = item.itemName"
                                    @mouseleave="actItemSect = null"
                                >
    
                                    <img class="pokeItemImg" :src="item.img" alt="pokeItem"
                                    :style="{ zIndex: actItemSect === item.itemName ? 3 : 1,
                                    position: 'relative',
                                    marginLeft: actItemSect === item.itemName ? '10px' : '0px',
        
                                     }"
    
                                    @mouseenter="actItemSect = item.itemName"
                                    @mouseleave="actItemSect = null"
                                    >
                                    <p
                                    class="thirdyColor itemName"
                                    @mouseenter="actItemSect = item.itemName"
                                    @mouseleave="actItemSect = null"
                                    :style="{ zIndex: actItemSect === item.itemName ? 3 : 1,
                                    position: 'relative',
                                    marginLeft: actItemSect === item.itemName ? '10px' : '0px',
        
                                     }"
                                    >
                                    {{ item.rarity }}% de ter {{ item.itemName}}
                                    </p>
        
                                    <!-- Texto da Habilidade -->
                                    <transition name="fade">
                                        <div
                                        @mouseenter="actItemSect = item.itemName"
                                        @mouseleave="actItemSect = null"
                                        v-show="actItemSect === item.itemName"
                                        class="itemInfo tooltipColor"
                                        :style="{ zIndex: 2, position: 'absolute', bottom: '10%' }"
                                        >
                                        <p class="primaryColor itemTxt">{{ item.text }}</p>
                                        </div>
        
                                    </transition>
                                </div>
    
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
    @import '/src/styles/pageStyles/pokeView.scss';
</style>