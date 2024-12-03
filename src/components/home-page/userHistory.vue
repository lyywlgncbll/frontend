<script>
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  name: "UserHistory",
  props: {
    historyData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods:{
    getProgressBarColor(progress) {
      // 计算灰色的强度，progress 越大，灰度越低
      const gray = Math.floor(192 - (progress * 1.92));  // 192 为灰色，随着进度增加，颜色变暗，逐渐趋近黑色

      // 返回渐变色，灰度值在 192 到 0 之间变化
      return `rgb(${gray}, ${gray}, ${gray})`;
    }


  },
  setup(props) {
    // For dynamic interaction, like marking as read
    const toRead = (paper) => {
      alert(`继续阅读 "${paper.title}"!`);
    };
    const markAsRead = (paper) => {
      alert(`将 "${paper.title}" 标记为已读!`);
    };
    const animatedProgress = ref([]); // 动态进度，用于动画

    onMounted(() => {
      // 动态增加进度值，模拟加载动画
      props.historyData.forEach((item, index) => {
        animatedProgress.value[index] = 0;
        setTimeout(() => {
          let progress = 0;
          const interval = setInterval(() => {
            if (progress >= item.progress) {
              clearInterval(interval);
            } else {
              progress += 2; // 每次增加 2%
              animatedProgress.value[index] = progress;
            }
          }, 10); // 每 10ms 更新一次
        }, 0); // 按序延迟动画
      });
    });


    return {
      toRead,
      markAsRead,
      animatedProgress
    };
  },
});
</script>

<template>
  <div class="history-container" id="page-root">
    <h2 class="history-title">阅读历史记录</h2>
    <div v-if="historyData.length > 0" class="history-list">
      <div v-for="(item, index) in historyData" :key="index" class="history-item">
        <div class="paper-info">
          <h3 class="paper-title" :title="item.title">{{ item.title }}</h3>
<!--          <p class="paper-author">作者: {{ item.author }}</p>-->
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: animatedProgress[index] + '%' , backgroundColor: getProgressBarColor(item.progress)}"></div>
          </div>
          <p class="paper-progress">阅读进度: {{ animatedProgress[index] }}%</p>
        </div>
        <div class="action-buttons">
          <button @click="toRead(item)" class="action-button">
            <img src="../../assets/iconfonts/book.svg" alt="继续阅读" class="read-action">继续阅读
          </button>
          <button @click="markAsRead(item)" class="action-button" id="1">
            <img src="../../assets/iconfonts/check.svg" alt=" " class="read-action">标为已读
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-message">
      暂无阅读历史记录。
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/theme-colors.css";
*{
  z-index: 100;

}
.history-container {
  width: 100%;
  padding: 20px;

  //background-color: var(--page-barckground-color);

  //border-radius: 8px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.history-title {
  text-align: center;
  padding: 5px;
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
  border-top: var(--page-border-color) 1px solid;
  border-bottom: var(--page-border-color) 1px solid;
}

.history-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  overflow: auto;
  max-height: calc(100% - 50px);
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}
.history-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge 隐藏滚动条 */
}


.history-item {
  display: flex;
  height: 75px;
  //min-height: auto;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 8px 14px;
  border: 1px solid var(--page-border-color);
  border-radius: 6px;
  background-color: #fff;
  transition: background-color 0.3s ease;
  overflow: hidden; /* 限制子元素超出父容器 */
}

.history-item:hover {
  height: 112px;
  background-color: var(--page-block-hover-color);
  transition: height 0.3s ease, background-color 0.3s ease;
  .action-button{
    width: auto;
    height: auto;
    opacity: 1;
    padding: 6px 10px;
    transition: width 0.3s ease, opacity 0.3s ease;
  }
}

.paper-info {
  flex: 1;
  width: 100%;

}

.paper-title {
  font-weight: bold;
  margin-bottom: 4px;
  max-width: 90%; /* 设置宽度为 90% */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  transition: width 0.3s ease, opacity 0.3s ease;

}
.progress-container {
  width: 100%;
  height: 6px;
  background-color: var(--page-barckground-color);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 6px;
  margin-bottom: 6px;
  position: relative;
  transition: width 0.3s ease;
}

.progress-bar {
  height: 100%;
  //background-color: #1e87f0;
  border-radius: 4px;

  transition: width 0.3s ease-out; /* 平滑加载 */

}

.paper-progress {
  font-size: 12px;
  color: #555;
}
.action-buttons {
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin-top: 5px;
}
#1{
  margin-right: 50%;
}
.action-button {
  width: 0;
  opacity: 0;
  display: flex;
  //margin-left: 50%;
  flex-direction: row;
  align-items: center;
  //padding: 6px 10px;
  background-color: var(--page-button-color);
  border: var(--page-button-border-color) 1px solid;
  color: #fff;
  //border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 12px;
  //height: 24px;
}

.action-button:hover {
  background-color: var(--page-button-hover-color);
}
.read-action{
  height: 14px;
  width: auto;
  margin-right: 3px;
}

.empty-message {
  text-align: center;
  color: #777;
  font-size: 14px;
}
</style>
