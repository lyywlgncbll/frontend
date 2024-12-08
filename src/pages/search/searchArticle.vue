<template>
    <loggedNavBar class="nav-bar" />
    <div id="search-root">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchFilter :isExpand="isExpand" :menuItems="menuItems" @selectionChanged="handleFilter">
                </searchFilter>
            </div>

            <div :class="{ main: true, collapsed: !isExpand }">
                <searchNav @sortChanged="handleSort" :num="num"></searchNav>
                <searchTopic></searchTopic>
                <searchItem v-for="(searchItem, index) in searchItems" :searchItem="searchItem" :key="index"
                    @openClaimForm="showClaimForm">
                </searchItem>
                <div class="page">
                    <pageComponent v-model:currentPage="currentPage" v-model:totalPage="totalPage"
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
import { ref, onMounted, watch } from 'vue';
import ClaimForm from '/src/components/search/ClaimForm.vue';
import searchFilter from '/src/components/search/searchFilter.vue';
import searchItem from '/src/components/search/searchItem.vue';
import pageComponent from '/src/components/pageComponent.vue';
import loggedNavBar from '/src/components/bar/logged-nav-bar.vue';
import searchNav from '@/components/search/searchNav.vue';
import searchTopic from '@/components/search/searchTopic.vue';
import axios from '@/utils/axios';
import { SEARCH_API } from '../../utils/request.js'

const searchContent = ref("learning")
const option = ref(2)
onMounted(() => {
    searchContent.value = localStorage.getItem('searchString')
    option.value = Number(localStorage.getItem('searchOption'))
    // console.log(searchContent.value, option.value);
    search()
})

//侧边栏是否展开
const isExpand = ref(true)
const expandBar = () => {
    isExpand.value = !isExpand.value
}

const menuItems = ref([
    { id: 'years', title: '时间', contents: [] },
    { id: 'fields', title: '领域', contents: [] },
    { id: 'journals', title: '期刊', contents: [] },
    { id: 'authors', title: '作者', contents: [] }
])

const searchItems = ref([])

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
const totalPage = ref(5)
const pageSize = ref(7)

//获取筛选数据
const handleFilter = (selections) => {
    years.value = selections.years
    journals.value = selections.journals
    fields.value = selections.fields
    advancedSearch()
}

//获取排序方式
const handleSort = (sort) => {
    sortBy.value = sort
    search()
    // advancedSearch()
}

watch(currentPage, () => {
    console.log(currentPage.value);
    search()
    // advancedSearch()
})

const sortBy = ref(1)
const years = ref([])
const journals = ref([])
const fields = ref([])
const num = ref(0)
const search = async () => {
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
                menuItems.value[0].contents = response.data.years
                menuItems.value[1].contents = response.data.fields
                menuItems.value[2].contents = response.data.journals.filter(content => content != null && content !== '')
                searchItems.value = response.data.papers
            } else {
                console.error("搜索失败:", response.data.message)
            }
        })
    } catch (error) {
        console.error('请求失败:', error)
    }
}

const advancedSearch = async () => {
    try {
        await axios.post('/api/academic/searchPublications', {
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
                searchItems.value = response.data.papers
            }else{
                console.error("筛选失败:", response.data.message)
            }
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
    transition: all 1s ease;
}

.left-bar {
    position: sticky;
    top: 30px;
    margin-top: 20px;
    width: 20%;
    overflow: hidden;
    height: 100%;
    transition: all .1s ease;
}

.left-bar.collapsed {
    width: 0;
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

    &:hover {
        background-color: var(--expand-button-hover-color);
    }
}

.main {
    width: 75%;
    min-height: 80vh;
    margin: 0 auto;
    transition: all 0.3 ease;
    position: relative;

    .null {
        width: 100%;
        height: 70vh;
        text-align: center;
    }

    &.collapsed {
        width: 90%;
    }

    .page {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
    }
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

        .close {
            font-size: 22px;
            font-weight: 500;
            position: absolute;
            top: 8px;
            right: 20px;
            cursor: pointer;
            color: var(--expand-button-background-color);
        }
    }
}
</style>
