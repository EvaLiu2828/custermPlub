<template>
    <div class="VisitMap">
        <div class="search-tab">
            <b-searchTab
            :queryList="queryList"
            @queryuser="queryUser"></b-searchTab>
        </div>
        <div class="bottom">
            <el-button 
                :plain="true" 
                type="info" 
                size="small"
                :readyVisit="visitArray" 
                :disabled="disabled"
                @click="confirm(getVisitData)">确定排程</el-button>
            <el-button 
                :plain="true" 
                type="info" 
                size="small"
                :disabled="disabled"
                @click="cancel(getVisitData)">取消排程</el-button>
            <el-button
                :plain="true"
                type="info"
                size="small"
                :disabled="disabled"
                @click="abolish(getVisitData)">取消外访</el-button>                
        </div>
        <b-map 
            :visitData="visitData" 
            @readyVisitArray='readyVisitList'></b-map>
        <b-readyVisit 
            ref="bReadyVisit"
            :visitTeam="visitTeam" 
            :readyVisit="visitArray" 
            :systemDate="date" 
            @readyVisitArr="getReadyVisitList"></b-readyVisit>
    </div>
</template>
<script>
let myGeo;
let map;

//请求文件
import Config from '../../base/config.js'
let resource = Config.commitAjax;  //服务方法

import Common from '../../base/common.js'  //公用方法
let setTime = Common.setTime;      //时间设置
let alertBox = Common.messageBox;  //消息提示方法
let utils = Common.utils;  //数据验证

//假数据
import query from '../../mock/query.js'
import canle from '../../mock/cancl.js'
import ensureSchedule from '../../mock/ensureSchedule.js'
import cancelVisit from '../../mock/cancelVisit.js'

import bmap from './Bmap'
import bReadyVisit from './BReadyVisit.vue'
import bSearchTab from './BSearchTab.vue'

export default {
    name: 'visitmap',
    data () {
        return {
            childWords: '',
            queryList: [],   //外访队列
            visitData: [],   //外访列表
            visitTeam: [],   //外访人员列表
            index: 0,
            visitArray: [],   //准备排程外访
            date: '', //系统时间
            getVisitData: [],  //要提交的排程任务
            disabled: true
        }
    },
    mounted () {
        this.queryteam();
    },
    components: {
        'b-searchTab': bSearchTab,
        'b-map': bmap,
        'b-readyVisit': bReadyVisit,
    },
    methods : {
        //外访队列
        queryteam (){
            console.log('外访队列');
            let getQueryUrl = Config.config.getQueue; //外访队列服务接口
            console.log(getQueryUrl);
            let getquery = {};
            //请求
            resource.action (
                getQueryUrl,
                getquery
            ).then((res) => {
                console.log(res);
                if(res != undefined){
                    if(res.body.codeInfo == 0){
                        this.queryList = res.body.queue;
                    } else {
                    if(res.body.msgInfo){
                            let msg = res.body.msgInfo +'!';
                            alertBox.alertMessage({
                                TextMessage: msg,
                                Type: 'error',
                                duration: 2000
                            });      
                    }
                    }
                }
            });
        },
        //从搜索子组件传输回来的数据
        //外访列表
        queryUser (msg) {
            console.log('外访任务');
            console.log(msg);
            this.visitArray = [];
            this.visitData = msg.task;
            this.visitTeam = msg.user;
            this.date = msg.date;
        },
        //从map子组件传输回来的数据
        readyVisitList (msg) {
            console.log('父组件接收到的数据----');
            console.log(msg);
            this.visitArray = [];
            this.visitArray = msg;
        },
        //从列表模版传输回来
        getReadyVisitList (msg){
            console.log('父组件接收到的排程数据----');
            console.log(msg);
            this.getVisitData = [];
            this.getVisitData = msg;
            (this.getVisitData.length != 0) ? this.disabled = false : this.disabled = true ;
        },
        //确定排程
        confirm (r) {
            console.log('确定排程');
            let _this = this;
            let flag_submit = false;
            console.log(_this)
            for(var t in r){
                if(r[t].status == '03'){
                    if(r[t].visitorDate!='' && r[t].visitorDate!=undefined && r[t].visitSeq!='' && r[t].visitSeq!=undefined && r[t].visitorNo.length > 1){
                        console.log("可以发请求");
                        flag_submit = true;
                    } else {
                        alertBox.alertMessage({
                            TextMessage: "正确选择外访日期、外访顺序、两名以上外访人员",
                            Type: 'info',
                            duration: 2000
                        });
                        flag_submit = false;
                        _this.$children[_this.$children.length-1].$refs.table.toggleRowSelection(r[t],false);  //綁定 ref 就可以拿到組件對象
                    }
                } else {
                    alertBox.alertMessage({
                        TextMessage: "已排程的外访不可排程",
                        Type: 'info',
                        duration: 2000
                    });
                    flag_submit = false;
                    _this.$children[_this.$children.length-1].$refs.table.toggleRowSelection(r[t],false);
                }
            }
            // 是否发请求
            if(flag_submit == true){
                let ensureScheduleTaskUrl = Config.config.ensureSchedule; //外访任务服务接口
                let readyVisitArray = r;   //需排程的外访队列
                
                for(var t in readyVisitArray){
                    delete readyVisitArray[t].status_type;
                    delete readyVisitArray[t].id;
                    let visit_no = [];
                    for(var e in readyVisitArray[t].visitorNo){
                        console.log(readyVisitArray[t].visitorNo[e])
                        visit_no.push({id: readyVisitArray[t].visitorNo[e]});
                    }
                    readyVisitArray[t].visitorNo = visit_no;
                    readyVisitArray[t].visitorDate = setTime.getForDate(readyVisitArray[t].visitorDate);
                }
                console.log(readyVisitArray);  
                resource.action (
                    ensureScheduleTaskUrl, 
                    readyVisitArray
                ).then((res) => {
                    console.log("确定排程返回数据---");
                    console.log(res);
                    if(res != undefined){
                        if(res.body.codeInfo == 0){
                            let msg = res.body.msgInfo
                            alertBox.alertMessage({
                                TextMessage: msg,
                                Type: 'success',
                                duration: 2000
                            });      
                            //清空列表数据
                            this.visitData = []; //外访列表(往地图组件传输的数据)
                            this.visitArray = [];//准备排程外访（往列表组件传输的数据）
                            this.visitTeam = [];//外访人员列表（往列表组件传输的数据）
                            this.date = '';//系统时间（往列表组件传输的数据）
                            this.queryteam();  //成功后刷新数据
                        } else {
                            if(res.body.msgInfo){
                                let msg = res.body.msgInfo +'!';
                                alertBox.alertMessage({
                                    TextMessage: msg,
                                    Type: 'error',
                                    duration: 2000
                                });      
                            }
                        }
                    }
                });
            }
        },
        //取消排程
        cancel (r) {
            console.log('取消排程');
            console.log(r);
            let taskIdList = [];
            let flag_submit = false;
            let _this = this;
            console.log(_this.$children.length);
            for(var j in r){
                if(r[j].status == '04'){
                    flag_submit = true;
                    taskIdList.push({taskId: r[j].taskId});
                } else {
                    alertBox.alertMessage({
                        TextMessage: "未排程的外访不可取消排程",
                        Type: 'info',
                        duration: 2000
                    });
                    flag_submit = false;
                    _this.$children[_this.$children.length-1].$refs.table.toggleRowSelection(r[j],false);
                }
            }
            console.log(taskIdList);

            //是否发请求
            if(flag_submit == true){
                let deleteScheduleUrl = Config.config.deleteSchedule; //外访任务服务接口

                alertBox.alertConfirmBox({
                    DefaultText: '确定取消所选已排程任务, 是否继续?',
                    Type: 'warning'
                }).then(() => {
                    resource.action (
                        deleteScheduleUrl, 
                        taskIdList
                    ).then((res) => {
                        if(res != undefined){
                            if(res.body.codeInfo == 0){
                                console.log(res.body);
                                let msg = res.body.msgInfo +'!';
                                alertBox.alertMessage({
                                    TextMessage: msg,
                                    Type: 'success',
                                    duration: 2000
                                });      
                                //清空列表数据
                                this.visitData = []; //外访列表(往地图组件传输的数据)
                                this.visitArray = [];//准备排程外访（往列表组件传输的数据）
                                this.visitTeam = [];//外访人员列表（往列表组件传输的数据）
                                this.date = '';//系统时间（往列表组件传输的数据）
                                this.queryteam();  //成功后刷新数据
                            } else {
                                if(res.body.msgInfo){
                                    let msg = res.body.msgInfo +'!';
                                    alertBox.alertMessage({
                                        TextMessage: msg,
                                        Type: 'error',
                                        duration: 2000
                                    });      
                                }
                            }
                        }
                    });
                })
            }
        },
        //取消外访
        abolish (r) {
            console.log('取消外访');
            console.log(r);
            let taskIdList = [];// id
            // let taskDate = {};
            alertBox.alertInputBox({
                InputPattern: utils.isLength,
                TextMessage: '最多输入100个字',
                DefaultText: '请输入取消理由(*必填项)',
            }).then(({ value }) => {
                if(value != null && value != ''){
                    console.log(value);
                    for(var j in r){
                        taskIdList.push({taskId: r[j].taskId});
                    }
                    let taskDate = {
                        taskIdList: taskIdList,
                        remark: value
                    }
                    console.log(taskDate);
                    //是否发请求
                    let cancelVisitUrl = Config.config.cancelVisit; //外访任务服务接口

                    alertBox.alertConfirmBox({
                        DefaultText: '确定取消所选外访任务, 是否继续?',
                        Type: 'warning'
                    }).then(() => {
                        resource.action (
                            cancelVisitUrl, 
                            taskDate
                        ).then((res) => {
                            if(res != undefined){
                                if(res.body.codeInfo == 0){
                                    console.log(res.body);
                                    let msg = res.body.msgInfo +'!';
                                    alertBox.alertMessage({
                                        TextMessage: msg,
                                        Type: 'success',
                                        duration: 2000
                                    });                             
                                    //清空列表数据
                                    this.visitData = []; //外访列表(往地图组件传输的数据)
                                    this.visitArray = [];//准备排程外访（往列表组件传输的数据）
                                    this.visitTeam = [];//外访人员列表（往列表组件传输的数据）
                                    this.date = '';//系统时间（往列表组件传输的数据）
                                    this.queryteam();  //成功后刷新数据
                                } else {
                                    if(res.body.msgInfo){
                                        let msg = res.body.msgInfo +'!';
                                        alertBox.alertMessage({
                                            TextMessage: msg,
                                            Type: 'error',
                                            duration: 2000
                                        });                             
                                    }
                                }
                            }
                        });
                    }).catch(() => {
                        alertBox.alertMessage({
                            TextMessage: '撤销操作',
                            Type: 'info',
                            duration: 2000
                        });          
                    });
                } else {
                    alertBox.alertMessage({
                        TextMessage: '取消理由为必须填写项',
                        Type: 'warning',
                        duration: 2000
                    });      
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.VisitMap {
    margin-top: -3rem;  
    height: 100%;
    clear: both;
    overflow: hidden;
}
.search-tab {
    float: left;
    width: 70%;
    margin-bottom: 1rem;
}
.bottom {
    float: right;
    width: 30%;
    margin-bottom: 1rem;
    text-align: right;
}
</style>