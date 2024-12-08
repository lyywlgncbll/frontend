<template>
    <div id="topicItem" class="topicItem">
        <div class="time">
            <img src="/src/assets/iconfonts/hotTopic/clock.svg" class="icon">
            <span>4小时前</span>
        </div>
        <div class="topic">
            {{item.title}}
        </div>
        <div class="before"></div>
        <div class="content">
            {{ item.content }}
        </div>
        <div class="after"></div>
        <div class="keywords" >
            <div class="keyword" v-for="keyword in item.keywords">{{ keyword }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props=defineProps({
    item:Object,
})

</script>

<style scoped>
.topicItem{
    position: relative;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #d1d9e0b3;
    padding: 20px;
    .topic{
        margin-top: 5px;
        width: 80%;
        font-size: 30px;
        font-weight: bold;
        font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
        line-height: 1.4;
        letter-spacing: 0.5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-style: italic;
    }
}

.time{
    position: absolute;
    right: 60px;
    top:25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
    span{
        font-size: 15px;
        color: #767a7b;
    }
}

.before{
    border-left: .25em solid grey;
    background-color: #f6f8fa;
    width: 100%;
    height: 10px;
    border-top-right-radius: 10px;
    margin-top: 10px;
}

.after{
    border-left: .25em solid grey;
    background-color: #f6f8fa;
    width: 100%;
    height: 10px;
    border-bottom-right-radius: 10px;
    margin-bottom: 10px;
}

.content{
    border-left: .25em solid grey;
    background-color: #f6f8fa;
    color: #767a7b;
    padding: 0 18px;
    font-size: 18px;

    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}

.keywords{
    margin: 15px auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .keyword{
        font-size: 12px;
        display: inline-block;
        padding: 2px 12px;
        font-weight: 500;
        border-radius: 2em;
        line-height: 22px;
        background-color: #ddf4ff;
        color: #0969da;
        cursor: pointer;

        &:hover {
            color: white;
            background-color: #0969da;
        }
    }
}
</style>
