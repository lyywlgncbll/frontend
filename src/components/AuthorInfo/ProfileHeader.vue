<template>
  <div class="profile-header">
    <div class="avatar-container" @click="triggerFileInput">
      <img v-if="avatar" :src="avatar" alt="加载中" class="avatar" />
      <div v-else class="default-avatar">{{ getInitial }}</div>
    </div>
    <div class="profile-info">
      <div>
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/name.svg">名称：</div>
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/instruction.svg">机构：</div>
        <div class="info-name"><img src="/src/assets/iconfonts/userinfo/bio.svg">签名：</div>
      </div>
      <div class="info">
        <div class="name">{{ name }}</div>
        <div class="institution"> {{ institution==''?'未有所属机构':institution }}</div>
        <div class="bio">{{ bio }}</div>
      </div>
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
      return this.name.charAt(0).toUpperCase();
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
  margin-bottom: 50px;
  height: 25vh;
  width: 60%;
  min-height: 250px;
  min-width: 600px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  margin-left: 15px;
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
  width: 70%;
  height: 70%;
  margin-left: 30px;
  border-left: 2px solid grey;
  display: flex;
  align-items: center;

  .info-name {
    min-width: 90px;
    padding: 5px;
    margin: 25px 5px 25px 20px;
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

  .bio{

  }
}
</style>
