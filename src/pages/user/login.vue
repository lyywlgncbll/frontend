<script>
import NavigationBar from "~/components/bar/unlogged-nav-bar.vue";
import {defineComponent, ref,inject} from "vue";
import {useRouter} from "vue-router";
import axios from '@/utils/axios';
import {LOGIN_API} from "~/utils/request.js";

export default defineComponent({
  components:{
    NavigationBar,
    axios
  },

  setup() {
    const router = useRouter();
    // let globalUsername = inject('Username');
    const tableData = ref([]);
    const mail = ref('');
    const password = ref('');

    const submitLogin = async () => {
      try {
        // 发起 POST 请求
        const response = await axios.post(LOGIN_API, {
          mail: mail.value,
          password: password.value
        });

        // 检查 HTTP 状态码是否为 200
        if (response.status === 200) {
          console.log('登录成功:', response.data);

          // 将 token 存储到 localStorage
          if (response.data) {
            localStorage.setItem('authToken', response.data);
            console.log('Token 已保存到 localStorage');
          } else {
            console.warn('响应中未包含 token');
          }

          // 跳转到 HomePage 页面
          await router.push('/home');
        } else {
          console.error('登录失败，服务器未返回成功状态:', response.status);
        }
      } catch (error) {
        // 捕获错误并打印到控制台
        console.error('登录失败:', error);

        // 可选：显示友好的错误提示
        alert('登录失败，请检查邮箱或密码');
      }
    };



    return {
      router,
      tableData,
      mail,
      password,
      submitLogin,
    };
  }

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
        <input type="text" placeholder="your email" v-model="mail">
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