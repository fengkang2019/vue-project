<template>
  <el-dialog title="车位详情" :visible.sync="detailFlag" :before-close="handleClose">
    <el-table :data="gridData">
      <el-table-column property="series" label="序号" width="150"></el-table-column>
      <el-table-column property="area" label="区域" width="200"></el-table-column>
      <el-table-column property="carNum" label="车辆"></el-table-column>
      <el-table-column property="inTime" label="进场时间"></el-table-column>
      <el-table-column property="outTime" label="出场时间"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  props: ["detailFlag"],
  data() {
    return {
      gridData: [
        {
          series: "2016-05-02",
          area: "王小虎",
          carNum: "上海市普陀区金沙江路 1518 弄",
          inTime:"2019-1-1",
          outTime:"2020-1-1"
        },
       
      ]
    };
  },
  methods: {
    handleClose: function() {
      this.$parent.detailFlag = false;
    }
  }
};
</script>

<style>
</style>