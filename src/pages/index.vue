<template>
    <div class="test">
      <paper-details />
    </div>
</template>

<script>
import loggedNavBar from "~/components/bar/logged-nav-bar.vue";
import {defineComponent, ref,inject} from "vue";
import {useRouter} from "vue-router";
import PaperDetails from "~/components/home-page/paperIntros.vue";
export default defineComponent({
  components:{
    PaperDetails,
    loggedNavBar
  }
})
</script>

<style scoped>
.test{
  /* //background-color: black; */
}
</style>
