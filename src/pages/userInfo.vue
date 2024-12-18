<template>
    <div class="page">
      <ProfileHeader
        :avatar="user.avatar"
        :name="user.name"
        :bio="user.bio"
        :institution="user.institution"
        :researchAreas="user.researchAreas"
        :editable="isEditable"
        :authorization="authorization"
        @editProfile="handleStartEditProfile"
        @saveProfile="handleSaveEditProfile"
      />
      <div class="detail">
        <div class="pagetabs">
              <Tabs :tabs=this.tabs  @changeTab="handleTabChange" />
              <div class="tabdetail">
                <div v-if="activeTab === 0">
                    <div v-if="this.user.claim === null">
                      <Claims ref="Claims"
                        :userid="user.id"
                        :authorization="authorization"
                        :myclaimRequests="this.userclaims"
                        @updataUserClaim="handleUserClaimsUpdata"/>
                      <button @click="sendVerification">点击我发送邮件</button>
                      <button @click="sendCreateData">点击我发送注册信息</button>
                      <button @click="sendLoginRequest">点击我发送登录请求</button>
                      <button @click="sendGetMyInfo">点击我获取用户信息</button>
                      <button @click="sendGetMyAvatar">点击我获取用户头像信息</button>
                    </div>
                    <div v-else>
                        <References 
                        :references="references" 
                        :editable="isEditable"/>
                      <p>我是发表文献</p>
                    </div>
                
                </div>
                <div v-if="activeTab === 1">
                  <div v-if="this.user.claim === null">
                    <p>我是增值服务</p>
                  </div>
                  <div v-else>
                    <Chart
                    :chartData="chartData"/>
                    <p>我是学术研究</p>
                  </div>
                </div>
              </div>
            
        </div>

        <div v-if="this.user.claim !== null" class="pagewriters">
            <AuthorList :authors="authorData" />
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import Chart from '@/components/UserInfo/Chart.vue';
import axios from '@/utils/axios.js';
import default_pic from "../assets/default.png";
import AuthorList from "../components/UserInfo/AuthorList.vue";
import Claims from "../components/UserInfo/Claims.vue";
import ProfileHeader from "../components/UserInfo/ProfileHeader.vue";
import References from '../components/UserInfo/References.vue';
import Tabs from "../components/UserInfo/Tabs.vue";

  export default {
    name: "userInfo",
    components: {
      ProfileHeader,
      Tabs,
      AuthorList,
      References,
      Claims,
      Chart,
    },
    data() {
      return {
        isEditable: false,
        authorization:'',
        user: {
          id:1,
          name: "Jiaqi Zhang",
          mail:'123456@qq.com',
          bio:"我是原神!",
          claim: null,
          researchAreas: ["Computer Vision", "Computer Graphics"],
          avatar: '',
          institution: '未提供所属机构信息',
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
        chartData:[
          {'year':2014, 'paper_num':4},
          {'year':2016, 'paper_num':1},
        ],
      };
    },
    methods: {
      //处理编辑
      handleStartEditProfile() {
        console.log("Edit profile clicked");
        this.isEditable = !this.isEditable; 
      },
      handleSaveEditProfile(profile){
        console.log("Edit profile clicked!!!!");
        this.isEditable = !this.isEditable;
        console.log(profile.researchAreas);
         // 更新用户数据
        this.user.name = profile.name;
        this.user.researchAreas = profile.researchAreas;
        this.user.bio = profile.bio;


        axios.post('/user/data/mod', {
          name: profile.name,
          fieldsOfStudy: profile.researchAreas,
          description: profile.bio, // 对应的字段名
        },{
          headers: {
            Authorization: this.authorization,
          },
        }).then(response => {
          console.log('修改个人描述成功:', response.data);
        })
        .catch(error => {
          console.error('修改个人描述失败:', error);
          // window.location.reload();
        });
      },
      //处理切换子页面
      handleTabChange(index){
        this.activeTab = index;
      },
      handleUserClaimsUpdata(newData){
        this.userclaims=newData;
      },
      sendGetMyClaim(){
        axios.get('/user/selforg').then(response => {
              console.log("获取用户的机构信息了",response.data);
              this.user.institution=response.data.org.name;
              console.log("获取用户的机构信息成功",this.user.institution);
            }).catch(error => {
              console.error('获取用户的机构信息失败', error);
            });
      },
      async sendGetMyInfo(){
        return new Promise((resolve, reject) => {
            axios.get("/user/self").then(response => {
              // 请求成功，处理返回的 json 数据
              this.user.id=response.data.id;
              this.user.name = response.data.name;
              this.user.mail=response.data.mail;
              this.user.bio=response.data.description;
              this.user.claim=response.data.claim;
              this.user.researchAreas=response.data.fieldsOfStudy;
              if(this.user.claim!=null){
                this.tabs=['发表文献','学术研究']
              }
              console.log(response.data);
              resolve();
            }).catch(error => {
              // 请求失败，打印错误
              console.error('请求失败:', error);
              reject(error);
            });
          });
      },
      async sendGetMyAvatar(){  
        const id = this.user.id;
        axios.get('/user/avator/get',{
          params: { id }
        }).then(response => {
            this.user.avatar="data:image/jpeg;base64,"+response.data;
            console.log("获取头像成功");
        }).catch(error =>{
            console.error('获取头像失败:', error);
        });
      },
      sendGetMyReferences(){
        const id = this.user.id;
        axios.get('/api/academic/getPublicationByUserId',{
          params: { 
            userId:id,
          }
        }).then(response => {   
          console.log("获取文献了",response.data);
          const formatted = response.data.papers.map(item => ({
                id:item.articleId,
                title: item.title,
                authors: item.authors.join(", "),
                journal:item.journal,
                date:item.publishYear,
                citations:item.citations,
            }));
            // 更新数据
            this.references = formatted;
            console.log("获取文献成功",this.references);
        }).catch(error =>{
            console.error('获取文献失败:', error);
        });
      },
      sendGetMyCooperators(){
        axios.get('/api/academic/getCooperatorsByUserID',{
          params:{
            userID:this.user.id
          }
        }).then(response => {   
          console.log("获取合作作者了:",response.data);
          const formatted = response.data.map(item => ({
                name:item.claim,
                university:item.institution,
                avatar:default_pic,
                authorid:item.authorid,
            }));
            // 更新数据
            this.authorData = formatted;
            console.log("获取合作作者成功",this.authorData);
        }).catch(error =>{
            console.error('获取合作作者失败:', error);
        });
      },
      sendGetMychartData(){
        axios.get('/api/academic/authorpub/byYear',{
          params:{
            authorId:this.user.claim,
          }
        }).then(response => {   
          console.log("获取该作者的年份论文信息了:",response.data);
            // 更新数据
            this.chartData = response.data;
            console.log("获取该作者的年份论文信息成功",this.chartDataData);
        }).catch(error =>{
            console.error('获取该作者的年份论文信息失败:', error);
        });
      }
    },
    mounted(){

        // 登录成功后再执行获取用户信息
        this.sendGetMyInfo()
          .then(() =>{
            this.sendGetMyAvatar().then(() =>{
              if(this.user.claim===null)this.$refs.Claims.sendGetMyClaims();
              else{
                this.sendGetMyClaim();
                this.sendGetMyReferences();
                this.sendGetMyCooperators();
                this.sendGetMychartData();
              }
            }).catch(error =>{
              console.error('登录请求个人头像失败',error)
            });
          }).catch(error => {
            console.error('登录请求个人信息失败:', error);
          });
      }
      
    }
  </script>
  
  <style scoped>
  .page {
    padding: 40px;
    background-color: aliceblue;
    width: 100vw;
    height: 100%;
  }
  .tabdetail{
    max-height: 45vw;
    background-color: white;
    width: 110vh;
    overflow-y: auto;
  }
  .detail{
    max-height: 45vw;
    
    display: flex;
    gap: 10px;
    align-items: stretch;
  }
  .pagetabs{
    
    flex-grow: 1;
    align-items: stretch;
  }
  .pagewriters{
    max-height: 45vw;
    overflow-y: auto;
    background-color: white;
    width: 40vw;
    align-items: stretch;
  }
  </style>
  