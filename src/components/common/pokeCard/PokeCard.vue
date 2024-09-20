<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    pokemon: {
    type: Object,
    default: () => {}
    }
});

const poke = ref({});
const pokeImg = ref('')
const pokeHeight = ref('')
const pokeweight = ref('')


watch(
    () => props.pokemon,
    (newPokemon) => {
        poke.value = newPokemon;
        pokeImg.value = poke.value.sprites.other['official-artwork'].front_default

        pokeHeight.value = String(poke.value.height).length > 1? String(poke.value.height).slice(0,1)+'.'+ String(poke.value.height).slice(1) : '0.'+ String(poke.value.height).slice(0)

        pokeweight.value =String(poke.value.weight).slice(0,-1)+'.'+ String(poke.value.weight).slice(-1)
        
  },
  { immediate: true }
);
</script>
<template>
    <div class="content">
        <div class="imgContent">
            <img class="pokeImg" v-bind:src="pokeImg">
        </div>
        <h3 class="pokeName">{{ poke.name }}</h3>
        <div class="infosConteiner">

            <div class="dimensConteiner">
                <p><img class="icon" src="/src/assets/images/icons/weight.svg" alt="skills">{{ pokeweight }} kg</p>
                <p><img class="icon" src="/src/assets/images/icons/height.svg" alt="skills">{{pokeHeight}} m</p>
                <p><img class="icon" src="/src/assets/images/icons/skills.svg" alt="skills" translate="yes">{{poke.abilities[0].ability.name}} </p>
            </div>  
            <div class="typesConteiner">
                <div
                    v-for="types of poke.types"
                :key="types.type.name"
                :class="`type ${types.type.name}`"
                >
                <p>{{types.type.name}}</p>
                </div>

            </div>

        </div>
    </div>
</template>
<style scoped>
    @import './styles.scss';
</style>