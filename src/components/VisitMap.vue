<template>
    <div class="VisitMap">
        <el-row>
            <el-col :span="16">
                <b-searchTab
                :queryList="queryList"
                @queryuser="queryUser"></b-searchTab>
            </el-col>
            <el-col :span="8" class="bottom">
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
            </el-col>
        </el-row>
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
import Config from '../config/config.js'
let resource = Config.commitAjax;  //服务方法
import query from '../mock/query.js'

import bmap from '../components/Bmap'
import bReadyVisit from '../components/BReadyVisit.vue'
import bSearchTab from '../components/BSearchTab.vue'

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
            //请求
            resource.action (
                getQueryUrl
            ).then((res) => {
                console.log(res);
                if(res.body.codeInfo == 0){
                    this.queryList = res.body.queue;
                } else {
                   if(res.body.msgInfo){
                      let msg = res.body.msgInfo
                      this.error(msg);
                   }
                }
            }).catch((error) => {
                console.log(error);
                this.error("网络错误！");
            })
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
            console.log(r)
            for(var t in r){
                if(r[t].status == '03'){
                    if(r[t].visitorDate!='' && r[t].visitorDate!=undefined && r[t].visitSeq!='' && r[t].visitSeq!=undefined && r[t].visitorNo.length > 1){
                        console.log("可以发请求");
                        flag_submit = true;
                    } else {
                        alert("正确选择外访日期、外访顺序、两名以上外访人员");
                        flag_submit = false;
                        _this.$children[3].$refs.table.toggleRowSelection(r[t],false);  //綁定 ref 就可以拿到組件對象
                    }
                } else {
                    alert("已排程的外访不可排程");
                    flag_submit = false;
                    _this.$children[3].$refs.table.toggleRowSelection(r[t],false);
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
                    readyVisitArray[t].visitorDate = this.getForTime(readyVisitArray[t].visitorDate);
                }
                console.log(readyVisitArray);  
                resource.action (
                    ensureScheduleTaskUrl, 
                    readyVisitArray
                ).then((res) => {
                    console.log("确定排程返回数据---");
                    console.log(res.body);
                    if(res.body.codeInfo == 0){
                        let msg = res.body.msgInfo
                        this.success(msg);
                        //清空列表数据
                        this.visitData = []; //外访列表(往地图组件传输的数据)
                        this.visitArray = [];//准备排程外访（往列表组件传输的数据）
                        this.visitTeam = [];//外访人员列表（往列表组件传输的数据）
                        this.date = '';//系统时间（往列表组件传输的数据）
                        this.queryteam();  //成功后刷新数据
                    } else {
                        if(res.body.msgInfo){
                            let msg = res.body.msgInfo +'!';
                            this.error(msg);
                        }
                    }
                }).catch((error) => {
                    this.error("网络错误!");
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
            for(var j in r){
                if(r[j].status == '04'){
                    flag_submit = true;
                    taskIdList.push({taskId: r[j].taskId});
                } else {
                    alert("未排程的外访不可取消排程");
                    flag_submit = false;
                    _this.$children[3].$refs.table.toggleRowSelection(r[j],false);
                }
            }
            console.log(taskIdList);

            //是否发请求
            if(flag_submit == true){
                let deleteScheduleUrl = Config.config.deleteSchedule; //外访任务服务接口

                this.$confirm('是否确定取消所选排程?', '是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    resource.action (
                        deleteScheduleUrl, 
                        taskIdList
                    ).then((res) => {
                        if(res.body.codeInfo == 0){
                            console.log(res.body);
                            let msg = res.body.msgInfo +'!';
                            this.$message({
                                type: 'success',
                                message: msg
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
                                this.error(msg);
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.error("网络错误!");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
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

            time= year + '-' + month + '-' + date;
            return time;
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
    text-align: right;
}
</style>