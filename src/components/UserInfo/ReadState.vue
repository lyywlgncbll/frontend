<template>
    <div id="read-state">
        <div class="container">
            <div class="chart-container">
                <div ref="chart" class="chart"></div>
            </div>

        </div>
    </div>
</template>

<script setup>
import {ref, watch, onMounted, onBeforeUnmount} from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
    readData: {
        type: Array,
        required: true,
        default: () => [],
    },
});

// 计算总阅读量
const getTotalCount = (list) => {
    let total = 0;
    list.forEach((item) => {
        total += item.count;
    })
    console.log(total);
    return total;
};

// 引用图表的 DOM 元素
const chart = ref(null);
let myChart = null;

// 渲染或更新图表的函数
const renderChart = (total) => {
    if (!myChart) return;

    // 仪表盘最大值
    const maxValue = Math.max(total, 1) * 1.2;

    const option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180, // 半圆开始角度
                endAngle: 0, // 半圆结束角度
                min: 0,
                max: maxValue,
                itemStyle: {
                    color: '#58D9F9',
                    shadowColor: 'rgba(0,138,255,0.45)',
                    shadowBlur: 0,
                    shadowOffsetX: 1,
                    shadowOffsetY: 1,
                },
                progress: {
                    show: true, // 显示进度条
                    roundCap: true, // 圆角
                    width: 8, // 进度条宽度
                },
                pointer: {
                    icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                    length: '75%', // 指针长度
                    width: 5, // 指针宽度
                },
                axisLine: {
                    roundCap: true, // 轴线圆角
                    lineStyle: {
                        width: 8, // 轴线宽度
                    },
                },
                axisTick: {
                    show: false, // 隐藏刻度线
                },
                splitLine: {
                    show: false, // 隐藏分割线
                },
                axisLabel: {
                    show: false, // 隐藏刻度标签
                },
                title: {
                    show: false, // 隐藏标题
                },
                detail: {
                    width: '10%', // 中心值宽度
                    lineHeight: 40, // 行高
                    height: 10, // 高度
                    offsetCenter: [0, '35%'], // 中心值偏移
                    valueAnimation: true, // 动画效果
                },
                data: [
                    {
                        value: total,
                    },
                ],
            },
        ],
    };


    myChart.setOption(option);
};

onMounted(() => {
    if (chart.value) {
        myChart = echarts.init(chart.value);
        const initialData = getTotalCount(props.readData);
        renderChart(initialData);

        window.addEventListener("resize", myChart.resize);
    }
});

watch(
    () => props.readData,
    (newData) => {
        if (chart.value) {
            console.log(newData);
            const transformedData = getTotalCount(newData);
            renderChart(transformedData);
        }
    },
    {immediate: true, deep: true} // 立即执行，使用初始数据渲染图表
);

</script>

<style scoped>
#read-state {
    background-color: #fff;
    width: 50%;
    height: 25vh;
    border-radius: 20px;
    min-height: 250px;
    min-width: 300px;
    margin-bottom: 50px;
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


.chart-container {
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart {
    width: 100%;
    height: 100%;
}
</style>
