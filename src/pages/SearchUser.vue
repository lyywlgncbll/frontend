<template>
    <div id="SearchBox">
        <SearchBox @search="search" placeholder="输入学者关键字" :SearchType="searchType" width="300px"/>
    </div>
    <div id="search-body">
        <div id="mid">
            <div class="left-bar">
                <searchBar />
            </div>
            <div class="main">
                <div class="userList">
                    <div
                    class="userItem"
                    v-for="userItem in userList"
                    :key="userItem.id"
                    @click="selectUser(userItem)"
                    >
                    <img  :src="userItem.avatar" :alt="userItem.name" class="userItem-avatar">
                    <div class="userItem-info">
                        <span class="userItem-name">{{ userItem.name }}</span>
                        <span class="userItem-institution">{{ userItem.institution }}</span>
                        <div>
                            <span v-for="(domainItem, index) in userItem.domain" :key="index">
                                <span class="userItem-domain">{{ domainItem }}</span>
                                <template v-if="index < userItem.domain.length - 1"> / </template>
                            </span>
                        </div>
                    </div>
                    <button class="userItem-button" @click="handleButtonClick(userItem)">关注</button>
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
            userList:[]
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
                domain:["Cell biology","Biology","Large Language Model","DNA methylation","length test"]},
                {id:"2", name:"test user", institution:"BeiHang University",
                avatar:"./src/assets/avatar.jpg",
                domain:["Rag","VA"]},
                {id:"3", name:"just a name", institution:"BeiHang University",
                avatar:"./src/assets/avatar.jpg",
                domain:["LLM","DNA methylation"]}]
        },
        selectUser(user){
            console.log(user)
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
}


.left-bar{
    width: 20%;
    height: 90%;
}

.main{
    width: 75%;
    height: auto;
    margin: 0 auto;
    border: 1px solid black;
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
    cursor: pointer;
}
 
.userItem-avatar {
    width: 10%;
    height: 10%;
    border-radius: 50%;
    margin-right: 5%;
    margin-left: 2%;
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
}
.userItem-institution {
    font-size: 100%;
    margin-top: 1%;
}
.userItem-domain{
    font-size: 100%;
    color: rgba(7, 143, 201, 0.822);
}
.userItem-button {
    position: flex;   
    margin-top: 5%; 
    margin-right: 1%; /* 距离右侧的距离 */
    padding: 5px 10px;
    font-size: 12px;
    background-color: #0073e6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>