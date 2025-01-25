<script setup>
import getMultipliers from '@/getters/getMultipliers';
import { onMounted, ref, watch } from 'vue';

    const props = defineProps({
        pokeType: {
            type: Array
        }
    })
    let types = []
    const multipliers = ref({})
    const defMultipliers = ref({})
    const ataMultipliers = ref({})
    const actvMultipler = ref('ataque')

    onMounted(()=>{
        props.pokeType.forEach((item)=> {
            types.push(item.type.name)
        })
        multipliers.value = getMultipliers(types)
        defMultipliers.value = multipliers.value.defense
        ataMultipliers.value = multipliers.value.attack

    }) 
    watch(props.pokeType, (newProps)=> {
        types = []
        newProps.forEach((item)=> {
            types.push(item.type.name)
        })
        multipliers.value = getMultipliers(types)
        defMultipliers.value = multipliers.value.defense
        ataMultipliers.value = multipliers.value.attack

    })


    // proximo passo: colocar um botao que altera a key exibida (ataque ou defesa), depois fazer um v-if com as divs de acordo com a key ativada, depois separar os valores de verdade, com value e key de cada multiplo usando v-for para cada um
</script>

<template>
    <section class="cantet">
        <h3 class="secondaryColor">Multiplicadores</h3>
        <div class="controlContent">
            <div
            @click="()=> {actvMultipler = actvMultipler == 'defesa'? 'ataque': 'defesa'}"
            class="btnContent borderA" :style="{
            }">
                <p :style="{marginLeft: actvMultipler == 'defesa'? '-110px' : '0px'}"
                class="invertSwit secondaryColor">Ataque</p>
                <div :style="{
                    left: actvMultipler == 'ataque'?'78px': '-2px' 
                }" class="circleBtn borderA bgABC "></div>

                <p class="secondaryColor bgABC">Defesa</p>
            </div>
        </div>
        <div class="multConteiner no-interaction">
            <div
            v-if="actvMultipler == 'ataque'"
            class="multContent">
                <div class="attackMult" v-for="(value, key) of ataMultipliers" :key="key">
                    <div v-show="value != 1" class="mult">
                        <img class="multImg" :src="key == 'fairy'? `/types/${key}.svg`:`/types/${key}.png`" alt="">
                        <p>x{{value}}</p>
                    </div>
                </div>

            </div>
            <div
            v-else
            class="multContent">
            <div class="attackMult" v-for="(value, key) of defMultipliers" :key="key">

                <div v-show="value != 1" class="mult">
                    <img class="multImg" :src="key == 'fairy'? `/types/${key}.svg`:`/types/${key}.png`" alt="">
                    <p>x{{value}}</p>
                </div>
            </div>

            </div>
        </div>
    </section>
</template>
<style scoped>
@import './styles.scss';
</style>