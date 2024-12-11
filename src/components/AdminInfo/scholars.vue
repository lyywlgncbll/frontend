<template>
  <div class="menu-container">
    <div class="title">
      当前共有 <span class="userCountClass">{{ userCount }}</span> 名学者入驻
    </div>
    <scholarsTable class="scholarsTable" :tableData="tableData" @name-clicked="handleNameClick" />
    <div style="text-align: center; margin-top: 1%;" >
      <pageComponent class="pageComponent" v-model:currentPage="currentPage" v-model:totalPage="totalPage"
        @update:currentPage="updatePage" />
    </div>
  </div>

</template>
<script>
import scholarsTable from './scholarsComponent/scholarsTable.vue';
import pageComponent from '../search/pageComponent.vue';
import axios from "@/utils/axios";
import { SCHOLARSCOUNT_API, GETSCOLARS_API } from '@/utils/request.js'
export default {
  data() {
    return {
      userCount: 0,
      currentPage: 1,
      totalPage: 7,
      pageSize: 5,
      tableData: []
    };
  },
  components: {
    scholarsTable,
    pageComponent
  },
  created() {
    this.currentPage = 1;
    try {
      axios.get(SCHOLARSCOUNT_API).then(response => {
        if (response.status === 200) {
          this.userCount = response.data;
        }
      });
      this.updateContent();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    updatePage(page) {
      this.currentPage = page;
      this.updateContent();
    },
    updateContent() {
      try {
        axios.get(GETSCOLARS_API, {
          params: {
            pageSize: this.pageSize,
            page: this.currentPage
          }
        }).then(response => {
          if (response.status === 200) {
            this.totalPage = response.data.totalPage;
            const backendData = response.data.view;
            this.tableData = backendData.map(item => ({
              id: item.user.id,
              name: item.authorName || '未知',
              mail: item.user.mail || '无邮箱',
              institution: item.org || '未知机构',
              createTime: this.formatDate(item.registerDate) || '未知日期',
              articleCount: item.publicationsCount || 0
            }));
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(isoString) {
      if (!isoString) return null;
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return null;
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    handleNameClick(row) {
      //跳转到学者主页
      console.log('Clicked on name:', row);
    },
  }
}
</script>
<style scoped>
.menu-container {
  height: 700px;
  display: flexbox;
  width: 90%;
  justify-content: flex-start;
  padding: 50px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.userCountClass {
  font-size: 30px;
  font-weight: 600;
}

.scholarsTable {
  margin-top: 20px;
}

.pageComponent {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>