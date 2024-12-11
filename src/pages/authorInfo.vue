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
    />
    <div class="detail">
      <div class="pagetabs">
            <Tabs :tabs=this.tabs  @changeTab="handleTabChange" />
            <div class="tabdetail">
              <div v-if="activeTab === 0">                 
                <References 
                :references="references" 
                :editable="isEditable"/>
              </div>
              <div v-if="activeTab === 1">
                <p>我是学术研究</p>
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
import AuthorList from "@/components/AuthorInfo/AuthorList.vue";
import ProfileHeader from "@/components/AuthorInfo/ProfileHeader.vue";
import References from "@/components/AuthorInfo/References.vue";
import Tabs from "@/components/AuthorInfo/Tabs.vue";
import default_pic from "../assets/default.png";

export default {
  name: "authorInfo",
  components: {
    ProfileHeader,
    Tabs,
    AuthorList,
    References,
  },
  data() {
    return {
      user: {
        id:1,
        name: "Jiaqi Zhang",
        mail:'123456@qq.com',
        bio:"我是原神!",
        claim: null,
        researchAreas: ["Computer Vision", "Computer Graphics"],
        avatar: '',
        institution: "Beihang University",
      },
      tabs:['发表文献','学术研究'],
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
    //处理切换子页面
    handleTabChange(index){
      this.activeTab = index;
    },
    



















  },
  mounted(){

     
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
  height: 70vh;
  background-color: white;
  
}
.detail{
  display: flex;
  gap: 30px;
  align-items: stretch;
}
.pagetabs{
  flex-grow: 1;
  align-items: stretch;
}
.pagewriters{
  background-color: white;
  width: 40vw;
  align-items: stretch;
}
</style>
