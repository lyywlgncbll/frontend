<template>
  <div class="menu-container">
    <div class="menu-column">
      <ul class="menu-list">
        <li 
          @click="handleClick('/admin/platformOverview')" 
          :class="{'menu-item': true, 'selected': this.$route.path === '/admin/platformOverview'}"
        >
          <i class="icon-menu"></i>
          <span>平台概况</span>
        </li>
        <li 
          @click="handleClick('/admin/audit')" 
          :class="{'menu-item': true, 'selected': this.$route.path === '/admin/audit'}"
        >
          <i class="icon-document"></i>
          <span>审核认领</span>
        </li>
        <li 
          @click="handleClick('/admin/scholars')" 
          :class="{'menu-item': true, 'selected': this.$route.path === '/admin/scholars'}"
        >
          <i class="icon-setting"></i>
          <span>入驻学者</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    
  },
  
  methods: {
    handleClick(route) {
      this.$router.push(route); // 使用 Vue Router 进行页面跳转
    }
  }
}
</script>

<style scoped>
@import "../../assets/theme-colors.css";

/* 自定义菜单样式 */
.menu-container {
  display: flex;
  width: 50%;
  justify-content: flex-start;
  padding: 10px;
  border: 2px solid #ccc; /* 设置边框 */
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影 */
}

.menu-column {
  width: 250px;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.menu-item .icon-menu,
.menu-item .icon-document,
.menu-item .icon-setting {
  font-size: 18px; /* 可以调整图标的大小 */
}

.menu-item span {
  font-size: 16px;
}

/* 选中菜单项的背景色 */
.selected {
  background-color: rgb(99, 99, 99) !important;
  color: white; /* 设置文字颜色为白色 */
}
</style>
