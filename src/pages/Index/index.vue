<template>
  <div class="main">
    <el-container>
      <el-header style="padding:0">
          
      </el-header>
      <el-container class="content">
        <el-aside width="200px">
          <el-menu
            :router="true"
            :collapse-transition="true"
            :default-active="active"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="selectOptions"
            background-color="#313445"
            text-color="#fff"
            active-text-color="#5a71c1"
            :unique-opened="true"
          >
            <!-- 呼叫中心 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>呼叫中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/longcutoff">远程开闸</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="/callrecord">
                <template slot="title">统计报表</template>
                <el-menu-item index="/callrecord">呼叫记录统计</el-menu-item>
                <el-menu-item index="/cutoffreason">开闸原因统计</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 设备管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>设备管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/equipmentlist">设备列表</el-menu-item>
                <el-menu-item index="/equipmentmonitor">设备监控</el-menu-item>
                <el-menu-item index="/equipmentanalyze">设备分析</el-menu-item>
                <el-menu-item index="/parklotmonitor">车场监控</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 用户反馈 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-chat-dot-square"></i>
                <span>用户反馈</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">选项2</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-2">
                <template slot="title">选项4</template>
                <el-menu-item index="3-2-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 工单中心 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>工单中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">选项2</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="4-2">
                <template slot="title">选项4</template>
                <el-menu-item index="4-2-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 人员设置 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>人员设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/servicemanage">客服管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 系统设置 -->
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1">选项2</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="6-2">
                <template slot="title">选项4</template>
                <el-menu-item index="6-2-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectOptions(index, indexPath) {
      console.log(index, indexPath);
      console.log(this.active);
    }
  }
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
}
.el-header {
  // background-color: #ececec;
  color: #333;
  height: 12%;
}

.el-aside {
  color: #333;
  height: 100%;
  background: #313445;
}
.el-main {
  background-color: #f2f3f7;
  color: #333;
  height: 100%;
  .call{
    width: 100%;
    height: 100%;
  }
}
.el-container {
  height: 100%;
  width: 100%;
}
.el-container > .content {
  height: 88%;
}
</style>