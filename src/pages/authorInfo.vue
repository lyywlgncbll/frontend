<template>
  <div class="page">
    <ProfileHeader
      :avatar="user.avatar"
      :name="user.name"
      :claim="user.claim"
      :bio="user.bio"
      :institution="user.institution"
      :researchAreas="user.researchAreas"
    />
    <div class="detail">
      <div class="pagetabs">
            <Tabs :tabs=this.tabs  @changeTab="handleTabChange" />
            <div class="tabdetail">
              <div v-if="activeTab === 0">        
                <References 
                :references="references" 
                />
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
import axios from '@/utils/axios.js';
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
      authorid:'',
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
  created() {
    // 从路由参数中获取 authorid
    this.authorid = decodeURIComponent(this.$route.params.authorid);
    console.log('Author ID:', this.authorid);
  },
  methods: {
    //处理切换子页面
    handleTabChange(index){
      this.activeTab = index;
    },





    getAuthorNames(authorsArray){
      if (!Array.isArray(authorsArray)) {
        console.error("Input is not a valid array");
        return "";
      }
      // 使用 map 提取 raw_author_name，join 连接成字符串
      return authorsArray
        .map(author => author.raw_author_name || "")
        .filter(name => name.trim() !== "") // 过滤掉空的名字
        .join(", ");
    },
    sendGetHisAuthorUser(){
      axios.get("/api/academic/getAuthorByAuthorId",{
          params: { 
            authorId:this.authorid,
          }
        }).then(response => {
              // 请求成功，处理返回的 json 数据
              this.user.id=response.data.userid;
              this.user.name = response.data.name;
              this.user.bio=response.data.description;
              this.user.claim=response.data.claim;
              this.user.researchAreas=response.data.researchAreas;
              this.user.institution=response.data.institution;
              console.log("请求学者信息成功",response.data);
            }).catch(error => {
              // 请求失败，打印错误
              console.error('请求学者信息失败:', error);
            });
    },
    sendGetHisReferences(){
        axios.post(
            '/api/academic/searchPublicationsByAuthor',
            this.authorid, // body 设置为 this.authorid
            {
                headers: {
                    'Content-Type': 'text/plain' // 设置 Content-Type 为 text/plain
                }
            }
        ).then(response => {
            console.log("获取该作者的文献了", response.data);
            const formatted = response.data.map(item => ({
                id:item.id,
                title: item.title,
                authors: this.getAuthorNames(JSON.parse(item.authors)),
                journal: item.venue,
                date: item.publishYear,
                citations: item.citation,
            }));
            // 更新数据
            this.references = formatted;
            console.log("获取该作者的文献成功", this.references);
        }).catch(error => {
            console.error('获取该作者的文献失败:', error);
        });
    },
    sendGetHisCooperators(){
      axios.get('/api/academic/getCooperatorsByAuthorID',{
          params:{
            authorId:this.authorid,
          }
        }).then(response => {   
          console.log("获取该作者的合作作者了:",response.data);
          const formatted = response.data.map(item => ({
                name:item.claim,
                university:item.institution,
                avatar:default_pic,
                authorid:item.authorid,
            }));
            // 更新数据
            this.authorData = formatted;
            console.log("获取该作者的合作作者成功",this.authorData);
        }).catch(error =>{
            console.error('获取合作作者失败:', error);
        });
    },
  },
  mounted(){
    this.sendGetHisAuthorUser();
    this.sendGetHisCooperators();
    this.sendGetHisReferences();
    
     
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
