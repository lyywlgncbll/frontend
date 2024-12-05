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
            placeholder="请输入对象名称"
            />

          
          <!-- 搜索按钮 -->
          <button @click="filterClaims" class="search-button">搜索</button>
  
          <!-- 显示搜索结果 -->
          <div v-if="filteredClaims.length > 0" class="results-container">
            <ul>
              <li v-for="(claim, index) in filteredClaims" :key="index" class="claim-item">
                <span>{{ claim.name }}</span>
                <span :class="['status', claim.status]">{{ claim.status }}</span>
                <button @click="selectClaim(claim)" class="select-button">
                    {{ claim.isSelected ? '已选择' : '选择' }}
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
            <td>{{ claim.object }}</td>
            <td>{{ claim.createdAt }}</td>
            <td>{{ claim.processedAt || '未处理' }}</td>
            <td>{{ claim.status }}</td>
          </tr>
        </tbody>
      </table>
       <!-- 发起认领请求按钮 -->
       <div class="button-container">
        <button @click="openClaimModal" class="claim-button">发起认领请求</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
        userid: {
            type: Number,
            required: true,
        },
    },
    data() {
      return {
        //用户id
        user_id:this.userid,
        // 控制弹窗的显示
        isModalOpen: false,
  
        // 用户的认领请求
        claimRequests: [
          { object: '对象1', createdAt: '2024-12-01 10:00', processedAt: '2024-12-01 12:00', status: '已处理' },
          { object: '对象2', createdAt: '2024-12-02 14:00', processedAt: null, status: '待处理' }
        ],
  
        // 假设的所有对象数据
        allClaims: [
            { name: '对象1', status: '已处理', isSelected: false },
            { name: '对象2', status: '未处理', isSelected: false },
            { name: '对象3', status: '已处理', isSelected: false },
            { name: '对象4', status: '未处理', isSelected: false }
        ],
  
        // 当前搜索查询
        searchQuery: '',
  
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
        this.filteredClaims = this.allClaims;  // 初始显示所有对象
      },
  
      // 关闭弹窗
      closeClaimModal() {
        this.isModalOpen = false;
        this.searchQuery = '';  // 清除输入框内容
        this.filteredClaims = []; // 清空搜索结果
      },
  
      // 搜索并筛选认领对象
      filterClaims() {
        if (!this.searchQuery) {
          this.filteredClaims = this.allClaims; // 如果没有输入内容，显示所有对象
        } else {
          this.filteredClaims = this.allClaims.filter(claim => 
            claim.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
      },
  
      // 选择认领对象
      selectClaim(claim) {
        claim.isSelected = !claim.isSelected; // 填充输入框为选中的对象
        this.searchQuery = claim.isSelected ? claim.name : '';
      },
  
      // 提交认领请求
      submitClaimRequest(){
        if (!this.searchQuery) return; // 如果没有选择认领对象，直接返回
  
        this.isSubmitting = true;
  
        // 模拟请求提交，实际应用中你可以发起API请求
        setTimeout(() => {
          const newClaim = {
            object: this.searchQuery,
            createdAt: new Date().toLocaleString(),
            processedAt: null,
            status: '待处理'
          };





          this.claimRequests.push(newClaim); // 将新的认领请求添加到请求列表
          this.isSubmitting = false;
          this.closeClaimModal(); // 关闭弹窗
        }, 1000); // 模拟1秒后提交





      },

         // 格式化日期函数
        formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        },

          // 格式化数据函数
        formatClaims(response) {
            const formatted = response.view.map(item => ({
                claim: item.claim,
                createTime: item.createTime ? this.formatDate(item.createTime) : null,
                handleTime: item.handleTime ? this.formatDate(item.handleTime) : null,
                status: item.status
            }));
            // 更新数据
            this.claimRequests = formatted;
        },
        
        //自动获取当前认领请求
        sendGetMyClaims(){
            const id = this.user_id;
            axios.get('http://localhost:8080/portal/claim/getall',{
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
        this.sendGetMyClaims();
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
    padding: 30px;
    border-radius: 10px;
    width: 400px;
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
  }
  
  .claim-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .status {
    padding: 2px 5px;
    border-radius: 5px;
  }
  
  .status.已处理 {
    background-color: #28a745;
    color: white;
  }
  
  .status.未处理 {
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
  