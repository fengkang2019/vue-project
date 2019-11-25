<template>
  <el-dialog
    :title="status=='0'?'正常':status=='1'?'故障':'报废'"
    :visible.sync="state"
    width="30%"
    :before-close="handleClose"
  >
    <span>{{msg}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["state", "msg", "status","currentData"],
  data() {
    return {};
  },
  methods: {
    handleClose: function() {
      this.$parent.state = false;
    },
    confirm: function() {
      this.$parent.state = false;
      if (this.status == "0") {
        this.$parent.confirmEdit(this.currentData)
      } else if (this.status == "1") {
        this.$parent.confirmEdit(this.currentData)
      } else {
        this.$parent.confirmEdit(this.currentData)

      }
      this.$parent.state = false;

    },
    cancel: function() {
      this.$parent.state = false;
    }
  },
  mounted() {
    console.log(this.state);
  }
};
</script>

<style>
</style>