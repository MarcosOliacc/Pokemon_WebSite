<script setup>

</script>
<template>
    <section class="conteinerAb">
        <h1>Projeto Pokemon Website</h1>
        <div class="description">
            <div>
                <p>Este é um site criado para fins acadêmicos, uma aplicação que utiliza uma api RESTFul para coletar os dados sobre pokemons e fornecer para os usuarios: PokeApi</p>
                <p>Site criado com o vueJs, inspirado em <a target="blank" href="pokemon.com">pokemon.com</a></p>
                <p>
                    Sinta-se a vontade para explorar e descobrir mais sobre pokemons!
                </p>
            </div>

                <img src="/sitepoke.png" alt="">


        </div>
        <div class="pokeapi">
            <div>
                <p>
                    PokeApi: fornece uma interface API RESTful para objetos altamente detalhados construídos a partir de milhares de linhas de dados relacionados a Pokémon. 
                </p>
                <p>Cobrimos especificamente a franquia de videogame. Usando este site, você pode consumir informações sobre Pokémon, seus movimentos, habilidades, tipos, grupos de ovos e muito, muito mais. <a target="blank" href="https://pokeapi.co/">https://pokeapi.co/</a>
                </p>

            </div>
            <img src="/pokeapi.png" alt="">
        </div>
    </section>
</template>

<style scoped>
@import '/src/styles/pageStyles/aboutView.scss';
</style>