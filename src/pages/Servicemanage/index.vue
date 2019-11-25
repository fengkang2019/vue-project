
<template>
  <div>
    <div class="searchForm">
      <el-form size="small" :inline="true" :model="formInline">
        <el-form-item label="停车场：">
          <el-select v-model="value" placeholder="请选择停车场">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客服姓名：">
          <el-input v-model="input" placeholder="请输入客服姓名"></el-input>
        </el-form-item>
        <el-button size="small" type="primary" @click="onSubmit" class="btn">查询</el-button>
        <el-button size="small" type="primary" @click="addService" class="fr btn">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </el-form>
    </div>
    <div class="tableInfo">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="no" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="acount" label="账号"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="permission" label="权限"></el-table-column>
        <el-table-column prop="permiPark" label="授权停车场">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.permiPark}}</el-button>
          </template>
        </el-table-column>
        <el-table-column width="350" prop="option" label="操作">
          <template>
            <el-button type="text" size="small" @click="openDetail">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">修改密码</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">授权停车场</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fr marginTop"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total"
      ></el-pagination>
    </div>

    <Detail :visible1="visible1" />
  </div>
</template>

<script>
import Detail from "./detail.vue";

export default {
  components: { Detail },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        current:1,
        size:10,
        total:20,
      },
      input: "",
      options: [
        {
          value: "选项1",
          label: "停车场1"
        },
        {
          value: "选项2",
          label: "停车场2"
        }
      ],
      switchValue: true,
      value: "",
      tableData: [
        {
          name: "王小虎",
          gender: "男",
          acount: "是谁的小刚",
          tel: "156230032222",
          permission: "二级",
          permiPark: "万达停车场"
        }
      ],
     
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      visible1: false
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    add() {
      console.log("add!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addService(){
      console.log('xinzneg ')
    },
    openDetail(){
      console.log('详情')
    }
  }
};
</script>
<style lang="scss">
.fr {
  float: right;
}
.searchForm {
  padding: 20px 10px 0 10px;
  background: #fff;
}
.tableInfo {
  margin-top: 20px;
}
.marginTop {
  margin-top: 10px;
}
.tr {
  text-align: right;
  letter-spacing: 1px;
}
.margintb {
  margin: 15px 0;
}
.red {
  color: red;
}
.btn {
  background: #3e549d;
}
</style>
