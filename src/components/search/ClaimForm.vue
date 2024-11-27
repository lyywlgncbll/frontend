<template>
    <el-form :model="form" ref="formRef" label-width="100px" class="claim-form">
        <!-- 成果编号 -->
        <el-form-item label="成果编号" prop="id">
            <el-input class="readonly-input" v-model="form.id" :value="formId" :disabled="true"></el-input>
        </el-form-item>

        <!-- 成果标题 -->
        <el-form-item label="成果标题" prop="title">
            <el-input class="readonly-input" v-model="form.title" :value="formTitle" :disabled="true"></el-input>
        </el-form-item>

        <!-- 作者姓名 -->
        <el-form-item label="作者姓名" prop="author">
            <el-input class="readonly-input" v-model="form.author" :value="formAuthor" :disabled="true"></el-input>
        </el-form-item>


        <!-- 提交按钮 -->
        <el-form-item class="button" label-width="0">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { readonly, ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
    formId: String,
    formTitle: String,
    formAuthor: String,
})

const form = ref({
    id: '',
    title: '',
    author: '',
});
const formRef = ref(null);
const submitForm = () => {

};

// 重置表单
const resetForm = () => {
    formRef.value.resetFields();
};
</script>

<style scoped>
.claim-form {
    max-width: 600px;
    width: 100%;
}

::v-deep(.el-form-item__label) {
    padding: 0;
    justify-content: center;
    align-items: center;
}

::v-deep(.el-input__wrapper) {
    padding: 0 10px;
}

::v-deep(.el-form-item) {
    margin: 18px 30px;
}

::v-deep(.button .el-form-item__content) {
    display: flex;
    justify-content: center;
}

::v-deep(.el-input.is-disabled .el-input__inner){
    cursor: default;
}
</style>