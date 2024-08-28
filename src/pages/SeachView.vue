<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    const param = ref('')
    const route = useRoute()

onMounted(()=>{param.value = route.params.name})

</script>

<template>
    <h1>{{param}}</h1>
</template>