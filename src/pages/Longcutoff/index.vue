<template>
  <div id="cutoff">
    <el-row :gutter="4">
      <el-col class="left" :span="5">
        <div class="grid-content bg-purple">
          <el-row class="callrecord">
            <el-col>
              <div class="title">呼叫记录</div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="接听中" name="first">
                  <div class="visible" v-show="state1" v-for="(item,i) in records1" :key="i">
                    <p>
                      <span>呼叫器:</span>
                      <span>{{item.devNo}}</span>
                    </p>
                    <p>
                      <span>呼叫类型:</span>
                      <span>{{item.type}}</span>
                    </p>
                    <p>
                      <span>呼入时间:</span>
                      <span>{{formatTime2(item.callTime)}}</span>
                    </p>
                    <p>
                      <span>停车场:</span>
                      <span>{{item.parkCode}}</span>
                    </p>
                    <p>
                      <span>区域:</span>
                      <span>{{item.regionCode}}</span>
                    </p>
                    <div @click="hangup(item)">
                      <span class="iconfont icon-guaduan"></span>
                      <span>挂断</span>
                    </div>
                  </div>
                  <div class="hidden" v-show="!state1">
                    <span class="iconfont icon-web__zanwujilu"></span>
                    <span>暂无接听记录</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label">
                    <el-badge class="mark" value="2">未接听</el-badge>
                  </span>
                  配置管理
                </el-tab-pane>
                <el-tab-pane label="已接听" name="third">
                  <!-- records2 -->
                  <div class="visible" v-show="state1" v-for="(item,i) in records2" :key="i">
                    <p>
                      <span>呼叫器:</span>
                      <span>{{item.devNo}}</span>
                    </p>
                    <p>
                      <span>呼叫类型:</span>
                      <span>{{item.type}}</span>
                    </p>
                    <p>
                      <span>呼入时间:</span>
                      <span>{{formatTime2(item.callTime)}}</span>
                    </p>
                    <p>
                      <span>停车场:</span>
                      <span>{{item.parkCode}}</span>
                    </p>
                    <p>
                      <span>区域:</span>
                      <span>{{item.regionCode}}</span>
                    </p>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <el-row v-for="(item,i) in records0" :key="i">
            <el-col>
              <div class="title">等待接听</div>
              <div class="awaitContent">
                <p>
                  <span>呼叫器:</span>
                  <span>{{item.devNo}}</span>
                </p>
                <p>
                  <span>呼叫类型:</span>
                  <span>{{item.type}}</span>
                </p>
                <p>
                  <span>呼入时间:</span>
                  <span>{{formatTime(item.callTime)}}</span>
                </p>
                <p>
                  <span>停车场:</span>
                  <span>{{item.parkCode}}</span>
                </p>
                <p>
                  <span>区域:</span>
                  <span>{{item.regionCode}}</span>
                </p>
                <div @click="answer(item)">
                  <span class="iconfont icon-dianhua"></span>
                  <span>接听</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="title">设备列表</div>
              <el-tree
                :data="deviceList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :highlight-current="true"
                icon-class="el-icon-folder-opened"
              ></el-tree>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="center" :span="10">
        <div class="grid-content bg-purple">
          <div class="caller">
            <video id="callerVideo" controls>
              <source src type="video/mp4" />
            </video>
            <div v-show="!state2" class="callerDiv">
              <div class="innerCallerDiv">
                <span class="iconfont icon-bofang"></span>
                <span>呼叫器摄像头视屏</span>
              </div>
            </div>
          </div>
          <div class="monitor">
            callerVideo
            <video id="monitorVideo" controls>
              <source src type="video/mp4" />
            </video>
            <div v-show="!state4" class="monitorDiv">
              <div class="innerMonitorDiv">
                <span class="iconfont icon-bofang"></span>
                <span>停车场监控视屏</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="right" :span="9">
        <div class="grid-content bg-purple">
          <el-form
            ref="carform"
            :rules="rules"
            size="small"
            :model="form"
            label-width="0"
            :disabled="state2?false:true"
          >
            <el-row class="carNum">
              <el-col>
                <div class="searchCar">
                  <el-form-item prop="carNum" class="carNumFormItem">
                    <el-input v-model="form.carNum" placeholder="请输入车牌">
                      <i class="el-icon-search" slot="suffix" @click="searchCar(form)"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="resetFormItem" prop="reset">
                    <el-button class="reset" @click="resetForm(form)">刷新</el-button>
                  </el-form-item>
                </div>
                <div class="carType">
                  <div class="chooseCarNumColor">
                    <el-form-item>
                      <el-select
                        size="small"
                        :class="form.carNumColor"
                        v-model="form.carNumColor"
                        placeholder
                      >
                        <el-option class="blue" label="蓝牌" value="1"></el-option>
                        <el-option class="yellow" label="黄牌" value="2"></el-option>
                        <el-option class="green" label="绿牌" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <span>月卡车</span>
                  <span>小型车</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="carRecord">
              <el-col v-if="state2" class="inCar">
                <p>
                  <span>入场</span>
                  <span>{{carInfo2[0]?formatTime(carInfo2[0].intime):""}}</span>
                </p>
                <p>
                  <span>时长</span>
                  <span>{{charge[0]?timeStamp(charge[0].park_time):""}}</span>
                </p>
                <p>
                  <span>停车费</span>
                  <span>{{charge[0]?charge[0].parkamt:""}}</span>
                </p>
                <p>
                  <span>优惠</span>
                  <span>{{charge[0]?charge[0].coupon_amt:""}}</span>
                </p>
                <p>
                  <span>需缴费</span>
                  <span
                    class="red"
                  >{{charge[0]?charge[0].parkamt-charge[0].coupon_amt-parkamt-charge[0].paidmt:""}}</span>
                </p>
              </el-col>
              <el-col v-if="!state2" class="inCar2">
                <span class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></span>
                <span>暂无停车记录</span>
              </el-col>
            </el-row>
            <el-row class="detail">
              <el-col v-if="state2">
                <p>
                  <span>订单详情:</span>
                  <span>{{carInfo.commodity?formatTime(carInfo.commodity.ordertime) +" "+ carInfo.commodity.payType +" "+"支付渠道:"+ carInfo.commodity.orderstate:'无'}}</span>
                </p>
                <p>
                  <span>月卡车详情:</span>
                  <span>
                    {{carInfo.member?formatTime3(carInfo.member.startDate)+"到"+formatTime3(carInfo.member.endDate):"无"}}
                    <!-- <i
                      class="red"
                    >{{ carInfo?carInfo.member.endDate<currentTime():"无"}}</i>-->
                  </span>
                </p>
                <p>
                  <span>内部车详情:</span>
                  <span>{{carInfo.customCar?formatTime3(carInfo.member.startDate)+"到"+formatTime3(carInfo.member.endDate):"无"}}</span>
                </p>
                <p>
                  <span>储值车详情:</span>
                  <span>{{carInfo.assetsDetail?"储值余额:"+carInfo.assetsDetail.fundavl+"元":"无"}}</span>
                </p>
                <p>
                  <span>多卡多车详情:</span>
                  <a>无</a>
                </p>
                <p>
                  <span>车位详情:</span>
                  <a @click="findDetail()">{{carInfo.member?carInfo.member.seatNum+"车位":"无"}}</a>
                </p>
              </el-col>
            </el-row>
            <el-row class="reason">
              <el-col>
                <el-tag @click="click1">自助缴费未下发</el-tag>
                <el-tag @click="click2">会员过期</el-tag>
                <el-tag @click="click3">会员计费</el-tag>
                <el-tag @click="click4">缴费超时离场</el-tag>
                <el-form-item>
                  <el-select size="small" v-model="form.cutoffReason" placeholder="请选择开闸原因">
                    <el-option
                      v-for="(item,i) in abnormal"
                      :key="i"
                      :label="item.item"
                      :value="item.cval"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input size="small" v-model="form.remark" placeholder="请输入备注原因"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确认开闸</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <DetailTable class="detailDialog" :detailFlag="detailFlag" :tableDatas="tableDatas" />
  </div>
</template>


<script>
import DetailTable from "./DetailTable";
import { saveUserLogin } from "@/utils";
// var dhweb;
// dhweb = new DHAlarmWeb();
import { getqueryDayParkSerialEX } from "@/request/parkRecord/queryParkRecord";
import { getCutoffReason } from "@/request/parkRecord/CutoffReason";
import { getqueryCharge } from "@/request/parkRecord/queryParkCharge";
import { mapState } from "vuex";
export default {
  components: { DetailTable },
  data() {
    return {
      activeName: "first",
      form: {
        carNum: "",
        carNumColor: "",
        remark: "",
        cutoffReason: ""
      },
      rules: {
        carNum: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      records0: [],
      records1: [],
      records2: [],
      cutoffReason: "",
      remark: "",
      detailFlag: false,
      state1: false,
      state2: false,
      state3: true,
      state4: false,
      //设备对应车场信息
      parkInfo: {},
      //正在接听的记录信息
      recordsInfo: {},
      //登录句柄
      // loginHandle: "",
      //设备id
      devId: "",
      //车卡信息
      carInfo: {},
      // 车位信息
      groupId: "",

      tableDatas: [],

      carInfo2: [],

      //计费
      charge: [],
      abnormal: [],
      timer: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      deviceList: [
        {
          label: "武汉无人值守项目",

          children: this.$store.state.deviceLists
        }
      ]
    };
  },
  methods: {
    //切换接听状态
    handleClick: function() {
      console.log(111);
    },
    //确认开闸
    onSubmit: function() {
      this.cutOff();
    },
    //详情表格
    findDetail: function() {
      this.detailFlag = true;
      const that = this;
      this.$axios
        .post("/pagerSelect/searchGroupCar", {
          parkCode: this.recordsInfo.parkCode,
          groupId: this.groupId
        })
        .then(res => {
          that.tableDatas = res.data;
        });
    },
    //挂断
    hangup: function(item) {
      console.log("挂断电话");
      this.changeStatus(2, item);
      this.stopRT();
    },
    //接听
    answer: function(item) {
      this.recordsInfo = item;
      let that = this;
      this.$axios
        .post("/pagerSelect/searchCallInfo", {
          parkCode: item.parkCode,
          regionCode: item.regionCode,
          devNo: item.devNo
        })
        .then(res => {
          if (res) {
            this.form.carNumColor = "1";
            that.state1 = true;
            that.state4 = true;
            that.state3 = false;
            that.devId = res.data.devId;
            that.changeStatus(1, item);
            that.searchDevParkInfo(item);
            that.playRT();
          } else {
            return false;
          }
        });
    },
    //点击刷新
    resetForm: function(form) {
      console.log(this.$refs.carform);
      this.$refs.carform.resetFields();
    },
    //查车牌
    searchCar(form, recordsInfo) {
      let that = this;
      this.$refs.carform.validate(val => {
        if (val) {
          console.log("搜索车牌号" + form.carNum);
          this.searchCarInfos(form.carNum, form.carNumColor);
        } else {
          return false;
        }
      });
    },
    click1(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },
    click2(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },
    click3(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },
    click4(e) {
      console.log(e.target.innerHTML);
      this.form.remark += e.target.innerHTML + "   ";
    },

    formatTime(time) {
      let moment = this.$moment(time, "YYYYMMDDHHmmss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatTime2(time) {
      let moment = this.$moment(time, "YYYY-MM-DD HH:mm:ss");
      return moment.format("YYYY-MM-DD HH:mm:ss");
    },
    formatTime3(time) {
      let moment = this.$moment(time, "YYYYMMDD");
      return moment.format("YYYY-MM-DD");
    },
    currentTime() {
      return this.$moment().format("YYYYMMDD");
    },
    //查询操作记录
    searchRecord(status) {
      let that = this;
      this.$axios
        .post("/pagerSelect/searchRecord", {
          status: status,
          size: 10,
          current: 1
        })
        .then(res => {
          if (res) {
            that.records0 = res.data.records;
          } else {
            return false;
          }
        });
    },
    //改变 呼叫状态
    changeStatus(status, item) {
      let that = this;
      this.$axios
        .post("/pagerUpdate/updateRecord", {
          id: item.id,
          status: status
        })
        .then(res => {
          if (res) {
            if (status == 1) {
              that.records1 = [];
              that.records1.push(item);
            } else if (status == 2) {
              that.records2 = [];
              that.records2.push(item);
              that.records1 = [];
              that.state4 = false;
            }
            that.searchRecord(0);
          } else {
            return false;
          }
        });
    },
    //查询设备对应停车信息
    searchDevParkInfo(item) {
      let that = this;
      this.$axios
        .post("/pagerSelect/searchParkingDetail", {
          parkCode: item.parkCode,
          regionCode: item.regionCode,
          devNo: item.devNo
        })
        .then(res => {
          if (res) {
            that.parkInfo = res.data;
            that.searchCarInfo();
            that.searchCarInfos();
          } else {
            return false;
          }
        });
    },
    // 查询 入场车信息
    searchCarInfos(carId, carType) {
      const that = this;
      const reqData = {
        maxid: 0,
        maxcount: 20,
        agent_id: "8010000000001",
        park_code: "",
        instart_datetime: "",
        inend_datetime: "",
        outstart_datetime: "",
        outend_datetime: "",
        result: "90",
        outoperate: "1",
        payobject: "",
        // car_id: res.data.carId,
        car_id: "鄂A10003",
        // p_type: "2",
        serialtype: "1"
      };
      // console.log(carId);
      if (carId) {
        reqData.car_id = carId;
      }
      getqueryDayParkSerialEX(
        reqData,
        this.$store.state.userLogin.cust_id,
        this.$store.state.userLogin.session
      ).then(res => {
        if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
          that.carInfo2 = res.data.ANSWERS[0].ANS_COMM_DATA;
          if (that.carInfo2.length > 0) {
            const reqData = {
              car_id: that.carInfo2[0].car_id,
              cartype: that.carInfo2[0].cartype,
              intime: that.carInfo2[0].intime,
              park_code: that.carInfo2[0].park_code,
              region_code: that.carInfo2[0].region_code
            };
            if (carType) {
              reqData.cartype = carType;
            }
            getqueryCharge(
              reqData,
              this.$store.state.userLogin.cust_id,
              this.$store.state.userLogin.cust_id
            ).then(res => {
              if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
                that.charge = res.data.ANSWERS[0].ANS_COMM_DATA;
              } else {
                this.$message.error("查询入场车辆计费失败");
                return false;
              }
            });
          } else {
            this.$message.error("此设备暂无车辆入场信息");
            return false;
          }
        } else {
          this.$message.error("查询入场车辆失败");
          return false;
        }
      });
    },
    //查询车卡信息
    searchCarInfo() {
      const that = this;
      if (this.parkInfo.length > 0) {
        console.log(this.parkInfo);
        const reqData = {
          parkCode: this.parkInfo.parkCode,
          carType: this.parkInfo.carType,
          carId: this.parkInfo.carId
        };

        this.$axios.post("/pagerSelect/searchCarDetail", reqData).then(res => {
          if (res) {
            that.carInfo = res.data;
            console.log(res.data);
            that.groupId = res.data.member.id;
          } else {
            that.$message.error("暂无车卡信息");
            return false;
          }
        });
      } else {
        return false;
      }
    },
    //播放视屏
    playRT() {
      let that = this;
      console.log(this.$store.state.loginHandle);
      console.log(this.devId);
      this.$dhweb.playRT(
        $("#monitorVideo")[0],
        this.devId,
        this.$store.state.loginHandle,
        true
      );
      this.$dhweb.onPlayRT = function(data) {
        if (data.error != "success") {
        }
      };
    },
    //关闭视屏
    stopRT() {
      this.$dhweb.stopRT(this.devId, this.$store.state.loginHandle);
      this.state3 = true;
       $("#monitorVideo").attr("src", "");
    },
    //分转化为时
    timeStamp(StatusMinute) {
      var day = parseInt(StatusMinute / 60 / 24);
      var hour = parseInt((StatusMinute / 60) % 24);
      var min = parseInt(StatusMinute % 60);
      StatusMinute = "";
      if (day > 0) {
        StatusMinute = day + "天";
      }
      if (hour > 0) {
        StatusMinute += hour + "小时";
      }
      if (min > 0) {
        StatusMinute += parseFloat(min) + "分钟";
      }
      //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的StatusMinute
      return StatusMinute == "" ? "0分钟" : StatusMinute;
    },
    startSearch() {
      this.timer = setInterval(() => {
        this.searchRecord(0);
      }, 3000);
    },
    //开闸
    cutOff() {
      this.$dhweb.doControl(this.devId, this.$store.state.loginHandle, 1);
    },
    //打开 监控摄像头
    handleNodeClick(data) {
      console.log(data);
      console.log(
        $("#monitorVideo")[0],
        data.devId,
        this.$store.state.loginHandle
      );
      this.state2 = true;
      this.$dhweb.playRT(
        $("#callerVideo")[0],
        data.devId,
        this.$store.state.loginHandle,
        true
      );
    }
  },

  created() {
    this.startSearch();
  },
  mounted() {
    saveUserLogin(this);
    console.log(this.$store.state.deviceLists);
    getCutoffReason({
      category_en: "except_open_gate"
    }).then(res => {
      if (res.data.ANSWERS[0].ANS_MSG_HDR.MSG_CODE == 0) {
        this.abnormal = res.data.ANSWERS[0].ANS_COMM_DATA;
      }
    });
  },
  computed: {
    ...mapState(["userLogin", "loginHandle", "deviceLists"])
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss">
$mainWdth: 100%;
$fff: #fff;
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
#cutoff {
  width: $mainWdth;
  height: $mainWdth;
  background: $fff;
  .el-row {
    height: $mainWdth;
    .left {
      height: $mainWdth;
      overflow-y: scroll;
      .grid-content {
        width: $mainWdth;
        height: $mainWdth;
        border: 1px solid #aaaaaa;
        .el-row {
          height: 0.3 * $mainWdth;
          .el-col {
            width: $mainWdth;
            height: $mainWdth;
            border-bottom: 1px solid #aaaaaa;
            .el-tabs__nav-next {
              display: none;
            }
            .el-tabs__nav {
              width: $mainWdth;
            }
            .title {
              height: 30px;
              text-align: center;
              background: #3e549d;
              color: $fff;
              font-size: 14px;
              line-height: 30px;
            }
            .el-tabs__header {
              margin: 0;
            }
            .el-tabs__item {
              font-size: 12px;
              padding: 0 28px;
            }
            .el-tab-pane {
              padding: 10px;
              div.visible {
                width: 100%;
                height: 100%;
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
                  color: $fff;
                  position: relative;
                  right: -130px;
                  top: 10px;
                  cursor: pointer;

                  span:nth-child(1) {
                    font-size: 20px;
                  }
                  span:nth-child(2) {
                    font-size: 16px;
                  }
                }
              }
              div.hidden {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span.iconfont {
                  font-size: 70px;
                }
              }
            }
          }
          .awaitContent {
            padding: 10px;
            background: $fff;
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
              color: $fff;
              position: relative;
              right: -130px;
              top: 20px;
              cursor: pointer;
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

    .left::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px;
      /*高宽分别对应横竖滚动条的尺寸*/
      // height: 4px;
    }

    .left::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    .left::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .center {
      height: $mainWdth;
      .grid-content {
        width: $mainWdth;
        height: $mainWdth;
        .caller {
          height: 0.5 * $mainWdth;
          border: 1px solid #aaaaaa;
          box-sizing: border-box;
          position: relative;
          #callerVideo {
            width: $mainWdth;
            height: $mainWdth;
          }
          .callerDiv {
            width: $mainWdth;
            height: $mainWdth;
            position: absolute;
            top: 0;
            left: 0;
            background: #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            .innerCallerDiv {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              span.iconfont {
                font-size: 50px;
                color: #bbb;
              }
              span {
                font-size: 14px;
                color: #aaa;
              }
            }
          }
        }
        .monitor {
          height: 0.5 * $mainWdth;
          border: 1px solid #aaaaaa;
          box-sizing: border-box;
          margin-top: 2px;
          position: relative;
          #monitorVideo {
            width: $mainWdth;
            height: $mainWdth;
          }
          .monitorDiv {
            width: $mainWdth;
            height: $mainWdth;
            position: absolute;
            top: 0;
            left: 0;
            background: #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            .innerMonitorDiv {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              span.iconfont {
                font-size: 50px;
                color: #bbb;
              }
              span {
                font-size: 14px;
                color: #aaa;
              }
            }
          }
        }
      }
    }
    .right {
      height: $mainWdth;
      .grid-content {
        height: $mainWdth;
        padding: 0 20px;
        border: 1px solid #aaaaaa;
        .el-form {
          width: $mainWdth;
          height: $mainWdth;
          .el-form-item {
            width: $mainWdth;
            margin-bottom: 5px;
            .el-form-item__content {
              width: 100%;
            }
          }
          .resetFormItem {
            width: 40px;
            position: absolute;
            right: 30px;
            top: -5px;
          }
          .carNumFormItem {
            width: 50%;
          }
        }
        .carNum {
          height: 0.2 * $mainWdth;
          border-bottom: 1px solid #dddddd;
          .el-col {
            height: $mainWdth;
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
                  width: $mainWdth;
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
                  width: 40px;
                  color: $fff;
                }
                .reset {
                  border: 0;
                  background: #fff;
                  // position: absolute;
                  // right: -120px;
                  // top: -15px;
                  span {
                    display: block;
                    width: 30px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 10px;
                    text-align: center;
                    color: $fff;
                    background: #3c539f;
                    border-radius: 5px;
                  }
                }
              }
            }
            .carType {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              div.chooseCarNumColor {
                background: $fff;
                padding: 1px;
                width: 60px;
                height: 20px;
                .el-form-item {
                  width: $mainWdth;
                  height: 20px;
                  .el-form-item__content {
                    width: $mainWdth;
                    height: 20px;
                    .el-select {
                      width: $mainWdth;
                      height: 20px;
                      border: 1px solid #aaa;
                      padding: 1px;
                      .el-input {
                        width: $mainWdth;
                        height: 20px;
                        position: relative;
                        padding: 1px;
                        input.el-input__inner {
                          margin: 0;
                          padding: 0;
                          width: $mainWdth;
                          height: 20px;
                          position: absolute;
                          top: 0;
                          left: 0;
                          border-radius: 0;
                          background: blue;
                          text-align: left;
                          text-indent: 0.5rem;
                          color: #fff;
                          outline: none;
                          font-weight: 700;
                        }
                        .el-input__suffix {
                          height: 17px;
                          width: 10px;
                          margin-top: 1px;
                          span.el-input__suffix-inner {
                            width: 10px;
                            height: 17px;
                            padding: 0;
                            right: 0px;
                            background: blue;
                            .el-select__caret {
                              width: $mainWdth;
                              height: $mainWdth;
                              line-height: 16px;
                            }
                          }
                        }
                      }
                    }
                    .el-select.blue {
                      .el-input {
                        input {
                          background: blue;
                        }
                        span.el-input__suffix-inner {
                          background: blue;
                        }
                      }
                    }
                    .el-select.yellow {
                      .el-input {
                        input {
                          background: yellow;
                        }
                        span.el-input__suffix-inner {
                          background: yellow;
                        }
                      }
                    }
                    .el-select.green {
                      .el-input {
                        input {
                          background: green;
                        }
                        span.el-input__suffix-inner {
                          background: green;
                        }
                      }
                    }
                  }
                }
              }
              span {
                display: block;
                font-size: 12px;
                font-weight: 700;
                padding: 0 10px;
              }
              span:nth-child(1) {
                background: #3c539f;
                color: $fff;
              }
              span:nth-child(3) {
                border-left: 3px solid #000;
              }
            }
          }
        }
        .carRecord {
          height: 0.25 * $mainWdth;
          border-bottom: 1px solid #dddddd;
          .inCar {
            height: $mainWdth;
            padding: 0 20px;
            p {
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              line-height: 25px;
              span:nth-child(2n + 1) {
                font-weight: 700;
                font-size: 14px;
              }
              span.red {
                color: red;
              }
            }
          }
          .inCar2 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span.icon-changyongtubiao-xianxingdaochu-zhuanqu- {
              font-size: 60px;
              color: #ccc;
            }
            span {
              font-weight: 600;
              color: #ccc;
            }
          }
        }
        .detail {
          height: 25%;

          .el-col {
            height: $mainWdth;
            padding: 0 20px;
            p {
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              line-height: 25px;
              span:nth-child(2n + 1) {
                font-weight: 700;
                font-size: 14px;
              }
              span {
                i.red {
                  color: red;
                }
              }
            }
          }
        }
        .reason {
          height: 30%;
          // background: orange;
          .el-col {
            height: $mainWdth;
            padding: 0 20px;
            .el-tag {
              background: $fff;
              border: 1px solid #ccc;
              color: #aaa;
              cursor: pointer;
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
            .is-disabled {
              .el-input__suffix {
                background: #ccc;
              }
            }
            .el-button {
              width: $mainWdth;
              background: #0fab00;
              border-radius: 20px;
              margin-top: 10px;
            }
            .is-disabled {
              background: #ccc;
              border: 0;
            }
          }
        }
      }
    }
  }
}
.el-badge {
  .el-badge__content {
    top: 10px;
  }
}
.el-scrollbar .el-select-dropdown__wrap {
  ul {
    padding: 5px;
    li.blue {
      background: blue;
      color: #fff;
    }
    li.yellow {
      background: yellow;
      color: #fff;
    }
    li.green {
      background: green;
      color: #fff;
    }
    li {
      margin: 2px;
    }
  }
}
</style>