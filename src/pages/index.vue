<template>
    <div id="search-body">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" class="icon" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchBar :isExpand="isExpand"></searchBar>
            </div>
            <div :class="{ main: true, collapsed: !isExpand }">
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import searchBar from '../components/searchBar.vue';

//侧边栏是否展开
const isExpand = ref(true)

//展开或收起
const expandBar = () => {
    isExpand.value = !isExpand.value
}
</script>

<style scoped>
#search-body {
    margin: 0 50px;
}

#mid {
    height: 100vh;
    display: flex;
    margin: 30px auto;
    position: relative;
}

.left-bar {
    width: 20%;
    height: 90%;
    transition: all 0.3s ease;
    overflow: hidden;
}

.left-bar.collapsed {
    width: 0;
}

.left-expand {
    width: 20px;
    height: 44px;
    position: absolute;
    background-color: #92bad6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    left: -20px;
    top: 10px;
}

.left-expand:hover {
    background-color: #85a9c2;
}

.main {
    width: 75%;
    height: 100%;
    margin: 0 auto;
    transition: all 0.3 ease;
}

.main.collapsed{
    width: 90%;
}
</style>
