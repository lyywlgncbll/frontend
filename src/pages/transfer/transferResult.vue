<template>
    <el-card class="result-card" shadow="hover">
      <!-- 标题 -->
      <div class="result-header">
        <el-icon size="20" :color="transferSuccess ? 'green' : 'red'">
          <template v-if="transferSuccess">
            <SuccessFilled />
          </template>
          <template v-else>
            <WarningFilled />
          </template>
        </el-icon>
        <h2 style="font-size: 25px;">{{ transferSuccess ? "转让成功" : "转让失败" }}</h2>
      </div>
  
      <!-- 成果信息 -->
      <el-descriptions title="科研成果信息" column="2" border style="margin-top: 15px;">
        <el-descriptions-item label="标题">{{ achievement.title }}</el-descriptions-item>
        <el-descriptions-item label="领域">{{ achievement.field }}</el-descriptions-item>
        <el-descriptions-item label="作者">{{ achievement.author }}</el-descriptions-item>
        <el-descriptions-item label="发布时间">{{ achievement.date }}</el-descriptions-item>
        <el-descriptions-item label="转让价格">{{ achievement.price }} 元</el-descriptions-item>
      </el-descriptions>
  
      <!-- 双方信息 -->
      <el-descriptions title="转让方信息" column="1" border style="margin-top: 15px;">
        <el-descriptions-item label="转让方" min-width="200px">{{ transferor.name }}</el-descriptions-item>
        <el-descriptions-item label="联系方式" min-width="200px">{{ transferor.contact }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="受让方信息" column="1" border style="margin-top: 15px;">
        <el-descriptions-item label="受让方" min-width="200px">{{ transferee.name }}</el-descriptions-item>
        <el-descriptions-item label="联系方式" min-width="200px">{{ transferee.contact }}</el-descriptions-item>
      </el-descriptions>
      <el-divider />
      <!-- 转让结果说明 -->
      <el-alert
        v-if="transferSuccess"
        title="转让已成功完成！"
        type="success"
        description="受让方已完成支付，并确认了成果接收。"
        show-icon
        center
      />
      <el-alert
        v-else
        title="转让失败"
        type="error"
        description="支付未完成或成果接收方拒绝了转让。"
        show-icon
        center
      />
  
      <!-- 操作按钮 -->
      <div class="result-actions">
        <el-button type="primary" @click="viewDetails">查看详情</el-button>
        <el-button @click="goHome">返回首页</el-button>
      </div>
    </el-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        transferSuccess: true, // 模拟转让结果
        achievement: {
          title: "深度学习在医学影像中的应用",
          field: "计算机科学",
          author: "张三",
          date: "2024-01-15",
          price: 100000,
        },
        transferor: {
          name: "张三",
          contact: "zsscience@example.com",
        },
        transferee: {
          name: "李四",
          contact: "lisci@example.com",
        },
      };
    },
    methods: {
      viewDetails() {
        // 跳转到详情页面
        this.$router.push("/achievement/details");
      },
      goHome() {
        // 返回首页
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style scoped>
  .result-card {
    width: 50%;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
  }
  .result-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .result-header h2 {
    margin: 0;
    font-size: 20px;
  }
  .result-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  