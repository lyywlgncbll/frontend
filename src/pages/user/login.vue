<script>
import NavigationBar from "~/components/bar/unlogged-nav-bar.vue";
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import axios from '@/utils/axios';
import {ADMIN_LOGIN_API, LOGIN_API} from "~/utils/request.js";

export default defineComponent({
  components: {
    NavigationBar,
    axios
  },

  setup() {
    const router = useRouter();
    const mail = ref('');
    const password = ref('');
    const isAdmin = ref(false); // 标记是否为管理员登录

    const submitLogin = async () => {
      try {
        const loginEndpoint = isAdmin.value ? ADMIN_LOGIN_API : LOGIN_API; // 区分登录接口
        const response = isAdmin.value ?
        await axios.post(loginEndpoint, {
          login: mail.value,
          password: password.value
        }) : await axios.post(loginEndpoint, {
          mail: mail.value,
          password: password.value
        });

        if (response.status === 200) {
          console.log('登录成功:', response.data);

          if (response.data) {
            localStorage.setItem('authToken', response.data);
            console.log('Token 已保存到 localStorage'+response.data);
          } else {
            console.warn('响应中未包含 token');
          }

          const redirectPath = isAdmin.value ? '/admin' : '/home';
          await router.push(redirectPath);
        } else {
          console.error('登录失败，服务器未返回成功状态:', response.status);
        }
      } catch (error) {
        console.error('登录失败:', error);
        alert('登录失败，请检查邮箱或密码');
      }
    };

    return {
      router,
      mail,
      password,
      isAdmin,
      submitLogin,
    };
  }
});
</script>

<template>
  <div id="naviBar">
    <navigation-bar/>
  </div>
  <div class="loginBox">
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
        <input type="text" placeholder="Your email" v-model="mail">
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="role-forgot-container">
        <div class="role-switch">

          <input type="checkbox" v-model="isAdmin" class="adminCheck"> Login as Admin

        </div>
        <div class="forgot-pwd">
          <router-link to="/resetPassword"><span>Forgot Password?</span></router-link>
        </div>
      </div>
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
  width: 60%;
  //max-width: 4000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 10%;
  box-sizing: border-box;
  font-family: 'PlastoTrial_ExtraLight', serif;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.title-h1 {
  margin: 5% 0;
  font-size: 3rem;
  font-family: 'PlastoTrial_ExtraBold', serif;
  color: white;
}

.tips {
  line-height: 1.5;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.form {
  width: 100%;
  margin-top: 20px;
}

.input-wrapper {
  width: 100%;
  margin: 15px 0;
}

input {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 1.2rem;
  outline: none;
  font-family: 'Marmelad_Regular', serif;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #808080; /* 聚焦时边框变为灰色 */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* 聚焦时增加白色光晕效果 */
}

.role-forgot-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.role-switch {
  display: flex;
  align-items: center;
  color: white;
}

.adminCheck {
  height: 18px;
  width: 18px;
  margin-right: 8px;
}

.forgot-pwd {
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.forgot-pwd:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  height: 50px;
  border: 0;
  background-color: #000;
  color: #fff;
  margin: 20px 0;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'PlastoTrial_ExtraBold', serif;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #333;
}

.register {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: white;
}

span {
  color: rgb(135, 228, 89);
  cursor: pointer;
  font-weight: bold;
}

span:hover {
  text-decoration: underline;
}

</style>
