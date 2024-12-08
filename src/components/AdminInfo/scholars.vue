<template>
    <div class="menu-container">
        <scholarsTable/>
    </div>
</template>
<script>
import scholarsTable from './scholarsComponent/scholarsTable.vue';
export default{
  data(){
    return{

    };
  },
  components:{
    scholarsTable
  }
}
</script>
<style scoped>
.menu-container {
  display: flexbox;
  width: 90%;
  justify-content: flex-start;
  padding: 50px;
  border: 2px solid #ccc; /* 设置边框 */
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影 */
}

</style>