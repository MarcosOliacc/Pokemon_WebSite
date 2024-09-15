import axios from "axios";


const fetchPokemons = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon/'
})
export default fetchPokemons