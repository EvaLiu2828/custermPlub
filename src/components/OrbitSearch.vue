<template>
    <div class="orbitsearch">
        <h2>工作轨迹查询</h2>
        <b-searchOrbit
            @orbitMsg="orbitMsg"></b-searchOrbit>
        <b-orbitMsgTab
            :orbitList="orbitListArr"></b-orbitMsgTab>
    </div>
</template>
<script>
//请求文件
import Config from '../config/config.js'

//添加查询组件
import searchOrbit from './SearchOrbit.vue'
import orbitMsgTab from './OrbitMsgTab.vue'
export default {
    name: 'orbitsearch',
    data(){
        return {
            orbitListArr: []
        }
    },
    components: {
        'b-searchOrbit': searchOrbit,
        'b-orbitMsgTab': orbitMsgTab
    },
    methods: {
        orbitMsg (msg){
            console.log('父组件接收到的数据----');
            console.log(msg);
            this.orbitListArr = [];
            this.orbitListArr = msg.message;
        }
    }
}
</script>
<style lang="scss" scoped>
.orbitsearch {
    height: 100%;
}
</style>