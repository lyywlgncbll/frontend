<template>
    <div id="topic-item" class="topicItem">
        <div class="index">{{ index + 1 }}</div>
        <div class="topic" :title="'Topic'" @click="clickTopic()">
            {{ item.name }}
        </div>
        <div class="info">
            <div class="works">Works: {{ item.worksCount }}</div>
            <div class="cited">Cited By: {{ item.citedByCount }}</div>
            <div class="createdDate">Created: {{ item.createdDate }}</div>
            <div class="updatedDate">Updated: {{ item.updatedDate}}</div>
        </div>
        <div class="before"></div>
        <div class="content">
            {{ item.description }}
        </div>
        <div class="after"></div>
        <div class="keywords">
            <div class="keyword" v-for="keyword in item.keywords" @click="clickKeyword(keyword)">{{ keyword }}</div>
        </div>
    </div>
</template>

<script setup>
import router from "@/router/index.js";
const props = defineProps({
    item: Object,
    index: Number
})

const clickTopic = () => {
    localStorage.setItem('searchString', '')
    localStorage.setItem('topicObj', JSON.stringify(props.item))
    router.push('search/result')
}
const clickKeyword = (content) => {
    localStorage.setItem('searchOption', 2)
    localStorage.setItem('topicObj', '')
    localStorage.setItem('searchString', content)
    router.push('search/result')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');

.topicItem {
    position: relative;
    width: 100%;
    padding: 10px;
    border-top: 1px solid var(--border-color);
    padding: 20px;

    .topic {
        margin-top: 5px;
        width: 80%;
        font-size: 30px;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
        font-style: italic;
        line-height: 1.4;
        letter-spacing: 0.5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
}

.info {
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 3px 5px;
    color: var(--info-color);
    font-size: 15px;
    font-style: italic;

    .works {
        margin-right: 10px;
    }

    .cited {
        margin: 0 10px;
    }

    .createdDate {
        margin-left: 10px;
    }

    .updatedDate{
        margin-left: 10px;
    }
}

.index {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 40px;
    top: 25px;
    padding: 20px;
    font-size: 22px;
    font-family: 'Orbitron', sans-serif;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, var(--index-background-from-color), var(--index-background-to-color));
    color: var(--keyword-hover-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}

.before {
    border-left: 5px solid var(--content-border-color);
    background-color: var(--content-background-color);
    width: 100%;
    height: 10px;
    border-top-right-radius: 10px;
    margin-top: 10px;
}

.after {
    border-left: 5px solid var(--content-border-color);
    background-color: var(--content-background-color);
    width: 100%;
    height: 10px;
    border-bottom-right-radius: 10px;
    margin-bottom: 10px;
}

.content {
    border-left: 5px solid var(--content-border-color);
    background-color: var(--content-background-color);
    color: var(--info-color);
    padding: 0 18px;
    font-size: 19px;
    font-family: 'Nunito', sans-serif;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.keywords {
    margin: 15px auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .keyword {
        font-size: 12px;
        display: inline-block;
        padding: 2px 12px;
        font-weight: 500;
        border-radius: 2em;
        line-height: 22px;
        background-color: var(--keyword-background-color);
        color: var(--keyword-color);
        cursor: pointer;

        &:hover {
            color: white;
            background-color: var(--keyword-color);
        }
    }
}
</style>
