<template>
  <div class="Visit">
    <h2>外访排程管理</h2>
    <div class="bottom">
      <span class="right">
        <router-link :to="{name: 'visitlist'}"  v-show="show">
          <el-button type="info" size="small">
            外访列表
          </el-button>
        </router-link>
        <router-link :to="{name: 'visitmap'}" v-show="show">
          <el-button type="info" size="small">
            外访地图
          </el-button>
        </router-link>
      </span>
    </div>
    <div class="visit_view">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'visit',
    data(){
      return {
          show: false
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  .Visit {
    height: 95%;
  }
  .visit_view {
    height: 100%;
  }
  .bottom {
    clear: both;
    overflow: hidden;
    height: 2rem;
    margin-bottom: 1rem;
  }
  .right {
    float: right;
  }
</style>