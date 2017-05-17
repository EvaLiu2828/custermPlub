<template>
    <div class="seachVisit">
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
                    @change="handleTimeClick(time)">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    size="small"
                    @click="searchClick(name,time)" 
                    icon="search" 
                    ref="cubmit"
                    :disabled="disabled">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
//请求文件
import Config from '../config/config.js'
import seachVisit from '../mock/seachVisit.js'
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
            console.log(val)
            //非空判断
            if(val){
              (this.time != '' && this.time[0] != null && this.time[1] != null) ? this.disabled = false : this.disabled = true
            }
        },
        searchClick (name, time){
            let selectVisitUrl = Config.config.selectVisit; //外访任务服务接口
            console.log(selectVisitUrl);
            this.startDate = this.getForTime(time[0]);
            this.endDate = this.getForTime(time[1]);
            let selectVisitDate = {
                'userName': name,
                'startDate': this.startDate,
                'endDate': this.endDate
            }
            console.log(selectVisitDate);
            //请求
            resource.action (
              selectVisitUrl,
              selectVisitDate
            ).then((res) => {
              console.log(res)
              this.signMsg = res.body;
              console.log(this.signMsg);
              if(this.signMsg.codeInfo == 0){
                  if(this.signMsg.message.length !=0){
                     this.$emit('signMsg',this.signMsg);  //向父组件推送数据
                  }
                  this.name = '';
                  this.time = '';
                  this.startDate = '';
                  this.endDate = '';
              } else {
                  if(res.body.msgInfo){
                     let msg = res.body.msgInfo
                     this.error(msg);
                  }
              }
            }).catch((error) => {
                this.error("网络错误!");
            })
        },
        success(m) {
            this.$message({
            showClose: true,
            message: m,
            type: 'success'
            });
        },
        error(m){
            this.$message({
                showClose: true,
                message: m,
                type: 'error'
            });
        },
        //补零
        addPreZero (num){
            if(num < 10){
                return '0' + num;
            } else {
                return num;
            }
        },
        //时间转换
        getForTime (time){
            let year = time.getFullYear(); // 年
            let month = this.addPreZero(time.getMonth()+1); // 月
            let date = this.addPreZero(time.getDate()); // 日
            let hour = this.addPreZero(time.getHours());  //时
            let minutes = this.addPreZero(time.getMinutes());  //分
            let seconds = this.addPreZero(time.getSeconds());  //分

            time= year + '-' + month + '-' + date+ ' ' +hour+':'+minutes+':'+seconds;
            return time;
        }       
    }
}
</script>
<style lang="scss" scoped>
.seachVisit {
    background: #eef1f6;
    padding: 1rem;
}
.el-form-item {
    margin-bottom: 0;
}
</style>
