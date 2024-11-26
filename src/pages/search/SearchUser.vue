<template>
    <div id="SearchBox">
        <SearchBox @search="search" placeholder="输入学者关键字" :SearchType="searchType" width="300px"/>
    </div>
    <div id="search-body">
        <div id="mid">
            <div class="left-expand" @click="expandBar">
                <img src="/src/assets/search/icon/down-expand.svg" class="icon" width="15px" height="15px"
                    :style="{ transform: isExpand ? 'rotate(90deg)' : 'rotate(270deg)' }">
            </div>
            <div class="left-bar" :class="{ collapsed: !isExpand }">
                <searchBar :isExpand="isExpand" :menuItems="updatedMenuItems" @filtersChanged="applyFilters" ></searchBar>
            </div>
            <div class="main">
                <div class="userList">
                    <div
                    class="userItem"
                    v-for="userItem in searchUserList"
                    :key="userItem.id"
                    >
                    <img  @click="selectUser(userItem)" :src="userItem.avatar" :alt="userItem.name" class="userItem-avatar">
                    <div class="userItem-info">
                        <span @click="selectUser(userItem)" class="userItem-name">{{ userItem.name }}</span>
                        <span class="userItem-mail">{{ userItem.mail }}</span>
                        <span class="userItem-institution">{{ userItem.institution }}</span>
                        <div>
                            <span v-for="(fieldsOfStudyItem, index) in userItem.fieldsOfStudy" :key="index">
                                <span class="userItem-fieldsOfStudy">{{ fieldsOfStudyItem }}</span>
                                <template v-if="index < userItem.fieldsOfStudy.length - 1"> / </template>
                            </span>
                        </div>
                        <div class="line"></div>
                        <span class="userItem-description">{{ userItem.description }}</span>
                    </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1%;">
                    <pageComponent
                    class="pageComponent"
                    v-model:currentPage="currentPage"
                    v-model:totalPage="totalPage"
                    @update:currentPage="updatePage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchBox from '../../components/SearchBox.vue';
    import searchBar from '../../components/searchBar.vue';
    import pageComponent from '../../components/pageComponent.vue';
    import {useRouter} from "vue-router";
    import axios from 'axios';
    import {USERSEARCH_API ,USERAVATOR_API} from "~/utils/request.js";
    import PageComponent from '../../components/pageComponent.vue';
export default{
    data(){
        return{
            searchType:"User",
            keyword:"",
            searchUserList:[
                {id:"1", name:"off-fu", institution:"BeiHang University",
                mail:"123456@qq.com",
                avatar:"/src/assets/avatar.jpg",
                fieldsOfStudy:["Cell biology","Biology","Large Language Model","DNA methylation","length test"],
                description:"这是一段个人简介"},
                {id:"2", name:"test user", institution:"TsingHua University",
                mail:"123456@qq.com",
                avatar:"/src/assets/avatar.jpg",
                fieldsOfStudy:["Rag","VA"],
                description:"这是一段个人简介"},
                {id:"3", name:"just a name", institution:"BeiHang University",
                mail:"123456@qq.com",
                avatar:"/src/assets/test.jpg",
                fieldsOfStudy:["LLM","DNA methylation"],
                description:"这是一段个人简介"},
            ],
            filterUserList:[],
            isExpand:true,
            menuItems:[
                { id: 'institution', title: '机构', contents: ['BeiHang University','TsingHua University'] },
                { id: 'fieldsOfStudy', title: '领域', contents: ['Cell biology', 'VA', 'DNA methylation'] },
                ],
            filters:{
                time: [],
                theme: [],
                source: [],
                institution: [],
                fieldsOfStudy: []
            },
            currentPage:1,
            totalPage:100,
            pageSize:1,
        }
    },
    components:{
        SearchBox,
        searchBar,
        axios,
        pageComponent
    },
    computed:{
        filterUserList(){
            return this.searchUserList.filter(item => {
                return Object.keys(this.filters).every(categoryId => {
                const filterValues = this.filters[categoryId] || [] // 默认值为空数组
                    if (filterValues.length === 0) return true // 条件为空时不过滤
                    if (categoryId === 'institution') return filterValues.includes(item.institution)
                    if (categoryId === 'fieldsOfStudy') return filterValues.some(label => item.fieldsOfStudy.includes(label))
                    return true
                })
            })
        },
        updatedMenuItems(){
            return this.menuItems.map(menuItem => {
            const contents = new Set() // 使用 Set 来确保唯一值
            this.searchUserList.forEach(item => {
            if (menuItem.id === 'institution' && item.institution) contents.add(item.institution)
            if (menuItem.id === 'fieldsOfStudy' && item.fieldsOfStudy) item.fieldsOfStudy.forEach(fieldsOfStudy => contents.add(fieldsOfStudy))
        })
        return { ...menuItem, contents: Array.from(contents) }
    })
    }
    },
    methods:{
        async updateAllAvatars() {
            console.log(this.searchUserList)
            console.log("start")
            const promises = this.searchUserList.map(async (user) => {
                const avatar = await this.fetchAvatar(user.id);
                if (avatar) {
                    user.avatar = avatar;
                }
            })
        },
        async search(keyword){
            this.keyword = keyword;
             try {
                await axios.get(USERSEARCH_API, {
                params: {
                    keyword: keyword,
                    pageSize: this.pageSize,
                    page: 1
                }
                }).then(response => {
                if (response.status === 200){
                    this.searchUserList = response.data.view;
                    this.currentPage = response.data.currentPage;
                    this.totalPage = response.data.totalPage;
                } 
                }).then(()=>{
                    this.updateAllAvatars();
                });
            } catch (error) {
                console.error('Search failed:', error);
            }
        },
        async fetchAvatar(userId) {
            console.log("start2")
            try {
                const response = await axios.get(USERAVATOR_API, {
                params: {
                    id: userId,
                }
                });
                return `data:image/png;base64,${response.data}`;
            } catch (error) {
                console.error(`Failed to fetch avatar for user ${userId}:`, error);
                return null;
            }
        },
    
        expandBar(){
            this.isExpand = this.isExpand ? false : true
        },
        applyFilters(newFilters){
            this.filters = newFilters
        },
        updatePage(page){
            try {
                axios.get(USERSEARCH_API, {
                params: {
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                    page: page
                }
                }).then(response => {
                if (response.status === 200){
                    this.searchUserList = response.data.view;
                    this.currentPage = response.data.currentPage;
                }
                }).then(()=>{
                    this.updateAllAvatars();
                });
            } catch (error) {
                console.error('Search failed:', error);
            }
        },
        selectUser(userItem){
            console.log(userItem);
        }
    }
}
</script>
<style scoped>
#SearchBox {
    position: relative;
    margin-left: 40%;
    top: 20px;
}
#search-body {
    margin: 0 50px;
}

#mid{
    height: 100vh;
    display: flex;
    margin: 30px auto;
    position: relative;
}


.left-bar{
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
.main{
    width: 75%;
    height: auto;
    margin: 0 auto;
    /* border: 1px solid black; */
}
.userList {
    list-style: none;
    padding: 0;
    margin: 0;
}
 
.userItem {
    
    display: flex;
    align-items: center;
    padding: 1%;
    border-bottom: 1px solid #eee;
    position: relative;
    border: 1px solid grey;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    margin-top: 2%;
}
 
.userItem-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: -5%;
    margin-right: 5%;
    margin-left: 2%;
    cursor: pointer;
}
 
.userItem-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}
 
.userItem-name {
    font-size: 125%;
    font-weight: bold;
    margin-top: 1%;
    cursor: pointer;
}
.userItem-institution {
    font-size: 100%;
    margin-top: 1%;
}
.userItem-mail{
    font-size: 95%;
    color: rgba(139, 158, 166, 0.822);
}
.userItem-fieldsOfStudy{
    font-size: 100%;
    color: rgba(7, 143, 201, 0.822);
}
.line {
    width: 100%;
    height: 1px;
    border: 1px solid rgb(181, 180, 180);
    margin: 15px auto;
}
.userItem-description {
    margin: 5px auto;
    width: 100%;
    height: 50px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>