<template>
    <select class="selectMenu" v-model="value" @change="handleChange">
      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    
  </template>
  
<script>
export default {
  created() {
    const savedState = sessionStorage.getItem('pageState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.value = parsedState.filterStatus || this.value;
    }
  },
  data() {
    return {
      options: [
        { value: 'pending_only', label: '待处理' },
        { value: 'accepted_only', label: '已通过' },
        { value: 'rejected_only', label: '已拒绝' },
        { value: 'all', label: '所有' }
      ],
      value: 'pending_only' 
    };
  },
  methods: {
    handleChange() {
      //调用父组件方法
      this.$emit('updateTableTo', this.value);
    },
  },
  
};
</script>
  
<style scoped>
.selectMenu {
  cursor: pointer;
  padding: 3px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 90px;
  min-width: 80px;
  align-items: center;
}
.select-menu {
  background-color: transparent;
  transition: 0.3s ease;
  color:var(--bar-font-color);
}
.select-Menu:hover{
  transition: background-color 0.3s ease;
  background-color: var(--button-hover-color);
}
</style>
  