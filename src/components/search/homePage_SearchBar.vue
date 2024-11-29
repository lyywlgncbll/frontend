<!--这个组件的作用是为主页添加一个巨型的搜索框-->
<script>

import {ref} from "vue";

export default {
  name:"homePageSearchBar",
  components:{},
  data(){
    const input = ref('');
    const options=ref( [
      {
        value: 'main',
        label: '篇关摘'
      }, {
        value: 'title',
        label: '篇名'
      }, {
        value: 'abstract',
        label: '摘要'
      }, {
        value: 'field',
        label: '领域'
      }, {
        value: 'author_name',
        label: '作者'
      }, {
        value: 'affiliation_name',
        label: '作者单位'
      }, {
        value: 'publisher',
        label: '文献来源'
      }, {
        value: 'doi',
        label: 'DOI'
      },
    ]);
    const select = ref('main');
    const selectedLabel = ref("篇关摘");
    const optionsListActive = ref(false);
    const toggleOptionsList = () => {
      optionsListActive.value = !optionsListActive.value;
    };
    const selectOption = (option) => {
      select.value = option.value;
      selectedLabel.value = option.label;
      optionsListActive.value = false;
    };
    return{
      input,
      options,
      select,
      selectedLabel,
      optionsListActive,
      selectOption,
      toggleOptionsList
    }
  },
  methods:{

  },
}
</script>

<template>
  <div class="searchBar">
    <!--左侧的选择按钮    -->
    <div class="select-menu" @click="toggleOptionsList">
      <span style="margin-right: 10px">{{ selectedLabel }}</span>
      <i :class="['fas', 'fa-angle-down', { 'fa-angle-up': optionsListActive }]"></i>
    </div>
    <!-- 中间的输入语句    -->
    <input
        v-model="input"
        type="text"
        placeholder="请输入内容"
        class="custom-input"
    />
    <!-- 搜索按钮   -->
    <button class="searchButton" @click="serachByLabel">
      <img src="../../assets/iconfonts/nav-bar/search.svg" class="searchIcon">
    </button>
    <div class="options-list" :class="{ 'active': optionsListActive }">
      <div class="option"
           v-for="option in options"
           :key="option.value"
           @click="selectOption(option)"
           :class="{ 'selected': select === option.value }">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.searchBar{
  display: flex;
  position: relative;
  border-radius: 20px;

  .select-menu {
    //background-color: var(--theme-info-text-color);
    background-color: white;
    padding: 10px 20px;
    //color: var(--button-color);
    color: black;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative; /* 确保按钮的 z-index 在选项列表之上 */
    width: 130px;
    height: 40px;
  }
  .options-list {
    position: absolute;
    width: auto;
    top: calc(100% - 10px);
    left: 20px;
    z-index: 1000;
    background-color: #f9f9f9;
    border-radius: 6px;
    overflow-y: hidden; /* 修改为 hidden 来在动画过程中管理溢出 */
    max-height: 0; /* 初始为 0 以隐藏内容 */
    opacity: 0; /* 初始为 0 使其透明 */
    transition: opacity 0.4s ease, max-height 0.4s ease; /* 平滑过渡 */
  }
  .custom-input {
    flex-grow: 1;
    padding: 10px;
    //border: 1px solid var(--border-color);
    border: 1px solid black;
    background-color: white;
    //background-color: var(--pane-color);
    border-radius: 20px;
    height: 40px;
    min-width: 200px;
    margin: 10px;
    .span{
      //color: var(--theme-info-text-color);
      color: black;
    }
  }
}
</style>