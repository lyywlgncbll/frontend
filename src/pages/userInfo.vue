<template>
    <div class="page">
      <ProfileHeader
        :avatar="user.avatar"
        :name="user.name"
        :institution="user.institution"
        :researchAreas="user.researchAreas"
        @editProfile="handleEditProfile"
      />
      <Tabs :tabs="['发表文献','数据分析']" @changeTab="handleTabChange" />
    </div>
  </template>
  
  <script>
  import avatarImage from "../assets/example_avatar.png";
import ProfileHeader from "../components/UserInfo/ProfileHeader.vue";
import Tabs from "../components/UserInfo/Tabs.vue";

  export default {
    name: "Index",
    components: {
      ProfileHeader,
      Tabs,
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
      };
    },
    methods: {
      handleEditProfile() {
        console.log("Edit profile clicked");
      },
      handleTabChange(index){
        this.activeTab=index;
      },
    },
  };
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  </style>
  