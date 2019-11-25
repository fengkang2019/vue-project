<template>
  <el-dialog
    :title="flag=='1'?'新增':flag=='2'?'编辑':'详情'"
    :visible="visibleFlag"
    :before-close="handleClose"
  >
    <el-form :model="form" :rules="rules" class="dialog" :disabled="flag=='3'" ref="myForm">
      <el-form-item
        required
        label="所属停车场"
        :label-width="formLabelWidth"
        :hide-required-asterisk="true"
        prop="parkCode"
      >
        <el-select size="small" v-model="form.parkCode" placeholder>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" :label-width="formLabelWidth" prop="regionCode">
        <el-select size="small" v-model="form.regionCode" placeholder>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="设备类型" :label-width="formLabelWidth" prop="type">
        <el-select size="small" v-model="form.type" placeholder>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="flag!=='2'"
        required
        label="设备名称"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input size="small" v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="设备编号" :label-width="formLabelWidth" prop="devNo">
        <el-input size="small" v-model="form.devNo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-show="flag!=='2'"
        required
        label="设备型号"
        :label-width="formLabelWidth"
        prop="devModel"
      >
        <el-input size="small" v-model="form.devModel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="ip地址" :label-width="formLabelWidth" prop="devIp">
        <el-input size="small" v-model="form.devIp" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="版本号" :label-width="formLabelWidth" prop="devVer">
        <el-input size="small" v-model="form.devVer" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="设备厂商" :label-width="formLabelWidth" prop="devCompany">
        <el-input size="small" v-model="form.devCompany" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item 
      required label="启用日期" :label-width="formLabelWidth" prop="activeDate">
        <el-input
          size="small"
          v-model="form.activeDate"
          autocomplete="off"
          placeholder="日期格式:20191010"
        ></el-input>
      </el-form-item>
      <el-form-item required label="到期日期" :label-width="formLabelWidth" prop="endDate">
        <el-input
          size="small"
          v-model="form.endDate"
          placeholder="日期格式:20191010"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-show="flag=='3'"
        required
        label="最后编辑日期"
        :label-width="formLabelWidth"
        prop="heartTime"
      >
        <el-input size="small" v-model="form.heartTime" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-show="flag=='3'"
        required
        label="编辑人员"
        :label-width="formLabelWidth"
        props="modifyOperateNo"
      >
        <el-input size="small" v-model="form.modifyOperateNo" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div v-show="flag!='3'" slot="footer" class="dialog-footer">
      <el-button @click="$parent.visibleFlag =false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible(form)">确 定</el-button>
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
          { required: true, message: "请输入停车场所属区域", trigger: "change" }
        ],
        type: [
          { required: true, message: "请输入设备类型", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        devNo: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
        devModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" }
        ],
        devIp: [{ required: true, message: "请输入ip地址", trigger: "blur" }],
        devVer: [{ required: true, message: "请输入版本号", trigger: "blur" }],
        devCompany: [
          { required: true, message: "请输入设备厂商", trigger: "blur" }
        ],
        activeDate: [
          { required: true, message: "请输入启用日期", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请输入到期日期", trigger: "blur" }
        ],
        heartTime: [
          { required: true, message: "请输入编辑日期", trigger: "blur" }
        ],
        modifyOperateNo: [
          { required: true, message: "请输入编辑人员", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    dialogFormVisible(form) {
      console.log(form);
      this.$refs.myForm.validate(val => {
        if (val) {
          if (this.flag == "1") {
            console.log("新增");
          } else if (this.flag == "2") {
            console.log("编辑");
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
  },
  mounted() {
    console.log(this.currentData);
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