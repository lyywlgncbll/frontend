<template>
  <div :class="pageComponent">
    <p style="width: 150px;">共 {{ totalPage }} 页</p>
    <!-- 上一页按钮 -->
    <el-button :disabled="currentPage === 1" @click="changePage(currentPage - 1)" :circle="true" type="primary"
      size="small" class="changePageButton">
      <img src="/src/assets/search/icon/frontpage.svg" class="changePageButtonIcon">
    </el-button>
    <!-- 页码按钮 -->
    <el-button :type="page === currentPage ? 'primary' : ''" :plain="true" v-for="page in pages" :key="page"
      class="pagesButton" @click="changePage(page)">
      {{ page }}
    </el-button>

    <!-- 下一页按钮 -->
    <el-button :disabled="currentPage === totalPage" @click="changePage(currentPage + 1)" circle="true" type="primary"
      size="small" class="changePageButton">
      <img src="/src/assets/search/icon/nextpage.svg" class="changePageButtonIcon">
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
  display: inline-flex;
  align-items: center;
}

.changePageButton {
  margin-right: 1%;
  margin-left: 1%;
}

.changePageButtonIcon {
  width: 15px;
  height: 15px;
}

.pagesButton {
  margin-left: 1%;
  margin-right: 1%;
}

p {
  display: inline;
}
</style>
