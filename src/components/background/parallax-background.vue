<script setup>
import {onMounted, ref, nextTick, onBeforeUnmount} from 'vue';
import Parallax from 'parallax-js';

// 科研领域名称
const fields = [
  'Artificial Intelligence',
  'Quantum Computing',
  'Neuroscience',
  'Astrophysics',
  'Biotechnology',
  'Nanotechnology',
  'Robotics',
  'Data Science',
  'Machine Learning',
  'Cybersecurity',
];

// 用来保存生成的科研领域名称
const characters = ref([]);

// 随机生成科研领域名称的位置和动画
const generateRandomCharacter = () => {
  return fields.map((field) => {
    // 随机生成 top 值 (20vh 到 80vh)
    const yPos = Math.random() * 70 + 10; // 随机生成20vh到80vh之间的值

    // 随机生成 left 值：要么在0vw到20vw之间，要么在80vw到100vw之间
    const xPos = Math.random() < 0.5
        ? Math.random() * 15 // 0vw到15vw之间
        : Math.random() * 20 + 70; // 70vw到90vw之间
    const animationDuration = Math.random() * 5 + 5; // 随机动画时长，范围5s-10s
    const animationDelay = Math.random() * 5; // 随机延迟时间
    // 随机生成 depth 值 (0.1 到 0.5)
    const depth = Math.random() * 0.3 + 0.2;
    const size = Math.random() * 0.5 + 1;
    const rotate=Math.random() * 3 - 1.5;

    return {
      text: field,
      xPos,
      yPos,
      animationDuration,
      animationDelay,
      depth,
      size,
      rotate
    };
  });
};

onMounted(() => {
  characters.value = generateRandomCharacter();
  // 使用 nextTick 确保所有DOM更新完毕后应用 Parallax
  nextTick(() => {
    const scene = document.getElementById('scene');
    new Parallax(scene); // 应用 Parallax
  });
});
// 每 10 秒更新 characters
const intervalId = setInterval(() => {
  characters.value = generateRandomCharacter(); // 更新 characters
}, 5000);

// 在组件销毁时清除定时器
onBeforeUnmount(() => {
  clearInterval(intervalId); // 清除定时器
});
</script>

<template>
  <div id="scene">
    <div data-depth="0.3" class="bg">
      <img src="../../assets/parallax/background.png" alt=""/>
    </div>
    <div data-depth="0.2" class="bridge">
      <img src="../../assets/parallax/bridge-1.png" alt=""/>
    </div>
    <div data-depth="0.1" class="blackback">
      <img src="../../assets/parallax/blackback.png" alt=""/>
    </div>

    <div
        v-if="$route.meta.requiresCharacter"
        class="character"
        v-for="(character, index) in characters"
        :key="index"
        :data-depth="character.depth"
        :style="{
          marginTop: `${character.yPos}vh`,
          marginLeft: `${character.xPos}vw`,
          fontSize:`${character.size}rem`,
        }"
    >
      <div class="vuetype-container">
        <vuetyped :strings="[character.text]"
                  :showCursor="true"
                  :typeSpeed="80"
                  :back-speed="20"
                  :loop="true"
                  class="vuetype">
          <span class="typing"></span>
        </vuetyped>
      </div>
    </div>

  </div>
</template>

<style scoped>
#scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #13171B;
  align-items: center;
}

.bg,
.blackback,
.bridge {
  position: absolute;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
}

.bg img,
.blackback img {
  height: 100vh;
  width: auto;
  margin: auto;
}

.bridge img {
  position: absolute;
  height: 13vh;
  width: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  margin: auto;
}



.character {
  width: 100vw;
  height: 100vh;
  position: absolute;
  color: white;
  //font-family: 'Marmelad_Regular', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  //animation: walk 5s infinite;
}

@keyframes walk {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, 10px);
  }
  50% {
    transform: translate(-8px, -8px);
  }
  75% {
    transform: translate(5px, -5px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
