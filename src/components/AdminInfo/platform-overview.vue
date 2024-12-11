<template>
    <div class="menu-container">
        <div class="title">信息概况</div>
        <div class="content">
            <div class="contentItem">用户数量：   {{ userCount }}</div>
            <div class="contentItem">入驻学者数： {{ appScholarCount }} 
                <button class="appScolarButton" v-on:click="changeToScholars"> 查看详细</button> 
            </div> 
            <div class="contentItem">文献总量：   {{ articleCount }}</div>
            <div class="contentItem">作者总量：   {{ scholarCount }}</div>
        </div>
        <div class = readCountChart><readCountChart v-if="isDataLoaded" :dataAxis="readDate" :data="readCount"/></div>
    </div>
</template>
<script>
import readCountChart from './overviewComponent/readCountChart.vue';
import axios from "@/utils/axios";
import { USERCOUNT_API,SCHOLARSCOUNT_API,ARTICLECOUNT_API,AUTHORCOUNT_API,GETALLREADCOUNT_API } from '@/utils/request.js'
export default{
    data() {
        return {
            isDataLoaded:false,
            userCount:10,
            articleCount:112101,
            scholarCount:541100,
            appScholarCount:6,
            readDate: [
                '2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04',
                '2024-12-05', '2024-12-06', '2024-12-07', '2024-12-08',
                '2024-12-09', '2024-12-10'
            ],
            readCount: [20, 18, 19, 34, 20, 30, 31, 23, 42, 31]
        };
    },
    components:{
        readCountChart,
    },
    methods:{
        changeToScholars(){
            this.$router.push('/admin/scholars');
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    created(){
        //获取后台信息
        try {
            axios.get(USERCOUNT_API).then(response => {
                if (response.status === 200) {
                   this.userCount = response.data;
                }
            });
            axios.get(SCHOLARSCOUNT_API).then(response => {
                if (response.status === 200) {
                   this.appScholarCount = response.data;
                }
            });
            axios.get(ARTICLECOUNT_API).then(response => {
                if (response.status === 200) {
                   this.articleCount = response.data;
                }
            });
            axios.get(AUTHORCOUNT_API).then(response => {
                if (response.status === 200) {
                   this.scholarCount = response.data;
                }
            });
            axios.get(GETALLREADCOUNT_API).then(response => {
                if (response.status === 200) {
                    const responseData = response.data;
                    console.log(responseData);
                    this.readDate.length = 0;
                    this.readCount.length = 0;
                    // 获取当前日期
                    const today = new Date();
                    const last15Days = [];
                    for(let i = 14; i >= 0; i--) {
                        const date = new Date(today);
                        date.setDate(today.getDate() - i);
                        last15Days.push(this.formatDate(date)); 
                    }
                    last15Days.forEach(date => {
                        const item = responseData.find(item => item.date === date);
                        if (item) {
                            this.readDate.push(item.date);
                            this.readCount.push(item.total_count);
                        } else {
                            this.readDate.push(date);
                            this.readCount.push(0);
                        }
                    });
                    this.isDataLoaded = true;
                }
            });
        } catch (error) {
            console.error('update failed:', error);
        }
    }
}
</script>
<style scoped>
.menu-container {
  display: flexbox;
  width: 90%;
  justify-content: flex-start;
  padding: 50px;
  border: 2px solid #ccc; /* 设置边框 */
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影 */
}
.title{
    font-size: large;
    font-weight: 550;
}
.content{
    margin-left: 25px;
    margin-top: 15px;
}
.contentItem{
    font-size: medium;
    font-weight: 100;
    letter-spacing: 1px;
    margin: 5px 0;
}
.appScolarButton{
    margin-left: 50px;
    color: rgb(10, 27, 218);
}
.readCountChart{
    margin-top: 50px;
}
</style>