<template>
  <div class="identity-selector">
    <h2>选择您的身份</h2>
    <div class="options">
      <div
          v-for="option in options"
          :key="option.value"
          class="option"
          :class="{ selected: selectedIdentity === option.value }"
          @click="selectIdentity(option.value)"
      >
        <span>{{ option.label }}</span>
      </div>
    </div>
    <div v-if="selectedIdentity" class="confirmation">
      <p>您选择的身份是：<strong>{{ selectedLabel }}</strong></p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "IdentitySelector",
  setup() {
    const options = [
      { label: "科研人员", value: "researcher" },
      { label: "普通用户", value: "regular" },
    ];
    const selectedIdentity = ref(null);

    const selectIdentity = (value) => {
      selectedIdentity.value = value;
    };

    const selectedLabel = computed(() => {
      const option = options.find((opt) => opt.value === selectedIdentity.value);
      return option ? option.label : "";
    });

    return {
      options,
      selectedIdentity,
      selectIdentity,
      selectedLabel,
    };
  },
};
</script>

<style scoped>
.identity-selector {
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.option {
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}

.option.selected {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.option:hover {
  background-color: #f0f0f0;
}

.confirmation {
  margin-top: 15px;
  font-size: 16px;
  color: #333;
}
</style>
