import { ref } from 'vue'
import { defineStore } from 'pinia'
import fetchPokemons from '@/getters/fetchPokes'


export const usePokeStore = defineStore('poke-store', () => {


  const allPokemons = ref([])
  async function loadAllPokes() {
    try {
      const res1 = await fetchPokemons.get('?limit=1025')
      for(const poke of res1.data.results) {
        const res2 = await fetch(poke.url).then(res=> res.json())
        allPokemons.value.push(res2)
      }
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
    }
  }
  async function searchPokes(param) {
    const field = 'name'
    const lowerParam = String(param).toLowerCase()
    const filteredItens = allPokemons.value.filter((item)=>{
      if(item[field]) {
        return String(item[field]).toLowerCase().includes(lowerParam)
      } return false
    })
    filteredItens.sort((a, b) =>{
      const fieldA = String(a[field]).toLowerCase();
      const fieldB = String(b[field]).toLowerCase();
      
      const startsWithA = fieldA.startsWith(lowerParam);
      const startsWithB = fieldB.startsWith(lowerParam);
  
      if (startsWithA && !startsWithB) {
        return -1;
      }
      if (!startsWithA && startsWithB) {
        return 1;
      }
  
      return fieldA.localeCompare(fieldB)
    });
    return filteredItens
    
  }
  return {allPokemons , loadAllPokes, searchPokes}
})
