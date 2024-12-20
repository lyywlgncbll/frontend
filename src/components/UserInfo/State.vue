<template>
    <div id="state">
        <div class="container">
            <div class="top">
                <img src="/src/assets/iconfonts/userinfo/stats.svg" />Stats
            </div>
            <div class="body">
                <div class="left">
                    <div class="publications">
                        <div class="num">{{ totalPapers }}</div>
                        <div class="name">Publications</div>
                    </div>
                    <div class="citations">
                        <div class="num">{{ totalCitations }}</div>
                        <div class="name">Citations</div>
                    </div>
                </div>
                <div class="chart-container">
                    <div ref="chart" class="chart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

// 定义 props
const props = defineProps({
    chartData: {
        type: Array,
        required: true,
        default: () => [],
    },
    totalPapers: {
        type: Number,
        required: true,
        default: 0
    },
    totalCitations: {
        type: Number,
        required: true,
        default: 0
    },
});

// 引用图表的 DOM 元素
const chart = ref(null);
let myChart = null;

// 转换传入的 chartData 为 ECharts 需要的格式
const transformChartData = (data) => {
    return data.map((item) => ({
        name: item.year.toString(),
        value: item.paperNum,
    }));
};

// 渲染或更新图表的函数
const renderChart = (data) => {
    if (!myChart) return;

    const option = {
        title: {
            text: "论\n文\n年\n份\n分\n布",
            left: "left",
            top: "middle",
            textStyle: {
                fontSize: 15,
                fontWeight: "bold",
                lineHeight: 20,
                verticalAlign: "middle",
            },
            padding: [0, 0, 0, 10], // 调整标题与饼图的间距
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
            {
                name: "论文数量",
                type: "pie",
                radius: "80%",
                data: data,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
    myChart.setOption(option);
};

onMounted(() => {
    if (chart.value && props.chartData.length != 0) {
        myChart = echarts.init(chart.value);
        const initialData = transformChartData(props.chartData);
        renderChart(initialData);

        window.addEventListener("resize", myChart.resize);
    }
});

watch(
    () => props.chartData,
    (newData) => {
        if (chart.value) {
            myChart = echarts.init(chart.value);
            const transformedData = transformChartData(newData);
            renderChart(transformedData);
        }
    },
    { immediate: true, deep: true } // 立即执行，使用初始数据渲染图表
);

</script>

<style scoped>
#state {
    background-color: #fff;
    width: 40%;
    height: 25vh;
    border-radius: 20px;
    min-height: 250px;
    min-width: 400px;
    margin-bottom: 50px;
    margin-left: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.container {
    width: 100%;
    height: 100%;
}

.top {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 700;

    img {
        width: 30px;
        height: 30px;
        margin: 0 8px;
    }
}

.body {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
}

.left {
    width: 40%;
    height: 100%;
    text-align: center;
    margin: 0 auto;

    .publications,
    .citations {
        margin: 25px 0;
    }

    .num {
        font-weight: 700;
        font-size: 26px;
    }

    .name {
        color: #74747d;
        font-size: 15px;
    }
}

.chart-container {
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart {
    width: 100%;
    height: 100%;
}
</style>
