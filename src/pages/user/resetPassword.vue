<script>
import axios from '@/utils/axios';
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import NavigationBar from "~/components/bar/unlogged-nav-bar.vue";
import { RESETPASSWORD_API, RESETPASSWORD_SEND_EMAIL_API } from "~/utils/request.js";
export default defineComponent({
  components:{
    NavigationBar,
    axios
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
    const router = useRouter(); // 在 setup 函数中初始化 router
    return { router }; // 返回 router，使其可在模板和方法中使用
  },
  methods: {
    async sendVerificationCode() {
      const params = new URLSearchParams();
      params.append('email', this.Email);
      try {
        const response = await axios.post(RESETPASSWORD_SEND_EMAIL_API+"?mail="+this.Email);
        // 处理成功响应，例如：
        if (response.status === 200) {
          console.log('验证码发送成功');
          // 可以在这里添加成功提示，例如弹出一个提示框
        } else {
          console.error('验证码发送失败', response);
          // 处理其他错误状态码，例如弹出一个错误提示框
        }
      } catch (error) {
        console.error('发送验证码时出现错误', error);
        // 处理请求错误，例如网络错误，弹出一个错误提示框
      }
    },

    async resetPassword() {
      const params = {
        mail: this.Email,
        newPassword: this.Password,
        code: this.EmailVerificationCode
      };
      try {
        const response = await axios.post(RESETPASSWORD_API, params);
        // 处理成功响应，例如：
        if (response.status === 200) {
          alert('修改密码成功');
          console.log('修改密码成功');
          await this.router.push('/login');
        } else {
          alert('修改密码失败');
          console.error('修改密码失败', response);
        }
      } catch (error) {
        console.error('修改密码时出现错误', error);
      }
    },
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