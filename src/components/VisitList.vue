<template>
<div class="VisitList">
    <div class="bottom">
        <el-button 
            :plain="true" 
            type="info" 
            size="small" 
            @click="confirm">确定排程</el-button>
        <el-button :plain="true" type="info" size="small">取消排程</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%; height: 85%"
        height="85%"
        stripe
        :default-sort="{prop: ['newVisitTeam','date','time'], order: 'descending'}"
        @selection-change="handleSelectionChange">
            <el-table-column
                fixed
                type="selection"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="status_type"
                label="状态"
                width="80"
                align="center">
            </el-table-column>
            <el-table-column
                prop="newVisitTeam"
                label="外访人员"
                sortable
                width="250">
                <template scope="scope">
                    <el-select 
                        placeholder="请选择"
                        multiple
                        @change="selectChange(scope)"
                        v-model= "scope.row.newVisitTeam"
                        size="small"
                        >
                        <el-option 
                        v-for="item in visitTeam" 
                        :value="item.visitId" 
                        :label="item.visitName" 
                        :key="item.visitName"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"           
                label="外访日期"
                sortable
                width="186">
                <template scope="scope">
                    <el-date-picker 
                    v-model="scope.row.visitDate" 
                    type="date"
                    placeholder="选择日期" 
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions1"
                    size="small">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                prop="time" 
                label="约定时间"
                sortable
                width="186">
                <template scope="scope">
                <el-time-select
                    v-model="scope.row.time"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                    }"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择时间"
                    size="small">
                </el-time-select>
                </template>
            </el-table-column>
            <el-table-column
                label="外访顺序"
                width="100"
                align="center">
                    <template scope="scope">
                        <el-input
                            v-model="scope.row.order"
                            size="small"
                            align="center">
                        </el-input>
                    </template>
            </el-table-column>
    </el-table>
</div>
</template>
<script>
//请求文件
import Config from '../config/config.js'
export default {
    name: 'visitlist',
    data() {
        return {
            order: '', //外访顺序
            date: '', //系统时间
            name: '', //客户姓名
            status_type: '', //排程状态
            tableData3: [],  //外访列表
            tableData: [],   //外访列表
            visitTeam: [],   //外访人员列表
            multipleSelection: [],  //排程列表
            newVisitDate: [],
            pickerOptions1: {
                disabledDate:(time) => {
                    let tt = this.date;
                    return time.getTime() < tt;
                }
            }
        }
    },
    created () {
        this.$nextTick(function () {
            this.queryUser();
        });
    },
    methods: {
      queryUser () {
        console.log('查询外访任务');
        let url = Config.config.queryUser; //服务接口
        let resource = Config.commitAjax;  //服务方法

        let userList = {  //请求参数
          empNo: 'aaa',
          user_name: 'bbb'
        }

        resource.action (
          url, 
          userList
        ).then(
          (data) => {
            console.log(data.body);
            this.tableData3 = data.body.msg;
            this.visitTeam = data.body.visitTeam;
            this.date = data.body.date;
            for(let i=0; i<this.tableData3.length; i++){
                this.tableData3[i].newVisitTeam = [];
                this.tableData3[i].time = '';
                // this.tableData3[i].date = '';
                this.tableData3[i].order = '';
                let Status = this.tableData3[i].status;
                switch (Status){
                    case 0:
                        this.tableData3[i].status_type = '未排程';
                        break;
                }
            }
            this.tableData = this.tableData3;  
            console.log(this.tableData);         
          }).catch((error) => {
            console.log(error);
          })
      },
      selectChange (scope) {
        console.log(scope);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      //时间转换
      pickerTime (time) {
        let year = time.getFullYear();  
        let month =(time.getMonth() + 1).toString();  
        let day = (time.getDate()).toString();  
        let hour = (time.getHours()).toString();  
        let minute = (time.getMinutes()).toString();  
        let second = (time.getSeconds()).toString();  
        if (month.length == 1) {  
            month = "0" + month;  
        }  
        if (day.length == 1) {  
            day = "0" + day;  
        }  
        if (hour.length == 1) {  
            hour = "0" + hour;  
        }  
        if (minute.length == 1) {  
            minute = "0" + minute;  
        }  
        if (second.length == 1) {  
            second = "0" + second;  
        }  
        var dateTime = year + "-" + month + "-" + day;  
        return dateTime;  
      },
      //确定排程
      confirm () {
          console.log('确定排程');
      }

    }

}
</script>
<style lang="scss" scoped>
.VisitList {
    height: 100%;
    margin-top: -3rem;
}
.bottom {
    margin-bottom: 1rem;
}
.el-date-editor.el-input {
    width: 150px;
}
</style>