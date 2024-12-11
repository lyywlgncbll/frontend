<template>
  <div class="pageComponent">
    <p>共 {{ totalPage }} 页</p>
    <!-- 上一页按钮 -->
    <el-button :disabled="currentPage === 1" @click="changePage(currentPage - 1)" :circle="true" type="primary"
      size="small" class="changePageButton">
      <img src="/src/assets/iconfonts/search/down-expand2.svg" class="changePageButtonIcon" style="transform: rotate(90deg);">
    </el-button>
    <!-- 页码按钮 -->
    <el-button :type="page === currentPage ? 'primary' : ''" :plain="true" v-for="page in pages" :key="page"
      class="pagesButton" @click="changePage(page)">
      {{ page }}
    </el-button>

    <!-- 下一页按钮 -->
    <el-button :disabled="currentPage === totalPage" @click="changePage(currentPage + 1)" circle="true" type="primary"
      size="small" class="changePageButton">
      <img src="/src/assets/iconfonts/search/down-expand2.svg" class="changePageButtonIcon" style="transform: rotate(-90deg);">
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:currentPage"],
  data() {
    return {
      pages: [],
    };
  },
  watch: {
    totalPage: {
      immediate: true,
      handler() {
        this.generatePages();
      },
    },
    currentPage: {
      immediate: true,
      handler() {
        this.generatePages();
      },
    },
  },
  methods: {
    generatePages() {
      const totalToShow = 5; // 固定页码长度
      const halfRange = Math.floor(totalToShow / 2);

      let start = Math.max(1, this.currentPage - halfRange);
      let end = Math.min(this.totalPage, this.currentPage + halfRange);

      // 如果不足5个页码，调整起始点或结束点
      if (end - start + 1 < totalToShow) {
        if (start === 1) {
          end = Math.min(this.totalPage, start + totalToShow - 1);
        } else if (end === this.totalPage) {
          start = Math.max(1, end - totalToShow + 1);
        }
      }

      this.pages = [];
      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPage) return;
      this.$emit("update:currentPage", page);
    },
  },
};
</script>

<style scoped>
.pageComponent {
  display: flex;
  align-items: center;
  margin: 10px auto;

  p {
    text-align: center;
    margin-right: 20px;
  }
}

.changePageButton {
  background-color: transparent;
  border: none;

  &:hover{
    text-decoration: none;
    background-color: #818b981a;
    outline: 0px;
    transition-duration: 0.1s;
    border: none;
  }
}

.changePageButtonIcon {
  width: 15px;
  height: 15px;

  
}

.pagesButton {
  margin: 0 4px;
  min-width: 32px;
  height: 32px;
  padding: 0.5rem calc(0.375rem);
  font-style: normal;
  line-height: 1;
  color: #1F2328;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  margin-right: 4px;
  background-color: transparent;
  border-radius: 6px;
  border: none;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);

  &:hover{
    text-decoration: none;
    background-color: #818b981a;
    outline: 0px;
    transition-duration: 0.1s;
  }
  
}

.pagesButton.el-button--primary{
  text-decoration: none;
    background-color: #0969da;
    color: white;
    outline: 0px;
    transition-duration: 0.1s;
}

</style>
