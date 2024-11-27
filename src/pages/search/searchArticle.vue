<template>
    <div id="search-body">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" class="icon" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="confirm">
                确认
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchBar :isExpand="isExpand" :menuItems="menuItems" @selectionChanged="handleFilter"></searchBar>
            </div>

            <div :class="{ main: true, collapsed: !isExpand }">
                <searchItem v-for="(searchItem, index) in searchItems" :searchItem="searchItem" :key="index"
                    @openClaimForm="showClaimForm">
                </searchItem>
                <div style="text-align: center; margin-top: 1%;">
                    <pageComponent class="pageComponent" v-model:currentPage="currentPage" v-model:totalPage="totalPage"
                        @update:currentPage="updatePage"></pageComponent>
                </div>
            </div>
        </div>

    </div>

    <div class="form" v-if="isShow">
        <ClaimForm :claimData="selectedClaimData"></ClaimForm>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ClaimForm from '/src/components/search/ClaimForm.vue';
import searchBar from '/src/components/search/searchBar.vue';
import searchItem from '/src/components/search/searchItem.vue';
import pageComponent from '/src/components/pageComponent.vue';

//侧边栏是否展开
const isExpand = ref(true)
const expandBar = () => {
    isExpand.value = !isExpand.value
}

const menuItems = ref([
    { id: 'time', title: '时间', contents: [1999, 1998, 1997] },
    { id: 'theme', title: '主题', contents: [] },
    { id: 'source', title: '来源', contents: [] }
])

const searchItems = ref([
    {
        id: "sadasdsadsadsad",
        title: 'sciend in the age of LLMs',
        author: 'sisythus',
        from: 'IEEE',
        time: 1999,
        content: "Intelligence research is more advanced and less controversial than is generally realized. Definitive conclusions about the neural and genetic bases of intelligence are being drawn — these have ethical implications that need to be addressed.Intelligence research is more advanced and less controversial than is generally realized. Definitive conclusions about the neural and genetic bases of intelligence are being drawn — these have ethical implications that need to be addressed.",
        label: [
            "机器学习",
            "深度学习",
        ],
        num: 100,
    },
    {
        id: "sadcccccadsad",
        title: 'Neurobiology of intelligence: science and ethics',
        author: 'sisythus',
        from: 'Nature',
        time: 1998,
        content: "The lateral prefrontal cortex is consistently activated during intelligence testing. Frontal and parietal brain regions implicated in working memory are also activated under test conditions. These data contribute to the debate on whether intelligence has a unitary (activation of a single brain region/functional unit) or multiple basis.",
        label: [
            "人工智能",
            "深度学习",
        ],
        num: 100,
    },
    {
        id: "seeeeeeeeeesad",
        title: 'Neurobiology of intelligence: science and ethics',
        author: 'sisythus',
        from: 'Nature',
        time: 1997,
        content: "The lateral prefrontal cortex is consistently activated during intelligence testing. Frontal and parietal brain regions implicated in working memory are also activated under test conditions. These data contribute to the debate on whether intelligence has a unitary (activation of a single brain region/functional unit) or multiple basis.",
        label: [
            "人工智能",
        ],
        num: 100,
    },
    {
        id: "seeejjjjjjjjd",
        title: 'Neurobiology of intelligence: science and ethics',
        author: 'sisythus',
        from: 'Nature',
        time: 1997,
        content: "The lateral prefrontal cortex is consistently activated during intelligence testing. Frontal and parietal brain regions implicated in working memory are also activated under test conditions. These data contribute to the debate on whether intelligence has a unitary (activation of a single brain region/functional unit) or multiple basis.",
        label: [
            "deep learning",
            "hhhhhhhh",
        ],
        num: 100,
    },
    {
        id: "seeeeooooooooo",
        title: 'Neurobiology of intelligence: science and ethics',
        author: 'sisythus',
        from: 'Nature',
        time: 2024,
        content: "The lateral prefrontal cortex is consistently activated during intelligence testing. Frontal and parietal brain regions implicated in working memory are also activated under test conditions. These data contribute to the debate on whether intelligence has a unitary (activation of a single brain region/functional unit) or multiple basis.",
        label: [
            "deep learning",
            "hhhhhhhh",
        ],
        num: 100,
    },
    {
        id: "lllllllllllllllll",
        title: 'Neurobiology of intelligence: science and ethics',
        author: 'sisythus',
        from: 'Nature',
        time: 2025,
        content: "The lateral prefrontal cortex is consistently activated during intelligence testing. Frontal and parietal brain regions implicated in working memory are also activated under test conditions. These data contribute to the debate on whether intelligence has a unitary (activation of a single brain region/functional unit) or multiple basis.",
        label: [
            "deep learning",
            "hhhhhhhh",
        ],
        num: 100,
    },
])

//表单
const isShow = ref(false);
const showClaimForm = (claimData) => {
    isShow.value = !isShow.value;
};

//分页
const currentPage = ref(1)
const totalPage = ref(100)
const pageSize = ref(1)

//筛选
const selectedTags = ref({})
const handleFilter = (selections) => {
    selectedTags.value = selections
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

.confirm {
    font-size: 11px;
    text-align: center;
    width: 20px;
    height: 44px;
    position: absolute;
    background-color: #92bad6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    left: -20px;
    top: 70px;
    color: white;
}

.left-expand:hover,
.confirm:hover {
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

.form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 600px;
    width: 500px;
    background-color: whitesmoke;
    margin: 0 auto;
}
</style>
