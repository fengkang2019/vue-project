<template>
  <div class="login">
    <el-row>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <img src="../../assets/images/leftpic.png" alt />
        </div>
      </el-col>
      <el-col class="rightCol" :span="10">
        <div class="grid-content bg-purple">
          <p>欢迎登陆运维平台</p>
          <el-form :model="login">
            <el-form-item>
              <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="login.username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="密码" prefix-icon="el-icon-lock"  v-model="login.password"></el-input>
            </el-form-item>
            <el-form-item class="check">
               <el-checkbox v-model="checked">记住用户名密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button :round="round" type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      round: false,
      checked: false
    };
  },
  methods: {
    onSubmit: function() {
      console.log(this.login,this.checked);
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginBackground.png") no-repeat;
  background-size: cover;
  .el-row {
    width: 960px;
    height: 460px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .el-col {
      height: 100%;
      .grid-content {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          height: 100px;
          line-height: 100px;font-size:18px;color:#393939
        }
        .el-button {
          width: 100%;
        };.check{text-align:right}; .el-input{outline-color:#3d539e;color:#3d539e}
      }
    }
    .rightCol {
      background: #fff;
      box-sizing: border-box;
      padding: 40px;
    }
  }
}
</style>