<template>
  <div class="profile-header">
    <div class="avatar" v-if="avatar">
      <img :src="avatar" alt="加载中" class="avatar">
    </div>
    <div class="avatar-placeholder" v-else>
      {{ getInitial }}
    </div>
    <div class="profile-info">
      <h2 class="name">{{ claim }}</h2>
      <p class="institution">{{ institution }}</p>
      <p class="bio" v-if="bio">{{ bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHeader",
  props: {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    claim: {
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
  },
  computed: {
    getInitial() {
      // 返回 name 的第一个字母的大写形式
      return this.claim ? this.claim.charAt(0).toUpperCase() : "";
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    
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

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 16px;
}
.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: bold;
  margin-right: 16px;
}


.profile-info {
  flex: 1;
  padding-right: 50px;
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
