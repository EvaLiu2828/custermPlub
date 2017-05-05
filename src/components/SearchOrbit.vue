<template>
    <div class="seachOrbit">
      <span>
        外访人员姓名
        <el-input
            class="name-input" 
            placeholder="外访人员姓名" 
            v-model="name" 
            size="small" 
            @change="handleNameClick(name)">
        </el-input>
      </span>
      <span>
        外访时间区间
        <el-date-picker
            v-model="time"
            type="datetimerange"
            placeholder="选择时间范围"
            size="small"
            @change="handleTimeClick(time)">
        </el-date-picker>
      </span>
      <el-button 
        type="primary" 
        size="small" 
        @click="searchClick(name,startDate,endDate)" 
        icon="search" 
        :disabled="disabled"
        >查询</el-button>
    </div>
</template>
<script>
//请求文件
import Config from '../config/config.js'
//假数据
import MockFile from '../mock/seachOrbit.js'   //外访列表模拟数据
let resource = Config.commitAjax;  //服务方法

export default {
    name: 'seachOrbit',
    data(){
      return {
          name: '',
          time: '',
          startDate: '',
          endDate: '',
          signMsg: '',
          disabled: true
      }
    },
    methods: {
      handleNameClick (val) {
        console.log(val);
        //非空判断
        (this.name != '' && this.time != '' && this.time[0] != null && this.time[1] != null) ? this.disabled = false : this.disabled = true
      },
      handleTimeClick (val) {
        if(!val){
          this.startDate = (val[0]).toISOString().slice(0,10)+ ' ' +(val[0]).toTimeString().slice(0,8);
          this.endDate = (val[1]).toISOString().slice(0,10)+ ' ' +(val[1]).toTimeString().slice(0,8);
        }
        //非空判断
        (this.name != '' && this.time != '' && this.time[0] != null && this.time[1] != null) ? this.disabled = false : this.disabled = true
      },
      searchClick (name, startDate, endDate){
        console.log(name+'--'+startDate+'--'+endDate);
        let searchOrbitUrl = Config.config.searchOrbit; //外访任务服务接口
        console.log(searchOrbitUrl);

        //请求
        resource.action (
            searchOrbitUrl,
            {
              useName: name,
              startDate: startDate,
              endDate: endDate
            }
        ).then((res) => {
            this.orbitMsg = res.body;
            console.log(this.orbitMsg);
            if(this.orbitMsg.codeInfo == 0){
              this.$emit('orbitMsg',this.orbitMsg);  //向父组件推送数据
              this.name = '';
              this.time = '';
              this.startDate = '';
              this.endDate = '';
            } else {
              
            }
        }).catch((error) => {
            console.log(error);
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.seachOrbit {
    background: #eef1f6;
    padding: 1rem;
}
.seachOrbit span {
    margin-right: 1rem;
}
.seachOrbit .name-input {
  width: 150px;
}
.seachOrbit .el-button {
  height: 30px;
}
</style>
