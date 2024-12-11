<template>
  <div class="hot-topics-container" id="page-root">
    <h2 class="section-title" @click="toHotTopic">热点话题</h2>
    <div class="topics-list">
      <div
          v-for="(topic, index) in topics"
          :key="index"
          class="topic-card"
      >
        <!-- Display name, worksCount, and citedByCount initially -->
        <div class="topic-info">
          <h3 class="topic-title" @click="searchHotTopic(topic)">{{ topic.name }}</h3>
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
                @click="searchKeyWord(tag)"
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
import router from "@/router/index.js";

export default {
  name: 'HotTopics',
  methods:{
    toHotTopic(){
      router.push('/hotTopic');
    },
    searchHotTopic(topic){
      localStorage.setItem('searchOption', 1)
      localStorage.setItem('searchString', '')
      localStorage.setItem('topicObj', JSON.stringify(topic))
      router.push('search/result')
    },
    searchKeyWord(keyword){
      localStorage.setItem('searchOption', 5)
      localStorage.setItem('topicObj', '')
      localStorage.setItem('searchString', keyword)
      router.push('search/result')
    }
  },
  setup() {
    const topics=ref([]);
    const getTopK=async ()=>{
      try {
        const response = await axios.get(GET_TOP_K_API+"?k=10");

        if (response.data && response.status === 200) {
          console.log("获取topic成功");
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
      // topics: [
      //   {
      //     id: "https://openalex.org/T10077",
      //     name: "Molecular Mechanisms of Synaptic Plasticity and Neurological Disorders",
      //     description: "This cluster of papers explores the molecular mechanisms underlying synaptic plasticity, focusing on neurotransmission, GABAergic and glutamatergic systems, neuronal circuits, astrocyte function, NMDA receptors, dendritic spines, and long-term potentiation. The research also investigates the relevance of these mechanisms to neurological disorders.",
      //     updatedDate: "2024-12-02",
      //     createdDate: "2024-01-23",
      //     worksCount: 191639,
      //     citedByCount: 8005974,
      //     keywords: [
      //       "Synaptic Plasticity", "Neurotransmission", "GABAergic", "Glutamate Receptors",
      //       "Neuronal Circuits", "Astrocyte Function", "NMDA Receptors", "Dendritic Spines",
      //       "Long-Term Potentiation", "Neurological Disorders"
      //     ]
      //   },
      //   {
      //     id: "https://openalex.org/T10078",
      //     name: "The Evolution of Artificial Intelligence and Machine Learning",
      //     description: "This cluster explores the historical development of artificial intelligence, from its inception to modern machine learning techniques, and its future prospects in transforming industries.",
      //     updatedDate: "2024-12-03",
      //     createdDate: "2023-06-15",
      //     worksCount: 125678,
      //     citedByCount: 5734123,
      //     keywords: [
      //       "Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks",
      //       "AI in Industry", "Automation", "Future Technology"
      //     ]
      //   },
      //   {
      //     id: "https://openalex.org/T10079",
      //     name: "Advances in Genomic Medicine and Personalized Healthcare",
      //     description: "This research cluster discusses the latest advances in genomics, and their impact on personalized medicine and healthcare, with an emphasis on precision diagnostics and treatments.",
      //     updatedDate: "2024-11-28",
      //     createdDate: "2023-08-30",
      //     worksCount: 98765,
      //     citedByCount: 4203981,
      //     keywords: [
      //       "Genomics", "Personalized Medicine", "Healthcare", "Precision Medicine", "Genetic Disorders",
      //       "CRISPR", "Bioinformatics"
      //     ]
      //   },
      //   {
      //     id: "https://openalex.org/T10080",
      //     name: "Sustainable Urban Development and Smart Cities",
      //     description: "Exploring the intersection of urbanization, sustainability, and technology, this cluster focuses on the development of smart cities and sustainable urban planning strategies.",
      //     updatedDate: "2024-11-15",
      //     createdDate: "2023-04-25",
      //     worksCount: 65432,
      //     citedByCount: 2871012,
      //     keywords: [
      //       "Smart Cities", "Sustainability", "Urban Planning", "Renewable Energy", "Green Architecture",
      //       "IoT", "Urban Mobility"
      //     ]
      //   },
      //   {
      //     id: "https://openalex.org/T10081",
      //     name: "Exploring the Impact of Climate Change on Global Agriculture",
      //     description: "This research cluster investigates the effects of climate change on agriculture, including the challenges and solutions for food security, crop production, and sustainable farming.",
      //     updatedDate: "2024-12-01",
      //     createdDate: "2023-09-10",
      //     worksCount: 83421,
      //     citedByCount: 2569821,
      //     keywords: [
      //       "Climate Change", "Agriculture", "Food Security", "Sustainable Farming", "Crop Yield",
      //       "Environmental Science", "Agricultural Technology"
      //     ]
      //   },
      //   {
      //     id: "https://openalex.org/T10082",
      //     name: "The Role of Blockchain in Supply Chain Management",
      //     description: "Examining the role of blockchain technology in enhancing transparency, traceability, and security in global supply chains. This cluster explores real-world applications and challenges.",
      //     updatedDate: "2024-12-01",
      //     createdDate: "2023-11-05",
      //     worksCount: 231456,
      //     citedByCount: 1890234,
      //     keywords: [
      //       "Blockchain", "Supply Chain", "Logistics", "Cryptocurrency", "Digital Ledger",
      //       "Traceability", "Transparency"
      //     ]
      //   }
      // ]
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
  //font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
}

.topics-list {
  overflow: scroll;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge 隐藏滚动条 */
  }
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 50px);
  gap: 15px; /* 间距 */
}
.topic-card {
  width: 98%;
  background-color: #fff;
  padding: 12px;
  border-radius: 6px;
  //border: var(--page-border-color) 1px solid;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  //cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.topic-card:hover{
  //transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.topic-card:hover .topic-details {
  max-height: 1000px; /* 或者设置为你需要的最大值 */
  opacity: 1;
  visibility: visible;
  transition: opacity 0.4s ease, visibility 0.4s ease, max-height 0.4s ease;
}

.topic-card .topic-details {
  opacity: 0;
  visibility: hidden;
  max-height: 0;
  transition: opacity 0.4s ease, visibility 0.4s ease, max-height 0.4s ease;
}


.topic-info {
  text-align: left;
}

.topic-title {
  //font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
}

.topic-stats {
  //font-size: 14px;
  color: #777;
  display: flex;
  gap: 15px;
}

.topic-description {
  //font-size: 14px;
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
  //font-size: 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.topic-tag:hover {
  background-color: #bdbdbd;
}

* {
  .section-title {
    font-size: 18px;
  }

  .topic-title {
    font-size: 16px;
  }
  .topic-info{
    font-size: 13px;
  }

  .topic-description {
    font-size: 13px;
    font-style: italic;
    padding: 5px 0;
  }

  .topic-tag {
    font-size: 11px;
  }
}
</style>
