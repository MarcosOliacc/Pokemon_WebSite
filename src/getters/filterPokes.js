export function filterTypePokes(params) {
    const activeParams = params.paramsTypes.filter(ele=> ele.active == true)
    let filtered = []
    params.pokesForFilter.forEach((element)=>{
        let ruleAct = false
        for(const type of element.types) {
            if(activeParams.some((ty)=> ty.name == type.type.name)) {
                ruleAct = true
            }
        }
        if(ruleAct) {
            filtered.push(element)
        }
    })
    return filtered
}
export function filterAbilityPokes(params) {
    const activeAbility = params.abilitySelected
    let filtered = []
    params.pokesForFilter.forEach((ele)=> {
        let ruleAct = false 
        for (const ability of ele.abilities) {

            if (activeAbility == ability.ability.name) {
                ruleAct = true
            }
        }
        if(ruleAct) {
            filtered.push(ele)
        }
    })
    console.log(filtered)
    return filtered
}
export function filterHeightSelected(params) {
    
    const heights = params.heights
    let filtered = [] 
    if(heights.some(hei=> hei == '1')) {
        const f = params.pokesForFilter.filter((ele) =>{
            const pokeHeight = String(ele.height).length > 1? String(ele.height).slice(0,1)+'.'+ String(ele.height).slice(1) : '0.'+ String(ele.height).slice(0)

            return pokeHeight <=1.2
        })
        filtered.push(...f)
    }
    if(heights.some(hei=> hei == '2')) {
        const f = params.pokesForFilter.filter((ele) =>{
            const pokeHeight = String(ele.height).length > 1? String(ele.height).slice(0,1)+'.'+ String(ele.height).slice(1) : '0.'+ String(ele.height).slice(0)

            return pokeHeight > 1.2 && pokeHeight <= 3.5
        })
        filtered.push(...f)
    }
    if(heights.some(hei=> hei == '3')) {
        const f = params.pokesForFilter.filter((ele) =>{
            const pokeHeight = String(ele.height).length > 1? String(ele.height).slice(0,1)+'.'+ String(ele.height).slice(1) : '0.'+ String(ele.height).slice(0)

            return pokeHeight > 3.5
        })
        filtered.push(...f)
    }
    return filtered.sort((a,b)=> a.id - b.id)
}
export function filterWeightSelected(params) {
    const weights = params.weights
    let filtered = []
    if(weights.some(weight=> weight == '1')) {
        const f = params.pokesForFilter.filter((ele)=> {
            const pokeWeight = String(ele.weight).slice(0,-1)+'.'+ String(ele.weight).slice(-1)
            return pokeWeight < 40
        })
        filtered.push(...f)
    }
    if(weights.some(weight=> weight == '2')) {
        const f = params.pokesForFilter.filter((ele)=> {
            const pokeWeight = String(ele.weight).slice(0,-1)+'.'+ String(ele.weight).slice(-1)
            return pokeWeight >= 40 && pokeWeight < 200
        })
        filtered.push(...f)
    }
    if(weights.some(weight=> weight == '3')) {
        const f = params.pokesForFilter.filter((ele)=> {
            const pokeWeight = String(ele.weight).slice(0,-1)+'.'+ String(ele.weight).slice(-1)
            return pokeWeight >= 200 
        })
        filtered.push(...f)
    }
    return filtered.sort((a,b)=> a.id - b.id)
}