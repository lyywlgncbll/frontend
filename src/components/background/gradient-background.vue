<script setup>

</script>

<template>
  <body>

  </body>
</template>

<style scoped>
body {
  /* 初始化 取消内外边距 */
  margin: 0;
  padding: 0;
  /* 100%窗口高度 */
  height: 100vh;
  /* 弹性布局 水平垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 灰白黑的渐变背景 */
  background: linear-gradient(125deg, #7f8c8d, #9b9a9f, #34495e);
  /* 指定背景图像的大小 */
  background-size: 500%;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: bgAnimation 20s linear infinite;
}

/* 定义动画 */
@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
