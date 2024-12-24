<template>
    <loggedNavBar class="nav-bar"/>
    <div class="progress-bar" v-if="isLoading"></div>
    <div id="search-root">
        <div id="mid">
            <div class="left-expand" @click="expandBar" v-if="!topicId">
                <img src="/src/assets/iconfonts/search/down-expand.svg" width="15px" height="15px"
                     :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }" v-if="!topicId">
                <searchFilter :isExpand="isExpand" :menuItems="menuItems" @selectionChanged="handleFilter">
                </searchFilter>
            </div>

            <div :class="{ main: true, collapsed: !isExpand }">
                <searchNav @sortChanged="handleSort" :totalEntries="totalEntries"></searchNav>
                <searchTopic></searchTopic>
                <searchItem v-for="(searchItem, index) in searchItems" :searchItem="searchItem" :key="index">
                </searchItem>
                <div class="page">
                    <pageComponent v-model:currentPage="currentPage" v-model:totalPage="totalPages"></pageComponent>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import {ref, onMounted, watch, onUnmounted} from 'vue';
import searchFilter from '/src/components/search/searchFilter.vue';
import searchItem from '/src/components/search/searchItem.vue';
import pageComponent from '/src/components/search/pageComponent.vue';
import loggedNavBar from '/src/components/bar/logged-nav-bar.vue';
import searchNav from '@/components/search/searchNav.vue';
import searchTopic from '@/components/search/searchTopic.vue';
import axios from '@/utils/axios';
import {SEARCH_API, SEARCH_TOPIC_API} from '../../utils/request.js'

const searchContent = ref("learning")
const topicId = ref("")
const option = ref(1)
onMounted(() => {
    if (localStorage.getItem('topicObj')) {
        topicId.value = JSON.parse(localStorage.getItem('topicObj')).id
        console.log("搜索Topic:", topicId.value)
        searchByTopic()
    } else {
        searchContent.value = localStorage.getItem('searchString')
        option.value = Number(localStorage.getItem('searchOption'))
        searchContent.value = localStorage.getItem('searchString')
        option.value = Number(localStorage.getItem('searchOption'))
        console.log("搜索内容:", searchContent.value, "搜索选项", option.value);
        generalSearch()
    }
})

onUnmounted(() => {
    localStorage.setItem('topicObj', '')
    localStorage.setItem('searchString', '')
    localStorage.setItem('searchOption', 1)
})

//侧边栏是否展开
const isExpand = ref(true)
const expandBar = () => {
    isExpand.value = !isExpand.value
}

const menuItems = ref([
    {id: 'years', title: '时间', contents: []},
    {id: 'fields', title: '领域', contents: []},
    {id: 'journals', title: '期刊', contents: []},
])

const searchItems = ref([])
//分页
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = ref(7)

//获取筛选数据
const handleFilter = (selections) => {
    years.value = selections.years
    journals.value = selections.journals
    fields.value = selections.fields
    currentPage.value = 1
    console.log("筛选的数据: ", selections);
    search()
}

//获取排序方式
const handleSort = (sort) => {
    sortBy.value = sort
    search()
}

watch(currentPage, () => {
    console.log("当前的页码", currentPage.value);
    search()
})

const totalEntries = ref(0)
const sortBy = ref(1)
const years = ref([])
const journals = ref([])
const fields = ref([])
const search = () => {
    if (topicId.value) {
        searchByTopic()
    } else if (years.value.length === 0 && journals.value.length === 0 && fields.value.length === 0) {
        generalSearch()
    } else {
        advancedSearch()
    }
}
const generalSearch = async () => {
    isLoading.value = true
    try {
        await axios.post(SEARCH_API, {
            searchContent: searchContent.value,
            isFiltered: false,
            option: option.value,
            sortBy: sortBy.value,
            pageSize: pageSize.value,
            currentPage: currentPage.value,
        }).then(response => {
            if (response.status == 200) {
                // console.log("初级", response.data);
                menuItems.value[0].contents = response.data.years
                menuItems.value[1].contents = response.data.fields
                menuItems.value[2].contents = response.data.journals.filter(content => content != null && content !== '')
                searchItems.value = response.data.papers
                totalPages.value = response.data.totalPages
                totalEntries.value = response.data.totalEntries
            } else {
                console.error("搜索失败:", response.data.message)
            }
            isLoading.value = false
        })
    } catch (error) {
        console.error('请求失败:', error)
    }
}

const searchByTopic = async () => {
    isLoading.value = true
    let orderBy = ''
    let desc = false
    if (sortBy.value === 2) {
        orderBy = "publishYear"
        desc = false
    } else if (sortBy.value === 3) {
        orderBy = "publishYear"
        desc = true
    } else if (sortBy.value === 4) {
        orderBy = "citation"
        desc = false
    } else if (sortBy.value === 5) {
        orderBy = "citation"
        desc = true
    }
    try {
        await axios.get(SEARCH_TOPIC_API, {
            params: {
                topicID: topicId.value,
                page: currentPage.value,
                pageSize: pageSize.value,
                orderBy: orderBy,
                desc: desc,
            }
        }).then(response => {
            if (response.status == 200) {
                console.log("搜索Topic:", response.data)
                totalPages.value = response.data.totalPage
                totalEntries.value = response.data.totalElements

                const journalSet = new Set();
                const fieldSet = new Set();

                searchItems.value = response.data.view.map((item) => {
                    const parsedFields = JSON.parse(item.fos);
                    const parsedAuthors = JSON.parse(item.authors).map(author => author.author.display_name);
                    if (item.venue) journalSet.add(item.venue);
                    parsedFields.forEach(field => fieldSet.add(field));
                    // 返回转换后的结构
                    return {
                        id: item.id,
                        title: item.title,
                        authors: parsedAuthors,
                        abstract: item.summary || "",
                        citationCount: item.citation,
                        year: item.publishYear,
                        journal: item.venue || "",
                        fields: parsedFields
                    }
                })
                menuItems.value[1].contents = Array.from(fieldSet)
                menuItems.value[2].contents = Array.from(journalSet)
            } else {
                console.error("搜索Topic失败:", response.data.message)
            }
            isLoading.value = false
        })
    } catch (error) {
        console.error('请求失败:', error)
    }
}

const isLoading = ref(false)
const advancedSearch = async () => {
    isLoading.value = true
    try {
        await axios.post(SEARCH_API, {
            searchContent: searchContent.value,
            isFiltered: true,
            option: option.value,
            sortBy: sortBy.value,
            pageSize: pageSize.value,
            currentPage: currentPage.value,
            years: years.value,
            journals: journals.value,
            fields: fields.value
        }).then(response => {
            if (response.status == 200) {
                // console.log("高级", response.data);
                searchItems.value = response.data.papers
                totalPages.value = response.data.totalPages
                totalEntries.value = response.data.totalEntries
            } else {
                console.error("筛选失败:", response.data.message)
            }
            isLoading.value = false
        })
    } catch (error) {
        console.error('请求失败:', error)
    }
}
</script>

<style scoped>
@import "../../assets/theme-colors.css";

* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#search-root {
    margin: 0 50px;
}

#mid {
    display: flex;
    margin: 30px auto;
    position: relative;
}

.left-bar {
    position: sticky;
    top: 30px;
    margin-top: 20px;
    width: 20%;
    overflow: hidden;
    height: 100%;
}

.left-bar.collapsed {
    width: 0%;
}

.left-expand {
    position: sticky;
    top: 31px;
    margin-top: 21px;
    width: 20px;
    height: 44px;
    background-color: var(--expand-button-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;

    &:hover {
        background-color: var(--expand-button-hover-color);
    }
}

.main {
    width: 75%;
    min-height: 80vh;
    margin: 0 auto;
    position: relative;

    &.collapsed {
        width: 95%;
    }

    .page {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
    }
}

/* 进度条样式 */
.progress-bar {
    width: 100%;
    height: 5px;
    background-color: #ddd;
    border-radius: 2px;
    position: sticky;
    top: 0;
    z-index: 100;
}

.progress-bar::after {
    content: '';
    width: 50%; /* 进度条的宽度 */
    height: 100%;
    background-color: #6db2f4;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 0;
    animation: loading 2s infinite linear;
}

@keyframes loading {
    0% {
        width: 0%;
    }
    50% {
        width: 50%;
    }
    100% {
        width: 100%;
    }
}
</style>
