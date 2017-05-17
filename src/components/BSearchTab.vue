<template>
    <div class="bSearchTab">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="外访队列">
                <el-select 
                    v-model="queryId"
                    filterable 
                    placeholder="请选择" 
                    @change="selectChange(queryId)"
                    size="small">
                    <el-option
                    v-for="item in queryTeam"
                    :key="item.queueId"
                    :label="item.queueName"
                    :value="item.queueId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    size="small" 
                    @click="queryUser(queryId)" 
                    icon="search" 
                    :disabled="disabled"
                    >查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
//请求文件
import Config from '../config/config.js'
let resource = Config.commitAjax;  //服务方法

import mockfile from '../mock/mock_file.js'
export default {
    name: 'bSearchTab',
    data (){
        return {
           disabled: false,
           queryId: '',
           queryTeam: [],
        }
    },
    props: {
        queryList: {   //父组件传输从地图选出来的排程任务
            type: Array
        },
    },
    watch: {
        queryList: function () {
            this.query();
        }
    },
    methods: {
        query (){
            this.queryId = '';
            console.log(this.queryList);
            this.queryTeam = this.queryList;
            console.log(this.queryTeam);
        },
        selectChange (m){
            // console.log(m)
        },
        queryUser (val){
            let getTaskUrl = Config.config.getTask; //外访任务服务接口
            let QueueId = {
                queueId: val
            }
            console.log(getTaskUrl+'--'+QueueId);

            //请求
            resource.action (
                getTaskUrl,
                QueueId
            ).then((res) => {
                console.log(res);
                if(res.body.codeInfo == 0){
                    console.log(res.body);
                    let queryuser = res.body;
                    this.$emit('queryuser',queryuser);  //向父组件推送数据
                } else {
                   if(res.body.msgInfo){
                      let msg = res.body.msgInfo
                      this.error(msg);
                   }
                }
            }).catch((error) => {
                console.log(error);
                this.error("网络错误!");
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 0;
}
</style>