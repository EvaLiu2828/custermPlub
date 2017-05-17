<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
          <router-link :to="{name: 'visit'}" class="White">外访排程管理</router-link>
      </el-menu-item>
      <el-submenu index="3">
          <template slot="title">外访人员管理</template>
          <el-menu-item index="2-1">
              <router-link :to="{name: 'users'}">签到查询</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
              <router-link :to="{name: 'orbitsearch'}">工作轨迹查询</router-link>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="table">
      <router-view></router-view>
    </div>
    <div></div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
      return {
        activeIndex: '1'
      };
    },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss">
  @import "./css/common.scss";
  @import "./css/variable.scss";
  #app {
    width: 100%;
    height: 100%;
    margin: auto;
    overflow-y: hidden;
  }
  .table {
    width: 100%;
    height: 100%;
    background: $bg-color2;
    margin-top: 20px;
    
    padding: 0 20px;
    padding-bottom: 30px;
    overflow: hidden;
  }
  .el-menu--horizontal .el-submenu a, .el-menu--horizontal .el-submenu a:hover {
    color: inherit;
  }    

</style>
