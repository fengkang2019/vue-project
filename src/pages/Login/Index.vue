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
          <el-form :model="login" :rules="rules" ref="logForm" @keydown="confirmLogin(this.$event)">
            <el-form-item prop="usr_code">
              <el-input
                placeholder="请输入用户名"
                prefix-icon="el-icon-user-solid"
                v-model="login.usr_code"
              ></el-input>
            </el-form-item>
            <el-form-item prop="trade_pwd">
              <el-input
                placeholder="密码"
                type="password"
                prefix-icon="el-icon-lock"
                v-model="login.trade_pwd"
              ></el-input>
            </el-form-item>
            <el-form-item class="check">
              <el-checkbox v-model="checked">记住用户名密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button :round="round" type="primary" @click="onSubmit(login)">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { acctCustLogin } from "@/request/account/AccountLogin";
import { acctQueryOperatorByName } from "@/request/account/AccountQueryOpratorByName";
import {
  queryEnterpriseByAccountId,
  queryNewEnterpriseByAccountId
} from "@/request/account/QueryEnterpriseByAccountId";
import md5 from "js-md5";
import { mapMutations, mapState } from "vuex";
import { baseJavaUrlG } from "@/utils/api";
import { saveUserLogin } from "@/utils";
export default {
  data() {
    return {
      login: {
        usr_code: "",
        trade_pwd: ""
      },
      rules: {
        usr_code: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        trade_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      round: false,
      checked: true,
      userLogin: {}
    };
  },
  methods: {
    confirmLogin(event) {
      console.log(event);
      if (event.keyCode == 13 || event.keyCode == 108) {
        event.returnValue = false;
        event.cancel = true;
        this.onSubmit(this.login);
      }
    },
    onSubmit: function(login) {
      const that = this;
      this.$refs.logForm.validate(valid => {
        if (valid) {
          if (this.checked) {
            sessionStorage.setItem(
              "account",
              JSON.stringify({
                user: login.usr_code,
                trade_pwd: md5(md5(login.trade_pwd))
              })
            );
          }
          const reqData = {
            login_from_type: "51",
            usr_code: login.usr_code,
            trade_pwd: md5(md5(login.trade_pwd) + 12345678)
          };
          acctCustLogin(reqData, "0", "").then(res => {
            if (typeof res != "object") {
              this.$message.error(res);
              return false;
            } else {
              this.$axios
                .all([
                  this.myQueryEnterpriseByAccountId(res[0]),
                  this.myNewQueryEnterpriseByAccountId(res[0]),
                  this.userAssignRequest(res[0])
                ])
                .then(
                  this.$axios.spread(function(acct, agentTree, role) {
                    let parkCodeList =acct.filter((item)=>{
                      return item.type ==4
                    })
                   
                    that.$store.commit("saveParkCodeList",parkCodeList)
                  })
                );
              // that.$axios.post("/pagerSelect/getDeviceState",{
              //   size:100,
              //   current:1
              // })
              // that.$axios
              //   .get(
              //     baseJavaUrlG +
              //       "/t-trade-write-off/getToken?custId=" +
              //       res[0].cust_id
              //   )
              //   .then(res => {
              //     console.log(res);
              //   });
             this.loginEquipment();

              this.userLogin = res[0];
              this.$store.commit("saveUserLogin", this.userLogin);
            }
          });
        } else {
          return false;
        }
      });
    },
    loginEquipment() {
      const that = this;
      this.$dhweb.login("fly001", "fly123456", process.env.EQUIPMENT_IP);
      //获取设备列表
      // let deviceLists = [];
      // this.$dhweb.onDeviceList = function(object) {
      //   let deviceList = object.params.list;

      //   for (var i in deviceList) {
      //     let deviceObj = {};
      //     deviceObj.label = deviceList[i].deviceName;
      //     deviceObj.devId =deviceList[i].deviceId;
      //     deviceObj.action =deviceList[i].action;
      //     deviceLists.push(deviceObj);
      //   }
      // };
      // this.$store.commit("saveDeviceLists", deviceLists);
      this.$dhweb.onLogin = function(data) {
        var params = data.params;
        if (data.error == "success") {
          that.$store.commit("saveLoginHandle", params.loginHandle);
          that.$message.success("设备登录成功,可接听呼叫");
          if (that.$store.state.route) {
            that.$router.push({ name: that.$store.state.route });
          } else {
            that.$router.push({ name: "longcutoff" });
          }
        } else {
          that.$message.error("当前网络状态差,设备登录失败!");
          setTimeout(function() {
            that.$message.info("请重新登录!");
            that.$router.go(0);
          }, 1500);
        }
      };
    },
    myQueryEnterpriseByAccountId(param) {
      let ansCommData = param;
      var reqData = {
        cust_parent_id: ansCommData.ent_cust_id,
        isself: "1",
        park: "1",
        maxid: "0",
        maxcount: "10000"
      };
      return queryEnterpriseByAccountId(
        reqData,
        ansCommData.cust_id,
        ansCommData.session
      );
    },
    myNewQueryEnterpriseByAccountId(param) {
      let ansCommData = param;
      var reqData = {
        cust_parent_id: ansCommData.ent_cust_id,
        isself: true
      };
      return queryNewEnterpriseByAccountId(
        reqData,
        ansCommData.cust_id,
        ansCommData.session
      );
    },
    userAssignRequest(data) {
      let custId = data.cust_id;
      let session = data.session;
      let userCode = data.name;
      let reqData = {
        usr_code: userCode //操作员名
      };
      return acctQueryOperatorByName(reqData, custId, session);
    }
  },
  mounted() {
    if (sessionStorage.getItem("account")) {
      this.login.usr_code = JSON.parse(sessionStorage.getItem("account")).user;
      this.login.trade_pwd = JSON.parse(
        sessionStorage.getItem("account")
      ).trade_pwd;
    }
    saveUserLogin(this);
  },
  computed: {
    ...mapState(["route"])
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
          line-height: 100px;
          font-size: 18px;
          color: #393939;
        }
        .el-button {
          width: 100%;
        }
        .check {
          text-align: right;
        }
        .el-input {
          outline-color: #3d539e;
          color: #3d539e;
        }
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