<template>
  <div class="cutoffreason">
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
              <el-select v-model="form.parklot" clearable placeholder="请输入停车场名称" size="small">
                <el-option value="1" label="广东"></el-option>
                <el-option value="2" label="深圳"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="区域" label-width="80px">
              <el-select v-model="form.area" clearable placeholder="请选择区域" size="small">
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
            <el-form-item label="车牌号">
              <el-input placeholder="请选择车牌号" style="width:200px" v-model="form.carNum" size="small"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" v-if="value==1">
          <div class="grid-content bg-purple">
            <el-form-item label="异常开闸原因">
              <el-select
                placeholder="请选择异常开闸原因"
                style="width:200px"
                v-model="form.abnormalReason"
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
            <el-form-item label="开闸人">
              <el-select v-model="form.oprator" clearable placeholder="请选择客服人员" size="small">
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
    <el-row class="tableRow" :gutter="20" v-if="value==1">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        :fit="true"
      >
        <el-table-column fixed prop="series" label="序号"></el-table-column>
        <el-table-column fixed prop="parklot" label="停车场"></el-table-column>
        <el-table-column fixed prop="area" label="区域"></el-table-column>
        <el-table-column fixed prop="callNum" label="呼叫器编号"></el-table-column>
        <el-table-column fixed prop="callType" label="呼叫类型"></el-table-column>
        <el-table-column fixed prop="callTime" label="呼入时间"></el-table-column>
        <el-table-column fixed prop="answerStatus" label="接听状态"></el-table-column>
        <el-table-column fixed prop="awaitTime" label="接听等待时长"></el-table-column>
        <el-table-column fixed prop="service" label="当班客服"></el-table-column>
        <el-table-column fixed prop="handleTime" label="处理时间"></el-table-column>
        <el-table-column fixed prop="handleTimes" label="处理时长"></el-table-column>
        <el-table-column fixed prop="reason" label="未接听原因"></el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, prev, pager, next, sizes, jumper"
          :total="400"
          background
          :pager-count="5"
        ></el-pagination>
      </div>
    </el-row>
    <el-row :gutter="20" class="chartsRow" v-if="value==2">
      <el-col :span="24">
        <Bar chartId="Bar2" height="100%" width="100%" text="开闸次数统计" />
      </el-col>
    </el-row>
    <el-row class="chartsRow" :gutter="20" v-if="value==2" type="flex" justify="space-between">
      <el-col style="width:49.5%">
        <Pie chartId="Pie5" height="100%" width="100%" text="异常开闸时段分析" />
      </el-col>
      <el-col style="width:49.5%">
        <Pie chartId="Pie6" height="100%" width="100%" text="异常开闸车牌类型分析" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pie from "@/components/echarts/Pie.vue";
import Bar from "@/components/echarts/Bar.vue";
import { chooseDate } from "@/utils";

export default {
  components: { Pie, Bar },
  data() {
    return {
      value: "1",
      form: {
        timerange: "",
        date: "1"
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
          parklot: "sss",
          area: "上海",
          callNum: "12344",
          callType: "按键呼叫",
          callTime: "2019 - 10 - 1",
          answerStatus: "一接听",
          awaitTime: "30",
          service: "铁柱",
          handleTime: "2019-20-1",
          handleTimes: "20s",
          reason: "buzhidao"
        }
      ],
      currentPage: 1,
      pagesize: 10
    };
  },
  methods: {
    changeDate: function(date) {
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
  }
};
</script>

<style lang="scss">
.cutoffreason {
  width: 100%;
  height: 100%;

  .chartsRow {
    width: 100%;
    margin-top: 10px;
    height: 235px;
    background: #ececec;
    .el-col {
      height: 235px;
    }
  }
  .tableRow {
    width: 100%;
    margin-top: 10px;
    background: #ececec;
    .el-col {
      // height: 235px;
    }
  }
}
.export {
  text-align: right;
}

.el-form-item__label {
  background: #ececec;
  height: 32px;
  margin-top: 5px;
  width: 104px;
  text-align: center;
  line-height: 32px;
}
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
.btn {
  background: #3e549d;
}
</style>