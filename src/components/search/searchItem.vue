<template>
    <div class="container">
        <div class="tools">
            <div class="cite">
                <img src="/src/assets/iconfonts/search/cite.svg" alt="cite" width="20px" height="20px">
                <p>引用 ( {{ searchItem.citationCount }} )</p>
            </div>
        </div>
        <div class="title" :title="searchItem.title" @click="goToArticle(searchItem.id)">{{ searchItem.title }}</div>
        <div class="info">
            <span class="author" v-for="author in searchItem.authors.slice(0, 3)">{{ author }}</span>
            <span class="from" :title="searchItem.journal + ' - ' + searchItem.year">{{ searchItem.journal }} - {{
                searchItem.year }}</span>
        </div>
        <div class="content" @click="goToArticle(searchItem.id)">{{ searchItem.abstract }}</div>
        <div class="line"></div>
        <div class="label">
            <div class="label-item" v-for="(field, index) in searchItem.fields" @click="clickField(field)">{{ field }}</div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    searchItem: {
        type: Object,
        required: true,
    },
})


const emit = defineEmits(['openClaimForm']);
const openForm = () => {
    emit('openClaimForm', props.searchItem.id, props.searchItem.title);
};

const goToArticle = (id) => {
    const url = router.resolve({ path: '/article', query: { id: id } }).href;
      window.open(url, '_blank');
}

const clickField = (content) => {
    localStorage.setItem('searchOption', 3)
    localStorage.setItem('topicObj', '')
    localStorage.setItem('searchString', content)
    window.location.reload()
    // router.push('/search/result')
}

</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

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

.cite {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #d1d9e0;
    padding: 5px;
    background-color: #eff2f5;
    min-width: 60px;

    &:hover {
        background-color: #d7dfe6;
    }

    p {
        font-size: 13px;
        color: grey;
    }
}

/* 内容 */
.container {
    width: 100%;
    border: 1px solid grey;
    border-radius: 15px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
    padding: 20px;
    position: relative;
    margin: 20px auto;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
}

.title {
    width: 80%;
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

.info {
    width: 100%;
    height: 25px;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .author {
        padding: 0 10px;
        color: #0c7af7;
        border-right: 2px solid rgb(139, 139, 139);
    }

    .from {
        color: rgb(139, 139, 139);
        padding-left: 9px;
    }
}

.content {
    margin: 5px auto;
    padding: 0 10px;
    width: 100%;
    height: 70px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-style: italic;
    color: #777;
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

    &:hover {
        color: white;
        background-color: #0969da;
    }
}
</style>
