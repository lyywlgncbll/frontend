<template>
  <div>
    <table class="custom-table" :style="{ width: '100%' }">
      <thead>
        <tr>
          <th>
            <input type="checkbox" @click="toggleAllSelection" :checked="isAllSelected" />
          </th>
          <th>姓名</th>
          <th>认领对应作者</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index" :class="{ selected: isSelected(row) }">
          <td>
            <input type="checkbox" :checked="isSelected(row)" @click.stop="toggleRowSelection(row)" />
          </td>
          <td class="name" @click="changeTo(row)">{{ row.name }}</td>
          <td class="authorName">{{ row.authorName }}</td>
          <td class="time">{{ getTime(row.claim.createTime) }}</td>
          <td v-if="row.claim.status === 'ACCEPTED'" class="option">
            <el-tag type="success">已通过</el-tag>
          </td>
          <td v-else-if="row.claim.status === 'REJECTED'" class="option">
            <el-tag type="danger">已拒绝</el-tag>
          </td>
          <td v-else class="option">
            <button @click.stop="approve(row)" >通过</button>
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
    updateClaim(claim) {
      try {
        axios.post(UPDATECLIAM_API, {}, {
          params: {
            id: claim.id,
            status: claim.status
          }
        });
      } catch (error) {
        console.error('update failed:', error);
      }
    },
    getTime(time) {
      const date = new Date(time);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1，并确保两位数
      const day = String(date.getUTCDate()).padStart(2, '0'); // 确保日期是两位数
      return `${year}-${month}-${day}`;
    },
    handleSelectedRows(status) {
      const selectedRowsArray = Array.from(this.selectedRows);
      if (status === "ACCEPTED") {
        selectedRowsArray.forEach(row => {
          this.approve(row)
        });
      }
      else {
        selectedRowsArray.forEach(row => {
          this.reject(row)
        });
      }
    },
  },
};
</script>

<style scoped>
tbody {
  .name {
    text-decoration: underline;
    color: rgb(53, 94, 255);
    cursor: pointer;
    width: 150px;
    overflow: hidden;
  }
  .authorName{
    font-style: italic;
    width: 280px;
    max-width: 280px;
  }
  .time{
    width: 150px;
    max-width: 150px;
  }
  .option{
    width: 250px;
    max-width: 250px;
  }
}


tr:first-child th {
  background-color: #ffffff;
  font-size: medium;
  font-weight: 600;
}

.custom-table {
  width: 100%;
}

.custom-table th,
.custom-table td {
  padding: 15px;
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
  transition: all  0.3s;
  font-size: 15px;
}

.custom-table button:hover {
  background-color: rgb(121, 197, 138) !important;
  transform: translateY(-2px);
  color: #fffbfb;
}

.custom-table button:last-child:hover {
  background-color: rgb(227, 151, 151) !important;
}
</style>