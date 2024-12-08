<template>
    <div style="display: inline-flex" >
        <el-input
        v-model="keyword"
        :placeholder="placeholder"
        :style="{ width: width, marginRight: '10px' }"
        clearable
        @keydown.enter.native="search"></el-input>
        <el-button
        type="primary"
        @click="search">
        搜索
        <img src="/src/assets/search/icon/search.svg" class="searchIcon" >
        </el-button>
    </div>
</template>
<script>
    export default{
        name: "Search",
        props:{
            placeholder:{
                type:String,
                default: ''
            },
            SearchType:{
                type:String
            },
            width: {
                type: String,
                default: '500px' 
            }
        },
        data(){
            return {
                keyword:''
            }
        },
        methods:{
            search(){
                // console.log('search',this.keyword,this.SearchType)
                //子节点进行搜索
                this.$emit("search",this.keyword)
                //父节点进行搜索
            }
        }
    }
</script>
<style scoped>
.searchIcon{
    margin-left: 7%;
    width: 17px;
    height: 17px;
}
</style>
//搜索方法：search,输入文本框宽度：width,提示词：placeholder,