<template>
  <el-row class="tac">
    <el-col :span="15">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <router-link to="/admin/platformOverview">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
              <span slot="title">平台概况</span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/audit">
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
              <span slot="title">审核认领</span>
          </el-menu-item>
        </router-link>
        <router-link to="/admin/scholars">
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
              <span slot="title">入驻学者</span>
          </el-menu-item>
        </router-link>
    </el-menu>
    </el-col>
  </el-row>
</template>


<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log('打开:', key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log('关闭:', key, keyPath);
    }
  }
}
</script>

<style scoped>
@import "../../assets/theme-colors.css";

.custom-menu .el-menu-item {
  padding-left: 40px; /* 设置左边距， */
}

/* 控制图标和文字的对齐 */
.custom-menu .el-menu-item  {
  margin-left: 20px; /* 控制图标和文字之间的距离 */
}
</style>
