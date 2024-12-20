<template>
    <loggedNavBar></loggedNavBar>
    <div id="hot-topic" class="hotTopic">
        <div class="title">
            <h1>热点话题</h1>
            <p>See what the CCBridge community is most excited about today.</p>
        </div>
        <div class="container">
            <div class="header">
                <div class="info">Topic & Keywords</div>
                <div class="range">
                    <span>时间范围：</span>
                    <button>今年</button>
                </div>
            </div>
            <topicItem v-for="(item, i) in hotTopics" :item="item" :index="i"></topicItem>
        </div>
    </div>
</template>

<script setup>
import loggedNavBar from '@/components/bar/logged-nav-bar.vue';
import topicItem from '@/components/hotTopic/topicItem.vue';
import axios from "@/utils/axios.js";
import { GET_TOP_K_API } from "@/utils/request.js";
import { onMounted } from "vue";
import { ref } from 'vue';
const hotTopics = ref([])

const getTopK = async () => {
    try {
        const response = await axios.get(GET_TOP_K_API + "?k=10");
        if (response.data && response.status === 200) {
            hotTopics.value = response.data.map(item => {
                if (item.keywords) {
                    // 将JSON数组转化为JS数组
                    try {
                        item.keywords = JSON.parse(item.keywords)
                    } catch (e) {
                        console.error("解析 keywords 字段失败:", e)
                    }
                }
                return item
            })
        } else {
            console.error("获取数据失败:", response.data.message);
        }
    } catch (error) {
        console.error("请求失败:", error);
    }
}

onMounted(() => {
    getTopK()
})
</script>

<style scoped>
@import '../../assets/theme-colors.css';

.hotTopic {
    height: 100vh;
}

.title {
    margin-top: 50px;
    margin-bottom: 40px;
    font-family: BlinkMacSystemFont;

    h1 {
        font-size: 35px;
        font-weight: bold;
        letter-spacing: 1rem;
        text-align: center;
    }

    p {
        margin-top: 10px;
        text-align: center;
        color: var(--p-color);
    }
}

.container {
    max-width: 1012px;
    margin: 0 auto;
    border: 1px solid var(--border-color);
    border-radius: 10px;
}

.header {
    width: 100%;
    height: 70px;
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    .range {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: 50px;
        color: var(--div-color);

        button {
            color: var(--button-color);
            font-weight: 510;
        }
    }

    .info {
        color: var(--div-color);
        margin-left: 10px;
        font-weight: 550;
    }
}
</style>
