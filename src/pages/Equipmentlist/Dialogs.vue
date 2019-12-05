<template>
  <el-dialog
    :title="flag=='1'?'新增':flag=='2'?'编辑':'详情'"
    :visible="visibleFlag"
    :before-close="handleClose"
  >
    <el-form :model="currentData" class="dialog" :disabled="flag=='3'" :rules="rules" ref="myForm">
      <el-form-item
        label="所属停车场"
        :label-width="formLabelWidth"
        :hide-required-asterisk="true"
        prop="parkCode"
      >
        <el-select size="small" v-model="currentData.parkCode" placeholder="请输入所属停车场">
          <el-option label="区域一" :value="1"></el-option>
          <el-option label="区域二" :value="currentData.parkCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" :label-width="formLabelWidth" prop="regionCode">
        <el-select size="small" v-model="currentData.regionCode" placeholder="请输入所属区域">
          <el-option label="区域一" :value="currentData.regionCode"></el-option>
          <el-option label="区域二" value="1"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="所属通道" :label-width="formLabelWidth" prop="gateCode">
        <el-select size="small" v-model="currentData.gateCode" placeholder="请输入所属通道">
          <el-option label="通道一" :value="currentData.gateCode"></el-option>
          <el-option label="通道二" value="1101012000010109"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型" :label-width="formLabelWidth" prop="type">
        <el-select size="small" v-model="currentData.type" placeholder="请输入设备类型">
          <el-option label="区域一" :value="currentData.type"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="flag!=='2'" label="设备名称" :label-width="formLabelWidth" prop="name">
        <el-input size="small" v-model="currentData.name" autocomplete="off" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" :label-width="formLabelWidth" prop="devNo">
        <el-input size="small" v-model="currentData.devNo" autocomplete="off" placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item v-show="flag!=='2'" label="设备型号" :label-width="formLabelWidth" prop="devModel">
        <el-input
          size="small"
          v-model="currentData.devModel"
          autocomplete="off"
          placeholder="请输入设备型号"
        ></el-input>
      </el-form-item>
      <el-form-item label="ip地址" :label-width="formLabelWidth" prop="devIp">
        <el-input size="small" v-model="currentData.devIp" autocomplete="off" placeholder="请输入ip地址"></el-input>
      </el-form-item>
      <el-form-item label="版本号" :label-width="formLabelWidth" prop="devVer">
        <el-input size="small" v-model="currentData.devVer" autocomplete="off" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="设备厂商" :label-width="formLabelWidth" prop="devCompany">
        <el-input
          size="small"
          v-model="currentData.devCompany"
          autocomplete="off"
          placeholder="请输入设备厂商"
        ></el-input>
      </el-form-item>
      <el-form-item  label="启用日期" :label-width="formLabelWidth" prop="activeDate">
        <el-input
          size="small"
          v-model="currentData.activeDate"
          autocomplete="off"
          placeholder="日期格式:20191010"
        ></el-input>
      </el-form-item>
      <el-form-item label="到期日期" :label-width="formLabelWidth" prop="endDate">
        <el-input
          size="small"
          v-model="currentData.endDate"
          placeholder="日期格式:20191010"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-show="flag=='3'"
        label="最后编辑日期"
        :label-width="formLabelWidth"
        prop="heartTime"
      >
        <el-input
          size="small"
          v-model="currentData.heartTime"
          autocomplete="off"
          placeholder="日期格式:20190101121212"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-show="flag=='3'"
        label="编辑人员"
        :label-width="formLabelWidth"
        props="modifyOperateNo"
      >
        <el-input
          size="small"
          v-model="currentData.modifyOperateNo"
          autocomplete="off"
          placeholder="请输入编辑人员"
        ></el-input>
      </el-form-item>
    </el-form>
    <div v-show="flag!='3'" slot="footer" class="dialog-footer">
      <el-button size="small" @click="$parent.visibleFlag =false">取 消</el-button>
      <el-button size="small" type="primary" @click="dialogFormVisible(currentData)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["visibleFlag", "flag", "currentData"],
  data() {
    return {
      formLabelWidth: "100px",
      form: {
        parkCode: ""
      },
      rules: {
        parkCode: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        regionCode: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        gateCode:[
          { required: true, message: "请输入通道名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        devNo: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        devModel: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        devIp: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        devVer: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        devCompany: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        activeDate: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        endDate: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        heartTime: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        modifyOperateNo: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    dialogFormVisible(currentData) {
      this.$refs.myForm.validate(val => {
        if (val) {
          if (this.flag == "1") {
            console.log("新增");
            this.$parent.confirmAdd(currentData);
          } else if (this.flag == "2") {
            console.log("编辑");
            this.$parent.confirmEdit(currentData);
          }
          this.$parent.visibleFlag = false;
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$parent.visibleFlag = false;
    }
  }
};
</script>

<style lang="scss">
.dialog {
  .el-form-item__label {
    text-align: right;
    font-size: 12px;
  }
  .el-input {
    width: 620px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>