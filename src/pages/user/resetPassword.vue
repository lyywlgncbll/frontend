<script>
import NavigationBar from "~/components/bar/unlogged-nav-bar.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components:{
    NavigationBar
  },
  data() {
    return {
      Email: '',
      // UserName: '',
      Password: '',
      ConfirmPassword: '',
      EmailVerificationCode: ''
    };
  },
  setup(){

  },
});
</script>

<template>
  <div id="naviBar">
    <navigation-bar/>
  </div>
  <div class="resetPasswordBox">
    <div class="title">
      <div class="title-h1">
        Reset Password
      </div>
      <div class="tips">
        Reset your password by verifying your email
      </div>
    </div>
    <div class="form">
      <div class="input-wrapper">
        <input type="email" placeholder="Email" v-model="Email">
        <button class="send-code-btn" @click="sendVerificationCode">Send Code</button>
      </div>
      <div class="input-wrapper">
        <input type="text" placeholder="Verification Code" v-model="EmailVerificationCode">
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="New Password" v-model="Password">
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="Confirm New Password" v-model="ConfirmPassword">
      </div>
      <button class="btn" @click="resetPassword">Reset Password</button>
    </div>
    <div class="login">
      Remember your password? <span><router-link to="/login">Login</router-link></span>
    </div>
  </div>
</template>

<style scoped>
#naviBar {
  position: absolute;
  width: 100%;
  z-index: 10;
}
.resetPasswordBox {
  position: absolute; /* Ensure it can be controlled by z-index */
  z-index: 10; /* Higher than other elements */
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4% 5%;
  box-sizing: border-box;
  font-family: PlastoTrial_ExtraLight,serif;
  background-color: rgb(255,255,255,0.3);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.8);
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
    padding: 0 5%;
    .input-wrapper {
      width: 100%;
      margin: 10px 0;
      display: flex;
      align-items: center;
      input {
        flex: 1;
        height: 6vh;
        border: 1px solid #000;
        border-radius: 50px;
        box-sizing: border-box;
        padding: 10px 20px;
        font-size: 20px;
        outline: none;
        font-family: Marmelad_Regular,serif;
      }
      .send-code-btn {
        height: 6vh;
        margin-left: 10px;
        border: 1px solid #000;
        border-radius: 50px;
        background-color: #000;
        color: #fff;
        padding: 0 20px;
        font-size: 16px;
        cursor: pointer;
        font-family: Marmelad_Regular,serif;
      }
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
  .login {
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