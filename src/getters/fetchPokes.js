import axios from "axios";


const fetchRandomPoke = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon/'
})
export default fetchRandomPoke