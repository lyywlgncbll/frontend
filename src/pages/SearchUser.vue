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
                <searchBar :isExpand="isExpand"></searchBar>
            </div>
            <div class="main">
                <div class="userList">
                    <div
                    class="userItem"
                    v-for="userItem in userList"
                    :key="userItem.id"
                    >
                    <img  @click="selectUser(userItem)":src="userItem.avatar" :alt="userItem.name" class="userItem-avatar">
                    <div class="userItem-info">
                        <span @click="selectUser(userItem)" class="userItem-name">{{ userItem.name }}</span>
                        <span class="userItem-institution">{{ userItem.institution }}</span>
                        <div>
                            <span v-for="(domainItem, index) in userItem.domain" :key="index">
                                <span class="userItem-domain">{{ domainItem }}</span>
                                <template v-if="index < userItem.domain.length - 1"> / </template>
                            </span>
                        </div>
                        <div class="line"></div>
                        <span class="userItem-introduction">{{ userItem.introduction }}</span>
                    </div>
                    <div></div>
                    </div>
                </div>
                <div>       
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchBox from '../components/SearchBox.vue';
    import searchBar from '../components/searchBar.vue';
export default{
    data(){
        return{
            searchType:"User",
            userList:[],
            isExpand:true
        }
    },
    components:{
        SearchBox,
        searchBar
    },
    methods:{
        async search(keyword){
            console.log('search',keyword)
            this.userList = [
                {id:"1", name:"off-fu", institution:"BeiHang University",
                avatar:"./src/assets/avatar.jpg",
                domain:["Cell biology","Biology","Large Language Model","DNA methylation","length test"],
                introduction:"这是一段个人简介"},
                {id:"2", name:"test user", institution:"BeiHang University",
                avatar:"./src/assets/avatar.jpg",
                domain:["Rag","VA"],
                introduction:"这是一段个人简介"},
                {id:"3", name:"just a name", institution:"BeiHang University",
                avatar:"./src/assets/test.jpg",
                domain:["LLM","DNA methylation"],
                introduction:"这是一段个人简介"},]
        },
        selectUser(user){
            console.log(user)
        },
        expandBar(){
            this.isExpand = this.isExpand ? false : true
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
.userItem-domain{
    font-size: 100%;
    color: rgba(7, 143, 201, 0.822);
}
.line {
    width: 100%;
    height: 1px;
    border: 1px solid rgb(181, 180, 180);
    margin: 15px auto;
}
.userItem-introduction {
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