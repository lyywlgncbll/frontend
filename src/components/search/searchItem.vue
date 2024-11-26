<template>
    <div class="container">
        <div class="tools">
            <div class="cite">
                <img src="/src/assets/search/icon/cite.svg" alt="cite" width="20px" height="20px">
                <p>引用</p>
            </div>
            <div class="patronise">
                <img src="/src/assets/search/icon/patronise.svg" alt="patronise" width="20px" height="20px">
                <p>点赞</p>
            </div>
            <div class="claim" @click="openForm">
                <p>认领</p>
            </div>
        </div>
        <div class="title">{{ searchItem.title }}</div>
        <span class="author">{{ searchItem.author }}</span>
        <span class="from">{{ searchItem.from }} - {{ searchItem.time }}</span>
        <div class="content">{{ searchItem.content }}</div>
        <div class="line"></div>
        <div class="label">
            <div class="label-item" v-for="(labelItem, index) in searchItem.label">{{ labelItem }}</div>
        </div>
        <div class="cited-num">被引次数：{{ searchItem.num }} 次</div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    searchItem: {
        type: Object,
        required: true,
    },
})


const emit = defineEmits(['openClaimForm']);
const openForm = () => {
    emit('openClaimForm',props.searchItem.id); 
};

</script>

<style scoped>
/* 装饰 */
.tools {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    position: absolute;
    top: 13px;
    right: 10px;
}

.cite,
.patronise,
.claim {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #d1d9e0;
    padding: 5px;
    background-color: #eff2f5;
    width: 60px;
}

.claim {
    background-color: #1599db;
    color: white;

}

.cite:hover,
.patronise:hover {
    background-color: #d7dfe6;
}

.claim:hover {
    background-color: #0687d7;
}

.cite p,
.patronise p,
.claim p {
    font-size: 13px;
}

.cite p,
.patronise p {
    color: grey;
}

.claim p {
    color: white;
    font-weight: bold;
    letter-spacing: 2px;
}


/* 内容 */
.container {
    width: 100%;
    border: 1px solid grey;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
    padding: 20px;
    position: relative;
    margin: 20px auto;
}

.title {
    width: 70%;
    font-size: 30px;
    font-weight: bold;
    font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
    line-height: 1.4;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.author {
    padding-right: 10px;
    color: #0c7af7;
    text-decoration: underline;
    cursor: pointer;
    border-right: 2px solid rgb(139, 139, 139);
}

.from {
    color: rgb(139, 139, 139);
    padding-left: 9px;
}

.content {
    margin: 5px auto;
    width: 100%;
    height: 70px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.line {
    width: 100%;
    height: 1px;
    border: 1px solid rgb(181, 180, 180);
    margin: 15px auto;
}

.label {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.label-item {
    font-size: 12px;
    display: inline-block;
    padding: 2px 12px;
    font-weight: 500;
    border-radius: 2em;
    line-height: 22px;
    background-color: #ddf4ff;
    color: #0969da;
    cursor: pointer;
}

.label-item:hover {
    color: white;
    background-color: #0969da;
}

.cited-num {
    width: 200px;
    font-size: 14px;
    color: grey;
    margin-left: auto;
    text-align: right;
}

</style>
