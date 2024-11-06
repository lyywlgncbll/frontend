<template>
    <div class="author-list">
      <h3 class="title">合著作者</h3>
      <div v-for="(author, index) in authors" :key="index" class="author-item">
        <img class="avatar" :src="author.avatar" alt="Author Avatar" />
        <div class="author-info">
          <p class="author-name">{{ author.name }}</p>
          <p class="author-university">{{ author.university }}</p>
        </div>
        <span class="arrow">➔</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AuthorList",
    props: {
      authors: {
        type: Array,
        required: true,
        default: () => [
          {
            name: "Xiaotian Hu",
            university: "Nanchang University",
            avatar: "path/to/avatar1.jpg"
          },
          {
            name: "Zengqi Huang",
            university: "Nanchang University",
            avatar: "path/to/avatar2.jpg"
          },
          {
            name: "Yiwan Chen",
            university: "Jiangxi Normal University",
            avatar: "path/to/avatar3.jpg"
          },
          {
            name: "Juan Long",
            university: "Nanchang University",
            avatar: "path/to/avatar4.jpg"
          }
        ]
      }
    }
  };
  </script>
  
  <style scoped>
  .author-list {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .author-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .author-item:last-child {
    border-bottom: none;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .author-info {
    flex: 1;
  }
  
  .author-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  
  .author-university {
    font-size: 12px;
    color: #888;
  }
  
  .arrow {
    font-size: 18px;
    color: #888;
  }
  </style>
  