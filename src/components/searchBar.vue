<template>
    <div class="sidebar">
        <div v-for="(item, index) in menuItems" :key="index" class="menu-item">
            <div class="menu-title" @click="toggleItem(index)">
                {{ item.title }}
                <span :class="{ rotated: expandedIndexes.includes(index) }">v</span>
            </div>

            <div class="menu-content" :class="{ expand: expandedIndexes.includes(index) }">
                <p v-for="(content, i) in item.contents" :key="i">{{ content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
    { title: '主题', contents: ['内容 1', '内容 2', '内容 3'] },
    { title: '来源', contents: ['内容 1', '内容 2', '内容 3'] },
    { title: '学科', contents: ['内容 1', '内容 2', '内容 3'] },
    { title: '作者', contents: ['内容 1', '内容 2', '内容 3'] },
]);

// 使用数组记录多个展开的索引
const expandedIndexes = ref([]);

const toggleItem = (index) => {
    if (expandedIndexes.value.includes(index)) {
        // 如果该项已展开，移除索引
        expandedIndexes.value = expandedIndexes.value.filter(i => i !== index);
    } else {
        // 如果该项未展开，添加索引
        expandedIndexes.value.push(index);
    }
};
</script>

<style scoped>
.sidebar {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
}

.menu-item {
    margin-bottom: 12px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 3px 5px -4px;
}

.menu-title {
    background-color: #bee1f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
}

.menu-title span.rotated {
    transform: rotate(180deg);
    transition: transform 0.3s;
}

.menu-content {
    overflow: hidden;
    background-color: #f0f8ff;
    height: 0;
    transition: all 1s;
    padding: 0 10px;
}

.expand {
    height: 100px;
    padding: 10px;
}
</style>
