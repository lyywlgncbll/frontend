<template>
    <div id="filter-root" class="nav" v-if="topic != ''">
        <div class="container">Topic: {{ topic }}</div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const topic = ref('')
onMounted(() => {
    if (localStorage.getItem('topic')) {
        topic.value = localStorage.getItem('topic')
    }
})
</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.nav {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 5px 10px;
    margin: 10px auto;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 5px 20px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}

.container {
    font-size: 20px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--sort-span-color);
}
</style>
