<template>
    <div class="nav">

        <div class="search">
            <div class="option" @click="toggleDropdown">{{ selectedOption.name }}
                <img src="/src/assets/search/icon/down-expand2.svg">
            </div>
            <ul class="option-menu" v-if="isOpen">
                <li v-for="option in options" :key="option.value" @click="selectOption(option)" class="menu-item">
                    {{ option.name }}
                </li>
            </ul>

            <img src="/src/assets/search/icon/search1.svg" class="search-img">

            <input class="search-input" placeholder="Search" type="search"></input>
        </div>

        <ul class="sort" @mouseover="handleMouseOver" @mouseout="handleMouseOut" @click="handleClick">
            <li>综合</li>
            <li class="sort-year">年份 <img src="/src/assets/search/icon/down-expand.svg"
                    :style="{ transform: yearRotate ? 'rotate(180deg)' : 'rotate(0deg)' }"></li>
            <li class="sort-cite">引用 <img src="/src/assets/search/icon/down-expand.svg"
                    :style="{ transform: citeRotate ? 'rotate(180deg)' : 'rotate(0deg)' }"></li>
            <li class="slide"></li>
            <li class="slide2"></li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

onMounted(() => {
    document.addEventListener('click', closeDropdown)
    const target = document.querySelector('.nav li')
    const slider = document.querySelector('.slide')
    const slider2 = document.querySelector('.slide2')
    const targetWidth = target.offsetWidth;
    const sliderWidth = slider.offsetWidth;
    const halfDifference = target.offsetLeft - (sliderWidth - targetWidth) / 2
    slider.style.left = halfDifference + 'px'
    slider2.style.left = -50 + 'px'
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
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

    } else if (target.tagName == 'IMG') {
        target = target.closest('li');
        if (target.classList.contains('sort-year')) {
            yearRotate.value = !yearRotate.value
        } else {
            citeRotate.value = !citeRotate.value
        }
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

//下拉菜单
const options = [
    {
        name: "标题",
        value: 1
    },
    {
        name: "摘要",
        value: 2
    },
    {
        name: "领域",
        value: 3
    },
]
const selectedOption = ref({
    name: "标题",
    value: 1
})
const isOpen = ref(false)

const selectOption = (option) => {
    selectedOption.value = option
    isOpen.value = false
}

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const closeDropdown = (event) => {
    if (!event.target.closest('.option')) {
        isOpen.value = false
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
    height: 40px;
    display: flex;
    align-items: center;
}

.search {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.search .option {
    position: relative;
    width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f4;
    font-size: 14px;
    color: #454546;
    margin-right: 10px;
    border-radius: 5px;
    transition: .3s ease;
}

.search .option img {
    width: 13px;
    height: 13px;
    margin-left: 5px;
}

.search .option:hover {
    background-color: #ddddde;
    cursor: pointer;
}

.option-menu {
    width: 90px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 45px;
    background-color: #f3f3f4;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    z-index: 1;
}

.menu-item {
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    text-align: center;
    padding: 3px 0;
    margin: 3px auto;
    color: #454546;
}

.menu-item:hover {
    cursor: pointer;
    background-color: white;
}

.search-input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-right: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
}

.search .search-img {
    position: absolute;
    right: 1rem;
    fill: #9e9ea7;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 2;
}

.search-input:focus {
    outline: none;
    border-color: rgba(76, 171, 234, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(76, 179, 234, 0.1);
}

.search-input::placeholder {
    color: #9e9ea7;
}

.nav .sort {
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: auto;
    border: 1px solid #85a9c2;
    border-radius: 5px;
    position: relative;
}

.nav .sort li:not(.slide, .slide2) {
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
}

.nav .sort li img {
    width: 13px;
    height: 13px;
    margin-left: 5px;
    transition: .5s;
}

.nav .sort .slide {
    position: relative;
    height: 80%;
    width: 70px;
    position: absolute;
    border-radius: 15px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    background-color: rgba(88, 181, 243, 0.5);
    z-index: 1;
}

.nav .sort .slide2 {
    height: 80%;
    width: 70px;
    position: absolute;
    border-radius: 15px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    background-color: rgba(143, 204, 245, 0.5);
    opacity: 0;
    z-index: 1;
}
</style>
