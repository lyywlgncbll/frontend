<template>
    <div class="author-list">
      <h3 class="title">合著作者</h3>
      <div v-for="(author, index) in authors" :key="index" class="author-item">
        <img class="avatar" :src="author.avatar" alt="Author Avatar" />
        <div class="author-info">
          <p class="author-name">{{ author.name }}</p>
          <p class="author-university">{{ author.university }}</p>
        </div>
        <router-link :to="`/authorInfo/${author.authorid}`" class="arrow">➔</router-link>

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
        default: () => [],
      }
    }
  };
  </script>
  
  <style scoped>
  .author-list {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
}

.title {
  position: sticky;
  top: 0; 
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 5px;
  border-bottom: 2px solid #e0e0e0;
  background-color: #fff; 
  z-index: 1; 
  padding-top: 20px;
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
  