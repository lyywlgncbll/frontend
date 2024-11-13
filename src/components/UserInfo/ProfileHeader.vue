<template>
  <div class="profile-header">
    <img :src="avatar" alt="avatar" class="avatar" />
    <div class="profile-info">
      <h2 class="name">{{ name }}</h2>
      <p class="institution">{{ institution }}</p>
      <p class="research-areas">
        <span v-for="(area, index) in researchAreas" :key="index">
          {{ area }}<span v-if="index < researchAreas.length - 1"> / </span>
        </span>
      </p>
    </div>
    <button @click="editProfile" class="edit-button">编辑</button>
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
    institution: {
      type: String,
      required: true,
    },
    researchAreas: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    editProfile() {
      // 可以在这里触发编辑事件，比如显示一个编辑框
      this.$emit("editProfile");
    },
  },
};
</script>

<style scoped>
.profile-header {
  margin-bottom: 10px;
  height: 25vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  background-color: white;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 24px;
  margin: 0;
}

.institution {
  color: #666;
}

.profile-link {
  color: #1a73e8;
  text-decoration: none;
  font-size: 14px;
}

.research-areas {
  font-size: 14px;
  color: #333;
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
</style>
