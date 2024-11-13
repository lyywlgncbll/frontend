<template>
    <div id="search-body">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" class="icon" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchBar :isExpand="isExpand" :menuItems="menuItems" @timeSelected="filterItemsByTime"></searchBar>
            </div>

            <div :class="{ main: true, collapsed: !isExpand }">
                <searchItem v-for="(searchItem, index) in filteredItems" :searchItem="searchItem" :key="index"></searchItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import searchBar from '../components/searchBar.vue';
import searchItem from '../components/searchItem.vue';

//侧边栏是否展开
const isExpand = ref(true)

//展开或收起
const expandBar = () => {
    isExpand.value = !isExpand.value
}

const menuItems = ref([
    { title: '时间', contents: ['1999', '1999', '1998', '1997'] },
    { title: '主题', contents: ['内容 1', '内容 2', '内容 3'] },
    { title: '来源', contents: ['内容 1', '内容 2', '内容 3'] },
    { title: '学科', contents: ['内容 1', '内容 2', '内容 3'] },
    { title: '作者', contents: ['内容 1', '内容 2', '内容 3'] },
])

const searchItems = ref([
    {
        title: 'sciend in the age of LLMs',
        author: 'sisythus',
        from: 'IEEE',
        time: 1999,
        content: "Intelligence research is more advanced and less controversial than is generally realized. Definitive conclusions about the neural and genetic bases of intelligence are being drawn — these have ethical implications that need to be addressed.Intelligence research is more advanced and less controversial than is generally realized. Definitive conclusions about the neural and genetic bases of intelligence are being drawn — these have ethical implications that need to be addressed.",
        label: [
            "deep learning",
            "深度学习",
        ],
        num: 100,
    },
    {
        title: 'Neurobiology of intelligence: science and ethics',
        author: 'sisythus',
        from: 'Nature',
        time: 1998,
        content: "The lateral prefrontal cortex is consistently activated during intelligence testing. Frontal and parietal brain regions implicated in working memory are also activated under test conditions. These data contribute to the debate on whether intelligence has a unitary (activation of a single brain region/functional unit) or multiple basis.",
        label: [
            "deep learning",
            "hhhhhhhh",
        ],
        num: 100,
    },
])

// 选中的时间
const selectedTime = ref(null)

// 过滤 searchItems 的计算属性
const filteredItems = computed(() => {
    if (selectedTime.value === null) return searchItems.value
    return searchItems.value.filter(item => item.time === selectedTime.value)
})

// 处理从 searchBar 中传递的时间
const filterItemsByTime = (time) => {
    selectedTime.value = time
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

.main.collapsed {
    width: 90%;
}
</style>
