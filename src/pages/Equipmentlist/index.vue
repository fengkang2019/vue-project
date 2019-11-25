<template>
  <div class="list">
    <el-form ref="form" :model="form" class="form">
      <el-row>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="时间">
              <el-date-picker
                style="width:220px"
                v-model="form.timerange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                value-format="yyyyMMddHHmmss"
                :default-time="rangeTime"
                @change="changeTime(form.timerange)"
                :picker-options="pikerOptions"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-radio-group
              style="width:270px"
              @change="changeDate(form.date)"
              v-model="form.date"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="1">今日</el-radio-button>
              <el-radio-button label="2">昨日</el-radio-button>
              <el-radio-button label="3">最近7天</el-radio-button>
              <el-radio-button label="4">最近30天</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="10" class="btnCol">
          <div class="grid-content bg-purple">
            <el-button @click="addCaller(visibleFlag)" type="primary" class="btn" size="small">新增呼叫器</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="所属停车场">
              <el-select v-model="form.parkCode" clearable placeholder="请输入停车场名称" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="呼叫器编号">
              <el-select v-model="form.regionCode" clearable placeholder="请选择区域" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button @click="searchList(form)" type="primary" class="btn" size="small">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#f2f3f7; border-bottom:1px solid #dddddd" class="chooseStatus">
        <el-col style="background:#f2f3f7" :span="24">
          <div class="grid-content bg-purple">
            <el-radio-group
              @change="changeType(form.type)"
              v-model="form.type"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="pda">PDA管理</el-radio-button>
              <el-radio-button label="led">LED管理</el-radio-button>
              <el-radio-button label="outside">路外摄像头</el-radio-button>
              <el-radio-button label="caller">呼叫器</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#f2f3f7" class="chooseStatus">
        <el-col style="background:#f2f3f7" :span="24">
          <div class="grid-content bg-purple">
            <el-radio-group
              @change="changeStatus(form.status)"
              v-model="form.status"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="0">正常</el-radio-button>
              <el-radio-button label="1">故障</el-radio-button>
              <el-radio-button label="2">报废</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="tableRow" :stripe="true">
      <el-table
        :data="tableData.slice((form.current-1)*form.size,form.current*form.size)"
        border
        style="width: 100%"
        :fit="true"
      >
        <el-table-column fixed prop="index" label="序号" width="60px"></el-table-column>
        <el-table-column fixed prop="parkCode" label="停车场"></el-table-column>
        <el-table-column fixed prop="regionCode" label="区域"></el-table-column>
        <el-table-column fixed prop="devNo" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="devVer" label="版本号"></el-table-column>
        <el-table-column fixed prop="addTime" label="添加时间"></el-table-column>
        <el-table-column fixed prop="devIp" label="ip地址"></el-table-column>
        <el-table-column fixed prop="activeDate" label="启用时间"></el-table-column>
        <el-table-column key="1" v-if="form.status=='2'" fixed prop="heartTime" label="报废日期"></el-table-column>
        <el-table-column key="2" v-if="form.status=='2'" fixed prop="timeBetween" label="使用时长"></el-table-column>
        <el-table-column
          key="3"
          v-if="form.status=='2'"
          fixed="right"
          prop="2State"
          width="150px"
          label="报废说明"
        ></el-table-column>
        <el-table-column key="4" v-if="form.status=='1'" fixed prop="modifyTime" label="停用时间"></el-table-column>
        <el-table-column key="5" v-if="form.status=='0'" fixed prop="endDate" label="到期日期"></el-table-column>
        <el-table-column key="6" v-if="form.status!='2'" fixed="right" width="150px" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="form.status=='0'"
              @click="handleClick1(scope.row)"
              type="text"
              size="small"
            >故障</el-button>
            <el-button
              v-if="form.status=='0'"
              @click="handleClickEdit(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="form.status=='1'"
              @click="handleClick0(scope.row)"
              type="text"
              size="small"
            >正常</el-button>
            <el-button
              v-if="form.status!='2'"
              @click="handleClickDetails(scope.row)"
              type="text"
              size="small"
            >详情</el-button>
            <el-button
              v-if="form.status!='2'"
              type="text"
              @click="handleClick2(scope.row)"
              size="small"
            >报废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="form.size"
          layout="total, prev, pager, next, sizes, jumper"
          :total="form.total"
          background
        ></el-pagination>
      </div>
    </el-row>
    <ChangeStatus :state="state" :msg="msg" :status="status" :currentData="currentData" />
    <Dialogs :visibleFlag="visibleFlag" :flag="flag" :currentData="currentData" />
  </div>
</template>

<script>
import { chooseDate } from "@/utils";
import Dialogs from "./Dialogs";
import ChangeStatus from "./ChangeStatus";
import Vue from "vue";
export default {
  components: { Dialogs, ChangeStatus },
  data() {
    return {
      form: {
        timerange: "",
        status: "0",
        date: "1",
        type: "caller",
        startTime: "",
        endTime: "",
        current: 1,
        size: 10,
        total: 0
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pikerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },

      tableData: [],
      visibleFlag: false,
      //0 新增 1编辑 2详情
      flag: "1",
      state: false,
      //1 正常 2故障 3报废
      status: "0",
      msg: "",
      currentData: {}
    };
  },
  methods: {
    searchList: function(form) {
      if (form.type == "caller") {
        this.form.startTime = form.timerange[0];
        this.form.endTime = form.timerange[1];
        this.search(form);
      } else {
        this.$message.error("暂无其他数据");
        return false;
      }
    },
    //点击新增
    addCaller: function() {
      this.visibleFlag = true;
      this.flag = "1";
      this.currentData = {};
    },
    //确定新增设备
    confirmAdd(val) {
      this.$axios.post("/pagerInsert/insertDevice", val).then(res => {
        if (res) {
          this.search(this.form);
        }
      });
    },
    changeTime(value) {},
    //点击 单选天数按钮
    changeDate(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },

    changeType(type) {},
    //点击单选 设备状态
    changeStatus(status) {
      this.form.status = status;
      this.tableData = [];
      this.search(this.form);
    },
    //改变每页数量
    handleSizeChange(val) {
      this.form.size = val;
      this.search(this.form);
    },
    //改变当前页数
    handleCurrentChange(val) {
      this.form.current = val;
      this.search(this.form);
    },

    //点击编辑
    handleClickEdit(val) {
      this.visibleFlag = true;
      this.flag = "2";
      this.currentData = val;
    },
    //确认编辑
    confirmEdit(val) {
      this.$axios.post("/pagerUpdate/updateDevice", val).then(res => {
        if (res) {
          this.search(this.form);
        }
      });
    },
    //点击详情
    handleClickDetails(row) {
      this.visibleFlag = true;
      this.flag = "3";
      this.currentData = row;
    },
    //点击正常
    handleClick0(row) {
      this.state = true;
      this.status = "0";
      this.msg = "你确定设备状态为正常吗?";
      row.status = this.status;
      this.currentData = row;
      // this.confirmEdit(row);
    },
    //点击故障
    handleClick1(row) {
      console.log(row);
      this.state = true;
      this.status = "1";
      row.status = this.status;
      this.currentData = row;
      this.msg = "你确定设备状态为故障吗?";
      // this.confirmEdit(row);
    },
    //点击报废
    handleClick2(row) {
      this.state = true;
      this.status = "2";
      this.msg = "你确定设备状态为报废吗?";
      row.status = this.status;
      this.currentData = row;
    },
    //查询
    search(form) {
      this.initStatus = this.status;
      let that = this;
      const reqData = {
        current: this.form.current,
        size: this.form.size,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        devNo: this.form.devNo,
        parkCode: this.form.parkCode,
        status: this.form.status
      };
      this.$axios.post("/pagerSelect/searchDevice", reqData).then(res => {
        const { records, current, size, total } = res.data;
        this.form.total = total;
        this.form.size = size;
        this.form.current = current;
        records.map((item, index) => {
          item.index = index + 1;
          that.$set(that.tableData, index, item);
        });
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.el-form-item__label {
  background: #f2f3f7;
  height: 32px;
  margin-top: 5px;
  width: 104px;
  text-align: center;
  line-height: 32px;
}
.list {
  .form {
    .el-row {
      background: #fff;
      padding: 5px;
      .el-col {
        background: #fff;
        height: 40px;
        line-height: 40px;
        .bg-purple-dark {
          background: #fff;
          .bg-purple {
            background: #fff;
            .bg-purple-light {
              background: #fff;
              .grid-content {
                border-radius: 4px;
                min-height: 40px;
                background: #fff;
                line-height: 40px;
                .row-bg {
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
}
.btn {
  background: #3e549d;
  width: 80px;
}
.btnCol {
  .grid-content {
    text-align: right;
  }
}
.tableRow {
  margin-top: 10px;
  text-align: right;
  padding: 10px;
  background: #fff;
  .cell {
    text-align: center;
    .el-button {
      padding: 0;
      margin: 0;
    }
  }
}
</style>