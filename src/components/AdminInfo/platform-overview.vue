<template>
    <div class="menu-container">
        <div class="title">信息概况</div>
        <div class="content">
            <div class="contentItem">用户数量：   {{ userCount }}</div>
            <div class="contentItem">入驻学者数： {{ appScholarCount }} 
                <button class="appScolarButton" v-on:click="changeToScholars"> 查看详细</button> 
            </div> 
            <div class="contentItem">文献总量：   {{ articleCount }}</div>
            <div class="contentItem">学者总量：   {{ scholarCount }}</div>
        </div>
        <div class = readCountChart><readCountChart :dataAxis="readDate" :data="readCount"/></div>
    </div>
</template>
<script>
import readCountChart from './overviewComponent/readCountChart.vue';
export default{
    data() {
        return {
            userCount:10,
            articleCount:112101,
            scholarCount:541100,
            appScholarCount:6,
            readDate: [
                '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04',
                '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08',
                '2024-01-09', '2024-01-10'
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
        }
    },
    mounted(){
        //获取后台信息
        this.userCount = 100
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