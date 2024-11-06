<script setup>
import { ref } from 'vue';
import searchBar from '../components/searchBar.vue';
const num = ref(0);

</script>

<template>
    <div id="search-body">

        <div id="mid">
            <div class="left-bar">
                <searchBar></searchBar>
            </div>
            <div class="main">

            </div>
        </div>
    </div>

</template>

<style scoped>
#search-body {
    margin: 0 50px;
}

#mid{
    height: 100vh;
    display: flex;
    margin: 30px auto;
}


.left-bar{
    width: 20%;
    height: 90%;
}

.main{
    border: 1px solid black;
    width: 75%;
    height: 100%;
    margin: 0 auto;
}
</style>
