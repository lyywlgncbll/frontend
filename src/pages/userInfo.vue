<template>
    <LoggedNavBar></LoggedNavBar>

    <div class="container">

        <div class="right">
            <ProfileHeader :avatar="user.avatar" :name="user.name" :authorName="user.authorName" :bio="user.bio"
                           :institution="user.institution"
                           :researchAreas="user.researchAreas" :editable="isEditable" :authorization="authorization"
                           @editProfile="handleStartEditProfile" @saveProfile="handleSaveEditProfile"/>
            <div class="pagewriters" v-if="this.user.claimId!==null">
                <AuthorList :authors="authorData"/>
            </div>
        </div>
        <div class="left">
            <div class="top">
                <Claims ref="Claims" :userid="user.id" :authorization="authorization" :myclaimRequests="this.userclaims"
                        :isClaim="user.claimId"/>
                <State v-if="this.user.claimId!==null" :chartData="chartData" :totalCitations="totalCitations"
                       :totalPapers="totalPapers"/>
            </div>

            <div class="pagetabs" v-if="this.user.claimId!==null">
                <References :references="references" :authors="authorData"/>
            </div>
        </div>
    </div>

</template>

<script>
import LoggedNavBar from '@/components/bar/logged-nav-bar.vue';
import Chart from '@/components/UserInfo/Chart.vue';
import axios from '@/utils/axios.js';
import AuthorList from "../components/AuthorInfo/AuthorList.vue";
import Claims from "../components/UserInfo/Claims.vue";
import ProfileHeader from "../components/UserInfo/ProfileHeader.vue";
import References from '../components/AuthorInfo/References.vue';
import State from "../components/AuthorInfo/State.vue";
import Information from "@/components/UserInfo/ReadState.vue";
import ReadState from "@/components/UserInfo/ReadState.vue";
import {GET_READ_CNT_API} from "@/utils/request.js";
import {nextTick} from "vue";
import DailyStatsChart from "@/components/home-page/dailyStatisChart.vue";

export default {
    name: "userInfo",
    components: {
        DailyStatsChart,
        ReadState,
        Information,
        ProfileHeader,
        AuthorList,
        References,
        Claims,
        Chart,
        LoggedNavBar,
        State,
    },
    data() {
        return {
            isEditable: false,
            authorization: '',
            user: {
                id: 1,
                name: "",
                authorName: "",
                mail: '',
                bio: "",
                claimId: '',
                avatar: '',
                institution: '',
            },
            activeTab: 0,
            authorData: [
                // {
                //   name: "Xiaotian Hu",
                //   university: "Nanchang University",
                //   avatar: default_pic
                // },
                // {
                //   name: "Zengqi Huang",
                //   university: "Nanchang University",
                //   avatar: default_pic
                // },
                // {
                //   name: "Yiwan Chen",
                //   university: "Jiangxi Normal University",
                //   avatar: default_pic
                // },
                // {
                //   name: "Juan Long",
                //   university: "Nanchang University",
                //   avatar: default_pic
                // }
            ],
            references: [
                // {
                //   title: "Understanding the Mechanism between Antisolvent Dripping and Additive Doping Strategies on the Passivation Effects in Perovskite Solar Cells.",
                //   authors: "Juan Long, Wangping Sheng, Runying Dai, Zengqi Huang, Jia Yang, Jiaqi Zhang, Xiang Li, Licheng Tan, Yiwang Chen, Yiwang Chen",
                //   journal: "American Chemical Society 12, 56151-56160",
                //   date: "2020-12-02",
                //   citations: 9
                // },
                // {
                //   title: "PyTorch Metric Learning.",
                //   authors: "Kevin Musgrave, Serge J. Belongie, Ser-Nam Lim",
                //   journal: "",
                //   date: "2020-08-20",
                //   citations: 22
                // }
            ],
            chartData: [
                // { 'year': 2014, 'paper_num': 4 },
                // { 'year': 2016, 'paper_num': 1 },
            ],
            readData: [],
            totalCitations: 0,
            totalPapers: 0,
        };
    },
    methods: {
        //处理编辑
        handleStartEditProfile() {
            console.log("Edit profile clicked");
            this.isEditable = !this.isEditable;
        },
        handleSaveEditProfile(profile) {
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
            }, {
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
        sendGetMyInstitution() {
            axios.get('/user/selforg').then(response => {
                console.log("获取用户的机构信息了", response.data);
                this.user.authorName = response.data.authorName;
                if (response.data.org.name != null) this.user.institution = response.data.org.name;
                else {
                    this.user.institution = '未提供所属机构信息';
                }
                console.log("获取用户的机构信息成功", this.user.institution);
            }).catch(error => {
                console.error('获取用户的机构信息失败', error);
            });
        },
        async sendGetMyInfo() {
            return new Promise((resolve, reject) => {
                axios.get("/user/self").then(response => {
                    // 请求成功，处理返回的 json 数据
                    this.user.id = response.data.id;
                    this.user.name = response.data.name;
                    this.user.mail = response.data.mail;
                    this.user.bio = response.data.description;
                    this.user.claimId = response.data.claim;
                    this.user.researchAreas = response.data.fieldsOfStudy;
                    console.log(response.data);
                    resolve();
                }).catch(error => {
                    // 请求失败，打印错误
                    console.error('请求失败:', error);
                    reject(error);
                });
            });
        },
        async sendGetMyAvatar() {
            const id = this.user.id;
            axios.get('/user/avator/get', {
                params: {id}
            }).then(response => {
                this.user.avatar = "data:image/jpeg;base64," + response.data;
                console.log("获取头像成功");
            }).catch(error => {
                console.error('获取头像失败:', error);
            });
        },
        sendGetMyReferences() {
            const id = this.user.id;
            axios.get('/api/academic/getPublicationByUserId', {
                params: {
                    userId: id,
                }
            }).then(response => {
                console.log("获取文献了", response.data);
                const formatted = response.data.papers.map(item => {
                    this.totalCitations += item.citations
                    this.totalPapers++
                    return {
                        id: item.articleId,
                        title: item.title,
                        authors: item.authors.join(", "),
                        journal: item.journal,
                        date: item.publishYear,
                        citations: item.citations,
                    }
                });
                // 更新数据
                this.references = formatted;
                console.log("获取文献成功", this.references);
            }).catch(error => {
                console.error('获取文献失败:', error);
            });
        },
        sendGetMyCooperators() {
            axios.get('/api/academic/getCooperatorsByUserID', {
                params: {
                    userID: this.user.id
                }
            }).then(response => {
                console.log("获取合作作者了:", response.data);
                const uniqueData = Array.from(
                    new Map(response.data.map(item => [item.authorid, item])).values()
                );
                const formatted = uniqueData.map(item => ({
                    name: item.claim,
                    university: item.institution,
                    authorid: item.authorid,
                    isSelf: item.authorid === this.user.claimId,
                }));
                // 更新数据
                this.authorData = formatted;
                console.log("获取合作作者成功", this.authorData);
            }).catch(error => {
                console.error('获取合作作者失败:', error);
            });
        },
        sendGetMychartData() {
            axios.get('/api/academic/authorpub/byYear', {
                params: {
                    authorId: this.user.claimId,
                }
            }).then(response => {
                console.log("获取该作者的年份论文信息了:", response.data);
                // 更新数据
                this.chartData = response.data;
                console.log("获取该作者的年份论文信息成功", this.chartData);
            }).catch(error => {
                console.error('获取该作者的年份论文信息失败:', error);
            });
        },
        sendGetReadData() {
            axios.get(GET_READ_CNT_API).then(response => {
                console.log("获取用户的阅读数据:", response.data);
                this.readData = response.data;
                console.log("获取用户的阅读数据成功", this.readData);
            }).catch(error => {
                console.error('获取用户的阅读数据失败:', error);
            })
        }
    },
    mounted() {

        // 登录成功后再执行获取用户信息
        this.sendGetMyInfo()
            .then(() => {
                this.sendGetMyAvatar().then(() => {
                    if (this.user.claimId === null) {
                        this.$refs.Claims.sendGetMyClaims();
                        this.sendGetReadData();
                    } else {
                        this.$refs.Claims.sendGetMyClaims();
                        this.sendGetMyInstitution();
                        this.sendGetMyReferences();
                        this.sendGetMyCooperators();
                        this.sendGetMychartData();
                        this.sendGetReadData();
                    }
                }).catch(error => {
                    console.error('登录请求个人头像失败', error)
                });
            }).catch(error => {
            console.error('登录请求个人信息失败:', error);
        });
    }

}
</script>

<style scoped>

.container {
    width: 80%;
    display: flex;
    height: 100%;
    margin: auto;
    padding: 50px 0;
}

.right {
    width: 25%;
    height: 100%;
    margin-right: 40px;
}

.left {
    width: 70%;
    height: 100%;

    .top {
        width: 100%;
        display: flex;
    }

    .pagetabs {
        width: 100%;
        max-height: 70vh;
        min-height: 40vh;
    }
}

.pagewriters {
    margin-top: 30px;
    width: 100%;
    max-height: 30vh;
    overflow: scroll;
    scrollbar-width: none;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    ::-webkit-scrollbar {
        display: none;
    }
}



</style>
