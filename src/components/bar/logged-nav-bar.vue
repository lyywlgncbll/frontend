<script>
import {ref} from "vue"
import { Search } from '@element-plus/icons-vue'
export default {
  computed: {
    Search() {
      return Search
    }
  },
  components:{
    Search
  },
  data(){
    const searchInput=ref('');
    return{
      indexLink: {
        type: String,
        default: '#/'
      },
      searchInput,

    }
  }
}

</script>

<template>
  <header>
    <nav class="nav-bar">
      <!--左边的logo-->
      <a :href="indexLink"><img src="../../assets/logo/CCBridge_White.svg" alt="" class="logo"></a>
      <!--搜索栏-->
<!--      <el-input-->
<!--          v-model="searchInput"-->
<!--          style="width: 240px"-->
<!--          size="large"-->
<!--          placeholder="Please Input"-->
<!--          :suffix-icon="Search"-->
<!--      />-->
      <el-input
          v-model="searchInput"
          style="max-width: 600px ;border: transparent"
          placeholder="Type  /  to search"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 115px;color: #4caf50" class="selector">
            <el-option label="Restaurant" value="1" />
            <el-option label="Order No." value="2" />
            <el-option label="Tel" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search"/>
        </template>
      </el-input>
    </nav>
  </header>

</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: transparent;
}
header.nav-bar{
  display: flex;
  flex-direction: row;

}
.input-with-select{
  border: 1px solid #ccc; /* 添加边框 */
  background-color: #f9f9f9; /* 设置背景颜色 */
  border-radius: 0px; /* 添加圆角 */
  //padding: 4px;
  .selector{
    background-color: black; /* 按钮背景色 */
    color: blue; /* 按钮文字颜色 */
    border-radius: 4px; /* 按钮圆角 */
    //padding: 6px 12px;
    :hover{
      background-color: #66b1ff; /* 悬停状态背景色 */
    }
  }
}
</style>