<template>
    <div :class="{ sidebar: true, collapsed: !isExpand }">
        <div v-for="(item, index) in menuItems" :key="item.id" class="menu-item">
            <div class="menu-title" @click="toggleItem(index)">
                {{ item.title }}
                <span>
                    <img v-if="expandedIndexes.includes(index)" src="/src/assets/search/icon/down-expand.svg" alt=""
                        width="15px" height="15px">
                    <img v-else src="/src/assets/search/icon/down-expand.svg" alt="" width="15px" height="15px"
                        :style="{ transform: 'rotate(180deg)' }">
                </span>
            </div>

            <ul class="menu-content" :class="{ expand: expandedIndexes.includes(index) }">
                <li v-for="(content, i) in item.contents" :key="i" class="content-item">
                    <label>
                        <input type="checkbox" :value="content">
                        <span>{{ content }}</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
    isExpand: Boolean,
    menuItems: {
        type: Array,
        required: true,
    }
})


const expandedIndexes = ref([])

// 切换菜单展开状态
const toggleItem = (index) => {
    if (expandedIndexes.value.includes(index)) {
        expandedIndexes.value = expandedIndexes.value.filter(i => i !== index)
    } else {
        expandedIndexes.value.push(index)
    }
}

</script>

<style scoped>
.sidebar {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    position: relative;
    transition: all 0.3s ease;
    min-width: 150px;
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
    white-space: nowrap;
}

.menu-title:hover {
    background-color: #9ecae9;
}

.menu-content {
    overflow-y: scroll;
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
    white-space: nowrap;
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
    white-space: nowrap;
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
