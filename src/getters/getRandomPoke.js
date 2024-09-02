import fetchRandomPoke from "./fetchPokes"
async function getRandonPoke() {
    const randNumber = parseInt(Math.random()* 1025).toString()
    const res = await fetchRandomPoke.get(randNumber).then((res)=> res.data).catch((err)=>console.log(err))
    console.log(res)
    return res

}
export default getRandonPoke