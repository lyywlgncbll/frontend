<template>
    <div class="test">
<!--      <welcome/>-->
    </div>
</template>

<script>
import loggedNavBar from "~/components/bar/logged-nav-bar.vue";
import {defineComponent, ref,inject} from "vue";
import {useRouter} from "vue-router";
import PaperDetails from "~/components/home-page/paperIntros.vue";
import HotTopics from "~/components/home-page/hotspot.vue";
import Welcome from "~/components/welcome-page/welcome-page.vue";
export default defineComponent({
  components:{
    HotTopics,
    PaperDetails,
    loggedNavBar,
    Welcome
  }
})
</script>

<style scoped>
.test{
  /* //background-color: black; */
}
</style>
