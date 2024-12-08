<template>
  <div>
    <logged-nav-bar class="nav-bar"/>
  </div>
  <div class="components">
    <div class="left-component">
      <LeftTab  class="LeftTab"/>
    </div>
  </div>
  <el-main class="content">
      <!-- 放置表格 -->
      <router-view/>
  </el-main>
  
  
</template>

<script>
import LoggedNavBar from "~/components/bar/logged-nav-bar.vue";
import LeftTab from "~/components/AdminInfo/LeftTab.vue";
export default {
  data() {
    return {
      
    };
  },
  methods: {
    toggleSubMenu() {
      this.subMenuVisible = !this.subMenuVisible;
    },
  },
  components:{
    LoggedNavBar,
    LeftTab
  }
};
</script>

<style scoped>
.nav-bar{
  position: fixed;
  z-index: 100;
  height: auto;
  left: 0;
  right: 0;
}
.admin-home {
  height: 100vh;
}
.left-component{
  position: fixed;
  z-index: 50;
  padding-top: 60px;
  width: 300px;
  max-width: 300px;
  min-width: 280px;
  height: 100vh;
  border-right: 1px solid var(--page-border-color);
  display: flex;
  flex-direction: column;
  .LeftTab{
    margin: 50px;
    max-height: 100vh;
  }
}
.components{
  display: flex;
  flex-direction: row;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  /* 样式 */
}

.user-info {
  cursor: pointer;
}

.content {
  display: flex;
  z-index: 50;
  padding-left: 25%;
  padding-top: 110px;
  /* 样式 */
}

.footer {
  /* 样式 */
}
</style>

