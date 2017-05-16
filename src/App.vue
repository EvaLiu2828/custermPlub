<template>
  <div id="app">
    
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
