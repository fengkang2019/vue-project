
<template>
  <div>
  <div  class="searchForm">
  <el-form :inline="true" :model="formInline">
      <el-form-item label="停车场：">
        <el-select v-model="value" placeholder="请选择停车场">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客服姓名：">
        <el-input v-model="input" placeholder="请输入客服姓名"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="dialogAddFormVisible = true" class="fr"
        ><i class="el-icon-plus"></i>新增</el-button
      >
    </el-form>
  </div>
    <div class = "tableInfo">
       <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column prop="no" label="序号" width='80'>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="acount" label="账号"> </el-table-column>
      <el-table-column prop="tel" label="电话"> </el-table-column>
      <el-table-column prop="gender" label="性别"> </el-table-column>
      <el-table-column prop="permission" label="权限"> </el-table-column>
      <el-table-column prop="permiPark" label="授权停车场"> 
          <template slot-scope="scope">
       <el-button type="text" size="small">
            {{scope.row.permiPark}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width='350' prop="option" label="操作">
        <template>
          <el-button type="text" size="small" @click="dialogFormVisible = true">
            详情
          </el-button>
          <el-button type="text" size="small">
            编辑
          </el-button>
          <el-button type="text" size="small">
            禁用
          </el-button>
          <el-button type="text" size="small">
            修改密码
          </el-button>
          <el-button type="text" size="small">
            删除
          </el-button>
          <el-button type="text" size="small">
            授权停车场
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class = "fr marginTop"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>

<div>
<el-dialog title="详情" :visible.sync="dialogFormVisible">
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span><span>用户类型：</span></el-col>
  <el-col :span="18"><span></span></el-col>
</el-row>
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span><span>姓名：</span></el-col>
  <el-col :span="18"><span></span></el-col>
</el-row>
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span></span><span>性别：</span></el-col>
  <el-col :span="18"><span></span></el-col>
</el-row>
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span><span>账号：</span></el-col>
  <el-col :span="18"><span></span></el-col>
</el-row>
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span><span>密码：</span></el-col>
  <el-col :span="18"><span></span></el-col>
</el-row>
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span><span>开关闸权限：</span></el-col>
  <el-col :span="18">
    <el-switch
  v-model="switchValue"
  active-color="#3d539c"
  inactive-color="#ccc">
</el-switch>
</el-col>
</el-row>
<el-row :gutter="20" class="margintb">
  <el-col :span="6" class = "tr"><span class = "red">*</span><span>授权停车场：</span></el-col>
  <el-col :span="18">
<span></span>
</el-col>
</el-row>
</el-dialog>
</div>
<div>
<el-dialog title="新增" :visible.sync="dialogAddFormVisible">
<el-form :inline="true" :model="formInline">
<el-row>
 <el-form-item label="用户类型：">
         <el-input v-model="input"></el-input>
      </el-form-item>
</el-row>
     <el-row>
     <el-form-item label="姓名：">
        <el-input v-model="input"></el-input>
      </el-form-item>
     </el-row>
       <el-row>
       <el-form-item label="姓名：">
        <el-input v-model="input"></el-input>
      </el-form-item>
     </el-row>
       <el-row>
         <el-form-item label="电话：">
        <el-input v-model="input"></el-input>
      </el-form-item>
     </el-row>
       <el-row>
        <el-form-item label="账号：">
        <el-input v-model="input"></el-input>
      </el-form-item>
     </el-row>
       <el-row>
         <el-form-item label="密码：">
        <el-input v-model="input"></el-input>
      </el-form-item>
     </el-row>
       <el-row>
       <el-form-item label="开关闸权限：">
   <el-switch
  v-model="switchValue"
  active-color="#3d539c"
  inactive-color="#ccc">
</el-switch>
      </el-form-item>
     </el-row>
           </el-form-item>
    </el-form>

</el-dialog>
</div>
  </div>
</template>

<script>
import Detail from './detail.vue'

export default {
 components: { Detail },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
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
      switchValue:true,
      value: "",
      tableData: [
        {
          name: "王小虎",
          gender: "男",
          acount: "是谁的小刚",
          tel: "156230032222",
          permission: "二级",
          permiPark: "万达停车场"
        },
        {
          name: "王小虎",
          gender: "男",
          acount: "是谁的小刚",
          tel: "156230032222",
          permission: "二级",
          permiPark: "万达停车场"
        },
        {
          name: "王小虎",
          gender: "男",
          acount: "是谁的小刚",
          tel: "156230032222",
          permission: "二级",
          permiPark: "万达停车场"
        }
      ],
      currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
          dialogFormVisible: false,
          dialogAddFormVisible:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
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
      }
  },
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
.tableInfo{
  margin-top:20px;
}
.marginTop{
margin-top:10px
}
.tr{
text-align:right;
letter-spacing:1px;
}
.margintb{
margin:15px 0
}
.red{
color:red
}
</style>
