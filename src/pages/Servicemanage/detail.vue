<template>
<div>
<el-dialog title="详情" :visible.sync="visible1">
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
</template>

<script>
export default {
  props:['visible1'],
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      switchValue:true,
      value: "",
        formLabelWidth: '120px'
    };
  },
  methods: {
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
