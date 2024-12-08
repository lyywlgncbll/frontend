<template>
    <div>
      <table class="custom-table" :style="{ width: '100%' }">
        <thead class="table-head">
          <tr>
            <th>
              <input type="checkbox" @click="toggleAllSelection" :checked="isAllSelected" />
            </th>
            <th>姓名</th>
            <th>认领对应作者</th>
            <th>创建时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableData"
            :key="index"
            :class="{ selected: isSelected(row) }"
          >
            <td>
              <input type="checkbox" :checked="isSelected(row)" @click.stop="toggleRowSelection(row)" />
            </td>
            <td class="name" @click="changeTo(row)">{{ row.user.name }}</td>
            <td>{{ row.authorName }}</td>
            <td>{{ getTime(row.claim.createTime) }}</td>
            <td>{{ getStatusText(row.claim.status) }}</td>
            <td>
              <button @click.stop="approve(row)">通过</button>
              <button @click.stop="reject(row)">拒绝</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script>
import axios from "@/utils/axios";
import { UPDATECLIAM_API } from '@/utils/request.js'
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

  computed: {
    // 判断是否全选
    isAllSelected() {
      return this.selectedRows.size === this.tableData.length;
    },
  },

  methods: {
    // 选择/取消单行的选中状态
    toggleRowSelection(row) {
      if (this.selectedRows.has(row)) {
        this.selectedRows.delete(row);
      } else {
        this.selectedRows.add(row);
      }
    },

    // 判断某一行是否选中
    isSelected(row) {
      return this.selectedRows.has(row);
    },

    // 全选或取消全选
    toggleAllSelection() {
      if (this.isAllSelected) {
        this.selectedRows.clear();
      } else {
        this.tableData.forEach(row => this.selectedRows.add(row));
      }
    },

    // 点击姓名触发父组件方法
    changeTo(row) {
      this.$emit('name-clicked', row);
    },

    // 通过操作
    approve(row) {
      row.claim.status = 'ACCEPTED';
      this.updateClaim(row.claim)
    },

    // 拒绝操作
    reject(row) {
      row.claim.status = 'REJECTED';
      this.updateClaim(row.claim)
    },
    updateClaim(claim){
      try {
        axios.get(UPDATECLIAM_API,{
          params: {
            id: claim.id,
            status: claim.status
            }
          });
      } catch (error) {
        console.error('update failed:', error);
      }
    },
    // 状态转义方法
    getStatusText(status) {
      switch (status) {
        case 'PENDING':
          return '未处理';
        case 'ACCEPTED':
          return '已通过';
        case 'REJECTED':
          return '已拒绝';
        default:
          return status;
      }
    },
    getTime(time){
      const date = new Date(time);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1，并确保两位数
      const day = String(date.getUTCDate()).padStart(2, '0'); // 确保日期是两位数
      return `${year}-${month}-${day}`;
    },
    handleSelectedRows(status) {
      if(status === "ACCEPTED"){
        console.log("一键通过")
      }
      else{
        console.log("一键拒绝")
      }
      const selectedRowsArray = Array.from(this.selectedRows);
      selectedRowsArray.forEach(row => {
        // 在这里处理每个选中的行
        console.log(`正在处理 ${row.name} 的请求，当前状态: ${row.claim.status}`);
        // 在这里修改状态，或做其他处理
        row.claim.status = 'ACCEPTED'; // 示例处理
      });
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
    padding: 15px;
    /* border: 1px solid #ddd; */
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
  
.custom-table button {
    margin: 0px 5px;
    padding: 2px 10px;
    cursor: pointer;
    background-color: #f0f0f0;
    color: black;
    border: none;
    border-radius: 10px;
    transition: background-color 0.3s;
}
  
.custom-table button:hover {
    background-color: rgb(101, 101, 101) !important;
    color: #fffbfb;
}
  
.custom-table button:last-child:hover {
    background-color: rgb(227, 151, 151) !important;
}
</style>
  