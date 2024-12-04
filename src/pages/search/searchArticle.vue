<template>
    <div id="search-body">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="confirm" @click="sendFilter">
                确认
            </div>
            <div class="clear" @click="callClearMethod">
                清除
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchBar :isExpand="isExpand" :menuItems="menuItems" @selectionChanged="handleFilter"
                    @clear="receiveMethod">
                </searchBar>
            </div>

            <div :class="{ main: true, collapsed: !isExpand }">
                <SearchNav></SearchNav>
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

    <div class="background" v-if="isShow">
        <div class="form">
            <div class="close" @click="closeClaimForm">x</div>
            <ClaimForm :formId="formId" :formTitle="formTitle"></ClaimForm>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ClaimForm from '/src/components/search/ClaimForm.vue';
import searchBar from '/src/components/search/searchBar.vue';
import searchItem from '/src/components/search/searchItem.vue';
import pageComponent from '/src/components/pageComponent.vue';
import SearchNav from '/src/components/search/SearchNav.vue';
//侧边栏是否展开
const isExpand = ref(true)
const expandBar = () => {
    isExpand.value = !isExpand.value
}

const menuItems = ref([
    { id: 'time', title: '时间', contents: [1999, 1998, 1997] },
    { id: 'theme', title: '领域', contents: ['deep', 'hhhhhhhh'] },
    { id: 'source', title: '期刊', contents: [] }
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
const formId = ref(null);
const formAuthor = ref(null)
const formTitle = ref(null)
const showClaimForm = (id, title, author) => {
    isShow.value = true
    formId.value = id
    formTitle.value = title
    formAuthor.value = author
}
const closeClaimForm = () => {
    isShow.value = false
}

//分页
const currentPage = ref(1)
const totalPage = ref(100)
const pageSize = ref(1)

//筛选
const selectedTags = ref({})
const handleFilter = (selections) => {
    selectedTags.value = selections
}
const sendFilter = () => {

}

//清除
const clearMethod = ref(null)
const receiveMethod = (method) => {
    clearMethod.value = method
}
const callClearMethod = () => {
    if (clearMethod.value) {
        clearMethod.value();
    }
}
</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

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

.clear {
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
    top: 130px;
    color: white;
}

.left-expand:hover,
.confirm:hover,
.clear:hover {
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

.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 400px;
    width: 450px;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
}

.form .close {
    font-size: 22px;
    font-weight: 500;
    position: absolute;
    top: 8px;
    right: 20px;
    cursor: pointer;
    color: grey;
}
</style>
