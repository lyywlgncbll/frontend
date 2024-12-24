<template>
    <div class="menu-item" id="filter-root">
        <div class="menu-title" @click="handleDExpand">
            {{ item.title }}
            <span>
                <img v-if="dexpand" src="/src/assets/iconfonts/search/down-expand2.svg" alt="" width="15px"
                     height="15px">
                <img v-else src="/src/assets/iconfonts/search/down-expand2.svg" alt="" width="15px" height="15px"
                     :style="{ transform: 'rotate(180deg)' }">
            </span>
        </div>
        <div class="menu-content" :class="{ expand: dexpand }">
            <input type="text" v-model="searchQuery" :placeholder="'查找/添加' + item.title"/>
            <button class="add-button" @click="addContent">add</button>
            <div class="buttons" :class="{collapsed:!isExpand}">
                <div v-for="(content, i) in filteredContents" :key="i" class="content-button"
                     :class="{ 'selected': isChecked(content) }" @click="handleSelection(content)">
                    {{ content }}
                </div>
            </div>

        </div>
        <div class="line"></div>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue'

const props = defineProps({
    isExpand: Boolean,
    item: Object,
})
const emit = defineEmits(['fieldChanged'])

// 菜单展开
const dexpand = ref(false)
const handleDExpand = () => {
    dexpand.value = !dexpand.value
}

// 搜索框内容
const searchQuery = ref('')

// 保存选中的内容
const selectedContents = ref([])

// 监听 selectedContents 的变化，并向父组件传递
watch(selectedContents, (newValue) => {
    emit('fieldChanged', newValue)
}, {deep: true})

// 过滤后的内容
const filteredContents = computed(() => {
    // 根据搜索框输入的内容，过滤出匹配的项
    if (!searchQuery.value) {
        return props.item.contents || []
    }
    const query = searchQuery.value.toLowerCase()
    return (props.item.contents || []).filter(content => content.toLowerCase().includes(query))
})

// 检查内容是否被选中
const isChecked = (content) => {
    return selectedContents.value.includes(content)
}

// 处理按钮点击
const handleSelection = (content) => {
    // 如果已选中则取消选中，否则选中
    if (isChecked(content)) {
        selectedContents.value = selectedContents.value.filter(item => item !== content)
    } else {
        selectedContents.value.push(content)
    }
}

//自行添加筛选内容
const addContent = () => {
    const newContent = searchQuery.value.trim();
    if (newContent && !props.item.contents.includes(newContent)) {
        // 添加到原始数据中
        props.item.contents.push(newContent);
        // 清空输入框
        searchQuery.value = '';
    }
};
</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.menu-item {
    overflow: hidden;

    .line {
        margin: 10px auto;
        width: 100%;
        border: var(--line-border-color) 1px solid;
    }

    ::-webkit-scrollbar {
        display: none;
    }
}

.menu-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
}

.menu-content {
    overflow-y: scroll;
    height: 0;
    transition: all 1s;
    padding: 0 10px;
    position: relative;
    max-height: 300px;

    li:nth-child(1) {
        margin-top: 15px;
    }

    input[type="text"] {
        width: 70%;
        height: 30px;
        padding: 10px;
        margin: 3px auto;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        outline: none;
        font-size: 14px;
    }

    input[type="text"]::placeholder {
        font-size: 14px;
    }

    .add-button{
        display: inline-block;
        margin-left: 12px;
        font-size: 15px;
        color: #959595;
        border:1px solid var(--border-color);
        padding: 3px 8px;
        border-radius: 10px;
        transition: background-color 0.3s;
        &:hover {
            background-color: var(--button-background-color);
        }
    }
}

.menu-content.expand {
    height: calc-size(auto, size);
    padding: 0 10px;
}

.buttons {
    margin-top: 15px;

    .content-button {
        font-size: 12px;
        display: inline-block;
        margin: 3px 2px;
        padding: 2px 12px;
        font-weight: 500;
        border-radius: 2em;
        line-height: 22px;
        background-color: var(--button-background-color);
        color: var(--button-color);
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
            background-color: var(--button-background-hover-color);
        }

        &.selected {
            background-color: var(--button-background-hover-color);
        }

    }
}
</style>
