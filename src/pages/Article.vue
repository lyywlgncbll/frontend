<template>
  <el-card class="paper-detail">
    <!-- 标题 -->
    <h1 class="paper-title">{{ paper.title }}</h1>

    <!-- 元数据 -->
    <h2 class="section-title">论文信息</h2>
    <el-row class="paper-metadata" gutter="20">
      <!-- 作者 -->
      <el-col :span="12">
        <el-descriptions title="作者" border>
          <el-descriptions-item>
            <el-button
              v-for="author in paper.authors"
              :key="author"
              class="author-button"
              type="text"
              @click="goToAuthorPage(author)"
            >
              {{ author }}
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>

      <!-- 关键词 -->
      <el-col :span="12">
        <el-descriptions title="关键词" border>
          <el-descriptions-item>
            <el-button
              v-for="keyword in paper.keywords"
              :key="keyword"
              type="text"
              class="keyword-button"
              @click="goToKeywordPage(keyword)"
            >
              {{ keyword }}
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

    <!-- 发表日期 -->
    <el-row class="paper-date" gutter="20">
      <el-col :span="24">
        <el-descriptions title="发布日期" border>
          <el-descriptions-item>
            {{ paper.publishedDate }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

    <!-- 摘要 -->
    <h2 class="section-title">论文概述</h2>
    <p>{{ paper.abstract }}</p>

    <!-- 引用数据 -->
    <h2 class="section-title">论文引用</h2>
    <el-row class="paper-references">
      <el-col :span="24">
        <el-descriptions title="Citations" border>
          <el-descriptions-item>
            <ul>
              <li v-for="(reference, index) in paper.references" :key="index">
                {{ reference }}
              </li>
            </ul>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

    <!-- 操作按钮 -->
    <el-row justify="center" class="actions">
      <el-button type="primary" icon="el-icon-download" @click="downloadPaper">
        Download PDF
      </el-button>
      <el-button type="success" icon="el-icon-document" @click="preview">
        Preview
      </el-button>
    </el-row>
  </el-card>
</template>


<script>
export default {
  name: "PaperDetail",
  data() {
    return {
      paper: {
        title: "A Comprehensive Study on Artificial Intelligence",
        authors: ["John Doe", "Jane Smith", "Alice Johnson"],
        publishedDate: "2024-11-17",
        abstract:
          "This paper explores the latest advancements in artificial intelligence (AI), covering topics such as neural networks, natural language processing, and the ethical implications of AI systems.",
        keywords: ["AI", "Neural Networks", "Ethics", "NLP", "Machine Learning"],
        references: [
          "Doe, J., Smith, J. (2023). A Study on Neural Networks. Journal of AI Research.",
          "Johnson, A. (2022). Ethics in AI Systems. Ethics in Technology Review.",
          "Lee, K. et al. (2021). Machine Learning Algorithms. AI and Machine Learning Journal."
        ],
      },
    };
  },
  methods: {
    downloadPaper() {
      this.$message({
        message: "Downloading PDF...",
        type: "info",
      });
    },
    preview() {
      this.$message({
        message: "Preview...",
        type: "success",
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

.paper-metadata {
  margin: 20px 0;
}

.paper-date {
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
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

</style>
