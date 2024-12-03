<script>

import {defineComponent} from "vue";
import LoggedNavBar from "~/components/bar/logged-nav-bar.vue";
import {Histogram} from "@element-plus/icons-vue";
import UserHistory from "~/components/home-page/userHistory.vue";
import DailyStatsChart from "~/components/home-page/dailyStatusChart.vue";

export default defineComponent({
  components: {DailyStatsChart, UserHistory, Histogram, LoggedNavBar},
  data(){
    return{
      userHistory: [
        {title: "深度学习在计算机视觉中的应用", progress: 70,},
        {title: "自然语言处理的最新进展", progress: 30,},
        {title: "区块链技术与应用", progress: 100,},
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
    <div class="left-component">
      <UserHistory :history-data="userHistory" class="userHistory"/>
    </div>
    <div class="right-component">
      <daily-stats-chart class="chart"/>
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
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
}
.left-component{
  padding-top: 60px;
  width: 20vw;
  max-width: 380px;
  min-width: 330px;
  height: 100vh;
  border-right: 1px solid var(--page-border-color);
  display: flex;
  flex-direction: column;
  .userHistory{
    max-height: 100vh;
  }
}
.right-component{
  position: absolute;
  right: 3vw;
  padding-top: 60px;
  width: 25vw;
  max-width: 380px;
  min-width: 370px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  //background-color: var(--page-barckground-color);
  .chart{
    height: 20vh;
  }
}

</style>