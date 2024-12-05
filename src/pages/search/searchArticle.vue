<template>
    <logged-nav-bar class="nav-bar" />
    <div id="search-body">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <!-- <div class="confirm" @click="sendFilter">
                确认
            </div> -->
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchBar :isExpand="isExpand" :menuItems="menuItems" @selectionChanged="handleFilter">
                </searchBar>
            </div>

            <div :class="{ main: true, collapsed: !isExpand }">
                <searchNav></searchNav>
                <searchItem v-for="(searchItem, index) in searchItems" :searchItem="searchItem" :key="index"
                    @openClaimForm="showClaimForm">
                </searchItem>
                <div class="null" v-if="searchItems.length == 0">未搜索到结果</div>
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
import { ref, onMounted } from 'vue';
import ClaimForm from '/src/components/search/ClaimForm.vue';
import searchBar from '/src/components/search/searchBar.vue';
import searchItem from '/src/components/search/searchItem.vue';
import pageComponent from '/src/components/pageComponent.vue';
import loggedNavBar from '/src/components/bar/logged-nav-bar.vue';
import searchNav from '@/components/search/searchNav.vue';
import axios from 'axios';
import { ARTICLESEARCH_API } from '@/utils/request.js'
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
const totalPage = ref(100)
const pageSize = ref(7)

//获取筛选数据
const handleFilter = (selections) => {
    years.value = selections.years
    journals.value = selections.journals
    fields.value = selections.fields
}

const searchContent = ref("english")
const isFiltered = ref(false)
const option = ref(1)
const sortBy = ref(1)
const years = ref([])
const journals = ref([])
const fields = ref([])
const search = async () => {
    try {
        await axios.post('/api/academic/searchPublications', {
            searchContent: searchContent.value,
            isFiltered: true,
            option: 1,
            sortBy: 1,
            pageSize: pageSize.value,
            currentPage: currentPage.value,
        }).then(response => {
            if (response.status == 200) {
                console.log(response.data);
                menuItems.value[0].contents = response.data.years
                menuItems.value[1].contents = response.data.fields
                menuItems.value[2].contents = response.data.journals
                searchItems.value = response.data.papers
            }
        })

    } catch (error) {
        console.error('Error fetching data:', error)
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
                console.log(response.data);
                searchItems.value = response.data.papers
            }
        })

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    search()
})
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
    display: flex;
    margin: 30px auto;
    position: relative;
}

.left-bar {
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
    width: 20px;
    height: 44px;
    position: absolute;
    background-color: #92979e;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    left: -21px;
    top: 21px;
}

.confirm {
    font-size: 11px;
    text-align: center;
    width: 20px;
    height: 44px;
    position: absolute;
    background-color: #92979e;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    left: -21px;
    top: 70px;
    color: white;
}

.left-expand:hover,
.confirm:hover {
    background-color: #6f6f6f;
}

.main {
    width: 75%;
    height: 100%;
    margin: 0 auto;
    transition: all 0.3 ease;

    .null {
        width: 100%;
        height: 70vh;
        text-align: center;
    }

    &.collapsed {
        width: 90%;
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
            color: grey;
        }
    }
}
</style>
