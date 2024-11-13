<template>
    <div class="page">
      <ProfileHeader
        :avatar="user.avatar"
        :name="user.name"
        :institution="user.institution"
        :researchAreas="user.researchAreas"
        @editProfile="handleEditProfile"
      />
      <div class="detail">
        <div class="pagetabs">
              <Tabs :tabs="['发表文献','数据分析']" @changeTab="handleTabChange" 
              />
              <div class="tabdetail">
                <div v-if="tabs.activeTab === 0">
                <p>34</p>
                </div>
                <div v-if="tabs.activeTab === 1">
                <p>12</p>
                </div>
              </div>
        </div>
        <div class="pagewriters">
          <AuthorList :authors="authorlist.authorData" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
import avatarImage from "../assets/example_avatar.png";
import default_pic from "../assets/default.png";
import AuthorList from "../components/UserInfo/AuthorList.vue";
import ProfileHeader from "../components/UserInfo/ProfileHeader.vue";
import Tabs from "../components/UserInfo/Tabs.vue";
  export default {
    name: "Index",
    components: {
      ProfileHeader,
      Tabs,
      AuthorList,
    },
    data() {
      return {
        user: {
          avatar: avatarImage,
          name: "Jiaqi Zhang",
          institution: "Beihang University",
          researchAreas: ["Computer Vision", "Computer Graphics"],
        },
        tabs:{
          activeTab:0,
        },
        authorlist:{
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
      ]
        }
      };
    },
    methods: {
      handleEditProfile() {
        console.log("Edit profile clicked");
      },
      handleTabChange(index){
        this.tabs.activeTab = index;
      },
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
  