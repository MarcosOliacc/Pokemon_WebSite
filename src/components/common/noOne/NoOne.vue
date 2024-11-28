<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    const searchInput = ref('')
    const router = useRouter()


    function handleSubmit() {
        router.push(`/pokemon/${searchInput.value}`)
    }
</script>

<template>
    <section class="conteineri">
        <h3>Procurando algum pokemon?</h3>
        <p>Escreva o nome ou o ID do pokemon que deseja encontrar &#129299;</p>
        <form @submit.prevent="handleSubmit" class="searchContent">
                <input type="text" class="searchInput"
                placeholder="Nome ou ID"
                v-model="searchInput"
                maxlength="20"
                >
                    <button type="submit" class="searchBtn">
                    <img class="searchIcon" src="/src/assets/images/icons/searchIcon.svg" alt="">
                </button>  
                
            </form>
    </section>
</template>

<style scoped>
    @import './styles.scss';
</style>
