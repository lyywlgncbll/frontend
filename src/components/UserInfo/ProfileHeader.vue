<template>
  <div class="profile-header">
    <div class="avatar-container" @click="triggerFileInput">
      <img v-if="avatar" :src="avatar" alt="加载中" class="avatar" />
      <div v-else class="default-avatar">{{ getInitial }}</div>
    </div>
    <form @submit.prevent="uploadAvatar" ref="avatarForm" style="display: none;">
      <input type="file" ref="fileInput" @change="uploadAvatar" style="display: none;" />
    </form>

    <div class="profile-info">
      <div>
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/name.svg">名称：</div>
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/instruction.svg">机构：</div>
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/bio.svg">个性签名：</div>
      </div>
      <div class="info">
        <!-- 编辑 Name -->
        <div class="name" v-if="!editable">{{ name }}</div>
        <input v-if="editable" v-model="nameLocal" class="name-edit" type="text" placeholder="输入姓名" />

        <!-- 编辑 Institution -->
        <div class="institution"> {{ institution }}</div>

        <div class="bio" v-if="!editable">{{ bio }}</div>
        <input v-if="editable" v-model="bioLocal" class="bio-edit"></input>
      </div>
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
    authorization: {
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
      if (!this.editable) {
        return;
      } else {
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
  margin-bottom: 50px;
  height: 25vh;
  width: 60%;
  min-height: 250px;
  min-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: white;
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.default-avatar {
  font-size: 60px;
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
  width: 60%;
  height: 70%;
  margin-left: 30px;
  border-left: 2px solid grey;
  display: flex;
  align-items: center;

  .info-name {
    padding: 5px;
    margin: 25px 10px 25px 30px;
    text-align: left;
    display: flex;
    align-items: center;

    img {
      display: inline-block;
      width: 23px;
      height: 23px;
      margin-right: 8px;
    }
  }

  .name,
  .institution,
  .bio {
    margin: 25px 0;
    padding: 5px 8px;
  }
}

.name-edit,
.institution-edit,
.bio-edit {
  width: 100%;
  padding: 5px 8px;
}

.name-edit,
.institution-edit,
.bio-edit {
  width: 100%;
  padding: 5px 8px;
  background-color: #eeecec;
  border-radius: 8px; 
  outline: none; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease; 
}

.name-edit:focus,
.institution-edit:focus,
.bio-edit:focus {
  border-color: #b6b6b9; 
  box-shadow: 0 0 5px rgba(194, 197, 194, 0.5); 
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
