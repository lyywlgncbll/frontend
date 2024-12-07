<template>
    <div class="nav" id="filter-root">
        <ul class="sort" @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick">
            <li>综合</li>
            <li class="sort-year">年份 <img src="/src/assets/search/icon/down-expand2.svg"
                    :style="{ transform: yearRotate ? 'rotate(180deg)' : 'rotate(0deg)' }"></li>
            <li class="sort-cite">引用 <img src="/src/assets/search/icon/down-expand2.svg"
                    :style="{ transform: citeRotate ? 'rotate(180deg)' : 'rotate(0deg)' }"></li>
            <li class="slide"></li>
            <li class="slide2"></li>
        </ul>
        <span>共查询到 <i>{{ num }}</i> 条结果</span>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
const props = defineProps({
    num: Number
})
const emit = defineEmits(['sortChanged'])
onMounted(() => {
    const target = document.querySelector('.nav li')
    const slider = document.querySelector('.slide')
    const slider2 = document.querySelector('.slide2')
    const targetWidth = target.offsetWidth;
    const sliderWidth = slider.offsetWidth;
    const halfDifference = target.offsetLeft - (sliderWidth - targetWidth) / 2
    slider.style.left = halfDifference + 'px'
    slider2.style.left = -50 + 'px'
})

//导航栏
const yearRotate = ref(false)
const citeRotate = ref(false)
const handleClick = (event) => {
    let target = event.target
    const slider = document.querySelector('.slide')
    const slider2 = document.querySelector('.slide2')
    const sliderWidth = slider.offsetWidth;
    if (target.tagName == 'LI' && !event.target.classList.contains('slide2')) {
        handlSortBy(target)
    } else if (target.tagName == 'IMG') {
        target = target.closest('li');
        if (target.classList.contains('sort-year')) {
            yearRotate.value = !yearRotate.value
        } else {
            citeRotate.value = !citeRotate.value
        }
        handlSortBy(target)
    } else {
        return
    }
    const targetWidth = target.offsetWidth;
    const halfDifference = target.offsetLeft - (sliderWidth - targetWidth) / 2
    slider.style.left = halfDifference + 'px'
    slider2.style.left = halfDifference + 'px'
}
const handleMouseOver = (event) => {
    if (event.target.tagName == 'LI' && !event.target.classList.contains('slide2')) {
        const target = event.target
        const slider = document.querySelector('.slide2')
        const targetWidth = target.offsetWidth;
        const sliderWidth = slider.offsetWidth;
        const halfDifference = target.offsetLeft - (sliderWidth - targetWidth) / 2
        slider.style.left = halfDifference + 'px'
        slider.style.opacity = 1
    }
}
const handleMouseOut = (event) => {
    if (event.target.tagName == 'LI') {
        const slider = document.querySelector('.slide2')
        slider.style.opacity = 0
    }
}

//排序
const sortBy = ref(1)
watch(sortBy, (newValue) => {
    emit('sortChanged', newValue)
})
const handlSortBy = (target) => {
    if (target.classList.contains('sort-year')) {
        if (yearRotate.value) {
            sortBy.value = 2
        } else {
            sortBy.value = 3
        }
    } else if (target.classList.contains('sort-cite')) {
        if (citeRotate.value) {
            sortBy.value = 4
        } else {
            sortBy.value = 5
        }
    } else {
        sortBy.value = 1
    }
}
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
    margin-top: 20px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 5px 0;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);

    span {
        margin-left: auto;
        margin-right: 80px;
        color: var(--sort-span-color);
        font-size: 15px;
    }

    i {
        margin: 0 5px;
        font-size: 16px;
        color:var(--sort-i-color);
    }
}

.nav .sort {
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    position: relative;

    li:not(.slide, .slide2) {
        height: 100%;
        width: 60px;
        padding: 5px;
        margin: 0 15px;
        cursor: pointer;
        text-align: center;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--sort-i-color);
    }

    li img {
        width: 13px;
        height: 13px;
        margin-left: 5px;
        transition: .5s;
    }

    .slide {
        position: relative;
        height: 80%;
        width: 70px;
        position: absolute;
        border-radius: 15px;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
        background-color: var(--sort-slide-background-color);
        z-index: 1;
    }

    .slide2 {
        height: 80%;
        width: 70px;
        position: absolute;
        border-radius: 15px;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
        background-color: var(--button-background-color);
        opacity: 0;
        z-index: 0;
    }
}
</style>
