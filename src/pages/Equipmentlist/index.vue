<template>
  <div class="call">
    <el-form ref="form" :model="form" class="form">
      <el-row :gutter="20">
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
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="所属停车场">
              <el-select v-model="form.parklot" clearable placeholder="请输入停车场名称" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="呼叫器编号">
              <el-select v-model="form.area" clearable placeholder="请选择区域" size="small">
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
      <el-row :gutter="20">
        <el-col :span="24">
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
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-radio-group
              @change="changeStatus(form.status)"
              v-model="form.status"
              size="small"
              fill="#3e549d"
            >
              <el-radio-button label="normal">正常</el-radio-button>
              <el-radio-button label="breakdown">故障</el-radio-button>
              <el-radio-button label="scrap">报废</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="tableRow" :stripe="true" :gutter="20">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        :fit="true"
      >
        <el-table-column fixed prop="series" label="序号" width="60px"></el-table-column>
        <el-table-column fixed prop="parklot" label="停车场"></el-table-column>
        <el-table-column fixed prop="area" label="区域"></el-table-column>
        <el-table-column fixed prop="equipmentNum" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="version" label="版本号"></el-table-column>
        <el-table-column fixed prop="addTime" label="添加时间"></el-table-column>
        <el-table-column fixed prop="ipAddress" label="ip地址"></el-table-column>
        <el-table-column fixed prop="startDate" label="启用时间"></el-table-column>
        <el-table-column key="1" v-if="form.status=='scrap'" fixed prop="scrapDate" label="报废日期"></el-table-column>
        <el-table-column key="2" v-if="form.status=='scrap'" fixed prop="usedDuration" label="使用时长"></el-table-column>
        <el-table-column
          key="3"
          v-if="form.status=='scrap'"
          fixed="right"
          prop="scrapState"
          width="150px"
          label="报废说明"
        ></el-table-column>
        <el-table-column key="4" v-if="form.status=='breakdown'" fixed prop="outTime" label="停用时间"></el-table-column>
        <el-table-column key="5" v-if="form.status=='normal'" fixed prop="expireDate" label="到期日期"></el-table-column>
        <el-table-column key="6" v-if="form.status!='scrap'" fixed="right" width="150px" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="form.status=='normal'"
              @click="handleClickBreakDown(scope.row)"
              type="text"
              size="small"
            >故障</el-button>
            <el-button
              v-if="form.status=='normal'"
              @click="handleClickEdit(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="form.status=='breakdown'"
              @click="handleClickNormal(scope.row)"
              type="text"
              size="small"
            >正常</el-button>
            <el-button
              v-if="form.status!='scrap'"
              @click="handleClickDetails(scope.row)"
              type="text"
              size="small"
            >详情</el-button>
            <el-button
              v-if="form.status!='scrap'"
              type="text"
              @click="handleClickScrap(scope.row)"
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
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="400"
          background
        ></el-pagination>
      </div>
    </el-row>
    <ChangeStatus :state="state" :msg="msg" :status="status" />
    <Dialogs :visibleFlag="visibleFlag" :flag="flag" :currentData="currentData" />
  </div>
</template>

<script>
import { chooseDate } from "@/utils";
import Dialogs from "./Dialogs";
import ChangeStatus from "./ChangeStatus";
export default {
  components: { Dialogs, ChangeStatus },
  data() {
    return {
      form: {
        timerange: "",
        status: "normal",
        date: "1",
        type: "caller"
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pikerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      currentPage: 1,
      pagesize: 10,
      tableData: [
        {
          series: "1",
          parklot: "sss",
          area: "上海",
          equipmentNum: "12344",
          version: "按键呼叫",
          addTime: 2019 - 10 - 1,
          ipAddress: "一接听",
          startDate: "30",
          scrapDate: "铁柱",
          usedDuration: "2019-20-1",
          scrapState: "20s",
          outTime: "2018-1-1",
          expireDate: "2019-1-1"
        }
      ],
      visibleFlag: false,
      //1 新增 2编辑 3详情
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
      console.log(form);
    },
    //点击新增
    addCaller: function() {
      this.visibleFlag = true;
      this.flag = "1";
      this.currentData = {};
    },
    changeTime(value) {},
    changeDate(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    changeType(type) {
      console.log(type);
    },
    changeStatus(status) {
      console.log(status);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    //点击编辑
    handleClickEdit(val) {
      this.visibleFlag = true;
      this.flag = "2";
      this.currentData = val;
    },
    //点击详情
    handleClickDetails(val) {
      this.visibleFlag = true;
      this.flag = "3";
      this.currentData = val;
    },
    //点击正常
    handleClickNormal(value) {
      this.state = true;
      this.status = "0";
      this.msg = "你确定设备状态为正常吗?";
    },
    //点击故障
    handleClickBreakDown() {
      this.state = true;
      this.status = "1";
      this.msg = "你确定设备状态为故障吗?";
    },
    //点击报废
    handleClickScrap(value) {
      this.state = true;
      this.status = "2";
      this.msg = "你确定设备状态为报废吗?";
    }
  }
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
.form {
  .el-row {
    background: #fff;
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

.btn {
  background: #3e549d;
}
.btnCol {
  .grid-content{
    text-align: right;
  }
}
.tableRow {
  margin-top: 10px;
  text-align: right;
  .cell {
    text-align: center;
    .el-button {
      padding: 0;
      margin: 0;
    }
  }
}
</style>