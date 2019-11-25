<template>
  <div class="monitor">
    <el-form ref="form" :model="form" class="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item size="small" label="所属停车场">
              <el-select v-model="form.parklot" placeholder="请选择停车场">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item size="small" label="区域">
              <el-select v-model="form.area" placeholder="请选择区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button class="btn" size="small" type="primary" @click="search(form)">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="status" :gutter="20">
      <el-col :span="24">
        <span>呼叫器状态说明:</span>
        <div class="online"></div>
        <span>在线</span>
        <div class="offline"></div>
        <span>离线</span>
        <div class="breakdown"></div>
        <span>故障</span>
      </el-col>
    </el-row>
    <el-row class="contentRow" :gutter="20" type="flex" justify="space-between">
      <el-col style="width:14%">
        <div class="grid-content bg-purple">
          <img src="@/assets/images/online.png" alt />
          <p>所属停车场:</p>
          <p>未来科技城停车场</p>
          <p>所属区域:</p>
          <p>F区域呼叫器</p>
          <div class="hoverDiv">
            <p>所属停车场:</p>
            <p>未来科技城停车场</p>
            <p>所属区域:</p>
            <p>F区域呼叫器</p>
            <p>断网时间:</p>
            <p>2019-09-10 14:20:30</p>
          </div>
        </div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">2</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">3</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">4</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">5</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">6</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">7</div>
      </el-col>
    </el-row>
    <el-row class="contentRow contentRowDown" :gutter="20" type="flex" justify="space-between">
      <el-col style="width:14%">
        <div class="grid-content bg-purple">1</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">2</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">3</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">4</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">5</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">6</div>
      </el-col>
      <el-col style="width:14%">
        <div class="grid-content bg-purple">7</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        parklot: "",
        area: ""
      }
    };
  },
  methods: {
    search: function(form) {
      console.log(form);
    }
  }
};
</script>

<style lang="scss">
.monitor {
  width: 100%;
  height: 100%;
  .el-form-item__label {
    background: #f2f3f7;
    height: 32px;
    margin-top: 5px;
    width: 104px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
  }
  .status {
    height: 40px;
    margin-top: 15px;
    .el-col {
      height: 40px;
      background: #fff;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      span {
        margin-left: 10px;
      }
      div.online {
        background: #1eaf54;
      }
      div.offline {
        background: #838383;
      }
      div.breakdown {
        background: #de4a2e;
      }
      div {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-left: 20px;
      }
    }
  }

  .contentRow {
    background: #fff;
    height: 260px;
    .el-col {
      padding: 10px;
      .grid-content {
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        text-align: center;
        position: relative;
        img {
          margin-top: 10px;
        }
        p {
          width: 100%;
          text-align: left;
          text-indent: 3rem;
          line-height: 20px;
        }
        p:nth-child(2n) {
          font-weight: 700;
        }
        div.hoverDiv {
          position: absolute;
          background: #8a8a8a;
          width: 100%;
          height: 60%;
          bottom: 0;
          left: 0;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          border: 1px solid #e0e0e0;
          display: none;
        }
      }
      div.hoverDiv > p:first-child {
        margin-top: 10px;
      }
      div.hoverDiv > p:nth-child(2n + 1) {
        font-weight: 700;
      }
      div.hoverDiv > p:nth-child(2n) {
        font-weight: 500;
      }
      .grid-content:hover div.hoverDiv {
        display: block;
        color: #fff;
      }
    }
  }
  .form {
    font-size: 12px;
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
  .el-input {
    margin-top: 5px;
  }
}
</style>