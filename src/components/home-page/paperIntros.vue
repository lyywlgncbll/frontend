<template>
  <div class="paper-intros">
    <div v-for="(paper,index) in papers" :key="index" class="paper-container">
<!--      <button @click="goToArticle(paper.id)"></button>-->
      <h2 class="paper-title" @click="goToArticle(paper.id)">{{ paper.title }}</h2>
      <p class="paper-author">作者: <span>{{ paper.authors.join(', ') }}</span></p>
      <p class="paper-author">期刊: <span>{{ paper.journal }}</span></p>
      <p class="paper-summary">{{ paper.abstract }}</p>
      <div class="paper-details">
        <p class="paper-year">年份: <span>{{ paper.year }}</span></p>
        <p class="paper-citations">引用次数: <span>{{ paper.citationCount }}</span></p>
        <p class="paper-field">领域: <span>{{ paper.fields.join(', ') }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import axios from "@/utils/axios.js";
import {GET_RECOMMEND_ARTICLE_API, GET_TOP_K_API} from "@/utils/request.js";

export default defineComponent({
  name: "PaperDetails",
  setup(){
    const papers=ref([]);
    const getPapers=async ()=>{
      try {
        const response = await axios.get(GET_RECOMMEND_ARTICLE_API);

        if (response.data && response.status === 200) {
          console.log("获取推荐论文成功");
          papers.value=response.data.papers;

        } else {
          console.error("获取数据失败:", response.data.message);
        }
      } catch (error) {
        console.error("请求失败:", error);
      }
    }
    onMounted(() => {
      getPapers();
    })
    return{
      papers
    }
  },
  methods: {
    goToArticle(id) {
      // 使用 router.push 来进行路由跳转，传递 id 作为查询参数
      // this.$router.push({ path: "/article", query: { id } });
      const url = this.$router.resolve({
        path: '/article',
        query: { id }
      }).href;
      // 在新标签页中打开
      window.open(url, "_blank");
    }
  }
});
</script>

<style scoped>
*{
  z-index: 100;
}
.paper-intros{
  width: auto;
  //max-width: 550px;
}
.paper-container {
  width: 100%;
  //max-width: 550px;
  margin:20px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.paper-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.paper-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制标题为 2 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  //transition: color 0.3s ease;
}

.paper-title:hover {
  color: #555;  /* 鼠标悬停时的颜色 */
}


.paper-author,
.paper-summary {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.paper-author span {
  color: #1e88e5;
}

.paper-summary {
  font-style: italic;
  color: #777;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* 限制摘要为 3 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.paper-details {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.paper-details p {
  font-size: 14px;
  color: #555;
}

.paper-details p span {
  font-weight: 500;
  color: #333;
}

.paper-year,
.paper-citations,
.paper-field {
  display: flex;
  justify-content: space-between;
}

.paper-year span,
.paper-citations span,
.paper-field span {
  color: #4caf50;
  font-weight: bold;
}
</style>
