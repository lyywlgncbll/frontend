<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'BarChart',
  props: {
    dataAxis: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dataShadow: [],
      myChart: null, // 保存图表实例
    };
  },

  mounted() {
    // 初始化图表并设置数据
    this.initChart();
  },

  beforeDestroy() {
    // 销毁图表实例，避免内存泄漏
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    // 初始化 ECharts 图表
    initChart() {
      const chartContainer = this.$refs.chartContainer;
      this.myChart = echarts.init(chartContainer);
      // 填充数据
      const option = this.getChartOptions();
      this.myChart.setOption(option);

      // 添加点击事件
      const zoomSize = 6;
      this.myChart.on('click', (params) => {
        console.log(this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        this.myChart.dispatchAction({
          type: 'dataZoom',
          startValue: this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: this.dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.data.length - 1)],
        });
      });
    },
    // 获取图表的配置
    getChartOptions() {
      const maxData = Math.max(...this.data);
      const maxLimit = maxData > 0 ? maxData * 1.2 : 1; 
      const totalDataPoints = this.data.length;
      const startIndex = totalDataPoints > 10 ? totalDataPoints - 10 : 0;

      return {
        title: {
          text: '近期用户阅读量',
        },
        xAxis: {
          data: this.dataAxis,
          axisLabel: {
            inside: false,
            color: '#000',
            formatter: function(value) {
              return value.split('-')[1] + '-' + value.split('-')[2]; // 只显示月份和日期
            }
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#999',
          },
          max: maxLimit, // 设置 y 轴的最大值为最大数据值的 1.2 倍
        },
        dataZoom: [
          {
            type: 'inside',
            startValue: this.dataAxis[startIndex],
            endValue: this.dataAxis[totalDataPoints - 1], // 显示后 10 个数据
          },
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#7E819B' },
                { offset: 0.5, color: '#505478' },
                { offset: 1, color: '#505478' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#06091D' },
                  { offset: 0.7, color: '#06091D' },
                  { offset: 1, color: '#131B5B' },
                ]),
              },
            },
            data: this.data,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
/* 可以添加一些图表样式 */
</style>
