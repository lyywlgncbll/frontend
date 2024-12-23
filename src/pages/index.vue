<template>
    <div class="test">
<!--      <welcome/>-->
      <unlogged-nav-bar/>
<!--      <parallax-background/>-->
    </div>
</template>

<script>
import loggedNavBar from "~/components/bar/logged-nav-bar.vue";
import {defineComponent, ref,inject} from "vue";
import {useRouter} from "vue-router";
import PaperDetails from "~/components/home-page/paperIntros.vue";
import HotTopics from "~/components/home-page/hotspot.vue";
import ParallaxBackground from "@/components/background/parallax-background.vue";
import UnloggedNavBar from "@/components/bar/unlogged-nav-bar.vue";
export default defineComponent({
  components:{
    UnloggedNavBar,
    ParallaxBackground,
    HotTopics,
    PaperDetails,
    loggedNavBar,
  }
})
</script>

<style scoped>
.test{
  /* //background-color: black; */
}
parallax-background{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: -10;
}
</style>
