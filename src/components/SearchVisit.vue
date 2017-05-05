<template>
    <div class="seachVisit">
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
        ref="cubmit"
        :disabled="disabled">查询</el-button>
    </div>
</template>
<script>
//请求文件
import Config from '../config/config.js'
//假数据
import MockFile from '../mock/seachVisit.js'   //外访列表模拟数据
let resource = Config.commitAjax;  //服务方法

export default {
    name: 'seachVisit',
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
      },
      handleTimeClick (val) {
        if(!val){
          this.startDate = (val[0]).toISOString().slice(0,10)+ ' ' +(val[0]).toTimeString().slice(0,8);
          this.endDate = (val[1]).toISOString().slice(0,10)+ ' ' +(val[1]).toTimeString().slice(0,8);
        }
        //非空判断
        (this.time != '' && this.time[0] != null && this.time[1] != null) ? this.disabled = false : this.disabled = true

      },
      searchClick (name, startDate, endDate){
        console.log(name+'--'+startDate+'--'+endDate);
        let searchSignUrl = Config.config.searchSign; //外访任务服务接口
        console.log(searchSignUrl);

        //请求
        resource.action (
            searchSignUrl,
            {
              useName: name,
              startDate: startDate,
              endDate: endDate
            }
        ).then((res) => {
            this.signMsg = res.body;
            console.log(this.signMsg);
            if(this.signMsg.codeInfo == 0){
              this.$emit('signMsg',this.signMsg);  //向父组件推送数据
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
.seachVisit {
    background: #eef1f6;
    padding: 1rem;
}
.seachVisit span {
    margin-right: 1rem;
}
.seachVisit .name-input {
  width: 150px;
}
.seachVisit .el-button {
  height: 30px;
}
</style>
