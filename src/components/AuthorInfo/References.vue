<template>
    <div class="reference-container">
      <div class="header">
        <span class="header-title">文献</span>
        <span class="header-date">日期</span>
        <span class="header-citations">引用次数</span>
      </div>
      <div class="reference-item" 
           v-for="(reference, index) in references" 
           :key="index">
        <div class="reference-info">
          <h3 class="reference-title" @click="goToArticle(reference.id)">{{ reference.title }}
          </h3>
          <p class="reference-authors">{{ reference.authors }}</p>
          <p class="reference-journal">{{ reference.journal }}</p>
        </div>
        <span class="reference-date">{{ reference.date }}</span>
        <span class="reference-citations">{{ reference.citations }}</span>
      </div>
    </div>

  </template>
  
  <script>
  export default {
    name: "References",
    props: {
        references: {
            type: Array,
            required: true,
        },
        editable: {
            type: Boolean,
            default: false, // 默认非编辑状态
        },
    },
    data() {
      return {
        
      };
    },
    methods: {
      goToArticle(id) {
          // 使用 router.push 来进行路由跳转，传递 id 作为查询参数
          this.$router.push({ path: "/article", query: { id } });
        },
    },


  };
  </script>
  
  <style scoped>
  .reference-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .header {
    display: grid;
    grid-template-columns: 8fr 1fr 1fr;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ddd;
    background-color: #f1f1f1;
  }
  .header.editable-header {
    grid-template-columns: 7fr 1fr 1fr 1fr; 
  }
  .header.editable-header span:first-child {
    text-align: left;
  }

  .header.editable-header span:not(:first-child) {
    text-align: center;
  }
  .reference-item {
    display: grid;
    grid-template-columns: 7fr 1fr 1fr;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .reference-item.editable-item {
    grid-template-columns: 7fr 1fr 1fr 1fr; 
  }

  .reference-info {
    display: flex;
    flex-direction: column;
  }
  
  .reference-title {
    font-size: 1rem;
    font-weight: bold;
    word-break: break-word;
    margin: 0;
    cursor: pointer; /* 添加鼠标手型 */
    transition: color 0.3s; /* 添加过渡效果 */
}

.reference-title:hover {
    color: #007BFF; /* 鼠标悬停时改变文字颜色 */
    text-decoration: underline; /* 鼠标悬停时添加下划线 */
}
  
  .reference-authors,
  .reference-journal {
    font-size: 0.7rem;
    margin: 0.2rem 0;
  }
  
  .reference-date,
  .reference-citations,
  .reference-manage {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
  }
  .reference-manage{
    cursor: pointer;
  }



  .dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}


.dialog {
  background: white;
  padding: 2rem 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 500px; /* 调整弹窗宽度 */
}

.dialog p {
    text-align: left;
}
.dialog div {
    text-align: right;
}
.dialog-buttons button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-buttons button:first-child {
  background-color: rgba(73, 73, 233, 0.979);
  color: white;
}

.dialog-buttons button:last-child {
  background-color: gray;
  color: white;
}
  

  </style>  