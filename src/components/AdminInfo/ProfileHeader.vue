<template>
  <div class="profile-header">
    <img :src="avatar" alt="加载中" class="avatar" />
    <div class="profile-info">
      <h2 class="name">{{ name }}</h2>
    </div>
  </div>
</template>

<script>


export default {
  name: "ProfileHeader",
  props: {
    name: {
      type: String,
      required: true,
    },
    authorization:{
      type: String,
      required: true,
    },
    avatar: {  // 添加 avatar 这个 prop
      type: String,
      required: true,
    },
  },
  data() {
    return {
     
    };
  },
  watch: {
   


  },
  methods: {

  }
};
</script>

<style scoped>
.profile-header {
  margin-bottom: 10px;
  height: 35vh;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  background-color: white;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 16px;
}

.profile-info {
  text-align: center; 
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
.bio {
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  border-left: 4px solid #4CAF50;
  padding: 10px 16px;
  margin-top: 12px;
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
  margin-top: 12px;
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
