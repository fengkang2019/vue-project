<template>
  <div class="cutoff">
    <el-row :gutter="20">
      <el-col class="left" :span="4">
        <div class="grid-content bg-purple">
          <el-row class="callrecord">
            <el-col>
              <div class="title">呼叫记录</div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="接听中" name="first">
                  <p>
                    <span>呼叫器:</span>
                    <span>024545545</span>
                  </p>
                  <p>
                    <span>呼叫类型:</span>
                    <span>按键呼叫</span>
                  </p>
                  <p>
                    <span>呼入时间:</span>
                    <span>2019-10-07 14:20:20</span>
                  </p>
                  <p>
                    <span>停车场:</span>
                    <span>工业四路停车场</span>
                  </p>
                  <p>
                    <span>区域:</span>
                    <span>B区域主出口</span>
                  </p>
                  <div @click="hangup">
                    <span class="iconfont icon-guaduan"></span>
                    <span>挂断</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="未接听" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="已接听" name="third">角色管理</el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="title">等待接听</div>
              <div class="awaitContent">
                <p>
                  <span>呼叫器:</span>
                  <span>024545545</span>
                </p>
                <p>
                  <span>呼叫类型:</span>
                  <span>按键呼叫</span>
                </p>
                <p>
                  <span>呼入时间:</span>
                  <span>2019-10-07 14:20:20</span>
                </p>
                <p>
                  <span>停车场:</span>
                  <span>工业四路停车场</span>
                </p>
                <p>
                  <span>区域:</span>
                  <span>B区域主出口</span>
                </p>
                <div @click="answer">
                  <span class="iconfont icon-dianhua"></span>
                  <span>接听</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="center" :span="10">
        <div class="grid-content bg-purple">
          <div class="caller"></div>
          <div class="monitor"></div>
        </div>
      </el-col>
      <el-col class="right" :span="10">
        <div class="grid-content bg-purple">
          <el-row class="carNum">
            <el-col>
              <div class="searchCar">
                <el-form
                  ref="carform"
                  :rules="rules"
                  size="small"
                  :inline="true"
                  :model="form"
                  label-width="80px"
                >
                  <el-form-item prop="carNum">
                    <el-input
                      v-model="form.carNum"
                      placeholder="请输入车牌"
                      suffix-icon="el-icon-search"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="reset">
                    <el-button class="reset" @click="resetForm(form)">刷新</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="carType">
                <div>
                  <span>蓝</span>
                </div>
                <span>月卡车</span>
                <span>小型车</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="carRecord">
            <el-col>
              <p>
                <span>入场</span>
                <span>2019-10-10 10:10:10</span>
              </p>
              <p>
                <span>时长</span>
                <span>1天1小时1分</span>
              </p>
              <p>
                <span>停车费</span>
                <span>50.00</span>
              </p>
              <p>
                <span>优惠</span>
                <span>50.00</span>
              </p>
              <p>
                <span>需缴费</span>
                <span>50.00</span>
              </p>
            </el-col>
          </el-row>
          <el-row class="detail">
            <el-col>
              <p>
                <span>订单详情</span>
                <span>无</span>
              </p>
              <p>
                <span>月卡车详情</span>
                <span>2019-02-01至2019-03-01(已过期)</span>
              </p>
              <p>
                <span>内部车详情</span>
                <span>无</span>
              </p>
              <p>
                <span>处置车详情</span>
                <span>储值月20元</span>
              </p>
              <p>
                <span>多卡多车详情</span>
                <span>
                  无
                  <a @click="findDetail()">111</a>
                </span>
              </p>
            </el-col>
          </el-row>
          <el-row class="reason">
            <el-col>
              <el-tag>自助缴费未下发</el-tag>
              <el-tag>会员过期</el-tag>
              <el-tag>会员计费</el-tag>
              <el-tag>缴费超时离场</el-tag>
              <el-select size="small" v-model="cutoffReason" placeholder="请选择开闸原因">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-input size="small" v-model="remark" placeholder="请输入备注原因"></el-input>
              <el-button size="small" type="primary" @click="onSubmit">确认开闸</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <DetailTable class="detailDialog" :detailFlag="detailFlag" />
  </div>
</template>

<script>
import DetailTable from "./DetailTable";
export default {
  components: { DetailTable },
  data() {
    return {
      activeName: "first",
      form: {
        carNum: ""
      },
      rules: {
        carNum: [{ required: true }]
      },

      cutoffReason: "",
      remark: "",
      detailFlag: false
    };
  },
  methods: {
    handleClick: function() {
      console.log(111);
    },
    onSubmit: function() {},
    findDetail: function() {
      this.detailFlag = true;
    },
    hangup: function() {
      console.log("挂断电话");
    },
    answer: function() {
      console.log("接听电话");
    },
    //点击刷新
    resetForm: function(form) {
      console.log(this.$refs.carform);
      this.$refs.carform.resetFields();
    }
  }
};
</script>

<style lang="scss">
$mainWdth: 100%;
.detailDialog {
  .el-dialog__header {
    background: #e1e1e1;
  }
  .el-dialog__body {
    .el-table {
      width: $mainWdth;
    }
  }
}
.cutoff {
  width: 100%;
  height: 100%;
  background: #fff;
  .el-row {
    height: 100%;
    .left {
      height: 100%;
      .grid-content {
        width: 100%;
        height: 100%;
        border: 1px solid #aaaaaa;
        .el-row {
          height: 30%;
          .el-col {
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #aaaaaa;
            .el-tabs__nav-next {
              display: none;
            }
            .el-tabs__nav {
              width: 100%;
            }
            .title {
              height: 30px;
              text-align: center;
              background: #3e549d;
              color: #fff;
              font-size: 14px;
              line-height: 30px;
            }
            .el-tabs__header {
              margin: 0;
            }
            .el-tabs__item {
              font-size: 12px;
              padding: 0 14px;
            }
            .el-tab-pane {
              padding: 10px;

              p {
                font-size: 12px;
                color: #343434;
                line-height: 18px;
                span:nth-child(2n + 1) {
                  font-weight: 700;
                }
              }
              div {
                width: 80px;
                height: 25px;
                line-height: 25px;
                background: red;
                text-align: center;
                border-radius: 15px;
                vertical-align: middle;
                color: #fff;
                position: relative;
                right: -90px;
                top: 10px;

                span:nth-child(1) {
                  font-size: 20px;
                }
                span:nth-child(2) {
                  font-size: 16px;
                }
              }
            }
          }
          .awaitContent {
            padding: 10px;
            p {
              font-size: 12px;
              color: #343434;
              line-height: 18px;
              span:nth-child(2n + 1) {
                font-weight: 700;
              }
            }
            div {
              width: 80px;
              height: 25px;
              line-height: 25px;
              background: green;
              text-align: center;
              border-radius: 15px;
              vertical-align: middle;
              color: #fff;
              position: relative;
              right: -90px;
              top: 20px;
              span:nth-child(1) {
                font-size: 20px;
              }
              span:nth-child(2) {
                font-size: 16px;
              }
            }
          }
        }
        .callrecord {
          height: 34%;
        }
      }
    }
    .center {
      height: 100%;
      .grid-content {
        width: 100%;
        height: 100%;
        border: 1px solid #aaaaaa;
        .caller {
          height: 50%;
          background: blue;
        }
        .monitor {
          height: 50%;
          background: purple;
        }
      }
    }
    .right {
      height: 100%;
      .grid-content {
        height: 100%;
        padding: 0 20px;
        border: 1px solid #aaaaaa;
        .carNum {
          height: 20%;
          border-bottom: 1px solid #dddddd;
          .el-col {
            height: 100%;
            .searchCar {
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              .el-form-item {
                margin-right: 0;
                margin-top: 15px;
              }
              .el-form-item__content {
                .el-input {
                  border: 2px solid #3c539f;
                  border-radius: 8px;
                  width: 100%;
                  position: relative;
                  .el-input__inner::-webkit-input-placeholder {
                    /* 修改字体颜色 */
                    color: #747474;
                    /* 修改字号，默认继承input */
                    font-size: 16px;
                    font-weight: 600;
                    /* 设置背景色 */
                    // background: #8ac6d1;
                  }
                }
                .el-input__suffix {
                  background: #3c539f;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                }
                .reset {
                  border: 0;
                  background: #fff;
                  position: absolute;
                  right: -120px;
                  top: -15px;
                  span {
                    display: block;
                    width: 30px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 10px;
                    text-align: center;
                    color: #fff;
                    background: #3c539f;
                    border-radius: 5px;
                  }
                }
              }
            }
            .carType {
              display: flex;
              justify-content: center;
              div {
                border: 1px solid #3c539f;
                background: #fff;
                padding: 1px;
              }
              span {
                display: block;
                font-size: 12px;
                font-weight: 700;
                padding: 0 10px;
              }
              span:nth-child(1) {
                background: #3c539f;
                color: #fff;
              }
              span:nth-child(3) {
                border-left: 3px solid #000;
              }
            }
          }
        }
        .carRecord {
          height: 25%;
          border-bottom: 1px solid #dddddd;
          .el-col {
            height: 100%;
            padding: 0 20px;
            p {
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              line-height: 25px;
              span:nth-child(2n + 1) {
                font-weight: 700;
              }
            }
          }
        }
        .detail {
          height: 25%;
          // background: skyblue;
          .el-col {
            height: 100%;
            padding: 0 20px;
            p {
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              line-height: 25px;
              span:nth-child(2n + 1) {
                font-weight: 700;
              }
            }
          }
        }
        .reason {
          height: 30%;
          // background: orange;
          .el-col {
            height: 100%;
            padding: 0 20px;
            .el-tag {
              background: #fff;
              border: 1px solid #ccc;
              color: #aaa;
            }
            .el-select {
              width: 100%;
              border-radius: 10px;
              margin-top: 10px;

              .el-input__inner::-webkit-input-placeholder {
                /* 修改字体颜色 */
                color: #747474;
                /* 修改字号，默认继承input */
                font-size: 16px;
                font-weight: 600;
                /* 设置背景色 */
                // background: #8ac6d1;
              }
            }
            .el-input {
              position: relative;
              border-radius: 10px;
              margin-top: 10px;

              .el-input__inner::-webkit-input-placeholder {
                /* 修改字体颜色 */
                color: #747474;
                /* 修改字号，默认继承input */
                font-size: 16px;
                font-weight: 600;
                /* 设置背景色 */
                // background: #8ac6d1;
              }
              .el-input__suffix {
                background: #3e549d;
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
            .el-button {
              width: 100%;
              background: #0fab00;
              border-radius: 20px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>