<template>
    <div class="chart-container">
      <h3>Yearly Paper Count</h3>
      <canvas ref="yearChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default {
    name: "YearChart",
    props: {
      chartData: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      this.createChart();
    },
    watch: {
      // 监听数据变化，重新绘制图表
      chartData: {
        handler() {
          if (this.chart) this.chart.destroy();
          this.createChart();
        },
        deep: true,
      },
    },
    methods: {
        createChart() {
    const ctx = this.$refs.yearChart.getContext("2d");

    // 处理空数据情况
    if (!this.chartData || this.chartData.length === 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.fillText("No data available", ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

    // 数据处理：如果只有一条数据，添加占位数据
    let chartData = [...this.chartData];
    if (chartData.length === 1) {
        chartData.unshift({ year: "", paperNum: 0 }); // 占位数据
        chartData.push({ year: "", paperNum: 0 });   // 占位数据
    }

    const years = chartData.map((item) => item.year);
    const paperNums = chartData.map((item) => item.paperNum);

    // 绘制图表
    this.chart = new Chart(ctx, {
        type: "bar",
        data: {
        labels: years,
        datasets: [
            {
            label: "Number of Papers",
            data: paperNums,
            backgroundColor: "rgba(169, 169, 169, 0.8)",
            borderWidth: 1,
            },
        ],
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
            grid: { display: false },
            title: { display: true, text: "Year" },
            },
            y: {
            beginAtZero: true,
            suggestedMax: Math.max(...paperNums) + 2, // 适配单条数据的 Y 轴
            title: { display: true, text: "Number of Papers" },
            },
        },
        },
    });
    }


    },
    beforeUnmount() {
      if (this.chart) this.chart.destroy();
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 97%;
    height: 100%;
    max-height: 60vh; /* 适配 .tabdetail 高度 */
    max-width: 110vh; /* 适配 .tabdetail 宽度 */
    padding: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
  }
  </style>
  