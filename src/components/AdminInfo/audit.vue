<template>
  <div class="menu-container">
    <div class="title">
      <button class="titleButton" v-on:click="handleAcceptSelected"> 通过已选</button>
      <button class="titleButton" v-on:click="handleRejectedSelected">拒绝已选</button>
    </div>
    <div class="select-menu-pos">
      <selectMenu @updateTableTo="updateTableTo" />
    </div>
    <el-empty v-if="this.tableData.length === 0" :image-size="230" description="暂无数据"></el-empty>
    <div v-else>
      <div class="claimTable-pos">
        <claimTable ref="claimTable" :tableData="tableData" :batchAction="handleBatchAction"
          @name-clicked="handleNameClick" />
      </div>
      <pageComponent class="pageComponent" v-model:currentPage="currentPage" v-model:totalPage="totalPage"
        @update:currentPage="updatePage" />
    </div>
  </div>
</template>
<script>
import selectMenu from './auditComponent/selectMenu.vue';
import claimTable from './auditComponent/claimTable.vue'
import pageComponent from '../search/pageComponent.vue';
import axios from "@/utils/axios";
import { GETCLAIMALL_API, GETUSER_API } from '@/utils/request.js'

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      totalPage: 1,
      pageSize: 5,
      filterStatus: "pending_only",
    };
  },
  components: {
    selectMenu,
    claimTable,
    pageComponent
  },
  created() {
    const savedState = sessionStorage.getItem('pageState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.currentPage = parsedState.currentPage || this.currentPage;
      this.filterStatus = parsedState.filterStatus || this.filterStatus;
    }
    this.getClaim();
  },
  beforeRouteLeave(to, from, next) {
    this.saveState();
    next();
  },
  methods: {
    saveState(){
      const state = {
        currentPage: this.currentPage,
        filterStatus: this.filterStatus
      };
      sessionStorage.setItem('pageState', JSON.stringify(state));
    },
    getClaim() {
      try {
        axios.get(GETCLAIMALL_API, {
          params: {
            pageSize: this.pageSize,
            page: this.currentPage,
            queryMode: this.filterStatus
          }
        }).then(response => {
        console.log(response.data)
          if (response.status === 200) {
            this.tableData = response.data.view;
            this.totalPage = response.data.totalPage;
          }
        }).then(() => {
          this.updateAllUser();
        });
      } catch (error) {
        console.error('update failed:', error);
      }
      //调用接口获取数据
    },
    async updateAllUser() {
      this.tableData.map(async (claim) => {
        const user = await this.getUser(claim.claim.userID);
        try {
          axios.get(GETUSER_API, {
            params: {
              userID: claim.claim.userID
            }
          }).then(response => {
            if (response.status === 200) {
              claim.name = response.data.name;
            }
          });
        } catch (error) {
          console.error('update failed:', error);
        }
      })
    },
    async getUser(userID) {
      try {
        axios.get(GETUSER_API, {
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
    updateTableTo(status) {
      this.filterStatus = this.getFilterStatus(status);
      this.getClaim();
      //更新（搜索）指定状态的表单
    },
    handleAcceptSelected() {
      this.handleBatchAction("ACCEPTED");
    },
    handleRejectedSelected() {
      this.handleBatchAction("REJECTED");
    },
    handleNameClick(row) {
      console.log('Clicked on name:', row);
    },
    getFilterStatus(status) {
      switch (status) {
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
      this.getClaim();
    },
  }
}
</script>
<style scoped>
.menu-container {
  position: relative;
  height: 620px;
  width: 90%;
  padding: 50px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.titleButton {
 appearance: none;
 background-color: transparent;
 border: 0.125em solid #9e9e9e;
 border-radius: 0.9375em;
 box-sizing: border-box;
 color: #3B3B3B;
 cursor: pointer;
 display: inline-block;
 font-size: 16px;
 font-weight: 500;
 line-height: normal;
 margin: 5px;
 min-width: 0;
 outline: none;
 padding: 3px 15px;
 text-align: center;
 text-decoration: none;
 transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 will-change: transform;
}

.titleButton:disabled {
 pointer-events: none;
}

.titleButton:hover {
 color: #fff;
 background-color:  rgb(99, 99, 99);
 transform: translateY(-2px);
}

.titleButton:active {
 box-shadow: none;
 transform: translateY(0);
}

.select-menu-pos {
  position: absolute;
  right: 50px;
  top: 50px;
}

.selected-label {
  margin-right: 10px;
}

.claimTable-pos {
  margin: 20px 0px;
}

.pageComponent {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>