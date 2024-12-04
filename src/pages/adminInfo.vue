<template>
    <div class="page">
      <ProfileHeader
        :name="admin.name"
        :avatar="admin.avatar"
        :authorization="admin.authorization"
      />
      <div class="detail">
        <div class="pagetabs">
          <Tabs :tabs="tabs" @changeTab="handleTabChange" />
          <div class="tabdetail">
            <div v-if="activeTab === 0">
              <div v-if="admin.claim === null">

                <button @click="sendLoginRequest">点击我发送登录请求</button>
                <button @click="handleClaimRequest">处理认领请求</button>
              </div>
              <div v-else>
                <p>该用户已被认领</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
import default_pic from "../assets/default.png";
import ProfileHeader from "../components/AdminInfo/ProfileHeader.vue";
import Tabs from "../components/AdminInfo/Tabs.vue";
  export default {
    name: "AdminInfo",
    components: {
      ProfileHeader,
      Tabs,
    },
    data() {
      return {
        admin: {
          name: "Admin User",
          avatar: default_pic, 
          claim: null,
          authorization:'',
        },
        tabs: ['处理认领请求'],
        activeTab: 0,
      };
    },
    methods: {
        handleTabChange(index) {
            this.activeTab = index;
        },
        sendLoginRequest() {
          return new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/op/login', {
              login: "daxia",
              password: "123456",
            }).then(response => {
              console.log('发送成功:', response.data);
              this.admin.authorization = "Bearer " + response.data;
              resolve();  // 登录成功，通知后续操作可以继续
            })
            .catch(error => {
              console.error('发送失败:', error);
              reject(error);  // 登录失败
            });
          });
        },
    },
    mounted() {
        
    },
  };
  </script>
  
  <style scoped>
  .page {
    padding: 40px;
    background-color: aliceblue;
    width: 100vw;
    height: 100%;
  }
  
  .tabdetail {
    height: 70vh;
    background-color: white;
    width: 60vw;
  }
  
  .detail {
    display: flex;
    gap: 30px;
    align-items: stretch;
  }
  
  .pagetabs {
    align-items: stretch;
  }
  </style>
  