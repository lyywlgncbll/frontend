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
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/bio.svg">签名：</div>
      </div>
      <div class="info">
        <!-- 编辑 Name -->
        <div class="name" v-if="!editable">{{ name }}</div>
        <input v-if="editable" v-model="nameLocal" class="name-edit" type="text" placeholder="输入姓名" />

        <!-- 编辑 Institution -->
        <div class="institution"> {{ institution }}</div>
        <input v-if="editable" v-model="bioLocal" class="bio-edit"></input>

        <div class="bio" v-if="!editable">{{ bio }}</div>
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
    // 上传头像
    async uploadAvatar() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0]; // 获取用户选择的文件
      if (!file) {
        alert("请先选择一个文件");
        return;
      }

      const currentAvatarBase64 = this.avatar;
      const fileBase64 = await this.convertFileToBase64(file);

      // 如果上传的头像没有改变，提示用户
      if (fileBase64 === currentAvatarBase64) {
        alert("上传的头像没有改变");
        return;
      }

      // 压缩图片
      const compressedFile = await this.compressImage(file);
      if (!compressedFile) {
        alert("图片压缩失败或图片过大");
        return;
      }

      // 创建 FormData 对象并附加文件
      const formData = new FormData();
      formData.append("avator", compressedFile);

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
    },

    // 压缩图片方法
    async compressImage(file) {
      const maxSize = 2 * 1024 * 1024; // 2MB

      // 读取文件为 Image 对象
      const image = await this.loadImage(file);

      const originalWidth = image.width;
      const originalHeight = image.height;

      // 压缩比例
      let width = originalWidth;
      let height = originalHeight;
      const maxDimension = 1024;

      if (width > height && width > maxDimension) {
        height = Math.round(height * (maxDimension / width));
        width = maxDimension;
      } else if (height > maxDimension) {
        width = Math.round(width * (maxDimension / height));
        height = maxDimension;
      }

      // 使用 canvas 压缩图片
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL(file.type, 0.8); // 80% 质量压缩

      // 判断压缩后的图片大小是否小于 2MB
      const compressedBlob = this.dataURItoBlob(compressedBase64);
      if (compressedBlob.size > maxSize) {
        alert("图片压缩后仍然超过 2MB");
        return null;
      }

      // 转回文件对象
      const compressedFile = new File([compressedBlob], file.name, { type: file.type });
      return compressedFile;
    },

    // 将 base64 转换为 Blob
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ua = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ua[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },

    // 读取文件为 Image 对象
    loadImage(file) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
          image.onload = () => resolve(image);
          image.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }
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
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    white-space: nowrap;
  }
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
