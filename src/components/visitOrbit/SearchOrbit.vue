<template>
    <div class="seachOrbit">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="外访人员">
                <el-input 
                    placeholder="外访人员姓名"
                    v-model="name" 
                    size="small" 
                    @change="handleNameClick(name)"></el-input>
            </el-form-item>
            <el-form-item label="选择时间范围">
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    placeholder="选择时间范围"
                    size="small"
                    @change="handleTimeClick(time)"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    size="small" 
                    @click="searchClick(name, time)" 
                    icon="search" 
                    :disabled="disabled"
                    >查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
//请求文件
import Config from '../../base/config.js'
let resource = Config.commitAjax;  //服务方法

import Common from '../../base/common.js'  //公用方法
let setTime = Common.setTime;      //时间设置
let alertBox = Common.messageBox;  //消息提示方法

//假数据
// import mockfile from '../../mock/seachOrbit.js'

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
            //非空判断
            if(val){
              (this.name != '' && this.time != '' && this.time[0] != null && this.time[1] != null) ? this.disabled = false : this.disabled = true
            }
        },
        handleTimeClick (val) {
            if(val){
              //非空判断
              (this.name != '' && this.time != '' && this.time[0] != null && this.time[1] != null) ? this.disabled = false : this.disabled = true
            }
        },
        searchClick (name, time){
            let selectTrackUrl = Config.config.selectTrack; //外访任务服务接口
            console.log(selectTrackUrl);
            this.startDate = setTime.getForTime(time[0]);
            this.endDate = setTime.getForTime(time[1]);
            console.log(name+'--'+this.startDate+'--'+this.endDate);
            let selectTrackDate = {
              userName: name,
              startDate: this.startDate,
              endDate: this.endDate
            }
            console.log(selectTrackDate)

            //请求
            resource.action (
                selectTrackUrl,
                selectTrackDate
            ).then((res) => {
                this.orbitMsg = res.body;
                console.log(this.orbitMsg);
                if(this.orbitMsg.codeInfo == 0){
                    if(this.orbitMsg.message.length != 0){
                        this.$emit('orbitMsg',this.orbitMsg);  //向父组件推送数据
                    }
                    this.name = '';
                    this.time = '';
                    this.startDate = '';
                    this.endDate = '';
                } else {
                   if(res.body.msgInfo){
                      let msg = res.body.msgInfo
                      alertBox.alertMessage({
                         TextMessage: msg,
                         Type: 'error',
                         duration: 2000
                      });      
                   }
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.seachOrbit {
    background: #eef1f6;
    padding: 1rem;
}
.el-form-item {
    margin-bottom: 0;
}
</style>
