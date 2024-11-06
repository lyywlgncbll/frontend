<template>
    <div class="SearchBox">
        <SearchBar @search="search" placeholder="输入学者关键字" :SearchType="searchType" width="300px"/>
    </div>
    
</template>
<script>
    import SearchBar from '../components/SearchBox.vue';
export default{
    data(){
        return{
            searchType:"User",
        }
    },
    components:{
        SearchBar
    },
    methods:{
        search(keyword){
            console.log('search',keyword)
        }
    }
}
</script>
<style scoped>
.SearchBox {
    position: relative;
    left: 50%;
    top: 20px;
    right: 30%;
}
</style>