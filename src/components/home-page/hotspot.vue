<template>
  <div class="hot-topics-container" id="page-root">
    <h2 class="section-title">热点话题</h2>
    <div class="topics-list">
      <div
          v-for="(topic, index) in topics"
          :key="index"
          class="topic-card"
      >
        <!-- Display name, worksCount, and citedByCount initially -->
        <div class="topic-info">
          <h3 class="topic-title">{{ topic.name }}</h3>
          <p class="topic-stats">
            <span>Works: {{ topic.worksCount }}</span>
            <span>Cited By: {{ topic.citedByCount }}</span>
          </p>
        </div>

        <!-- Hovered content: description and keywords -->
        <div class="topic-details">
          <p class="topic-description">{{ topic.description }}</p>
          <div class="topic-tags">
            <span
                v-for="(tag, tagIndex) in topic.keywords"
                :key="tagIndex"
                class="topic-tag"
            >{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {GET_TOP_K_API} from "@/utils/request.js";
import axios from "@/utils/axios.js";

export default {
  name: 'HotTopics',
  setup() {
    const topics=ref([]);
    const getTopK=async ()=>{
      try {
        const response = await axios.get(GET_TOP_K_API+"?k=3");

        if (response.data && response.status === 200) {
          console.log("获取topic成功"+response.data);
          // 遍历 response.data 数组中的每个项
          topics.value = response.data.map(item => {
            if (item.keywords) {
              // 将字符串形式的 JSON 数组转换为真实的 JavaScript 数组
              try {
                item.keywords = JSON.parse(item.keywords);
              } catch (e) {
                console.error("解析 keywords 字段失败:", e);
              }
            }
            return item;
          });
        } else {
          console.error("获取数据失败:", response.data.message);
        }
      } catch (error) {
        console.error("请求失败:", error);
      }
    }
    onMounted(() => {
      getTopK();
    });
    return {
      topics
    };
  }

};
</script>

<style scoped>
.hot-topics-container {
  padding: 10px;
  //background-color: #f7f7f7;
  border-radius: 6px;
  border: var(--page-border-color) 1px solid;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 95%; /* 缩小容器宽度 */
  max-width: 600px; /* 限制最大宽度 */
  margin: 0 auto; /* 居中显示 */
  margin-bottom: 15px !important;
  height: 100%;
}


.section-title {
  //position: sticky;
  //top: 0;
  //background-color: white;
  width: 100%;
  height: auto;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.topics-list {
  overflow: scroll;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge 隐藏滚动条 */
  }
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 50px);
  gap: 15px; /* 间距 */
}
.topic-card {
  background-color: #fff;
  padding: 12px;
  border-radius: 6px;
  border: var(--page-border-color) 1px solid;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
  //cursor: pointer;
  position: relative;
}

.topic-card:hover .topic-details {
  height: auto;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease,height 0.3s ease;
}

.topic-card .topic-details {
  opacity: 0;
  visibility: hidden;
  height: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease,height 0.3s ease;
  margin-top: 10px;
}

.topic-info {
  text-align: left;
}

.topic-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.topic-stats {
  font-size: 14px;
  color: #777;
  display: flex;
  gap: 15px;
}

.topic-description {
  font-size: 14px;
  color: #666;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-tag {
  background-color: #e0e0e0;
  color: #333;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.topic-tag:hover {
  background-color: #bdbdbd;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 20px;
  }

  .topic-title {
    font-size: 16px;
  }

  .topic-description {
    font-size: 13px;
  }

  .topic-tag {
    font-size: 11px;
  }
}
</style>
