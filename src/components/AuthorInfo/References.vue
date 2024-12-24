<template>
    <div class="reference-container">
        <div class="title">
            <span class="reference" :class="{'focus': !isChanged}" @click="changeTab">发表文献</span>
            <span class="map" :class="{'focus': isChanged}" @click="changeTab">作者网络</span>
        </div>
        <!-- 发表文献部分 -->
        <div class="reference-item" v-for="(reference, index) in references" :key="index" v-if="!isChanged">
            <div class="reference-info" @click="goToArticle(reference.id)">
                <h3 class="reference-title" :title="reference.title">{{ reference.title }}</h3>
                <p class="reference-authors"> Published by : {{ formatAuthors(reference.authors) }}</p>
                <p class="reference-journal"> Journal : <span>{{ reference.journal }}</span> <span
                    class="reference-date"> · {{ reference.date }}</span></p>
                <p class="reference-citations">Cited By : {{ reference.citations }}</p>
            </div>
        </div>
        <!-- 作者网络部分 -->
        <div class="map-item" v-if="isChanged">
            <div class="map-title"> 作者网络图 </div>
            <div ref="chartRef" style="width: 100%; height: 55vh;"></div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import router from "@/router/index.js";
export default {
    name: "References",
    props: {
        references: {
            type: Array,
            required: true,
        },
        authors: {
            type: Array,
            required: true, // 作者数据传入，用于生成作者网络图
        },
        editable: {
            type: Boolean,
            default: false, // 默认非编辑状态
        },
    },
    data() {
        return {
            isChanged: false, // 控制 Tab 切换
        };
    },
    methods: {
        goToArticle(id) {
            // 路由跳转到文章详情页
            this.$router.push({ path: "/article", query: { id } });
        },
        formatAuthors(authors) {
            const authorsArray = authors.split(",").map(author => author.trim());
            if (authorsArray.length > 3) {
                return authorsArray.slice(0, 3).join(", ") + ", ...";
            }
            return authorsArray.join(", ");
        },
        changeTab(event) {
            // 根据点击的内容切换 Tab
            if (event.target.classList.contains("map")) {
                this.isChanged = true;
                this.renderAuthorNetwork(); // 切换到作者网络时渲染图表
            } else if (event.target.classList.contains("reference")) {
                this.isChanged = false;
            }
        },
        renderAuthorNetwork() {
            // 初始化 ECharts
            this.$nextTick(() => {
                const chartDom = this.$refs.chartRef;
                if (!chartDom) {
                    console.error("图表容器未找到");
                    return;
                }

                const chart = echarts.init(chartDom);

                // 数据预处理
                const universities = [...new Set(this.authors.map(author => author.university))];
                const categories = universities.map((uni) => ({
                    name: uni,
                }));

                // 构造节点：自己作为中心节点
                const nodes = this.authors.map(author => ({
                    id: author.authorid,
                    name: author.name,
                    category: universities.indexOf(author.university),
                    value: author.isSelf ? 20 : 10, // 自己权重大
                    symbolSize: author.isSelf ? 70 : 50, // 自己节点更大
                }));

                // 构造连线：其他作者与中心节点连接
                const links = this.authors
                    .filter(author => !author.isSelf)
                    .map(author => ({
                        source: this.authors.find(a => a.isSelf).authorid, // 中心节点的 id
                        target: author.authorid, // 其他节点的 id
                    }));

                // 图表配置项
                const option = {
                    tooltip: {
                        formatter: function (params) {
                            if (params.dataType === "node") {
                                // 根据名称找到对应的节点数据
                                const author = this.authors.find(author => author.authorid === params.data.id);
                                const name = author && author.isSelf
                                    ? `${author.name} (Self)`
                                    : author.name;
                                return `姓名: ${name}<br>机构: ${author.university}`;
                            } else if (params.dataType === "edge") {
                                return `合作关系: ${params.data.source} → ${params.data.target}`;
                            }
                        }.bind(this), // 绑定 this 上下文，以访问 this.authors
                    },
                    legend: {
                        type: "scroll", // 启用滚动条，防止图例过多
                        orient: "horizontal", // 水平排列
                        left: "center", // 图例居中
                        bottom: 10, // 图例距离底部 10 像素
                        itemWidth: 20, // 图例标记的宽度
                        itemHeight: 10, // 图例标记的高度
                        textStyle: {
                            fontSize: 12, // 图例文字大小
                            lineHeight: 20, // 图例文字行高
                            overflow: "truncate", // 超出部分省略
                            width: 80, // 限制图例文字宽度
                        },
                        pageIconColor: "#000", // 滚动条按钮颜色
                        pageIconSize: 15, // 滚动条按钮大小
                        show: true, // 显示图例
                    },

                    series: [
                        {
                            type: "graph",
                            layout: "force",
                            data: nodes,
                            links: links,
                            categories: categories,
                            roam: true, // 支持拖拽缩放

                            label: {
                                show: true,
                                position: "right",
                                formatter: "{b}",
                            },
                            force: {
                                repulsion: 300, // 节点排斥力
                                edgeLength: [50, 150], // 边的长度范围
                            },
                            lineStyle: {
                                width: 2,
                                curveness: 0.3, // 弧度
                            },
                        },
                    ],
                };

                // 渲染图表
                chart.setOption(option);
                // 添加点击事件监听
                chart.on("click", (params) => {
                    if (params.dataType === "node") {
                        // 获取点击的节点数据
                        const clickedNode = params.data;
                        if (clickedNode.id) {
                            // 使用 Vue 路由跳转
                            if (this.$route.path.includes('authorInfo/')) {
                                router.push(`/authorInfo/${clickedNode.id}`);
                                window.location.reload();
                            } else{
                                router.push(`/authorInfo/${clickedNode.id}`);
                            }

                        }
                    }
                });
            });
        },
    },
    mounted() {
        // 默认渲染发表文献
        if (this.isChanged) {
            this.renderAuthorNetwork();
        }
    },
};
</script>
<style scoped>
.title {
    position: sticky;
    top: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 5px;
    border-bottom: 2px solid #e0e0e0;
    background-color: #fff;
    z-index: 1;
    padding-top: 20px;

    .map {
        margin-left: 20px;
        cursor: pointer;
    }

    .reference {
        cursor: pointer;
    }

    .focus {
        color: #1e88e5;
    }
}

.reference-container {
    height: 100%;
    width: 100%;
    max-height: 70vh;
    min-height: 500px;
    background-color: #fff;
    border-radius: 20px;
    padding: 0px 20px;
    padding-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: scroll;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }
}

.reference-item {
    width: 100%;
    height: auto;
    padding: 10px 0;
    margin-bottom: 10px;
}

.reference-info {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s ease;

    .reference-title {
        margin-bottom: 5px;
        font-size: 21px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .reference-authors {
        font-size: 15px;
        color: #808080;
        margin-bottom: 5px;
    }

    .reference-journal {
        font-size: 15px;
        color: #808080;

        span {
            font-style: italic;
        }
    }

    .reference-citations {
        font-size: 14px;
        text-align: right;
        color: #808080;
    }

    &:hover {
        background-color: #f0f0f0;
    }
}

.map-item {
    margin-top: 10px;
    .map-title{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>
