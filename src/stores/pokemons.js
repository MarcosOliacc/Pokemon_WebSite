import { ref } from 'vue'
import { defineStore } from 'pinia'
import fetchPokemons from '@/getters/fetchPokes'
import { filterAbilityPokes, filterHeightSelected, filterTypePokes, filterWeightSelected } from '@/getters/filterPokes'


export const usePokeStore = defineStore('poke-store', () => {

  const allPokemons = ref([])
  const pokemonsPerPage = ref([])
  const currentHomePage = ref(0)
  const filteredPokes = ref([])

  // Função que carrega todos os pokemons;
  async function loadAllPokes() {
    try {
      const res1 = await fetchPokemons.get(`?limit=1028`)
      const requests = res1.data.results.map( poke => fetch(poke.url).then(res => res.json()))
      const data = await Promise.all(requests)

      allPokemons.value = data
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
    }
  }
  //Função que filtra todos os pokemons de acordo com os parametros recebidos;
  async function filterPokemons(params) {
    filteredPokes.value = []
    let pokesForFilter = allPokemons.value
    const paramsTypes = params.typeFilters
    if(paramsTypes.some((ele)=> ele.active == true)) {
      pokesForFilter = filterTypePokes({
        paramsTypes, 
        pokesForFilter
      })
    }

    if (params.abilitySelected != 'Todas') {
      pokesForFilter = filterAbilityPokes({pokesForFilter, abilitySelected: params.abilitySelected})
    }
    
    if(params.heightFilterSelected.length > 0) {
      pokesForFilter = filterHeightSelected({pokesForFilter, heights: params.heightFilterSelected})
    }
    if(params.weightFilterSelected.length > 0) {
      pokesForFilter = filterWeightSelected({pokesForFilter, weights: params.weightFilterSelected})
    }
    if(params.minMaxNumber[0]!= 1 || params.minMaxNumber[1] != 1025) {
      pokesForFilter = pokesForFilter.filter((element)=> element.id >= params.minMaxNumber[0] && element.id <= params.minMaxNumber[1])
    }
    
    console.log(pokesForFilter)
    filteredPokes.value = pokesForFilter
    return true
  }
  // Função que carrega os pokemons de acordo com a chamada do cliente;
  async function loadPokesPerPage(offset) {
    const data = []
    try {
      const res1 = await fetchPokemons.get(`?limit=12&offset=${currentHomePage.value}`)
      for(const poke of res1.data.results) {
        const res2 = await fetch(poke.url).then(res=> res.json())
        data.push(res2)
      }
      if(!offset) pokemonsPerPage.value.push(...data)
      currentHomePage.value =+ offset? offset : 12
      return data
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
    }
  }

  // Função que filtra "allPokemons" de acordo com a pesquisa de usuario
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
  // Função que retorna todas as habilidades 
  async function getSkills() {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/ability/?offset=20&limit=2000').then(res => res.json()) 
      return res

    } catch (error) {
      console.error('Erro ao buscar as habilidades', error);
    }
  }
  async function getPoke(param) {
    const lowerParam = String(param).toLowerCase()
    const res = allPokemons.value.filter((poke)=> {
      if(poke.name == lowerParam) {return poke}
      else if (poke.id == lowerParam) {return poke}
      else return false
    })
    return res[0]
  }
  async function getGerena(id) {
    const [pokemon] = allPokemons.value.filter(poke=> poke.id == id)
    const speciePokeUrl = pokemon.species.url 
    const res = await fetch(speciePokeUrl).then(res=> res.json())
    return {genera: res.genera[7], japName: res.names[0].name}
  }

  return {allPokemons, pokemonsPerPage, filteredPokes, getPoke, getSkills, loadAllPokes,getGerena, loadPokesPerPage, searchPokes, filterPokemons}
})
