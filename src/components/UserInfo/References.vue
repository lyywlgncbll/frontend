<template>
  <div class="reference-container">
    <div class="header" :class="{ 'editable-header': editable }">
      <span v-if="editable" class="header-editable-title">已有文献</span>
      <span v-else class="header-title">文献</span>
      <span class="header-date">日期</span>
      <span class="header-citations">引用次数</span>
      <span v-if="editable" class="header-manage">管理</span>
    </div>
    <div class="reference-item" :class="{ 'editable-item': editable }" v-for="(reference, index) in references"
      :key="index">
      <div class="reference-info">
        <h3 class="reference-title" @click="goToArticle(reference.id)">{{ reference.title }}
        </h3>
        <p class="reference-authors">{{ reference.authors }}</p>
        <p class="reference-journal">{{ reference.journal }}</p>
      </div>
      <span class="reference-date">{{ reference.date }}</span>
      <span class="reference-citations">{{ reference.citations }}</span>
      <span v-if="editable" class="reference-manage" @click="showDeleteDialog(index)">⛔</span>
    </div>
  </div>

  <div v-if="deleteDialog.visible" class="dialog-backdrop">
    <div class="dialog">
      <p>是否删除？</p>
      <div class="dialog-buttons">
        <button @click="confirmDelete">确认</button>
        <button @click="cancelDelete">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "References",
  props: {
    references: {
      type: Array,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false, // 默认非编辑状态
    },
  },
  data() {
    return {
      deleteDialog: {
        visible: false,
        index: null, // 当前需要删除的文献索引
      },
    };
  },
  methods: {
    showDeleteDialog(index) {
      // 打开删除确认弹窗并记录当前索引
      this.deleteDialog.visible = true;
      this.deleteDialog.index = index;
    },
    confirmDelete() {
      // 确认删除
      if (this.deleteDialog.index !== null) {
        this.references.splice(this.deleteDialog.index, 1);
      }
      this.cancelDelete();
    },
    cancelDelete() {
      // 关闭弹窗
      this.deleteDialog.visible = false;
      this.deleteDialog.index = null;
    },
    goToArticle(id) {
      // 使用 router.push 来进行路由跳转，传递 id 作为查询参数
      this.$router.push({ path: "/article", query: { id } });
    }
  },


};
</script>

<style scoped>
.reference-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header {
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ddd;
  background-color: #f1f1f1;
}

.header.editable-header {
  grid-template-columns: 7fr 1fr 1fr 1fr;
}

.header.editable-header span:first-child {
  text-align: left;
}

.header.editable-header span:not(:first-child) {
  text-align: center;
}

.reference-item {
  display: grid;
  grid-template-columns: 7fr 1fr 1fr;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.reference-item.editable-item {
  grid-template-columns: 7fr 1fr 1fr 1fr;
}

.reference-info {
  display: flex;
  flex-direction: column;
}

.reference-title {
  font-size: 1rem;
  font-weight: bold;
  word-break: break-word;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s;
}

.reference-title:hover {
  color: #007BFF;
  text-decoration: underline;
}

.reference-authors,
.reference-journal {
  font-size: 0.7rem;
  margin: 0.2rem 0;
}

.reference-date,
.reference-citations,
.reference-manage {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.reference-manage {
  cursor: pointer;
}

.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.dialog {
  background: white;
  padding: 2rem 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 500px;
  /* 调整弹窗宽度 */
}

.dialog p {
  text-align: left;
}

.dialog div {
  text-align: right;
}

.dialog-buttons button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-buttons button:first-child {
  background-color: rgba(73, 73, 233, 0.979);
  color: white;
}

.dialog-buttons button:last-child {
  background-color: gray;
  color: white;
}
</style>