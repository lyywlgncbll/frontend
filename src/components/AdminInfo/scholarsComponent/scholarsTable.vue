<template>
    <div>
      <table class="custom-table" :style="{ width: '100%' }">
        <thead class="table-head">
          <tr>
            <th>姓名</th>
            <th>邮箱</th>
            <th>所在机构</th>
            <th>入驻时间</th>
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
            <td class="name" @click="changeTo(row)">{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.claim }}</td>
            <td>{{ row.createTime }}</td>
            <td>{{ getStatusText(row.status) }}</td>
            
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
        row.status = 'ACCEPTED';
      },
  
      // 拒绝操作
      reject(row) {
        row.status = 'REJECTED';
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
          console.log(`正在处理 ${row.name} 的请求，当前状态: ${row.status}`);
          // 在这里修改状态，或做其他处理
          row.status = 'ACCEPTED'; // 示例处理
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
  