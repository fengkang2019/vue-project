<template>
  <div class="call">
    <el-form label-position="center" ref="form" :model="form" class="form">
      <el-row>
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
            <el-button size="small" class="btn" @click="exportToExcel" type="primary">导出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
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
      <el-row>
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
    <el-row v-if="value==2" class="downRow" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie chartId="Pie1" height="100%" width="100%" text="接听状态分析" />
      </el-col>
      <el-col style="width:49.5%">
        <Pie chartId="Pie2" height="100%" width="100%" text="呼叫类型分析" />
      </el-col>
    </el-row>
    <el-row v-if="value==2" class="downRow" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie chartId="Pie3" height="100%" width="100%" text="接听等待时长分析" />
      </el-col>
      <el-col style="width:49.5%">
        <Pie chartId="Pie4" height="100%" width="100%" text="任务处理时长分析" />
      </el-col>
    </el-row>
    <el-row v-if="value==2" class="downRow">
      <el-col :span="24">
        <Bar chartId="Bar" height="100%" width="100%" text="开闸次数统计" />
      </el-col>
    </el-row>
    <el-row class="downRow2" v-if="value==1">
      <el-table
        :data="tableData.slice((form.current-1)*form.size,form.current*form.size)"
        border
        style="width: 100%"
        :fit="true"
      >
        <el-table-column fixed prop="index" label="序号"></el-table-column>
        <el-table-column fixed prop="parkCode" label="停车场"></el-table-column>
        <el-table-column fixed prop="regionCode" label="区域"></el-table-column>
        <el-table-column fixed prop="devNo" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="type" label="呼叫类型"></el-table-column>
        <el-table-column fixed prop="callTime" label="呼入时间"></el-table-column>
        <el-table-column fixed prop="status" label="接听状态"></el-table-column>
        <el-table-column fixed prop="awaitTime" label="接听等待时长"></el-table-column>
        <el-table-column fixed prop="userNo" label="当班客服"></el-table-column>
        <el-table-column fixed prop="handleTime" label="处理时间"></el-table-column>
        <el-table-column fixed prop="handleDuration" label="处理时长"></el-table-column>
        <el-table-column fixed prop="remark" label="未接听原因"></el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-size="form.size"
          :page-sizes="[5, 10, 15, 20]"
          background
          layout="total, prev, pager, next, sizes, jumper"
          :total="form.total"
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
        userNo: "",
        startTime: "",
        endTime: "",
        current: 1,
        size: 10,
        total: 0
      },
      rangeTime: ["00:00:00", "23:59:59"],
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: []
    };
  },
  methods: {
    changeDate: function(date) {
      this.form.timerange = chooseDate(date, this.form.timerange);
    },
    onSubmit: function(form) {
      this.form.startTime = form.timerange[0];
      this.form.endTime = form.timerange[1];
      this.searchRecord();
    },
    changeTime(value) {},
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
    },
    //点击导出
    exportToExcel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../assets/js/Export2Excel");
        const tHeader = [
          "序号",
          "停车场",
          "区域",
          "呼叫器编号",
          "呼叫类型",
          "呼入时间",
          "接听状态",
          "接听等待时长",
          "当班客服",
          "处理时间",
          "处理时长",
          "备注"
        ];
        const filterVal = [
          "index",
          "parkCode",
          "regionCode",
          "devNo",
          "type",
          "callTime",
          "status",
          "awaitTime",
          "service",
          "handleTime",
          "handleDuration",
          "remark"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "呼叫记录excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    searchRecord() {
      const that = this;
      const reqData = {
        current: this.form.current,
        size: this.form.current,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        parkCode: this.form.parkCode,
        regionCode: this.form.regionCode,
        status: this.form.status,
        type: this.form.type,
        userNo: this.form.userNo
      };
      this.$axios.post("/pagerSelect/searchRecord", reqData).then(res => {
        if (res) {
          const { records, size, current, total } = res.data;
          records.map((item, index) => {
            item.index = index + 1;
            that.$set(that.tableData, index, item);
          });
          this.form.size = size;
          this.form.current = current;
          this.total = total;
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    ...mapState(["data"])
  }
};
</script>

<style lang="scss" >
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
    // height: 490px;
    padding: 10px;
    background: #fff;
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