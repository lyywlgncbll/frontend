<template>
    <loggedNavBar></loggedNavBar>
    <div id="hotTopic" class="hotTopic">
        <div class="title">
            <h1>热点话题</h1>
            <p>See what the CCBridge community is most excited about today.</p>
        </div>
        <div class="container">
            <div class="header">
                <div class="range">
                    <span>时间范围：</span>
                    <button>今日</button>
                </div>
            </div>
            <topicItem v-for="item in hotTopics" :item="item"></topicItem>
        </div>
    </div>
</template>

<script setup>
import loggedNavBar from '@/components/bar/logged-nav-bar.vue';
import topicItem from '@/components/hotTopic/topicItem.vue';
import {ref} from 'vue';
const hotTopics=ref([
    {
        title:"The Importance of Time Management",
        content:"Effective time management is crucial for achieving personal and professional goals. By organizing tasks and prioritizing responsibilities, individuals can boost their productivity and efficiency. Good time management helps reduce stress and ensures that important tasks are completed on time. Setting clear goals and creating a structured plan can make all the difference in accomplishing what matters most.",
        keywords:[
            "time management","productivity, goals","efficiency","planning"
        ]
    },
    {
        title:"The Benefits of Reading Books",
        content:"Reading books offers numerous benefits beyond just acquiring knowledge. It helps stimulate the imagination and improves cognitive abilities by exposing the reader to new ideas and perspectives. Whether fiction or non-fiction, books can broaden one's worldview and provide a sense of escapism. Additionally, reading is known to reduce stress, enhance focus, and improve mental health by engaging the mind in a way that promotes relaxation and mental clarity.",
        keywords:[
            "reading","books", "knowledge","efficiency","planning"
        ]
    },
])
</script>

<style scoped>
.hotTopic{
    height: 100vh;
}

.title{
    margin-top: 50px;
    margin-bottom: 40px;
    font-family: BlinkMacSystemFont;
    h1{
        font-size: 35px;
        font-weight: bold;
        letter-spacing: 1rem;
        text-align: center;
    }
    p{
        margin-top: 10px;
        text-align: center;
        color: #7d7f82;
    }
}

.container{
    max-width: 1012px;
    margin: 0 auto;
    border: 1px solid #d1d9e0;
    border-radius: 10px;
}

.header{
    width: 100%;
    height: 70px;
    background-color: #f6f8fa;
    border: 1px solid #d1d9e0;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .range{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: 50px;
        color: #636a72;
        button{
            color: #3d434a;
            font-weight: 510;
        }
    }
}
</style>
