<template>
    <div class="welcome-container">
      <!-- 背景层 -->
      <div class="background"></div>
  
      <!-- 桥梁层 -->
      <div class="bridge">
        <div class="bridge-part"></div>
        <div class="bridge-part"></div>
        <div class="bridge-part"></div>
      </div>
  
      <!-- 学术资源层 -->
      <div class="academic-resources">
        <div class="resource" v-for="i in 6" :key="i" :style="getResourceStyle(i)"></div>
      </div>
  
      <!-- 前景层，包含欢迎文字和按钮 -->
      <div class="welcome-text">
        <h1>欢迎来到 CCBridge</h1>
        <p>架起学术交流的桥梁，连接全球学者</p>
        <button @click="navigateToExplore">开始探索</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  // 获取路由实例
  const router = useRouter();
  
  // 导航到探索页面
  const navigateToExplore = () => {
    router.push("/explore");
  };
  
  // 动态计算学术资源层每个元素的位置
  const getResourceStyle = (index) => {
    const xOffset = Math.random() * 200 - 100; // 随机X偏移
    const yOffset = Math.random() * 200 - 100; // 随机Y偏移
    return {
      left: `${50 + xOffset}%`,
      top: `${50 + yOffset}%`,
      animationDelay: `${index * 0.1}s`,
    };
  };
  
  // 监听滚动事件来实现视差效果
  const onScroll = () => {
    const scrollPosition = window.scrollY;
  
    const background = document.querySelector('.background');
    const bridge = document.querySelector('.bridge');
    const academicResources = document.querySelector('.academic-resources');
  
    // 背景层的滚动速度较慢
    background.style.transform = `translateY(${scrollPosition * 0.1}px)`;
  
    // 桥梁层的滚动速度适中
    bridge.style.transform = `translateY(${scrollPosition * 0.2}px)`;
  
    // 学术资源层的滚动速度较快
    academicResources.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  };
  
  // 在组件挂载时添加滚动监听
  onMounted(() => {
    window.addEventListener('scroll', onScroll);
  });
  
  // 在组件销毁时移除滚动监听
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
  </script>
  
  <style scoped>
  .welcome-container {
    position: relative;
    height: 200vh; /* 设置页面高度为视差效果的容器 */
    overflow: hidden;
  }
  
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/background.png') no-repeat center center fixed;
    background-size: cover;
    z-index: -3;
    transform: translateY(0);
    transition: transform 0.1s;
  }
  
  .bridge {
    position: relative;
    width: 100%;
    height: 200px;
    background: url('@/assets/bridge-structure.png') no-repeat center;
    z-index: -2;
    transform: translateY(0);
    transition: transform 0.1s;
  }
  
  .bridge-part {
    position: absolute;
    width: 100px;
    height: 50px;
    background: rgba(255, 255, 255, 0.5);
    margin: 5px;
  }
  
  .academic-resources {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
  
  .resource {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 255, 0.3);
    border-radius: 50%;
    animation: resourceMove 5s ease-in-out infinite;
  }
  
  @keyframes resourceMove {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .welcome-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    text-align: center;
    color: white;
    z-index: 1;
  }
  
  .welcome-text h1 {
    margin-bottom: 20px;
  }
  
  .welcome-text p {
    margin-bottom: 40px;
  }
  
  .welcome-text button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .welcome-text button:hover {
    background-color: #0056b3;
  }
  </style>
  