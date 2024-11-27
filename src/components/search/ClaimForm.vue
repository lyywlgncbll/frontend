<template>
    <el-form :model="form" ref="formRef" label-width="80px" class="claim-form" :rules="rules">
        <div class="title">认领学术成果</div>
        <!-- 成果编号 -->
        <el-form-item label="成果编号" prop="id">
            <el-input class="readonly-input" v-model="form.id" :value="formId" :disabled="true"></el-input>
        </el-form-item>

        <!-- 成果标题 -->
        <el-form-item label="成果标题" prop="title">
            <el-input class="readonly-input" v-model="form.title" :value="formTitle" :disabled="true"></el-input>
        </el-form-item>

        <!-- 作者姓名 -->
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- 身份证号 -->
        <el-form-item label="身份证号" prop="identityNum">
            <el-input v-model="form.identityNum" @input="validateIdentityNum" maxlength="18"></el-input>
        </el-form-item>

        <div class="line"></div>

        <div class="submit-btn">发送</div>
    </el-form>
</template>

<script setup>
import { readonly, ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
    formId: String,
    formTitle: String,
})

const form = ref({
    id: '',
    title: '',
    name: '',
    identityNum: '',
});
const formRef = ref(null);
const submitForm = () => {

};

// 重置表单
const resetForm = () => {
    formRef.value.resetFields();
};

const rules = ref({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    identityNum: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                const regex = /^\d{18}$/
                if (!regex.test(value)) {
                    callback(new Error('身份证号必须是18位数字'))
                }
            },
            trigger: 'blur',
        },
    ],
})
</script>

<style scoped>
.claim-form {
    max-width: 600px;
    width: 100%;
}

.title {
  font-size: 30px;
  font-weight: 530;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 25px;
  margin: 30px 0 20px 20px;
  color: #1599db;
}

.title::before {
  width: 18px;
  height: 18px;
}

.title::before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #1599db;
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
    margin: 23px 35px;
}

::v-deep(.button .el-form-item__content) {
    display: flex;
    justify-content: center;
}

::v-deep(.el-input.is-disabled .el-input__inner) {
    cursor: default;
}

.line{
    height: .5px;
    width: 85%;
    background-color: #dadde1;
    margin: 35px auto 0 auto;
}

.submit-btn {
  position: absolute;
  border-radius: 30px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  background-color: #1599db;
  color: #FFF;
  padding: 18px 65px;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 10px;
  right: -10px;
  bottom: -15px;
  cursor: pointer;
  transition: all .25s ease;
  
}

.submit-btn:after {
  position: absolute;
  content: "";
  right: 0px;
  bottom: 58px;
  width: 0;
  height: 0;
  border-left: 0px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #0687d7;
}

.submit-btn:hover {
  background-color: #0687d7;
  
}
</style>