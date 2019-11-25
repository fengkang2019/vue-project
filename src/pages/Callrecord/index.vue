<template>
  <div class="call">
    <el-form label-position="center" ref="form" :model="form" class="form">
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-radio-group v-model="value" size="small" fill="#3e549d">
              <el-radio-button label="1">统计报表</el-radio-button>
              <el-radio-button label="2">数据可视化</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="4" v-if="value==1">
          <div class="grid-content bg-purple export">
            <el-button size="small" class="btn" type="primary">导出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="时间" label-width="90px">
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
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
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

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="停车场" label-width="80px">
              <el-select v-model="form.parkCode" clearable placeholder="请输入停车场名称" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="区域" label-width="80px">
              <el-select v-model="form.regionCode" clearable placeholder="请选择区域" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="接听状态">
              <el-select
                placeholder="请选择接听状态"
                style="width:200px"
                v-model="form.status"
                clearable
                size="small"
              >
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="呼叫类型">
              <el-select
                placeholder="请选择呼叫类型"
                style="width:200px"
                v-model="form.type"
                clearable
                size="small"
              >
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="客服人员">
              <el-select v-model="form.userNo" clearable placeholder="请选择客服人员" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" class="btn" @click="onSubmit(form)" size="small">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-if="value==2" class="downRow" :gutter="20" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie chartId="Pie1" height="100%" width="100%" text="接听状态分析" />
      </el-col>
      <el-col style="width:49.5%">
        <Pie chartId="Pie2" height="100%" width="100%" text="呼叫类型分析" />
      </el-col>
    </el-row>
    <el-row v-if="value==2" class="downRow" :gutter="20" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie chartId="Pie3" height="100%" width="100%" text="接听等待时长分析" />
      </el-col>
      <el-col style="width:49.5%">
        <Pie chartId="Pie4" height="100%" width="100%" text="任务处理时长分析" />
      </el-col>
    </el-row>
    <el-row v-if="value==2" class="downRow" :gutter="20">
      <el-col :span="24">
        <Bar chartId="Bar" height="100%" width="100%" text="开闸次数统计" />
      </el-col>
    </el-row>
    <el-row class="downRow2" :gutter="20" v-if="value==1">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        :fit="true"
      >
        <el-table-column fixed prop="series" label="序号"></el-table-column>
        <el-table-column fixed prop="parkCode" label="停车场"></el-table-column>
        <el-table-column fixed prop="regionCode" label="区域"></el-table-column>
        <el-table-column fixed prop="devNo" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="type" label="呼叫类型"></el-table-column>
        <el-table-column fixed prop="callTime" label="呼入时间"></el-table-column>
        <el-table-column fixed prop="status" label="接听状态"></el-table-column>
        <el-table-column fixed prop="awaitTime" label="接听等待时长"></el-table-column>
        <el-table-column fixed prop="service" label="当班客服"></el-table-column>
        <el-table-column fixed prop="handleTime" label="处理时间"></el-table-column>
        <el-table-column fixed prop="handleDuration" label="处理时长"></el-table-column>
        <el-table-column fixed prop="remark" label="未接听原因"></el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[5, 10, 15, 20]"
          background
          layout="total, prev, pager, next, sizes, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Pie from "@/components/echarts/Pie.vue";
import Bar from "@/components/echarts/Bar.vue";
import { chooseDate } from "@/utils";
import { baseJavaUrl, kesbJavaURL, service } from "@/utils/api";
import { commodRequest } from "@/request/commodRequest";
export default {
  components: { Pie, Bar },
  data() {
    return {
      value: "1",
      form: {
        timerange: "",
        date: "1",
        parkCode: "",
        regionCode: "",
        status: "",
        type: "",
        userNo: ""
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [
        {
          series: "1",
          parkCode: "sss",
          regionCode: "上海",
          devNo: "12344",
          type: "按键呼叫",
          callTime: 2019 - 10 - 1,
          status: "一接听",
          awaitTime: "30",
          service: "铁柱",
          handleTime: "2019-20-1",
          handleDuration: "20s",
          remark: "buzhidao"
        }
      ],
      currentPage: 1,
      pagesize: 10
    };
  },
  methods: {
    changeDate: function(date) {
      // let endTime = this.$moment().format("YYYYMMDD" + "235959");
      // let startTime = "";
      // console.log(this.$store);
      // if (date == 1) {
      //   this.form.timerange = [
      //     (startTime = this.$moment().format("YYYYMMDD" + "000000")),
      //     endTime
      //   ];
      // } else if (date == 2) {
      //   this.form.timerange = [
      //     (startTime = this.$moment()
      //       .subtract(1, "day")
      //       .format("YYYYMMDD" + "000000")),
      //     endTime
      //   ];
      // } else if (date == 3) {
      //   this.form.timerange = [
      //     (startTime = this.$moment()
      //       .subtract(7, "day")
      //       .format("YYYYMMDD" + "000000")),
      //     endTime
      //   ];
      // } else {
      //   this.form.timerange = [
      //     (startTime = this.$moment()
      //       .subtract(30, "day")
      //       .format("YYYYMMDD" + "000000")),
      //     endTime
      //   ];
      // }
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    onSubmit: function(form) {
      console.log(form);
    },
    changeTime(value) {},
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  computed: {
    ...mapState(["data"])
  },
  mounted() {
    console.log(baseJavaUrl, kesbJavaURL);
    console.log(commodRequest);
    this.$axios.get("/topic_collect/alsotang").then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="scss">
.call {
  height: 100%;
  .downRow {
    margin-top: 10px;
    background: #f2f3f7;
    .el-col {
      background: #fff;
      height: 152px;
    }
  }
  .downRow2 {
    margin-top: 10px;
    height: 490px;
    .cell {
      text-align: center;
    }
  }
}

.el-form-item__label {
  background: #f2f3f7;
  height: 32px;
  margin-top: 5px;
  width: 104px;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
}
.export {
  text-align: right;
}

.form {
  background: #fff;
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
                .el-input {
                  margin-top: 5px;
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
}
</style>