<template>
    <div id="bar-root">
      <div class="avatar-wrapper">
        <div class="avatar">
          <img :src="defaultAvatarUrl" @click="toggleOptionsList" />
        </div>
      </div>
      <!-- 下拉选项列表 -->
      <div class="options-list" :class="{ active: optionsListActive }">
        <div
            class="option"
            v-for="option in options"
            :key="option.value"
            @click="option.action"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {ref, onMounted, onBeforeUnmount} from 'vue';
  import router from "@/router/index.js";
  
  export default {
    name: 'personal-avatar',
    methods:{
  
    },
    setup() {
  
      const avatarUrl = ref('');
      const defaultAvatarUrl = ref('/src/assets/defaultAvatar.jpeg');
      const optionsListActive = ref(false);
  
      // 定义显示个人中心和退出登录的操作
  
      
      const exit = () => {
        optionsListActive.value = false;
        localStorage.removeItem('authToken'); // 如果存储在localStorage中
        router.push("/login")
      };
      
  
      // 下拉选项
      const options = [
        {value: '1', label: '退出登录', action: exit},
      ];
  
      // 控制下拉列表的显示/隐藏
      const toggleOptionsList = () => {
        optionsListActive.value = !optionsListActive.value;
      };
  
      // 检测点击外部关闭下拉菜单
      const handleClickOutside = (event) => {
        const dropdownContainer = document.getElementById('bar-root');
        if (!dropdownContainer.contains(event.target)) {
          optionsListActive.value = false; // 点击外部时关闭下拉列表
        }
      };
  
      // 在组件挂载时添加监听器
      onMounted(() => {
        window.addEventListener('mousedown', handleClickOutside);
      });
  
      // 在组件销毁前移除监听器
      onBeforeUnmount(() => {
        window.removeEventListener('mousedown', handleClickOutside);
      });
  
      return {
        avatarUrl,
        optionsListActive,
        options,
        toggleOptionsList,
        defaultAvatarUrl
      };
    },
  };
  </script>
  
  <style scoped>
  .avatar-wrapper {
    display: inline-block;
    margin-top: 5px;
    border-radius: 50%;
    transition: box-shadow 0.3s ease;
  }
  
  .avatar-wrapper:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  }
  
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--bar-border-color);
    cursor: pointer;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 确保图片填充并保持比例 */
  }
  
  .options-list {
    position: absolute;
    top: 100%;
    left: -55px;
    width: 110px;
    background-color: white;
    border: 1px solid var(--bar-border-color);
    border-radius: 6px;
    margin-top: 8px;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: opacity 0.3s ease, max-height 0.3s ease;
    z-index: 100;
  }
  
  .options-list.active {
    opacity: 1;
    max-height: 300px;
  }
  
  .option {
    padding: 10px;
    cursor: pointer;
    text-align: center;
  }
  
  .option:hover {
    background-color: var(--button-hover-color);
  }
  
  
  </style>
  