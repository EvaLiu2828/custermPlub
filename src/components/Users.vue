<template>
  <div class="users">
      <h2>签到查询</h2>
      <b-searchVisit
        @signMsg="signMsgArr"></b-searchVisit>
      <b-signMsgTab
        :signList="signListArr"></b-signMsgTab>
  </div>
</template>
<script>
  //请求文件
  import Config from '../config/config.js'

  //添加查询组件
  import searchVisit from './SearchVisit.vue'
  import signMsgTab from './SignMsgTab.vue'
  export default {
    name: 'users',
    data(){
      return {
        signListArr: []  //签到信息
      }
    },
    components: {
        'b-searchVisit': searchVisit,
        'b-signMsgTab': signMsgTab,
    },
    mounted () {
    },
    methods: {
      signMsgArr (msg) {
        console.log('父组件接收到的数据----');
        console.log(msg);
        this.signListArr = [];
        this.signListArr = msg.message;   //往list组件发送数据
      }
    }
  }

</script>
<style lang="scss" scoped>
.users {
    height: 100%;
    overflow-y: auto;
}
</style>
