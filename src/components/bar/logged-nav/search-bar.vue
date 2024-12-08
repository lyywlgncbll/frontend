<script>
import router from "@/router/index.js";

export default {
  data() {
    return {
      options: [
        { value: "1", label: "篇名" },
        { value: "2", label: "摘要" },
        { value: "3", label: "领域" },
        { value: "4", label: "作者" },
        { value: "5", label: "刊物" },
      ],
      select: 1, // 当前选中的值
      input: "", // 输入框内容
      optionsListActive: false, // 控制下拉列表的显示/隐藏
      inputFocused: false, // 检测是否键入了 `/`

    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeDestroy() {
    // 在组件销毁时移除事件监听
    window.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("mousedown", this.handleClickOutside);
  },
  computed: {
    selectedLabel() {
      // 返回选中的标签，若未选中则显示默认值
      const selectedOption = this.options.find(
          (option) => option.value === this.select
      );
      return selectedOption ? selectedOption.label : "篇名";
    },

  },
  methods: {
    handleKeydown(event) {
      if (event.key === "/") {
        if(this.inputFocused===false||document.activeElement!== this.$refs.searchInput){
          // 阻止默认行为（避免输入到别的地方或页面滚动）
          event.preventDefault();
          // 将焦点设置到搜索框
          this.$refs.searchInput.focus();
          this.inputFocused=true;
        }
      }
      if (event.key === "Enter") {
        if(this.inputFocused===true){
          if(this.input.length===0){
            alert("请输入内容")
          }else{
            localStorage.setItem('searchOption',this.select);
            localStorage.setItem('searchString',this.input);
            localStorage.setItem('topic','')
            if (!this.$route.path.includes('search/result')) {
              router.push('search/result');
            } else{
              window.location.reload();
            }
            
            // alert("正在搜索");
          }
        }
      }

    },
    toggleOptionsList() {
      // 切换下拉列表的显示/隐藏
      this.optionsListActive = !this.optionsListActive;
    },
    selectOption(option) {
      // 选中某个选项
      this.select = option.value;
      this.optionsListActive = false; // 选中后关闭下拉列表
    },
    handleClickOutside(event) {
      // 检测点击是否发生在组件外部
      const dropdownContainer = this.$refs.dropdownContainer;
      if (!dropdownContainer.contains(event.target)) {
        this.optionsListActive = false; // 点击外部时关闭下拉列表
      }
    },
    handleFocus() {
      this.inputFocused = true; // 聚焦时设置状态为 true
    },
    handleBlur() {
      this.inputFocused = false; // 失去焦点时设置状态为 false
    }
  },
};
</script>


<template>
  <div class="input-with-select"
       ref="dropdownContainer"
       :class="{ 'focused': inputFocused||input,'toggled':optionsListActive }"
       id="bar-root">
    <!-- 自定义选择菜单 -->
    <div class="select-menu" @click="toggleOptionsList">
      <span class="selected-label">{{ selectedLabel }}</span>
      <i :class="['icon', optionsListActive ? 'up' : 'down']"></i>
    </div>
    <img src="/src/assets/iconfonts/nav-bar/search1.svg" class="search-logo">
    <!-- 输入框 -->
    <input
        ref="searchInput"
        v-model="input"
        type="text"
        placeholder="  Type  /  to search"
        class="custom-input"
        @focus="handleFocus"
        @blur="handleBlur"
    />




    <!-- 下拉选项列表 -->
    <div class="options-list" :class="{ active: optionsListActive }">
      <div
          class="option"
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          :class="{ selected: select === option.value }"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>



<style scoped>


*::after {
  box-sizing: border-box;
}
.input-with-select {
  box-sizing: border-box; /* 确保 border 出现在内侧 */
  position: relative;
  display: flex;
  width: 20vw;
  min-width: 300px;
  height: 35px;
  //margin-top: 10px;
  //margin-bottom: 10px;
  margin-right: 20px;
  transition: width 0.3s ease; /* 为宽度变化添加平滑动画 */
  border-radius: 6px;
  border: 1px solid var(--bar-border-color);
  //font-size: 13px;


}

/* 当输入框获取焦点时，扩展父容器宽度 */
.input-with-select.focused {
  transition: width 0.3s ease; /* 为宽度变化添加平滑动画 */
  width: 35vw;
  animation: border-breathing 2s infinite ease-in-out; /* 应用动画 */
}
.input-with-select.toggled{
  border-bottom-left-radius: 0;
  transition: border-bottom-width 0.3s ease;
}
@keyframes border-breathing {
  0% {

    border-color: black; /* 初始颜色 */
    border-width: 1px; /* 初始宽度 */
  }
  50% {
    border-color: var(--bar-border-color); /* 中间颜色 */
    border-width: 1px; /* 扩大的宽度 */
  }
  100% {
    border-color: black; /* 恢复初始颜色 */
    border-width: 1px; /* 恢复初始宽度 */
  }
}

/* 自定义选择菜单样式 */
.select-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid var(--bar-border-color);
  padding: 8px 12px;
  //border-bottom-left-radius: 6px;
  //border-top-left-radius: 6px;
  overflow: clip;
  background-color: transparent;
  transition: 0.3s ease;
  color:var(--bar-font-color);
  width: 25%;
  max-width: 90px;
  min-width: 80px;
}
.select-menu:hover{
  transition: background-color 0.3s ease;
  background-color: var(--button-hover-color);
}

.selected-label {
  margin-right: 10px;
}

.icon {
  border: solid #5b636d;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 2.5px;
  //padding-top: -2px;
  transform: rotate(45deg);
  transition: transform 0.3s ease; /* 添加平滑过渡动画，控制 transform 旋转 */
  margin-left: 10px;
}

.icon.up {
  transform: rotate(-135deg);
}
.search-logo{
  //flex: 1;
  width: 17px;
  height: 17px;
  margin-left: 9px;
  //margin-right: 5px ;
  margin-top:9px ;
  fill: #5b636d;
  //background-color: black;
}

/* 输入框样式 */
.custom-input {
  flex: 1;
  padding: 8px;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  outline: none;
  box-sizing: border-box; /* 确保 border 出现在内侧 */
  transition: width 0.3s ease; /* 为宽度变化添加平滑动画 */
  //font-size: 13px;
  color:#5b636d;
  background-color: transparent;


}




/* 下拉选项列表样式 */

.options-list {
  position: absolute;
  top: 100%;
  //left: 3px;
  width: calc(25% + 1px);
  max-width: 91px;
  min-width: 81px;
  //margin-top: 40px;
  background-color: white;
  border: 1px solid var(--bar-border-color) ;
  border-top:transparent ;
  margin-left: -1px;
  margin-top: 1px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  max-height: 0; /* 默认最大高度为 0 */
  overflow: hidden; /* 隐藏超出范围的内容 */
  opacity: 0; /* 初始透明度为 0 */
  transition: height 0.3s ease, opacity 0.3s ease; /* 添加动画过渡 */
  z-index: 1000;
}

.options-list.active {
  max-height: 2000px; /* 展开时的最大高度 */
  opacity: 1; /* 展开时的透明度 */
}

.option {
  text-align: center; /* 水平居中 */
  padding: 10px;
  cursor: pointer;
}

.option:hover{
  background-color: var(--long-button-hover-color);
  //color: white;
}
.option.selected {
  background-color: var(--button-hover-color);
  //color: white;
}

</style>
