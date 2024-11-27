<script>
export default {
  data() {
    return {
      options: [
        { value: "1", label: "篇名" },
        { value: "2", label: "作者" },
        { value: "3", label: "摘要" },
        { value: "4", label: "领域" },
      ],
      select: null, // 当前选中的值
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
      return selectedOption ? selectedOption.label : "请选择";
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
       :class="{ 'focused': inputFocused||input }">
    <!-- 自定义选择菜单 -->
    <div class="select-menu" @click="toggleOptionsList">
      <span class="selected-label">{{ selectedLabel }}</span>
      <i :class="['icon', optionsListActive ? 'up' : 'down']"></i>
    </div>

    <!-- 输入框 -->
    <input
        ref="searchInput"
        v-model="input"
        type="text"
        placeholder="Type  /  to search"
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
.input-with-select {
  position: relative;
  display: flex;
  //align-items: center;
  //gap: 10px;
  width: 400px;
  margin: 20px auto;
  transition: width 0.3s ease; /* 为宽度变化添加平滑动画 */
  //border: 1px solid #ccc;
  //border-radius: 8px;
  //padding: 10px;
  //background-color: #f9f9f9;
}

/* 自定义选择菜单样式 */
.select-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  background-color: white;

}

.selected-label {
  margin-right: 10px;
}

.icon {
  border: solid #333;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s ease; /* 添加平滑过渡动画，控制 transform 旋转 */
}

.icon.up {
  transform: rotate(-135deg);
}

/* 输入框样式 */
.custom-input {
  flex: 1;
  padding: 8px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  outline: none;
  box-sizing: border-box; /* 确保 border 出现在内侧 */
  transition: width 0.3s ease; /* 为宽度变化添加平滑动画 */
  //border-radius: 4px;

}




/* 下拉选项列表样式 */

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 0; /* 默认最大高度为 0 */
  overflow: hidden; /* 隐藏超出范围的内容 */
  opacity: 0; /* 初始透明度为 0 */
  transition: max-height 0.3s ease, opacity 0.3s ease; /* 添加动画过渡 */
  z-index: 1000;
}

.options-list.active {
  max-height: 150px; /* 展开时的最大高度 */
  opacity: 1; /* 展开时的透明度 */
}

.option {
  padding: 10px;
  cursor: pointer;
}

.option:hover,
.option.selected {
  background-color: #007bff;
  color: white;
}
/* 当输入框获取焦点时，扩展父容器宽度 */
.input-with-select.focused {
  transition: width 0.3s ease; /* 为宽度变化添加平滑动画 */
  width: 600px;
}
</style>
