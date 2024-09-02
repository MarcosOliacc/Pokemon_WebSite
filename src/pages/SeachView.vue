<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    const param = ref('')
    const route = useRoute()

onMounted(()=>{param.value = route.params.name})

watch(()=> route.params.name, (novo) => {
    param.value = novo
})

</script>

<template>
    <div v-if="param == ''">
        <p> - Digite o nome desejado na barra de pesquisa a cima.</p>
    </div>
    <h2 v-else>Procurando por: {{param}}</h2>
</template>