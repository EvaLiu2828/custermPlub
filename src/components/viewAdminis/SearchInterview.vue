<template>
    <div class="search-interview">
        <el-form 
            :inline="true"
            :model="ruleForm" 
            ref="ruleForm"
            :rules="rules"
            class="demo-form-inline">
            <el-form-item label="外访队列" prop="queueId">
                <el-select 
                    filterable 
                    v-model="ruleForm.queueId"
                    placeholder="请选择" 
                    size="small"
                    @change="selectChange(ruleForm.queueId)">
                    <el-option 
                        v-for="item in queryTeam"
                        :key="item.queueId"
                        :label="item.queueName"
                        :value="item.queueId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户姓名">
                <el-input
                    v-model="ruleForm.customerName" 
                    placeholder="客户姓名"
                    size="small"
                    @change=""></el-input>
            </el-form-item>
            <el-form-item label="排程时间">
                <el-date-picker
                    v-model="ruleForm.visitorDate"
                    type="date"
                    placeholder="选择时间范围"
                    size="small"
                    @change="handleTimeClick(ruleForm.visitorDate)">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    size="small" 
                    icon="search" 
                    @click="submitForm('ruleForm')"
                    >查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Config from '../../base/config.js'
let resource = Config.commitAjax;  //服务方法
import Common from '../../base/common.js'  //公用方法
let alertBox = Common.messageBox;  //消息提示方法
let setTime = Common.setTime;      //时间设置
//假数据
// import getQueue from '../../mock/query.js'
// import getInter from '../../mock/searchInter.js'
export default {
    name: 'search-interview',
    data (){
        return {
            ruleForm: {
                queueId: '',   //队列
                customerName: '',      // 客户姓名
                visitorDate: '',      //排程时间
            },
            rules: {
                queueId: [
                    {type: 'number', required: true, message: '请选择外访队列', trigger: 'change'}
                ]
            },
            queryTeam: [],
            time: ''
        }
    },
    mounted () {
      this.getQueue();  
    },
    methods: {
        getQueue (){
            let getQueryVUrl = Config.config.getQueueV; //外访队列服务接口
            resource.action (
                getQueryVUrl
            ).then((res) => {
                console.log(res.body);
                this.queryTeam = res.body.queue;
            });
        },
        selectChange (item){
            console.log(item);
            this.ruleForm.queueId = item;
        },
        handleTimeClick(time){
            console.log(time);
            if(typeof(time) != "undefined"){
                this.ruleForm.visitorDate = setTime.getForDate(time);
            }
        },
        submitForm (fromData){
            console.log(this.ruleForm);
            if(this.ruleForm.visitorDate == undefined){
                this.ruleForm.visitorDate = '';
            }
            this.$refs[fromData].validate((valid) => {
                if(valid) {
                    console.log('submit!');
                    this.$el.style.paddingBottom = '1rem';
                    this.getInterSearch(this.ruleForm,fromData);
                } else {
                    console.log('error submit');
                    setTimeout(() => {
                        this.$refs[fromData].resetFields();  //清空
                        this.ruleForm = {
                            queueId: '',   //队列
                            customerName: '',      // 客户姓名
                            visitorDate: '',      //排程时间
                        }
                    }, 3000);
                    this.$el.style.paddingBottom = '2rem';
                    return false;
                }
            });
        },
        getInterSearch (data,item){
            console.log(data)
            let gueryVisitUrl = Config.config.gueryVisit; //外访查询服务接口
            console.log(gueryVisitUrl)
            resource.action (
                gueryVisitUrl,
                data
            ).then((res) => {
                if(res.body.codeInfo == 0){
                    let interviewData = res.body.task;
                    console.log(interviewData);
                    this.$emit('interviewData',interviewData);  //向父组件推送数据
                    setTimeout(() => {
                        this.ruleForm = {
                            queueId: '',   //队列
                            customerName: '',      // 客户姓名
                            visitorDate: '',      //排程时间
                        }
                        this.$refs[item].resetFields();  //清空
                    }, 1000);
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.search-interview {
    background: #eef1f6;
    padding: 1rem;
}
.el-form-item {
    margin-bottom: 0;
}
</style>