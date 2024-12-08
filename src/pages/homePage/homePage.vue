<script>

import {defineComponent} from "vue";
import LoggedNavBar from "~/components/bar/logged-nav-bar.vue";
import {Histogram} from "@element-plus/icons-vue";
import UserHistory from "~/components/home-page/userHistory.vue";
import DailyStatsChart from "~/components/home-page/dailyStatisChart.vue";
import PaperDetails from "~/components/home-page/paperIntros.vue";
import HotTopics from "~/components/home-page/hotspot.vue";

export default defineComponent({
  components: {HotTopics, PaperDetails, DailyStatsChart, UserHistory, Histogram, LoggedNavBar},
  data(){
    return{
      userHistory: [
        {title: "深度学习在计算机视觉中的应用", progress: 70,},
        {title: "自然语言处理的最新进展", progress: 30,},
        {title: "区块链技术与应用", progress: 10,},
        { title: "深度学习在计算机视觉中的应用", progress: 82 },
        { title: "区块链技术与应用", progress: 54 },
        { title: "人工智能在医疗中的应用", progress: 100 },
        { title: "数据挖掘与预测分析", progress: 37 },
        { title: "计算机网络安全技术", progress: 93 }
      ],
    }
  },

})
</script>

<template>
  <div id="page-root" class="home-page">
    <logged-nav-bar class="nav-bar"/>
    <div class="components">
      <div class="left-component">
        <UserHistory class="userHistory"/>
      </div>
      <div class="middle-component">
        <paper-details class="papers"/>
      </div>
      <div class="right-component">
        <daily-stats-chart class="chart"/>
        <hot-topics class="hot-topics"/>
      </div>
    </div>

  </div>

</template>

<style scoped>
@import "../../assets/theme-colors.css";
*{
  width: 100%;
  height: 100%;
}
.home-page{
  display: flex;
  height: 100vh;
}

.nav-bar{
  position: fixed;
  z-index: 100;
  height: auto;
  left: 0;
  right: 0;
}
.components{
  display: flex;
  flex-direction: row;
}
.left-component{
  position: fixed;
  z-index: 50;
  padding-top: 60px;
  width: 20vw;
  max-width: 350px;
  min-width: 330px;
  height: 100vh;
  border-right: 1px solid var(--page-border-color);
  display: flex;
  flex-direction: column;
  .userHistory{
    max-height: 100vh;
  }
}
.middle-component{
  /* position: relative; */
  z-index: 50;
  padding-top: 60px;
  height: 100vh;
  flex-grow: 1;
/* /max-width: 40vw; */
  margin-left: calc(360px);
  margin-right:calc(3vw + 390px);
  /* overflow:scroll;  */
}
.right-component{
  z-index: 50;
  position: fixed;
  right: 3vw;
  padding-top: 60px;
  width: 25vw;
  max-width: 380px;
  min-width: 370px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* //background-color: var(--page-barckground-color); */
  .chart{
    height: auto;
  }
  .hot-topics{
    margin-top: 10px;
    //margin-bottom: 20px;
    height: calc(100% - 270px);
  }
}

</style>