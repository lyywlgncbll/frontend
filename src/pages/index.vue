<template>
    <div id="search-body">
        <div id="mid">
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <div class="left-expand" @click="expandBar">
                    <img src="/src/assets/search/icon/down-expand.svg" class="icon" width="15px" height="15px"
                        :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
                </div>
                <searchBar></searchBar>
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
    overflow: hidden;
}

.left-bar {
    width: 20%;
    height: 90%;
    transition: all 0.3s ease;
    position: relative;
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
    right: -20px;
    top: 10px;
}

.left-expand:hover {
    background-color: #85a9c2;
}

.left-bar.collapsed {
    transform: translateX(-100%);
    width: 20px;
}

.main {
    border: 1px solid black;
    width: 75%;
    height: 100%;
    margin: 0 auto;
    transition: width 0.3s ease;
}

</style>
