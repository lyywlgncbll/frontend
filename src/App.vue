<script setup>
import Article from './pages/Article.vue';
</script>

<template>
  <div id="app">
    <!-- <header>
      <nav>
        <router-link to="/article">Article</router-link>
      </nav>
    </header> -->
    <div id="BG">
      <gradient-background v-if="$route.meta.requiresGradient"/>
    </div>
    <!-- 渲染页面内容 -->
    <router-view />
  </div>
</template>

<style scoped>
#BG{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: -10;
}
</style>

<script setup>


</script>
