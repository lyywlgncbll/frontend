<template>
  <logged-nav-bar class="nav-bar" />
  <div class="paper-detail">
    <div class="paper-detail-left">
      <!-- 标题 -->
      <el-skeleton v-if="isLoading" :rows="1" animated style="margin: 20px 0;"></el-skeleton>
      <h1 class="paper-title" v-else>{{ paper.title }}</h1>
      <el-skeleton v-if="isLoading" :rows="1" animated style="margin: 20px 0;"></el-skeleton>
      <el-row class="paper-row" v-else>
        <!-- <p>Authors:&emsp;</p> -->
        <el-button v-for="author in paper.authors" :key="author" class="author-button" type="text"
          @click="goToAuthorPage(author)">
          {{ author }}
        </el-button>
        <el-button type="text" disabled class="date-button">{{ paper.publishedDate }}</el-button>
      </el-row>
      <el-divider />
      <!-- 元数据 -->
      <h2 class="section-title">领域</h2>
      <el-skeleton v-if="isLoading" :rows="1" animated style="margin: 20px 0;"></el-skeleton>
      <template v-else>
        <el-row class="paper-metadata" gutter="20">
          <el-button v-for="field in paper.fields" :key="field" class="keyword-button" round
            @click="goToFieldPage(field)">
            {{ field }}
          </el-button>
        </el-row>
      </template>
      <h2 class="section-title">关键词</h2>
      <el-skeleton v-if="isLoading" :rows="1" animated style="margin: 20px 0;"></el-skeleton>
      <template v-else>
        <el-row class="paper-metadata" gutter="20">
          <el-button v-for="keyword in paper.keywords" :key="keyword" class="keyword-button" round
            @click="goToKeywordPage(keyword)">
            {{ keyword }}
          </el-button>
        </el-row>
      </template>
      <!-- 摘要 -->
      <h2 class="section-title">论文概述</h2>
      <el-row class="paper-abstract">
        <el-col :span="24">
          <el-skeleton v-if="isLoading" :rows="3" animated></el-skeleton>
          <p v-else class="abstract" :class="{ 'collapsed': !isExpanded }">
            {{ paper.abstract }}
          </p>
          <el-button v-if="!isLoading && paper.abstract.length > 100" @click="toggleExpand" type="text"
            class="expand-button">
            <el-icon v-if="isExpanded">
              <ArrowUpBold />
            </el-icon>
            <el-icon v-else>
              <ArrowDownBold />
            </el-icon>
          </el-button>
        </el-col>
      </el-row>

      <!-- 引用数据 -->
      <!-- <h2 class="section-title">论文引用</h2>
      <el-row class="paper-references">
        <el-col :span="24">
          <el-skeleton v-if="isLoadingReference" :rows="2" animated></el-skeleton>
          <el-descriptions border v-else>
            <el-descriptions-item>
              <ul>
                <li v-for="(reference, index) in paper.references" :key="index">

                  <div v-if="reference.isLoaded">
                    <el-link v-if="reference.isReachable" @click="gotoArticlePage(reference.id)" class="reference-link"
                      type="primary">{{ reference.title
                      }}</el-link>
                    <el-link v-else @click="gotoArticlePage(reference.id)" disabled class="reference-link"
                      type="primary">{{
                        reference.title }}</el-link>
                  </div>
                  <div v-else></div>
                </li>
              </ul>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row> -->

      <h2 class="section-title">论文引用</h2>
      <el-row class="paper-references">
        <el-col :span="24">
          <el-skeleton v-if="isLoadingReference" :rows="2" animated></el-skeleton>
          <el-descriptions border v-else>
            <el-descriptions-item>
              <!-- 显示前10条引用 -->
              <ul>
                <li v-for="(reference, index) in visibleReferences" :key="index">
                  <div v-if="reference.isLoaded">
                    <el-link v-if="reference.isReachable" @click="gotoArticlePage(reference.id)" class="reference-link"
                      color="#0969da">
                      {{ reference.title }}
                    </el-link>
                    <el-link v-else @click="gotoArticlePage(reference.id)" disabled class="reference-link"
                      color="#0969da">
                      {{ reference.title }}
                    </el-link>
                  </div>
                  <div v-else></div>
                </li>
              </ul>

              <!-- 如果引用数量超过10条，显示“查看更多引用”按钮 -->
              <!-- <div v-if="paper.references.length > 10 && !isReferenceExpanded">
                <el-button @click="toggleExpand" type="text" class="expand-button">查看更多引用</el-button>
              </div> -->
              <el-button v-if="currentLoadedReferenceCount > 10" @click="toggleReferenceExpand()" type="text">
                <el-icon v-if="isReferenceExpanded">
                  <ArrowUpBold />
                </el-icon>
                <el-icon v-else>
                  <ArrowDownBold />
                </el-icon>
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>

      <h2 class="section-title">论文推荐</h2>
      <paper-details class="papers" :id="newId" />

      <!-- <h2 class="section-title">数据统计</h2>
      <el-row>
        <el-col :span="6">
          <el-statistic title="总浏览量" :value=views />
        </el-col>
        <el-col :span="6">
          <el-statistic title="总下载量" :value=downloads />
        </el-col>
      </el-row> -->


      <!-- <el-row justify="center" class="actions">
        <el-button type="primary" @click="downloadPaper">
          <el-icon>
            <Download />
          </el-icon>
          Download PDF
        </el-button>
        <el-button type="success" @click="preview">
          <el-icon>
            <View />
          </el-icon>
          Preview
        </el-button>
      </el-row>

      <h2 class="section-title" style="justify-self: center;">论文推荐</h2>
      <el-card class="recommendation-card">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(paper, index) in recommendations" :key="paper.id">
            <div class="paper-item"
              style="justify-content: center; display: flex; align-items: center; flex-direction: column;">
              <h3 style="margin-top: 5px; font-size: 30px;">{{ paper.title }}</h3>
              <p style="margin-top: 5px;">{{ paper.author }}</p>
              <p class="abstract" style="margin-top: 5px;">{{ paper.abstract }}</p>
              <el-button type="primary" size="mini" @click="goToDetail(paper.link)" style="margin-top: 5px;">
                View Details
              </el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card> -->
    </div>
    <div class="statistics-container">
      <div class="stat-item">
        <el-row class="stat-header">
          <el-icon>
            <Download />
          </el-icon>
          <div class="stat-label">
            <span>下载</span>
          </div>
        </el-row>

        <!-- <div class="striped-divider"></div> -->
        <el-divider />

        <el-row class="stat-footer">
          <span>下载次数</span>
          <div class="stat-number">
            <span>{{ paper.downloads }}</span>
          </div>
        </el-row>
      </div>
      <div class="stat-item">
        <el-row class="stat-header">
          <el-icon>
            <View />
          </el-icon>
          <div class="stat-label">
            <span>浏览</span>
          </div>
        </el-row>

        <!-- <div class="striped-divider1"></div> -->
        <el-divider />

        <el-row class="stat-footer">
          <span>浏览次数</span>
          <div class="stat-number">
            <span>{{ paper.views }}</span>
          </div>
        </el-row>
      </div>
      <div class="stat-item">
        <el-row class="stat-header">
          <el-icon>
            <BottomLeft />
          </el-icon>
          <div class="stat-label">
            <span>引用</span>
          </div>
        </el-row>

        <!-- <div class="striped-divider2"></div> -->
        <el-divider />
        <el-row class="stat-footer">
          <span>引用文章次数</span>
          <div class="stat-number">
            <span>{{ getReferenceLength() }}</span>
          </div>
        </el-row>
        <el-row class="stat-footer">
          <span>被引用次数</span>
          <div class="stat-number">
            <span>{{ paper.citation }}</span>
          </div>
        </el-row>
      </div>
      <el-row><span>&emsp;</span></el-row>
      <el-tooltip class="box-item" effect="dark" content="下载论文" placement="right">
        <el-button circle class="stat-button" size="large" @click="downloadPaper()"><el-icon size="25px">
            <Download />
          </el-icon></el-button>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="预览论文" placement="right">
        <el-button circle class="stat-button" size="large" @click="preview()"><el-icon size="25px">
            <View />
          </el-icon></el-button>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="收藏论文" placement="right">
        <el-button circle class="stat-button" size="large" @click="toggleFavorite()">
          <el-icon v-if="isFavorite" size="25px">
            <StarFilled />
          </el-icon>
          <el-icon v-else size="25px">
            <Star />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>


<script>
import { createRouter, createWebHistory } from 'vue-router';
import LoggedNavBar from "~/components/bar/logged-nav-bar.vue";
import { ARTICLE_API, REFERENCE_API, INCREASE_READ_CNT_API, ADD_DOWNLOADS_API, ADD_VIEWS_API, GET_PDF_BINARY } from "~/utils/request.js"
import Reader from './Reader.vue';
//import Article from '.Article.vue';
import axios from '@/utils/axios.js';
import { defineComponent } from "vue";
import router from "@/router/index.js";
//import PaperDetails from "~/components/article/paperIntro.vue";
import PaperDetails from "~/components/article/paperIntro.vue";

// const routes = [
//   {
//     path: '/reader',
//     name: 'Reader',
//     component: Reader,
//     props: (route) => ({ url: route.query.url }), // 将 query 参数映射为 props
//   },
// ];
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });
//const id = "https://openalex.org/W1481824024"
export default defineComponent({
  components: { LoggedNavBar, PaperDetails },
  name: "PaperDetail",
  props: {
    id: {
      type: String,
      reequired: true
    }
  },
  data() {

    return {
      paper: {
        title: "A Comprehensive Study on Artificial Intelligence",
        authors: ["John Doe", "Jane Smith", "Alice Johnson"],
        publishedDate: "2024-11-17",
        abstract:
          "This paper explores the latest advancements in artificial intelligence (AI), covering topics such as neural networks, natural language processing, and the ethical implications of AI systems.",
        keywords: ["AI", "Neural Networks", "Ethics", "NLP", "Machine Learning", "AI", "Neural Networks", "Ethics", "NLP", "Machine Learning"],
        fields: ["AI", "Neural Networks", "Ethics"],
        references: [
          {
            id: "1",
            title: "A Study on Neural Networks",
            authors: ["Doe, J.", "Smith, J."],
            isReachable: true,
            isLoaded: false
          },
          {
            id: "2",
            title: "Ethics in AI Systems",
            authors: ["Johnson, A."],
            isReachable: false,
            isLoaded: false
          },
        ],
        pdfUrl: "/test/test.pdf",
        isFavorite: false,
        views: 0,
        downloads: 0,
        newId: ""
      },
      // stats: [
      //   { icon: 'path/to/icon1.png', number: 101, label: 'Views' },
      //   { icon: 'path/to/icon2.png', number: 1001, label: 'Downloads' },
      //   { icon: 'path/to/icon3.png', number: 10, label: 'Admins' },
      //   // 添加更多统计项
      // ],,
      recommendations: [
        {
          id: "1",
          title: "Deep Learning in Neural Networks",
          author: "Ian Goodfellow",
          abstract:
            "This paper provides a comprehensive introduction to deep learning and its applications.",
          link: "/paper/1",
        },
        {
          id: "2",
          title: "A Survey on Reinforcement Learning",
          author: "Richard Sutton",
          abstract:
            "A detailed survey of reinforcement learning methods and their recent advancements.",
          link: "/paper/2",
        },
        {
          id: "3",
          title: "Graph Neural Networks: A Review",
          author: "Yoshua Bengio",
          abstract:
            "This paper reviews the development and applications of graph neural networks.",
          link: "/paper/3",
        },
      ],
      isLoading: true,
      isLoadingReference: false,
      isExpanded: false,
      isReferenceExpanded: false,
      currentLoadedReferenceCount: 0
    };
  },
  mounted() {
    // 从 localStorage 中加载数据
    this.views = localStorage.getItem("views") || 101; // 默认值101
    this.downloads = localStorage.getItem("downloads") || 1001; // 默认值1001
    this.fetchAllData(this.id);
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(newId) {
        this.isLoading = true;
        this.isLoadingReference = true;
        this.newId = newId;
        this.fetchAllData(newId); // 调用方法加载数据
        // this.paper.references.forEach((ref, index) => {
        //   this.fetchReferenceData(ref);
        // });
        // this.isLoadingReference = false;
      }
    }
    // '$route.params.id': {
    //   handler(newId) {
    //     this.fetchData(newId); // 调用方法重新获取数据
    //   },
    //   immediate: true, // 初始化时也调用一次
    // },
  },
  computed: {
    visibleReferences() {
      // 如果展开了，显示所有引用；否则只显示前10条引用
      return this.isReferenceExpanded ? this.paper.references : this.paper.references.slice(0, 10);
    }
  },
  methods: {
    async fetchData(id) {
      try {
        console.log(id);
        const response = await axios.get(ARTICLE_API, {
          params: {
            publicationId: id
          }
        });
        this.paper = this.transformBackendDataToPaper(response.data);
        this.isLoading = false;


      } catch (error) {
        console.log("Error fetching data:", error);
      }
    },
    async fetchReferenceData(ref) {
      try {
        console.log(ref.id);
        const response = await axios.get(REFERENCE_API, {
          params: {
            referenceId: ref.id
          }
        });
        ref.title = response.data.title;
        ref.isReachable = response.data.isReachable;
        ref.isLoaded = true;
        this.isLoadingReference = false;
        this.currentLoadedReferenceCount++;
      } catch (error) {
        console.log("error")
      }
    },
    async fetchAllData(id) {
      await this.fetchData(id);
      await this.delay(2000);
      // 并行请求所有引用数据
      //const referencePromises = 
      for (const ref of this.paper.references) {
        // Wait until the reference is loaded
        while (!ref.isLoaded) {
          await this.fetchReferenceData(ref);  // Fetch data asynchronously and wait
        }
      }

      // 等待所有引用数据请求都完成
      //await Promise.all(referencePromises);

      this.isLoadingReference = false;
    },
    async refreshPage() {
      this.isLoading = true;  // 设置加载状态
      this.paper = null;      // 清空当前数据
      await this.fetchData(); // 重新获取数据
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async downloadPaper() {
      this.downloads++;
      console.log(this.id);
      //this.downloadPdf(this.paper.pdfUrl);
      this.$message({
        message: "Downloading PDF...",
        type: "info",
      });
      const response = await axios.post(ADD_DOWNLOADS_API, null, {
        params: {
          publicationId: this.id
        }
      });
      this.paper.downloads = response.data.downloads;
      try {
        // 获取 PDF 文件的二进制数据
        var config = {
          method: 'get',
          url: GET_PDF_BINARY + `?url=${this.paper.pdfUrl}`,
          responseType: 'blob',
        }
        const response = await axios(config);
        // window.atob(response.data)
        const blob = response.data;

        // 创建一个 URL 对象指向 Blob
        const pdfUrlBlob = URL.createObjectURL(blob);

        // 创建一个临时的 <a> 元素并模拟点击下载
        const link = document.createElement('a');
        link.href = pdfUrlBlob;
        link.download = 'sample.pdf'; // 设置默认文件名
        link.click();

        // 释放 Blob URL 对象
        URL.revokeObjectURL(pdfUrlBlob);
      } catch (error) {
        console.error('下载失败:', error);
      }
    },
    async downloadPdf(pdfUrl) {
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
          throw new Error('网络错误');
        }

        const blob = await response.blob(); // 将响应体转换为 Blob 对象
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // 创建 Blob URL
        link.download = pdfUrl.split('/').pop(); // 设置文件名为 URL 的最后一部分
        link.click(); // 模拟点击链接，触发下载
      } catch (error) {
        console.error('下载失败', error);
      }
    },
    getReferenceLength() {
      return this.paper.references.length;
    },
    async preview() {
      this.views++;
      this.$message({
        message: "Preview...",
        type: "success",
      });
      console.log(this.id);
      const response = await axios.post(ADD_VIEWS_API, null, {
        params: {
          publicationId: this.id
        }
      });
      this.paper.views = response.data.views;
      this.increaseReadCnt();
      const url = this.$router.resolve({ name: 'Reader', query: { id: this.id } }).href;
      console.log(url);
      // this.$router.push({
      //   name: "Reader", // 路由名称，需在路由配置中定义
      //   query: { id: this.id },
      // });
      window.open(url, '_blank');
    },
    goToAuthorPage(author) {
      this.$message({
        message: `Redirecting to ${author}'s articles...`,
        type: "info",
      });
      localStorage.setItem('searchOption', 4);
      localStorage.setItem('searchString', author);
      localStorage.setItem('topic', '')
      if (!this.$route.path.includes('search/result')) {
        router.push('/search/result');
      } else {
        window.location.reload();
      }
    },
    goToKeywordPage(keyword) {
      this.$message({
        message: `Redirecting to articles related to ${keyword}...`,
        type: "info",
      });
      localStorage.setItem('searchOption', 5);
      localStorage.setItem('searchString', keyword);
      localStorage.setItem('topic', '')
      if (!this.$route.path.includes('search/result')) {
        router.push('search/result');
      } else {
        window.location.reload();
      }
    },
    goToFieldPage(field) {
      this.$message({
        message: `Redirecting to articles related to ${field}...`,
        type: "info",
      });
      localStorage.setItem('searchOption', 3);
      localStorage.setItem('searchString', field);
      localStorage.setItem('topic', '')
      if (!this.$route.path.includes('search/result')) {
        router.push('search/result');
      } else {
        window.location.reload();
      }
    },
    gotoArticlePage(paperId) {
      this.$router.push({
        name: "Article",
        query: { id: paperId }
      });
    },
    transformBackendDataToPaper(backendData) {
      // 将后端数据转换为前端 paper 数据格式
      const paper = {
        title: backendData.title,
        authors: backendData.authors,
        publishedDate: `${backendData.publishedYear}-01-01`, // 默认设置为每年 1 月 1 日
        abstract: backendData.abstract,
        keywords: backendData.keywords,
        fields: backendData.fields,
        references: backendData.references.map((refId, index) => ({
          id: refId, // 生成 ID
          title: "null",
          authors: [], // 无法从后端 JSON 获取，默认设置为空
          isReachable: false, // 假设所有文献都可访问，后续可以根据业务逻辑调整
        })),
        pdfUrl: backendData.pdfurl,
        downloads: backendData.downloads,
        views: backendData.views,
        citation: backendData.citation
      };
      return paper;
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        this.$message({
          message: "收藏成功",
          type: "info",
        });
      }
      else {
        this.$message({
          message: "取消收藏成功",
          type: "info",
        });
      }
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    toggleReferenceExpand() {
      this.isReferenceExpanded = !this.isReferenceExpanded;
    },
    async increaseReadCnt() {
      try {
        const response = await axios.get(INCREASE_READ_CNT_API);
        if (response.status === 200) {
          console.log("用户阅读次数加一")
        } else {
          console.error("添加阅读次数失败", response.data.message)
        }
      } catch (error) {
        console.error("请求失败:", error)
      }
    }
  },
});

</script>

<style scoped>
@font-face {
  font-family: 'TimesNewRoman';
  src: url('../assets/fonts/times_new_roman.ttf') format('truetype');
}

* {}

.article-page {
  display: flex;
  height: 100vh;
}

.paper-detail {
  margin: 20px;
  margin-top: 80px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
}

.paper-detail-left {
  width: 75%;
  margin-left: 0%;
}

.paper-title {
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
  /* font-family: 'TimesNewRoman'; */
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #0969da;
  margin: 20px 0 0 0;
  /* border-bottom: 2px solid #1890ff; */
  /* padding-bottom: 5px; */
}

.author-button {
  margin-right: 8px;
  margin-bottom: 8px;
  font-style: italic;
  color: #0969da;
}

.keyword-button {
  margin-left: 8px;
  margin-bottom: 8px;
  //background-color: #ddf4ff;
  color: #0969da;

  &:hover {
    color: white;
    background-color: #0969da;
  }
}

.paper-row {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: space-between;
  /* 空间分配 */
}

.date-button {
  margin-left: auto;
  /* 将日期按钮推到右侧 */
  margin-right: 20px;
}

.metadata-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.paper-metadata {
  margin: 10px 0;
}

.paper-date {
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
}

.paper-abstract {
  margin-top: 10px;
  background-color: #f9f9f9;
  /* 背景色，增加对比 */
  border-radius: 8px;
  /* 圆角让卡片更柔和 */
  padding: 16px;
  /* 内边距让内容显得不拥挤 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

.abstract {
  font-size: 15px;
  line-height: 1.8;
  /* 增加行距，提高可读性 */
  color: #555;
  /* 次要文字颜色 */
  text-align: justify;
  /* 使文本两端对齐 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* 设置最多显示3行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.abstract.collapsed {
  -webkit-line-clamp: 3;
  /* 限制显示3行 */
}

.abstract:not(.collapsed) {
  -webkit-line-clamp: unset;
  /* 不限制行数，显示完整内容 */
}

.el-button {
  margin-top: 10px;
}

.paper-references {
  margin: 20px 0;
}

.reference-link {
  font-size: 15px;
  /* font-weight: bold; */
  font-style: italic;
}

.paper-references ul {
  list-style-type: none;
  padding-left: 0;
}

.paper-references li {
  margin-bottom: 10px;
  font-size: 14px;
}

.recommendations {
  margin-top: 20px;
}

.recommendation-card {
  width: 100%;
}

.paper-item {
  text-align: left;
  padding: 10px;
}

.published-date {
  color: gray;
  font-weight: bold;
}


.nav-bar {
  position: fixed;
  z-index: 100;
  height: 60px;
  left: 0;
  right: 0;
  top: 0;
}

.statistics-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 10%;
  width: 22%;
  right: 3%;
  margin-left: 30px;
}

.stat-item {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* 文字居左对齐 */
  margin-bottom: 15px;
}

.stat-header .el-icon {
  font-size: 25px;
  /* 图标大小 */
  margin-right: 10px;
  color: #0969da;
  /* 图标颜色 */
}

.stat-header .stat-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.striped-divider {
  height: 4px;
  /* background: repeating-linear-gradient(45deg,
      #ff7f50, #ff7f50 10px,
      #ff6347 10px, #ff6347 20px,
      #ff4500 20px, #ff4500 30px,
      #ffa500 30px, #ffa500 40px
    ); */
  background-color: #5b636d;
  margin: 10px 0;
}

.striped-divider1 {
  height: 4px;
  /* background: repeating-linear-gradient(45deg,
      #28ea2c, #28ea2c 10px,
      #07a649 10px, #07a649 20px,
      #03b94e 20px, #03b94e 30px,
      #4cec8e 30px, #4cec8e 40px
    ); */
  background-color: #5b636d;
  margin: 10px 0;
}

.striped-divider2 {
  height: 4px;
  /* background: repeating-linear-gradient(45deg,
      #ff50ee, #ff50ee 10px,
      #cb50ff 10px, #cb50ff 20px,
      #bf50ff 20px, #bf50ff 30px,
      #ff50d9 30px, #ff50d9 40px
    ); */
  background-color: #5b636d;
  margin: 10px 0;
}

.stat-footer {
  display: flex;
  justify-content: space-between;
  /* 文字和数字分开，文字居左，数字居右 */
  align-items: center;
  font-size: 14px;
  color: #333;
}

.stat-footer .stat-text {
  margin-right: auto;
  /* 将文字部分推到左边 */
  font-size: 14px;
}

.stat-footer .stat-number {
  font-size: 14px;
  font-weight: bold;
  color: #0969da;
  /* 统计数字的颜色 */
  margin-left: 20px;
  /* 如果需要，增加数字与文字之间的间距 */
}

.stat-button {
  margin-top: 15px;
  margin-left: 0%;
  padding: 25px 25px;
  color: #0969da;

  &:hover {
    color: white;
    background-color: #0969da;
  }
}

.papers {}

.expand-button {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
