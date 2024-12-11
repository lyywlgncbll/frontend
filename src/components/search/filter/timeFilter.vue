<template>
    <div class="menu-item">
        <div class="menu-title" @click="handleDExpand">
            {{ item.title }}
            <span>
                <img v-if="dexpand" src="/src/assets/iconfonts/search/down-expand2.svg" alt="" width="15px" height="15px">
                <img v-else src="/src/assets/iconfonts/search/down-expand2.svg" alt="" width="15px" height="15px"
                    :style="{ transform: 'rotate(180deg)' }">
            </span>
        </div>
        <ul class="menu-content" :class="{ expand: dexpand }">
            <div class="range">
                <input placeholder="起始年份" type="number" v-model.number="beginYear">
                <span>--</span>
                <input placeholder="终止年份" type="number" v-model.number="endYear">
            </div>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    isExpand: Boolean,
    item: Object,
})

const emit = defineEmits(['yearChanged'])

// 菜单展开
const dexpand = ref(false)
const handleDExpand = () => {
    dexpand.value = !dexpand.value
}

const beginYear = ref()
const endYear = ref()
const selectedContents = ref([])

watch([beginYear, endYear], ([newBeginYear, newEndYear]) => {
    if (newBeginYear && newEndYear && newBeginYear > 1900 && newEndYear >= newBeginYear) {
        selectedContents.value = Array.from({ length: newEndYear - newBeginYear + 1 }, (_, i) => newBeginYear + i);
        console.log(selectedContents.value);
    } else {
        selectedContents.value = []
    }
})
watch(selectedContents, (newValue) => {
    emit('yearChanged', newValue)
})

</script>

<style scoped>
@import "@/assets/theme-colors.css";
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
    overflow: hidden;
    height: 0;
    transition: all 1s;
    padding: 0 10px;
    position: relative;

    li:nth-child(1) {
        margin-top: 15px;
    }

    .range {
        margin: 0 auto;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
            padding: 10px;
            width: 40%;
            height: 25px;
            outline: none;
            border: 1px solid var(--bar-input-border-color);
            border-radius: 3px;
            margin: 0 3px;
            font-size: 14px;
        }

        input::placeholder {
            font-size: 14px;
            text-align: center;
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }
    }
}

.menu-content.expand {
    height: 40px;
    padding: 0 10px;
}

.content-item {
    display: flex;
    align-items: center;
    padding: 2px 15px;
    margin: 5px auto;
    white-space: nowrap;

    input {
        margin-right: 8px;
        cursor: pointer;
    }

    span {
        text-align: center;
        font-size: 15px;
        cursor: pointer;
        color: #333;
        white-space: nowrap;
    }
}
</style>
