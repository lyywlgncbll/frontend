<template>
    <el-form :model="form" ref="formRef" label-width="120px" class="claim-form">
        <!-- 成果标题 -->
        <el-form-item label="成果标题" prop="title" :rules="[{ required: true, message: '请填写成果标题', trigger: 'blur' }]">
            <el-input v-model="form.title" placeholder="请输入成果标题"></el-input>
        </el-form-item>

        <!-- 作者姓名 -->
        <el-form-item label="作者姓名" prop="author" :rules="[{ required: true, message: '请填写作者姓名', trigger: 'blur' }]">
            <el-input v-model="form.author" placeholder="请输入作者姓名"></el-input>
        </el-form-item>

        <!-- 所属机构 -->
        <el-form-item label="所属机构" prop="institution"
            :rules="[{ required: true, message: '请填写所属机构', trigger: 'blur' }]">
            <el-input v-model="form.institution" placeholder="请输入所属机构"></el-input>
        </el-form-item>

        <!-- 发表日期 -->
        <el-form-item label="发表日期" prop="publishDate"
            :rules="[{ required: true, message: '请选择发表日期', trigger: 'change' }]">
            <el-date-picker v-model="form.publishDate" type="date" placeholder="请选择发表日期"></el-date-picker>
        </el-form-item>

        <!-- 成果描述 -->
        <el-form-item label="成果描述" prop="description">
            <el-input type="textarea" v-model="form.description" placeholder="请输入成果描述"></el-input>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 定义表单数据
const form = ref({
    title: '',
    author: '',
    institution: '',
    publishDate: null,
    description: '',
});

// 表单引用，用于重置和验证
const formRef = ref(null);

// 提交表单
const submitForm = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            ElMessage({
                message: '表单提交成功！',
                type: 'success',
            });
            console.log('表单数据:', form.value);
        } else {
            ElMessage({
                message: '请完善表单信息',
                type: 'error',
            });
            return false;
        }
    });
};

// 重置表单
const resetForm = () => {
    formRef.value.resetFields();
};
</script>

<style scoped>
.claim-form {
    max-width: 600px;
    margin: 0 auto;
}
</style>