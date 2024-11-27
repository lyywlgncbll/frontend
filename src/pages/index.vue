<template>
    <div class="test">
      <logged-nav-bar/>
    </div>
</template>

<script>
import loggedNavBar from "~/components/bar/search-bar.vue";
import {defineComponent, ref,inject} from "vue";
import {useRouter} from "vue-router";
export default defineComponent({
  components:{
    loggedNavBar
  }
})
</script>

<style scoped>
.test{
  //background-color: black;
}
</style>