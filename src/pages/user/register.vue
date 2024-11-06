<script setup>

</script>

<template>
  <div class="registerBox">
    <div class="title">
      <div class="title-h1">
        Register
      </div>
      <div class="tips">
        Join CCBridge and start your journey!
      </div>
    </div>
    <div class="form">
      <div class="input-wrapper">
        <input type="text" placeholder="UserName" v-model="UserName">
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="Password" v-model="Password">
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="Confirm Password" v-model="ConfirmPassword">
      </div>
      <div class="input-wrapper">
        <input type="email" placeholder="Email" v-model="Email">
        <button class="send-code-btn" @click="sendVerificationCode">Send Code</button>
      </div>
      <div class="input-wrapper">
        <input type="text" placeholder="Email Verification Code" v-model="EmailVerificationCode">
      </div>
      <button class="btn" @click ="register">Register</button>
    </div>
    <div class="login">
      Already have an account? <span><router-link to="/login">Login</router-link></span>
    </div>
  </div>
</template>

<style scoped>
.registerBox {
  position: absolute; /* Ensure it can be controlled by z-index */
  z-index: 10; /* Higher than other elements */
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4% 5%;
  box-sizing: border-box;
  font-family: PlastoTrial_ExtraLight,serif;
  background-color: rgb(255,255,255,0.2);
  border: 2px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(7px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    text-align: center;
    .title-h1 {
      margin: 3% 0;
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