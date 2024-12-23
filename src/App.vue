<script>
import GradientBackground from "./components/background/gradient-background.vue";
export default {
  name:"App",
  components:{
    GradientBackground
  }
}
</script>

<template>
  <div id="app">
    <!-- <header>
      <nav>
        <router-link to="/article">Article</router-link>
      </nav>
    </header> -->
    <div id="BG">
      <parallax-background v-if="$route.meta.requiresGradient"/>
      <parallax-background v-if="$route.meta.requiresParallax"/>
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


import ParallaxBackground from "@/components/background/parallax-background.vue";
</script>
