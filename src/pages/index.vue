<template>
    <div class="test">
      <logged-nav-bar/>
    </div>
</template>

<script>
import loggedNavBar from "~/components/bar/logged-nav-bar.vue";
import {defineComponent, ref,inject} from "vue";
import {useRouter} from "vue-router";
import PaperDetails from "~/components/home-page/paperIntros.vue";
import HotTopics from "~/components/home-page/hotspot.vue";
export default defineComponent({
  components:{
    HotTopics,
    PaperDetails,
    loggedNavBar
  }
})
</script>

<style scoped>
.test{
  //background-color: black;
}
</style>
