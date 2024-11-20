<template>
    <div class="page">
      <ProfileHeader
        :avatar="user.avatar"
        :name="user.name"
        :institution="user.institution"
        :researchAreas="user.researchAreas"
        :isEditable="isEditable"
        @editProfile="handleEditProfile"
      />
      <div class="detail">
        <div class="pagetabs">
              <Tabs :tabs=this.tabs  @changeTab="handleTabChange" 
              />
              <div class="tabdetail">
                <div v-if="activeTab === 0">
                  <div v-if="this.claim === null">
                    <References :references="references" :editable="isEditable"/>
                    <button @click="sendVerification">点击我发送邮件</button>
                    <button @click="sendCreateData">点击我发送注册信息</button>
                    <button @click="sendLoginRequest">点击我发送登录请求</button>
                    <button @click="sendGetMyInfo">点击我获取用户信息</button>
                  </div>
                  <div v-else>
                    <p>我是发表文献</p>
                  </div>
                </div>
                <div v-if="activeTab === 1">
                  <div v-if="this.claim === null">
                    <p>我是增值服务</p>
                  </div>
                  <div v-else>
                    <p>我是学术研究</p>
                  </div>
                </div>
              </div>
        </div>
        <div class="pagewriters">
          <AuthorList :authors="authorData" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import default_pic from "../assets/default.png";
import avatarImage from "../assets/example_avatar.png";
import AuthorList from "../components/UserInfo/AuthorList.vue";
import ProfileHeader from "../components/UserInfo/ProfileHeader.vue";
import References from '../components/UserInfo/References.vue';
import Tabs from "../components/UserInfo/Tabs.vue";
  export default {
    name: "Index",
    components: {
      ProfileHeader,
      Tabs,
      AuthorList,
      References,
    },
    data() {
      return {
        isEditable: false,
        authorization:'',
        claim:null,
        user: {
          avatar: avatarImage,
          name: "Jiaqi Zhang",
          institution: "Beihang University",
          researchAreas: ["Computer Vision", "Computer Graphics"],
        },
        tabs:['认领门户','增值服务'],
        activeTab:0,
        authorData: [
          {
            name: "Xiaotian Hu",
            university: "Nanchang University",
            avatar: default_pic
          },
          {
            name: "Zengqi Huang",
            university: "Nanchang University",
            avatar: default_pic
          },
          {
            name: "Yiwan Chen",
            university: "Jiangxi Normal University",
            avatar: default_pic
          },
          {
            name: "Juan Long",
            university: "Nanchang University",
            avatar: default_pic
          }
        ],
        references:[
        {
            title: "Understanding the Mechanism between Antisolvent Dripping and Additive Doping Strategies on the Passivation Effects in Perovskite Solar Cells.",
            authors: "Juan Long, Wangping Sheng, Runying Dai, Zengqi Huang, Jia Yang, Jiaqi Zhang, Xiang Li, Licheng Tan, Yiwang Chen, Yiwang Chen",
            journal: "American Chemical Society 12, 56151-56160",
            date: "2020-12-02",
            citations: 9
          },
          {
            title: "PyTorch Metric Learning.",
            authors: "Kevin Musgrave, Serge J. Belongie, Ser-Nam Lim",
            journal: "",
            date: "2020-08-20",
            citations: 22
          }
        ],
      };
    },
    methods: {
      //处理编辑
      handleEditProfile() {
        console.log("Edit profile clicked");
        this.isEditable = !this.isEditable; 
      },
      //处理切换子页面
      handleTabChange(index){
        this.activeTab = index;
      },

      //登录用户相关，测试用，可以删除
      sendVerification() {
        axios.post('http://localhost:8080/user/reg/verify', null, {
          headers: {
            'Content-Type': 'text/plain', 
          },
          params: {
            mail: '2399791927@qq.com',  
          }
        }).then(response => {
          console.log('发送成功:', response.data);
        })
        .catch(error => {
          console.error('发送失败:', error);
        });
      },
      sendCreateData() {
        axios.post('http://localhost:8080/user/reg/create', 
        {
          name:'huangwenjie',
          mail:'2399791927@qq.com',
          password:'2399791927',
          code:'Q5XOsY',
        }, {
          headers: {
            'Content-Type': 'application/json', 
          },
        }).then(response => {
          console.log('发送成功:', response.data);
        })
        .catch(error => {
          console.error('发送失败:', error);
        });
      },
      sendLoginRequest(){
        axios.post('http://localhost:8080/user/auth/login', {
          mail:"2399791927@qq.com",
          password:"2399791927",
        }).then(response => {
          console.log('发送成功:', response.data);
          this.authorization="Bearer "+response.data;
        })
        .catch(error => {
          console.error('发送失败:', error);
        });
      },
      sendGetMyInfo(){
        axios.get('http://localhost:8080/user/self',{
          headers: {
            Authorization: this.authorization,
          },
        }
        )
        .then(response => {
          // 请求成功，处理返回的 json 数据
          this.user.name = response.data.name;
          this.claim=response.data.claim;
          if(this.claim!=null){
            this.tabs=['发表文献','学术研究']
          }
          console.log(response.data.claim);
        })
        .catch(error => {
          // 请求失败，打印错误
          console.error('请求失败:', error);
        });
      },


      //获取别的页面跳转过来的claim
      getParams(){
        this.claim=this.$route.params.claim;
      }
    },
    mounted(){
      

    }

  };
  </script>
  
  <style scoped>
  .page {
    padding: 40px;
    background-color: aliceblue;
    width: 100vw;
    height: 100%;
  }
  .tabdetail{
    height: 70vh;
    background-color: white;
    width: 60vw;
  }
  .detail{
    display: flex;
    gap: 30px;
    align-items: stretch;
  }
  .pagetabs{
    align-items: stretch;
  }
  .pagewriters{
    background-color: white;
    width: 40vw;
    align-items: stretch;
  }
  </style>
  