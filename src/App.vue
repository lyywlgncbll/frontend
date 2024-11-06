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
    <div id="BG">
      <gradient-background v-if="$route.meta.requiresGradient"/>
    </div>
    <router-view/>
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
