<template>
    <div class="menu-container">
      <div>
        <button class="titleButton" v-on:click="handleAcceptSelected"> 一键通过</button>
        <button class="titleButton" v-on:click="handleRejectedSelected">一键拒绝</button>  
      </div>  
      <div class="select-menu-pos">
          <div class="select-menu"> <selectMenu/></div>
      </div>
    </div>
</template>
<script>
import selectMenu from './auditComponent/selectMenu.vue';
export default{
  data(){

  },
  components:{
    selectMenu
  },
  methods:{
    handleAcceptSelected(){
    },
    handleRejectedSelected(){

    }
  }
}
</script>
<style scoped>
.menu-container {
  display: flex;
  width: 80%;
  justify-content: flex-start;
  padding: 50px;
  border: 2px solid #ccc; /* 设置边框 */
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影 */
}
.titleButton{
  border: 2px solid #ccc; /* 设置边框 */
  padding: 0px 10px; /* 调整上下和左右的内边距 */
  margin: 2px;
  font-size: medium;
  font-weight: 200;
}
.titleButton:hover {
    background-color: #f0f0f0; /* Green */
}
.select-menu-pos{
  position: fixed;
  height: auto;
  right: 20%;
}
.select-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid var(--bar-border-color);
  padding: 8px 12px;
  background-color: transparent;
  transition: 0.3s ease;
  color:var(--bar-font-color);
  width: 25%;
  max-width: 90px;
  min-width: 80px;
}
.select-menu:hover{
  transition: background-color 0.3s ease;
  background-color: var(--button-hover-color);
}

.selected-label {
  margin-right: 10px;
}
</style>