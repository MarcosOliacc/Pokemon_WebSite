import fetchPokemons from "./fetchPokes"
async function getRandonPoke() {
    const randNumber = parseInt(Math.random()* 1025).toString()
    const res = await fetchPokemons.get(randNumber).then((res)=> res.data).catch((err)=>console.log(err))
    return res

}
export default getRandonPoke