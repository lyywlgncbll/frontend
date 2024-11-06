<script>
import NavigationBar from "~/components/bar/navigation-bar.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components:{
    NavigationBar
  },
});

</script>

<template>
  <div id="naviBar">
    <navigation-bar/>
  </div>
  <div  class="loginBox">
    <div class="title">
      <div class="title-h1">
        Welcome Back
      </div>
      <div class="tips">
        to Creative Collaboration Bridge
      </div>
    </div>
    <div class="form">
      <div class="input-wrapper">
        <input type="text" placeholder="UserName" v-model="username">
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="forgot-pwd">
        <router-link to="/resetPassword"><span>Forgot Password?</span></router-link>
      </div>
      <!-- <button class="btn">Login</button> -->
      <button class="btn" @click="submitLogin">Login</button>
    </div>
    <div class="register">
      Not a member? <span><router-link to="/register">Register now</router-link></span>
    </div>
  </div>
</template>
<style scoped>

#naviBar {
  position: absolute;
  width: 100%;
  z-index: 10;
}
.loginBox {
  position: absolute;
  z-index: 10;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 10%;
  box-sizing: border-box;
  font-family: PlastoTrial_ExtraLight,serif;
  //background: transparent;
  background-color: rgb(255,255,255,0.2);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  backdrop-filter: blur(7px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    text-align: center;
    .title-h1 {
      margin: 5% 0;
      text-align: center;
      font-size: 3vw;
      font-family: PlastoTrial_ExtraBold,serif;
      color: white;
    }
    .tips {
      line-height: 30px;
      font-size: 2vw;
      color: rgb(255,255,255,0.8);
    }
  }
  .form {
    width: 100%;
    margin-top: 10%;
    .input-wrapper {
      width: 100%;
      margin: 10px 0;
      input {
        width: 100%;
        height: 6vh;
        border: 1px solid #000;
        border-radius: 50px;
        box-sizing: border-box;
        padding: 10px 20px;
        font-size: 1.3vw;
        outline: none;
        font-family: Marmelad_Regular,serif;
      }
    }
    .forgot-pwd {
      text-align: right;
      margin: 10px 0;
      cursor: pointer;
      color: white;
    }
    .btn {
      width: 100%;
      height: 50px;
      border: 0;
      background-color: #000;
      color: #fff;
      margin: 10px 0;
      border-radius: 50px;
      font-size: 20px;
      cursor: pointer;
      font-family: PlastoTrial_ExtraBold,serif;
    }
  }
  .register {
    width: 100%;
    text-align: center;
    margin-top: 5%;
    color: white;
    span {
      color: rgb(135, 228, 89);
      cursor: pointer;
    }
  }
}
</style>