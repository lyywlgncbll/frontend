<template>
    <div class="container">
      <!-- 认领请求弹窗 -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <h3 class="modal-title">搜索并选择认领对象</h3>
  
          <!-- 搜索输入框 -->
          <input 
            type="text" 
            v-model="searchQuery" 
            class="modal-input" 
            placeholder="请输入对象名称" />
          <!-- 搜索按钮 -->
          <button @click="filterClaims" class="search-button">搜索</button>
  
          <!-- 显示搜索结果 -->
          <div v-if="filteredClaims.length > 0" class="results-container">
            <ul>
              <li v-for="(claim, index) in filteredClaims" :key="index" class="claim-item">
                <span>{{ claim.claim }}</span>
                <span :class="['status', claim.status]">{{ claim.status }}</span>
                <button v-if="!claim.isClaimed" @click="selectClaim(claim)" class="select-button">
                    {{ claim.isSelected ? '已选择' : '选择' }}
                </button>
                <button v-else class="select-button disabled">
                已认领
                </button>
              </li>
            </ul>
          </div>
          <p v-else class="no-results">没有匹配的对象。</p>
  
          <!-- 弹窗操作按钮 -->
          <div class="modal-actions">
            <button @click="submitClaimRequest" :disabled="isSubmitting" class="submit-button">
              {{ isSubmitting ? '处理中...' : '提交认领请求' }}
            </button>
            <button @click="closeClaimModal" class="cancel-button">关闭</button>
          </div>
        </div>
      </div>
  
      <!-- 已发出的认领请求 -->
      <h3 class="claim-history-title">已发出的认领请求</h3>
      <table class="claim-table">
        <thead>
          <tr>
            <th>认领对象</th>
            <th>发起时间</th>
            <th>处理时间</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(claim, index) in claimRequests" :key="index">
            <td>{{ claim.claim }}</td>
            <td>{{ claim.createTime }}</td>
            <td>{{ claim.handleTime || '未处理' }}</td>
            <td>{{ claim.status }}</td>
          </tr>
        </tbody>
      </table>
       <!-- 发起认领请求按钮 -->
       <div class="button-container">
        <button @click="openClaimModal" class="claim-button">发起认领请求</button>
      </div>
    </div>
    <button @click="sendGetMyClaims">点击我获取用户认领请求</button>
  </template>
  
  <script>
  import axios from '@/utils/axios.js';
  export default {
    props: {
        userid: {
          type: Number,
          required: true,
        },
        authorization:{
          type: String,
          required:true,
        },
        myclaimRequests:{
          type:Array,
        }
    },
    data() {
      return {
        Authorization:this.authorization,
        // 控制弹窗的显示
        isModalOpen: false,
        // 当前搜索查询
        searchQuery: '',
        // 用户的认领请求
        claimRequests: this.myclaimRequests,
        // 当前显示的匹配的对象
        filteredClaims: [],
  
        // 防止重复提交的标志
        isSubmitting: false
      };
    },
    methods: {
      // 打开弹窗
      openClaimModal() {
        this.isModalOpen = true;
      },
  
      // 关闭弹窗
      closeClaimModal() {
        this.isModalOpen = false;
        this.searchQuery = '';  // 清除输入框内容
        this.filteredClaims = []; // 清空搜索结果
      },
  
      // 搜索并筛选认领对象
      filterClaims(){
        if (!this.searchQuery) {
          this.filteredClaims = []; // 如果没有输入内容，显示空
        } else {
          // 如果有搜索内容，发送GET请求
          axios.get('/api/academic/claim/query', {
            params: {
              authorName: this.searchQuery,  // 传入authorName，使用searchQuery
              count: 20  // 假设你需要返回的结果数量是固定的，这里可以根据需求调整
            }}).then(response => {
            console.log("sss",response.data);
            // 假设返回的数据是一个JSON数组
            this.filteredClaims = response.data.map(claim => {
              // 为每个元素添加isSelected属性，初始值为false
              return {
                ...claim,  // 保留原有的属性
                isSelected: false, // 新增的属性
                isClaimed: claim.status === 'Claimed',// 判断状态是否为“Claimed”
              };
            });
            console.log("我是filteredClaims:",this.filteredClaims);
          }).catch(error => {
            console.error('Error fetching claims:', error);  // 错误处理
          });
        }
      },

      // 选择认领对象
      selectClaim(claim) {
        claim.isSelected = !claim.isSelected; // 填充输入框为选中的对象
        this.searchQuery = claim.isSelected ? claim.claim : '';
      },
      
      // 提交认领请求
      submitClaimRequest(){
        if (!this.searchQuery) return; // 如果没有选择认领对象，直接返回
        const authorid = this.filteredClaims.find(a => a.claim === this.searchQuery).authorid;
        this.isSubmitting = true;
        axios.post(
            "/portal/claim/open", // 请求的 URL
            { 
              claim: authorid
            }, // 请求体中的 claim 字段
            ).then(response => {
              console.log('响应数据:', response.data);
            }).catch(error => {
              console.error('请求失败:', error);
            });
        this.isSubmitting = false;
        this.closeClaimModal(); // 关闭弹窗
        //window.location.reload();
      },

         // 格式化日期函数
         formatDate(dateString) {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        },
          // 格式化数据函数
        formatClaims(response) {
            const formatted = response.view.map(item => ({
                claim: item.authorName,
                createTime: item.claim.createTime ? this.formatDate(item.claim.createTime) : null,
                handleTime: item.claim.handleTime ? this.formatDate(item.claim.handleTime) : null,
                status: item.claim.status
            }));
            // 更新数据
            this.claimRequests = formatted;
            this.$emit('updataUserClaim',this.claimRequests);
        },

        //自动获取当前认领请求
        sendGetMyClaims(){
            const id = this.userid;
            axios.get('/portal/claim/getall',{
            params: { 
                userID:id,
                pageSize:30,
                page:1,
            }
            }).then(response => {
                this.formatClaims(response.data);
                console.log("获取成功：",response.data);
            }).catch(error =>{
                console.error('获取失败:', error);
            });
        },

    },

    mounted(){
    }

  };
  </script>
  
  <style scoped>
  /* Container styling */
  .container {
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
  }
  
  /* 居中按钮容器 */
  .button-container {
    display: flex;
    justify-content: center;  /* 水平居中 */
    margin-top: 50px;  /* 顶部间距 */
  }
  
  /* 发起认领请求按钮样式 */
  .claim-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .claim-button:hover {
    background-color: #0056b3;
  }
  
  /* 弹窗样式 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background-color: white;
    padding: 40px;  /* 增加内边距 */
    border-radius: 10px;
    width: 600px;   /* 调整弹窗宽度 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .modal-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .modal-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  
  .search-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  
  .results-container {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 30px;
  }
  
  .claim-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .claim-item span:first-child {
    flex: 1;
    max-width: 110px;  /* 设置固定最大宽度，根据需要调整 */
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    overflow-x: auto;
  }

  .claim-item span:first-child::-webkit-scrollbar {
    display: none;  /* 隐藏滚动条 */
  }

  .claim-item span:last-child {
    max-width: 100px;  /* 设置status的最大宽度，调整为合适的值 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  
  .status {
    padding: 2px 5px;
    border-radius: 5px;
    display: inline-block; /* 确保状态不会被挤压 */
  }
  .status.Claimed {
    background-color: #28a745;
    color: white;
  }
  
  .status.Unclaimed {
    background-color: #dc3545;
    color: white;
  }
  
  .select-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .select-button:hover {
    background-color: #0056b3;
  }
  .select-button.disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
  .no-results {
    color: #dc3545;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .submit-button,
  .cancel-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button {
    background-color: #28a745;
    color: white;
  }
  
  .submit-button:hover {
    background-color: #218838;
  }
  
  .cancel-button {
    background-color: #dc3545;
    color: white;
  }
  
  .cancel-button:hover {
    background-color: #c82333;
  }
  
  /* 认领请求历史表格 */
  .claim-history-title {
    font-size: 20px;
    margin-top: 0px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .claim-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .claim-table th, .claim-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .claim-table th {
    background-color: #f1f1f1;
  }
  
  .claim-table tr:hover {
    background-color: #f9f9f9;
  }
  </style>
  