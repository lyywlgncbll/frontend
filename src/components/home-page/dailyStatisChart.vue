<template>
  <div id="page-root" class="stats-chart">
    <h2>{{totalReadingVolume}} reading times in last 4 Months</h2>
    <div class="daily-stats-chart">
      <div class="months-row">
        <div v-for="(month, index) in lastFourMonths" :key="index" class="month-item">
          {{ month.month }}
        </div>
      </div>
      <div class="day-stats-grid">
        <div class="dayNames">
          <div v-for="(dayName,index) in dayNames" :key="index" class="dayName">
            {{dayName.weekday}}
          </div>
        </div>
        <div class="stats-grid">
          <div v-for="(row, rowIndex) in groupedStats" :key="rowIndex" class="stats-row">
            <div
                v-for="(item, index) in row"
                :key="index"
                class="grid-item"
                :style="{
              backgroundColor: getColor(item.count),
            }"
            >
              <!-- 每个格子的贡献数显示 -->
              <el-tooltip :content="`${item.count} reading times on ${item.date}`"
                          placement="top"
                          show-after="200"
                          hide-after="100"
                          effect="light"
              >
                <div class="tooltip-trigger">
                </div>
              </el-tooltip>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import { ElTooltip } from 'element-plus';
export default {
  name: 'DailyStatsChart',
  setup() {
    // 模拟的历史数据（你可以从 API 获取这些数据）
    const statsData = ref([
      { date: '2024-08-03', count: 5 },
      { date: '2024-08-15', count: 15 },
      { date: '2024-08-25', count: 27 },
      { date: '2024-09-13', count: 27 },
      { date: '2024-11-01', count: 5 },
      { date: '2024-11-02', count: 7 },
      { date: '2024-11-03', count: 10 },
      { date: '2024-11-04', count: 6 },
      { date: '2024-11-05', count: 8 },
      { date: '2024-11-06', count: 12 },
      { date: '2024-11-07', count: 3 },
      { date: '2024-11-08', count: 9 },
      { date: '2024-11-09', count: 11 },
      { date: '2024-11-10', count: 13 },
      { date: '2024-11-11', count: 6 },
      { date: '2024-11-12', count: 7 },
      { date: '2024-11-13', count: 9 },
      { date: '2024-11-14', count: 5 },
      { date: '2024-11-15', count: 6 },
      { date: '2024-11-30', count: 16 },
      { date: '2024-12-02', count: 16 },
    ]);


    const getFourMonthsData = () => {
      const data = [];
      const today = new Date();
      const endDate = new Date(today);  // 克隆 today，避免修改原始对象
      const startDate = new Date(today.setMonth(today.getMonth() - 4));  // 三个月前的日期

      // 遍历过去四个月的每一天
      while (startDate <= endDate) {
        const dateStr = startDate.toISOString().split('T')[0];  // 获取日期字符串 YYYY-MM-DD
        const existingData = statsData.value.find(item => item.date === dateStr);
        data.push(existingData || { date: dateStr, count: 0 });  // 如果没有数据，则填充 count 为 0
        startDate.setDate(startDate.getDate() + 1);  // 日期增加一天
      }
      return data;
    };
    const getLastFourMonths = () => {
      const months = [];
      const today = new Date(); // 获取当前日期
      const currentMonth = today.getMonth(); // 当前月份
      const currentYear = today.getFullYear(); // 当前年份
      const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });

      // 循环生成最近四个月的月份
      for (let i = 4; i >=0; i--) {
        let month = (currentMonth - i) % 12; // 计算每个月的实际月份
        let year = currentYear - Math.floor((currentMonth - i) / 12); // 处理跨年的情况
        let monthAbbreviation = monthFormatter.format(new Date(year, month, 1));
        months.push({ month: monthAbbreviation }); // 将月份和年份存储到数组中（+1 因为月份是从 0 开始的）
      }
      return months;

    };

    // 获取四个月份
    const lastFourMonths = getLastFourMonths();
    const getDayOfWeekFourMonthsAgo = () => {
      const days=[];
      const today = new Date();
      const fourMonthsAgo = new Date(today.setMonth(today.getMonth() - 4)); // 获取四个月前的日期

      // 获取四个月前的星期几
      const weekday = fourMonthsAgo.getDay();

      // 将数字映射为星期的英文缩写
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      days.push({weekday:weekdays[weekday]});
      days.push({ weekday: weekdays[(weekday + 3) % 7] }); // 加3天后的星期
      days.push({ weekday: weekdays[(weekday + 6) % 7] }); // 加6天后的星期


      return days; // 返回星期几的英文缩写
    };
    const dayNames=getDayOfWeekFourMonthsAgo();

    const fullStatsData = ref([]);

    // 在组件挂载时获取数据
    onMounted(() => {
      fullStatsData.value = getFourMonthsData();
    });

    // 颜色映射函数
    const getColor = (count) => {
      if (count >= 10) return '#216E39';
      if (count >= 7) return '#40C463';
      if (count >= 5) return '#9BE9A8';
      return '#EBEDF0';
    };
    // 计算总阅读量
    const totalReadingVolume = computed(() => {
      return fullStatsData.value.reduce((total, item) => total + item.count, 0);
    });

    return {
      fullStatsData,
      getColor,
      totalReadingVolume,
      lastFourMonths,
      dayNames
    };
  },
  computed: {
    groupedStats() {
      // 将数据按每7个元素分组
      const groups = [];
      for (let i = 0; i < this.fullStatsData.length; i += 7) {
        groups.push(this.fullStatsData.slice(i, i + 7));
      }
      return groups;
    },
  },
};
</script>

<style scoped>
*{
  z-index: 100;
}

.daily-stats-chart {
  width: auto;
  max-width: 800px;
  //margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--page-border-color) 1px solid;
  border-radius: 6px;
  margin: 10px;
}

h2 {
  font-size: 17px;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left!important;
  color: var(--page-font-color);
}

.day-stats-grid{
  display: flex;
  flex-direction: row;
}
.dayNames{
  display: flex;
  flex-direction: column;
  gap: 25px;
  //height: 110px;
  padding-right: 5px;
  //font-weight: bold;

}
.dayName{
  font-size: 12px;
}
.stats-grid {
  display: flex;
  //justify-content: space-between;
  //grid-template-columns: repeat(auto-fill, minmax(10px, 1fr)); /* 每列宽度至少 50px */
  gap: 5px; /* 格子间距 */
  //max-width: 100%;
  height: auto; /* 高度根据内容自动调整 */

}
.stats-row {
  display: grid;
  //justify-content: space-between;
  grid-template-rows: repeat(7, 10px); /* 每列7个格子 */
  //grid-template-columns: repeat(auto-fill, minmax(10px, 1fr)); /* 每列宽度至少 50px */
  gap: 5px;
}

.grid-item {
  width: 12px; /* 每个格子的宽度 */
  height: 12px; /* 每个格子的高度 */
  transition: background-color 0.3s ease; /* 背景颜色平滑过渡 */
  border-radius: 3px;
  cursor: pointer;
}

.grid-item:hover {
  opacity: 0.8;
}
.tooltip-trigger{
  width: 100%;
  height: 100%;
}
.months-row {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(5, 10px); /* 每列7个格子 */
  width: calc(100% - 40px);
  margin-bottom: 10px;
  //margin-right: 10px;
  padding-left:10px ;
}

.month-item {
  //width: 25%; /* 每个月份占据等分的宽度 */
  //text-align: center;
  //font-weight: bold;
  font-size: 13px;
}
</style>
