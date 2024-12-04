<template>
    <div :class="{ sidebar: true, collapsed: !isExpand }">
        <div v-for="(item, index) in menuItems" :key="index" class="menu-item">
            <div class="menu-title" @click="toggleItem(index)">
                {{ item.title }}
                <span>
                    <img v-if="expandedIndexes.includes(index)" src="/src/assets/search/icon/down-expand.svg" alt=""
                        width="15px" height="15px">
                    <img v-else src="/src/assets/search/icon/down-expand.svg" alt=""
                        width="15px" height="15px" :style="{ transform: 'rotate(180deg)' }">
                </span>
            </div>

            <ul class="menu-content" :class="{ expand: expandedIndexes.includes(index) }">
                <li v-for="(content, i) in item.contents" :key="i" class="content-item">
                    <label>
                        <input type="checkbox" :value="content" @change="handleTimeSelection(content)">
                        <span>{{ content }}</span>
                    </label>
                </li>
                <div class="icon-container" v-show="item.contents.length > 3">
                    <img src="/src/assets/search/icon/expand.svg" class="icon">
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'

// 定义 props 接收父组件传递的数据
const props = defineProps({
    isExpand: Boolean,
    menuItems: {
        type: Array,
        required: true,
    }
})

// 定义 emits，用于向父组件传递事件
const emit = defineEmits(['timeSelected'])

// 存储展开的菜单索引
const expandedIndexes = ref([])

// 切换菜单展开状态
const toggleItem = (index) => {
    if (expandedIndexes.value.includes(index)) {
        expandedIndexes.value = expandedIndexes.value.filter(i => i !== index)
    } else {
        expandedIndexes.value.push(index)
    }
}

// 处理时间选择的函数
const handleTimeSelection = (selectedTime) => {
    // 将选中的时间传递给父组件
    emit('timeSelected', parseInt(selectedTime))
}
</script>

<style scoped>
.sidebar {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    position: relative;
    transition: all 0.3s ease;
    min-width: 200px;
}

.sidebar.collapsed {
    transform: translateX(-100%);
}

.menu-item {
    margin-bottom: 12px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
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

.menu-title:hover {
    background-color: #9ecae9;
}

.menu-content {
    overflow: hidden;
    background-color: #f0f8ff;
    height: 0;
    transition: all 1s;
    padding: 0 10px;
    position: relative;
}

.menu-content li:nth-child(1) {
    margin-top: 15px;
}

.content-item {
    display: flex;
    align-items: center;
    padding: 2px 15px;
    margin: 5px auto;
}

.content-item input {
    margin-right: 8px;
    cursor: pointer;
}

.content-item span {
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    color: #333;
}

.expand {
    height: 130px;
    padding: 0 10px;
}

.icon-container {
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}

.icon {
    height: 12px;
    width: 12px;
}
</style>
