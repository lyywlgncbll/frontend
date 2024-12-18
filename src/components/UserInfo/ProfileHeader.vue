<template>
  <div class="profile-header">
    <div class="avatar-container" @click="triggerFileInput">
      <img
        v-if="avatar"
        :src="avatar"
        alt="加载中"
        class="avatar"
      />
      <div v-else class="default-avatar">{{ getInitial }}</div>
    </div>
    <form @submit.prevent="uploadAvatar" ref="avatarForm" style="display: none;">
      <input
        type="file"
        ref="fileInput"
        @change="uploadAvatar"
        style="display: none;"
      />
    </form>
    <div class="profile-info">

      
       <!-- 编辑 Name -->
       <h2 class="name" v-if="!editable">{{ name }}</h2>
       <input
        v-if="editable"
        v-model="nameLocal"
        class="name-edit"
        type="text"
        placeholder="输入姓名"
       />

       
       <p class="institution">{{ institution }}</p>
       


      <p class="bio" v-if="!editable">{{ bio }}</p> 
      <textarea v-if="editable" v-model="bioLocal" class="bio-edit"></textarea>
    </div>
    <button v-if="!editable" @click="editProfile" class="edit-button">编辑</button>
    <button v-else @click="saveProfile" class="save-button">保存</button>
  </div>
</template>

<script>
import axios from '@/utils/axios.js';
export default {
  name: "ProfileHeader",
  props: {
    editable: {
      type: Boolean,
      default: false, // 默认非编辑状态
    },
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    researchAreas: {
      type: Array,
      default: () => [],
    },
    bio: {  // 个人描述字段
      type: String,
      default: '生动有趣的个人描述更容易让别人认识你~',
    },
    authorization:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      nameLocal: this.name,
      institutionLocal: this.institution,
      researchAreasLocal: this.researchAreas.join(', '),
      bioLocal: this.bio,
    };
  },
  watch: {
    name(newVal) { this.nameLocal = newVal; },
    institution(newVal) { this.institutionLocal = newVal; },
    researchAreas(newVal) { this.researchAreasLocal = newVal.join(', '); },
    bio(newVal) { this.bioLocal = newVal; },
  },
  computed: {
    getInitial() {
      // 返回 name 的第一个字母的大写形式
      return this.name ? this.name.charAt(0).toUpperCase() : "";
    },
  },

  methods: {

    editProfile() {
      // 可以在这里触发编辑事件，比如显示一个编辑框
      this.$emit("editProfile");
    },
    saveProfile() {
      const updatedResearchAreas = this.researchAreasLocal.split(',').map(area => area.trim());
      this.$emit("saveProfile", {
        name: this.nameLocal,
        institution: this.institutionLocal,
        researchAreas: updatedResearchAreas,
        bio: this.bioLocal,
      });
    },








    // 通过ref触发input的click事件，模拟点击文件选择框
    triggerFileInput() {
      if(!this.editable){
        return;
      }else{
        this.$refs.fileInput.click();
      }
    },
    async uploadAvatar() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0]; // 获取用户选择的文件
      if (!file) {
        alert("请先选择一个文件");
        return;
      }
      const currentAvatarBase64 = this.avatar;
      const fileBase64 = await this.convertFileToBase64(file);
      if (fileBase64 === currentAvatarBase64) {
        alert("上传的头像没有改变");
        return;
      }
      // 创建 FormData 对象并附加文件
      const formData = new FormData();
      formData.append("avator", file);
      try {
        const response = await axios.post("/user/avator/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data" // 设置Content-Type为multipart/form-data
          }
        });
        console.log("上传头像成功", response.data);
      } catch (error) {
        console.error("上传头像失败", error);
      }
    },
    // 将文件转换为 base64 编码的辅助方法
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // 返回 base64 编码（去掉前缀部分）
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  },
};
</script>

<style scoped>
.profile-header {
  margin-bottom: 10px;
  height: 35vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  background-color: white;
}

.avatar-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  margin-right: 16px;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.default-avatar {
  font-size: 48px;
  color: #fff;
  background-color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.profile-info {
  flex: 1;
  padding-right: 50px;
  flex-direction: column;
}

.name {
  font-size: 24px;
  margin: 0;
}

.institution {
  color: #666;
}

.research-areas {
  font-size: 14px;
  color: #333;
}

.name-edit {
  all: unset; /* 清除默认输入框样式 */
  font-size: 24px; /* h2 的样式 */
  margin: 0;
  padding: 0;
  border: none; /* 移除边框 */
  width: 100%; /* 保证宽度一致 */
}

.institution-edit {
  all: unset; /* 清除默认输入框样式 */
  font-size: 16px; /* p 的样式 */
  color: #666;
  margin: 0;
  padding: 0;
  border: none; /* 移除边框 */
  width: 100%; /* 保证宽度一致 */
  
}

.research-areas-edit {
  all: unset; /* 清除默认文本域样式 */
  font-size: 14px; /* p 的样式 */
  color: #333;
  margin: 0;
  margin-bottom: -25px;
  padding: 0;
  width: 100%; /* 保证宽度一致 */
  resize: none; /* 禁止调整大小 */
  
}

.bio {
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  border-left: 4px solid #4CAF50;
  padding: 10px 16px;
  border-radius: 8px;
  line-height: 1.5;
  max-height: 100px;
  overflow-y: auto;
  word-wrap: break-word;
  max-width: 40%; /* 设置为父容器的70%宽度 */
}
.bio-edit {
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  border-left: 4px solid #4CAF50;
  padding: 10px 16px;
  border-radius: 8px;
  line-height: 1.5;
  width: 100%;  /* 让输入框的宽度填满可用空间 */
  max-height: 120px;
  overflow-y: auto;
  resize: none;  /* 禁止调整大小 */
  max-width: 40%; /* 确保输入框不会超出右侧按钮 */

}

.edit-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
}
.save-button {
  background-color: green;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  border-radius: 4px;
}
</style>
