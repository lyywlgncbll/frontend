<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  navLinks: {
    type: Array,
    default: () => []
  },
  ctaText: {
    type: String,
    default: 'Lets Start'
  },
  ctaLink: {
    type: String,
    default: '#/login'
  },
  indexLink: {
    type: String,
    default: '#/'
  }
});
</script>

<template>
  <header>
    <a :href="indexLink"><img src="src/assets/logo/CCBridge_White.svg" alt="" class="logo"></a>
    <nav>
      <ul class="nav_links">
        <li v-for="link in navLinks" :key="link">{{ link }}</li>
      </ul>
    </nav>
    <a :href="ctaLink" class="cta">
      <button>{{ ctaText }}</button>
    </a>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: transparent;
}

li, a, button {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 3%;
  transform-origin: top left; /* 设置缩放的原点为左上角 */
}

header .logo {
  cursor: pointer;
  width: 150px;
  height: auto;
}

.nav_links {
  list-style: none;
}

.nav_links li {
  display: inline-block;
  padding: 0px 20px;
}

.nav_links li:nth-child(2) {
  text-decoration: underline;
}

.nav_links li a {
  transition: all 0.3s ease 0s;
}

.nav_links li a:hover {
  color: #0088a9;
}

button {
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background-color: white;
  color: black;
  font-size: 20px;
  cursor: pointer;
  font-family: PlastoTrial_ExtraBold,serif;
}

button:hover {
  background-color: lightgrey;
}
</style>
