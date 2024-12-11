<template>
    <div id="topic-item" class="nav" v-if="topic != ''">
        <div class="container" @mouseenter="hover = true" @mouseleave="hover = false">
            <div class="title" :class="{ expand: hover }" :title="topic.name">
                Topic: {{ topic.name }}
            </div>
            <div class="before" v-show="hover"></div>
            <div class="content" v-show="hover">
                {{ topic.description }}
            </div>
            <div class="after" v-show="hover"></div>
            <div class="keywords" v-show="hover">
                <div class="keyword" v-for="keyword in topic.keywords" title="keyword">{{ keyword }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const topic = ref('')
const hover = ref(false)
onMounted(() => {
    if (localStorage.getItem('topicObj')) {
        topic.value = JSON.parse(localStorage.getItem('topicObj'))
    }
})
</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 5px 10px;
    margin: 10px auto;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 5px 20px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 25px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--content-color);

    &.expand {
        color: black;
        transition: all .5s ease;
    }
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
