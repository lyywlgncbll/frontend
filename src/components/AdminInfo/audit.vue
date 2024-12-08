<template>
    <div class="menu-container">
      <div class="title">
        <button class="titleButton" v-on:click="handleAcceptSelected"> 一键通过</button>
        <button class="titleButton" v-on:click="handleRejectedSelected">一键拒绝</button>  
        <div class="select-menu-pos">
          <div class="select-menu"> <selectMenu @updateTableTo="updateTableTo"/></div>
        </div>
      </div>  
      
      <div class="claimTable-pos">
          <claimTable ref="claimTable" :tableData="tableData" :batchAction="handleBatchAction" @name-clicked="handleNameClick"/>
      </div>
      <div style="text-align: center; margin-top: 1%;">
        <pageComponent class="pageComponent" v-model:currentPage="currentPage"
            v-model:totalPage="totalPage" @update:currentPage="updatePage" />
      </div>
    </div>
</template>
<script>
import selectMenu from './auditComponent/selectMenu.vue';
import claimTable from './auditComponent/claimTable.vue'
import pageComponent from '../pageComponent.vue';
import axios from "@/utils/axios";
import { GETCLAIMALL_API, GETUSER_API } from '@/utils/request.js'
import { use } from 'echarts';

export default{
  data(){
    return {
      tableData: [],
      currentPage: 1,
      totalPage: 7,
      pageSize: 6,
      filterStatus: "pending_only",
    };
  },
  components:{
    selectMenu,
    claimTable,
    pageComponent
  },
  created(){
    this.getClaim();
  },
  methods:{
    getClaim(){
      try {
          axios.get(GETCLAIMALL_API,{
            params: {
                keyword: this.keyword,
                pageSize: this.pageSize,
                page: this.currentPage,
                queryMode: this.filterStatus
              }
            }).then(response => {
              if (response.status === 200) {
                this.tableData = response.data.view;
                this.totalPage = response.data.totalPage;
              }
          }).then(()=>{
              this.updateAllUser();
          });
        } catch (error) {
            console.error('update failed:', error);
        }
      //调用接口获取数据
    },
    async updateAllUser(){
      const promises = this.tableData.map(async (claim) => {
        const user = await this.getUser(claim.claim.userID);
        try{
          axios.get(GETUSER_API,{
            params: {
              userID: claim.claim.userID
              }
            }).then(response => {
              if (response.status === 200) {
                claim.user = response.data;
              }
          });
        } catch (error) {
          console.error('update failed:', error);
        }
      })
    },
    async getUser(userID){
      try {
          axios.get(GETUSER_API,{
            params: {
              userID: userID
              }
            }).then(response => {
              if (response.status === 200) {
                return response.data;
              }
          });
        } catch (error) {
          console.error('update failed:', error);
        }
    },
    updateTableTo(status){
      this.filterStatus = this.getFilterStatus(status);
      this.getClaim();
      //更新（搜索）指定状态的表单
    },
    handleAcceptSelected(){
      this.handleBatchAction("ACCEPTED");
    },
    handleRejectedSelected(){
      this.handleBatchAction("REJECTED");
    },
    handleNameClick(row) {
      console.log('Clicked on name:', row);
    },
    getFilterStatus(status){
      switch(status){
        case "pending":
          return "pending_only";
        case "accepted":
          return "accepted_only";
        case "rejected":
          return "rejected_only";
        case "all":
          return "all";
      }
    },
    handleBatchAction(status) {
      if (this.$refs.claimTable) {
        this.$refs.claimTable.handleSelectedRows(status);
      }
    },
    updatePage(page) {
      // 切页
    },
  }
}
</script>
<style scoped>
.menu-container {
  display: flexbox;
  width: 90%;
  justify-content: flex-start;
  padding: 50px;
  border: 2px solid #ccc; /* 设置边框 */
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影 */
}
.title{
  display: flex;
}
.titleButton{
  border: 2px solid #ccc; /* 设置边框 */
  padding: 0px 10px; /* 调整上下和左右的内边距 */
  margin: 2px;
  font-size: medium;
  font-weight: 200;
}
.titleButton:hover {
  background-color: #f0f0f0; /* Green */
}
.select-menu-pos{
  position: fixed;
  height: auto;
  right: 12%;
}
.select-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid var(--bar-border-color);
  padding: 8px 12px;
  background-color: transparent;
  transition: 0.3s ease;
  color:var(--bar-font-color);
  width: 25%;
  max-width: 90px;
  min-width: 80px;
}
.select-menu:hover{
  transition: background-color 0.3s ease;
  background-color: var(--button-hover-color);
}

.selected-label {
  margin-right: 10px;
}
.claimTable-pos{
  margin: 50px 0px;
}
.pageComponent{
  position: absolute;
  left: 50%;
  /* transform: translateX(-50%); */
}
</style>