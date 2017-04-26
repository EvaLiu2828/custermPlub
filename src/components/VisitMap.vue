<template>
    <div class="VisitMap">
        <div class="bottom">
            <el-button 
                :plain="true" 
                type="info" 
                size="small"
                :readyVisit="visitArray" 
                @click="confirm(getVisitDate)">确定排程</el-button>
            <el-button 
                :plain="true" 
                type="info" 
                size="small"
                @click="cancel(getVisitDate)">取消排程</el-button>
        </div>
        <b-map 
            :visitData="visitData" 
            @readyVisitArray='readyVisitList'></b-map>
        <b-readyVisit 
            ref="bReadyVisit"
            :visitTeam="visitTeam" 
            :readyVisit="visitArray" 
            :systemDate="date" 
            @readyVisitList="getReadyVisitList"></b-readyVisit>
    </div>
</template>
<script>
let myGeo;
let map;
let resource = Config.commitAjax;  //服务方法

//请求文件
import Config from '../config/config.js'
//假数据
import MockFile from '../mock/mock_file'   //外访列表模拟数据
import EnsureSchedule from '../mock/ensureSchedule'   //确定外访模拟数据
import Cancel from '../mock/cancl'   //确定外访模拟数据

import bmap from '../components/Bmap'
import bReadyVisit from '../components/BReadyVisit.vue'

export default {
    name: 'visitmap',
    data () {
        return {
            childWords: '',
            visitData: [],   //外访列表
            visitTeam: [],   //外访人员列表
            index: 0,
            visitArray: [],   //准备排程外访
            date: '', //系统时间
            getVisitDate: []  //要提交的排程任务
        }
    },
    mounted () {
        this.queryUser();
    },
    components: {
        'b-map': bmap,
        'b-readyVisit': bReadyVisit
    },
    methods : {
        //外访列表
        queryUser () {
            console.log('外访地图');
            let getTaskUrl = Config.config.getTask; //外访任务服务接口
            //请求
            resource.action (
                getTaskUrl, 
                // userList
            ).then((res) => {
                console.log(res);
                if(res.body.code == 0){
                    console.log(res.body.msg);
                    this.date = res.body.date;   //系统时间
                    this.visitData = res.body.msg;  //外访列表
                    this.visitTeam = res.body.visitTeam;  //外访人员列表
                } else {
                    console.log(res.body.code)  //msginfo
                }
            }).catch((error) => {
                console.log(error);
            })

        },
        //从map子组件传输回来的数据
        readyVisitList (msg) {
            console.log('父组件接收到的数据----');
            console.log(msg);
            this.visitArray = msg;
        },
        //从列表模版传输回来
        getReadyVisitList (msg){
            console.log('父组件接收到的排程数据----');
            console.log(msg);
            this.getVisitDate = msg;
        },
        //确定排程
        confirm (r) {
            console.log('确定排程');
            // console.log('确定排程列表');
            // console.log(r);
            let _this = this;
            let flag_submit = false;
            r.forEach(function(data,index){
                // console.log(data);
                // console.log(data.visitorNo.length);
                if(data.status == 0){
                    if(data.visitorDate!='' && data.visitorDate!=undefined && data.visitSeq!='' && data.visitSeq!=undefined && data.visitorNo.length > 1){
                        console.log("可以发请求");
                        flag_submit = true;
                    } else {
                        alert("正确选择外访日期、外访顺序、两名以上外访人员");
                        flag_submit = false;
                        _this.$children[3].$refs.table.toggleRowSelection(r[index],false);  //綁定 ref 就可以拿到組件對象
                    }
                } else {
                    alert("已排程的外访不可排程");
                    flag_submit = false;
                    _this.$children[3].$refs.table.toggleRowSelection(r[index],false);
                }
            });
            //是否发请求
            if(flag_submit == true){
                let ensureScheduleTaskUrl = Config.config.ensureSchedule; //外访任务服务接口
                let readyVisitArray = r;   //需排程的外访队列
                console.log(readyVisitArray);     

                resource.action (
                    ensureScheduleTaskUrl, 
                    readyVisitArray
                ).then((res) => {
                    console.log("确定排程返回数据---");
                    console.log(res.body);
                    this.success();
                    //清空列表数据
                    this.visitData = []; //外访列表(往地图组件传输的数据)
                    this.visitArray = [];//准备排程外访（往列表组件传输的数据）
                    this.visitTeam = [];//外访人员列表（往列表组件传输的数据）
                    this.date = '';//系统时间（往列表组件传输的数据）
                    this.queryUser();  //成功后刷新数据
                }).catch((error) => {
                    console.log(error);
                    this.error();
                })
            }
        },
        //取消排程
        cancel (r) {
            console.log('取消排程');
            console.log(r);
            let taskIdList = [];
            let flag_submit = false;
            let _this = this;
            r.forEach(function(data,index){
                if(data.status == 1){
                    flag_submit = true;
                    taskIdList.push(data.taskId);
                } else {
                    alert("未排程的外访不可取消排程");
                    flag_submit = false;
                    _this.$children[3].$refs.table.toggleRowSelection(r[index],false);
                }
            });
            console.log(taskIdList);

            //是否发请求
            if(flag_submit == true){
                let deleteScheduleUrl = Config.config.deleteSchedule; //外访任务服务接口

                resource.action (
                    deleteScheduleUrl, 
                    taskIdList
                ).then((res) => {
                    console.log(res.body);
                    this.success();
                    //清空列表数据
                    this.visitData = []; //外访列表(往地图组件传输的数据)
                    this.visitArray = [];//准备排程外访（往列表组件传输的数据）
                    this.visitTeam = [];//外访人员列表（往列表组件传输的数据）
                    this.date = '';//系统时间（往列表组件传输的数据）
                    this.queryUser();  //成功后刷新数据
                }).catch((error) => {
                    console.log(error);
                    this.error();
                })
            }
        },
        success() {
            this.$message({
            showClose: true,
            message: '恭喜你，这是一条成功消息',
            type: 'success'
            });
        },
        error(){
            this.$message({
                showClose: true,
                message: '错了哦，这是一条错误消息',
                type: 'error'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.VisitMap {
    margin-top: -3rem;  
    height: 100%;
}
.bottom {
    margin-bottom: 1rem;
}
</style>