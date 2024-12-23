<script>
import { ref} from "vue"
import PersonalAvatar from "~/components/AdminInfo/head/personal-avatar.vue";
import router from "@/router/index.js";

export default {
  computed: {

  },
  components:{
    PersonalAvatar,

  },
  data(){

  },
  methods:{
    advancedSearch(){
      alert("跳转到高级搜索");
    },
    scholarSearch(){
      alert("跳转到学者搜索");
    },
    toHomePage(){
      // alert("跳转到homePage")
      router.push('/home');
    }
  }
}

</script>

<template>
  <header>
    <nav id="bar-root" class="logged-nav-bar">
      <!--左边的logo-->
      <div  class="logo-button" aria-label="Go to Home">
        <img src="@/assets/logo/CCBridge.svg" alt="Logo" class="logo">
      </div>
      <div class="border"></div>
      <!--用户头像-->
      <personal-avatar class="personal-avatar"/>

    </nav>
  </header>

</template>

<style scoped>
@import "../../../assets/theme-colors.css";
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: var(--bar-background-color);

}
.logged-nav-bar{
  background-color: var(--bar-background-color);
  display: flex;
  justify-content: space-between; /* 左右分布 */
  align-items: center;
  height: 60px;
  border-bottom: var(--bar-border-color) solid 1px ;

  .logo{
    width: 100px;
    height: auto;
    margin-left: 20px;
  }
  .options {
    position: absolute;
    box-sizing: border-box; /* 确保 border 出现在内侧 */
    left: 170px;
    display: flex;
    gap: 30px;
    align-items: center; /* 垂直居中 */

    .option {
      cursor: pointer;
      height: 35px;
      width: 100px;
      border-radius: 6px;
      font-size: 13px;
      color: var(--bar-font-color);
      border: 1px solid var(--bar-border-color);
      display: flex; /* 让 .option 使用 Flexbox 布局 */
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      transition: background-color 0.3s ease;
    }
    .option:hover{
      background-color: var(--button-hover-color);
      transition: background-color 0.3s ease;
    }
  }


  .border{
    position: absolute;
    right: 70px;
    width: 2px;
    height: 25px;
    background-color: var(--bar-border-color);
  }
  .personal-avatar{
    position: absolute;
    right: 20px;
  }
}

</style>