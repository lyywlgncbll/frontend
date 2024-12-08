<template>
  <logged-nav-bar class="nav-bar" />
  <el-card class="paper-detail">

    <!-- 标题 -->
    <h1 class="paper-title">{{ paper.title }}</h1>

    <!-- 元数据 -->
    <h2 class="section-title">论文信息</h2>
    <el-skeleton v-if="isLoading" :rows="3" animated style="margin: 20px 0;"></el-skeleton>
    <template v-else>
      <el-row class="paper-metadata" gutter="20">
        <el-col :span="8">
          <el-descriptions title="作者" border>
            <el-descriptions-item>
              <el-button v-for="author in paper.authors" :key="author" class="author-button" type="text"
                @click="goToAuthorPage(author)">
                {{ author }}
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>

        <!-- 关键词 -->
        <el-col :span="8">
          <el-descriptions title="关键词" border>
            <el-descriptions-item>
              <el-button v-for="keyword in paper.keywords" :key="keyword" type="text" class="keyword-button"
                @click="goToKeywordPage(keyword)">
                {{ keyword }}
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>

        <el-col :span="8">
          <el-descriptions title="发布日期" border>
            <el-descriptions-item>
              {{ paper.publishedDate }}
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>

      <!-- 发表日期 -->
      <!-- <el-row class="paper-date" gutter="20"> -->


      <!-- <el-col :span="12">
        <el-descriptions title="语言" border>
          <el-descriptions-item>
            {{ paper.language }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col> -->
      <!-- </el-row> -->
    </template>
    <!-- 摘要 -->
    <h2 class="section-title">论文概述</h2>
    <el-row class="paper-abstract">
      <el-col :span="24">
        <el-skeleton v-if="isLoading" :rows="3" animated></el-skeleton>
        <p v-else class="abstract">{{ paper.abstract }}</p>
      </el-col>
    </el-row>

    <!-- 引用数据 -->
    <h2 class="section-title">论文引用</h2>
    <el-row class="paper-references">
      <el-col :span="24">
        <el-skeleton v-if="isLoading" :rows="2" animated></el-skeleton>
        <el-descriptions title="引用" border v-else>
          <el-descriptions-item>
            <ul>
              <li v-for="(reference, index) in paper.references" :key="index">
                <el-link v-if="reference.isReachable">{{ reference.title }}</el-link>
                <el-link v-else disabled>{{ reference.title }}</el-link>
              </li>
            </ul>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

    <h2 class="section-title">数据统计</h2>
    <el-row>
      <el-col :span="6">
        <el-statistic title="总浏览量" :value=views />
      </el-col>
      <el-col :span="6">
        <el-statistic title="总下载量" :value=downloads />
      </el-col>
    </el-row>


    <el-row justify="center" class="actions">
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
    </el-card>
  </el-card>
</template>


<script>
import { createRouter, createWebHistory } from 'vue-router';
import LoggedNavBar from "~/components/bar/logged-nav-bar.vue";
import { ARTICLE_API } from "~/utils/request.js"
import Reader from './Reader.vue';
import axios from 'axios';

const routes = [
  {
    path: '/reader',
    name: 'Reader',
    component: Reader,
    props: (route) => ({ url: route.query.url }), // 将 query 参数映射为 props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
//const id = "https://openalex.org/W1481824024"
export default {
  router,
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
        references: [
          {
            id: "1",
            title: "A Study on Neural Networks",
            authors: ["Doe, J.", "Smith, J."],
            isReachable: true,
          },
          {
            id: "2",
            title: "Ethics in AI Systems",
            authors: ["Johnson, A."],
            isReachable: false,
          },
        ],
        pdfUrl: "/test/test.pdf"
      },
      views: "101",
      downloads: "1001",
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
    };
  },
  created() {
    // 从 localStorage 中加载数据
    this.views = localStorage.getItem("views") || 101; // 默认值101
    this.downloads = localStorage.getItem("downloads") || 1001; // 默认值1001
    this.fetchData();
  },
  watch: {
    views(newVal) {
      // 当 views 更新时，将新值存储到 localStorage
      localStorage.setItem("views", newVal);
    },
    downloads(newVal) {
      // 当 downloads 更新时，将新值存储到 localStorage
      localStorage.setItem("downloads", newVal);
    }
  },
  methods: {
    async fetchData() {
      try {
        console.log(this.id)
        const response = await axios.get(ARTICLE_API, {
          params:{
            publicationId: this.id
          }
        });
        this.paper = this.transformBackendDataToPaper(response.data);
        this.isLoading = false;
      } catch (error) {
        console.log("error");
      } finally {
      }
    },
    downloadPaper() {
      this.downloads++;
      this.$message({
        message: "Downloading PDF...",
        type: "info",
      });

    },
    preview() {
      this.views++;
      this.$message({
        message: "Preview...",
        type: "success",
      });
      this.$router.push({
        name: "Reader", // 路由名称，需在路由配置中定义
        query: { url: this.paper.pdfUrl },
      });
    },
    goToAuthorPage(author) {
      this.$message({
        message: `Redirecting to ${author}'s profile...`,
        type: "info",
      });
    },
    goToKeywordPage(keyword) {
      this.$message({
        message: `Redirecting to articles related to ${keyword}...`,
        type: "info",
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
        references: backendData.references.map((ref, index) => ({
          id: ref.id, // 生成 ID
          title: ref.title,
          authors: [], // 无法从后端 JSON 获取，默认设置为空
          isReachable: ref.isReachable, // 假设所有文献都可访问，后续可以根据业务逻辑调整
        })),
        pdfUrl: backendData.pdfurl,
      };

      return paper;
    }
  },
};

</script>

<style scoped>
.paper-detail {
  margin: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.paper-title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  margin: 20px 0 10px 0;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 5px;
}

.author-button,
.keyword-button {
  margin-right: 8px;
  margin-bottom: 8px;
}

.metadata-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.paper-metadata {
  margin: 20px 0;
}

.paper-date {
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
}

.paper-abstract {
  margin: 20px 0;
}

.paper-references {
  margin: 20px 0;
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

.abstract {
  font-size: 16px;

}

.published-date {
  color: gray;
  font-weight: bold;
}


.nav-bar {
  position: fixed;
  z-index: 100;
  height: auto;
  left: 0;
  right: 0;
}
</style>
