<template>
    <el-card class="request-card" shadow="hover">
        <h2>请求学术成果转让</h2>

        <el-descriptions title="成果信息" column="1" border>
            <el-descriptions-item label="标题">{{ achievement.title }}</el-descriptions-item>
            <el-descriptions-item label="领域">{{ achievement.field }}</el-descriptions-item>
            <el-descriptions-item label="作者">{{ achievement.author }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="受转让方信息" column="1" border style="margin-top: 10px;">
            <el-descriptions-item label="用户名">{{ transferee.name }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{ transferee.contact }}</el-descriptions-item>
        </el-descriptions>

        <el-form :model="requestForm" :rules="formRules" ref="requestForm" label-width="120px"
            style="margin-top: 20px;">

            <el-form-item label="转让价格" prop="price">
                <el-input v-model="requestForm.price" placeholder="请输入价格（元）" type="number" />
            </el-form-item>

            <el-form-item label="联系方式" prop="contact" style="margin-top: 20px;">
                <el-input v-model="requestForm.contact" placeholder="请输入您的联系方式" />
            </el-form-item>

            <el-form-item label="转让理由" prop="reason" style="margin-top: 20px;">
                <el-input type="textarea" v-model="requestForm.reason" placeholder="请输入转让理由" rows="3" />
            </el-form-item>
        </el-form>

        <!-- 操作按钮 -->
        <div class="form-actions">
            <el-button type="primary" @click="submitRequest">提交请求</el-button>
            <el-button @click="resetForm">重置</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            // 模拟学术成果信息
            achievement: {
                title: "深度学习在医学影像中的应用",
                field: "计算机科学",
                author: "张三",
            },
            // 表单数据
            requestForm: {
                price: '',
                contact: '',
                reason: '',
            },
            transferee: {
                name: "李四",
                contact: "lisci@example.com",
            },
            // 表单校验规则
            formRules: {
                price: [
                    { required: true, message: '请输入转让价格', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const price = parseFloat(value); // 转为浮点数
                            if (isNaN(price) || price <= 0) {
                                callback(new Error('价格必须是正数'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur',
                    },
                ],
                contact: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                    { type: 'string', pattern: /^\d{10,11}$/, message: '请输入有效的手机号码', trigger: 'blur' },
                ],
                reason: [
                    { required: true, message: '请输入转让理由', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        // 提交请求
        submitRequest() {
            this.$refs.requestForm.validate((valid) => {
                if (valid) {
                    this.$message.success('转让请求提交成功！');
                    // 在此处理请求提交逻辑，例如调用 API
                    console.log('提交数据:', this.requestForm);
                } else {
                    this.$message.error('请完善表单信息');
                }
            });
        },
        // 重置表单
        resetForm() {
            this.$refs.requestForm.resetFields();
        },
    },
};
</script>

<style scoped>
.request-card {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>