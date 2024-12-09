<template>
    <div>
      <table class="custom-table" :style="{ width: '100%' }">
        <thead class="table-head">
          <tr>
            <th>姓名</th>
            <th>邮箱</th>
            <th>所在机构</th>
            <th>入驻时间</th>
            <th>文献数量</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableData"
            :key="index"
          >
            <td class="name" @click="changeTo(row)">{{ row.name }}</td>
            <td>{{ row.mail }}</td>
            <td>{{ row.institution }}</td>
            <td>{{ row.createTime }}</td>
            <td>{{ row.articleCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script>
  export default {
    props: {
      // 父组件传递的数据
      tableData: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        selectedRows: new Set(),
      };
    },
    methods: {
      // 点击姓名触发父组件方法
      changeTo(row) {
        this.$emit('name-clicked', row);
      },
    },
  };
</script>
  
<style scoped>
.name {
    text-decoration: underline;
    color: rgb(53, 94, 255);
    cursor: pointer;
}
  
tr:first-child th {
    background-color: #ffffff;
    font-size: medium;
    font-weight: 600;
}
  
.custom-table {
    width: 100%;
    border-collapse: collapse;
}
  
.custom-table th,
.custom-table td {
    padding: 10px;
    border: 1px solid #ddd;
    font-weight: 400;
    text-align: center;
}
  
.custom-table th {
    background-color: #f4f4f4;
}
  
.custom-table tr.selected {
    background-color: #f5f5f5;
}
  
.custom-table input[type="checkbox"] {
    cursor: default;
}
  
</style>
  