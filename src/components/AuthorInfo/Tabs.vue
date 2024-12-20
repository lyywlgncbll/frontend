<template>
  <div class="tabs">
    <div 
      v-for="(tab, index) in tabs" 
      :key="index" 
      :class="['tab', { active: activeTab2 === index }]"
      @click="selectTab(index)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    initialTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeTab2: this.initialTab,
    };
  },
  methods: {
    selectTab(index) {
      this.activeTab2 = index;
      this.$emit("changeTab", index); // 触发父组件的切换事件
    },
  },
  watch: {
    initialTab(newVal) {
      this.activeTab2 = newVal;
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  background-color: white;
  border-top-left-radius: 20px; 
  border-top-right-radius: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.tab.active {
  color: #1a73e8;
  font-weight: bold;
  border-bottom: 2px solid #1a73e8;
}
</style>
