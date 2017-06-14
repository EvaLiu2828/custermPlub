<template>
    <div class="bReadyVisit" :style="visitTabStyle">
        <el-table
            :data="visitArray"
            ref="table"
            border
            style="width: 100%; height: 90%"
            height="90%"
            stripe
            :default-sort = "{prop: ['visitorDate','appointDate'], order: 'descending'}"
            @selection-change="handleSelectionChange($event)">
                <el-table-column
                    fixed
                    type="selection"
                    width="50"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    label="姓名"
                    width="120"
                    align="center"
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
                    prop="visitorNo"
                    label="外访人员"
                    width="250"
                    align="center">
                    <template scope="scope">
                        <el-select 
                            placeholder="请选择"
                            multiple
                            @change="selectChange(scope)"
                            v-model= "scope.row.userName"
                            size="small">
                            <el-option 
                            v-for="item in team" 
                            :value="item.id" 
                            :label="item.userName" 
                            :key="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="visitorDate"           
                    label="外访日期"
                    sortable
                    width="160"
                    align="center">
                    <template scope="scope">
                        <el-date-picker 
                        v-model="scope.row.visitorDate" 
                        type="date"
                        placeholder="选择日期" 
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions1"
                        size="small"
                        :style="dateStyle">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="appointDate" 
                    label="约定时间"
                    sortable
                    width="160"
                    align="center">
                    <template scope="scope">
                    <el-time-select
                        v-model="scope.row.appointDate"
                        :picker-options="{
                            start: '00:00',
                            step: '00:15',
                            end: '24:00'
                        }"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="选择时间"
                        size="small"
                        :style="dateStyle">
                    </el-time-select>
                    </template>
                </el-table-column>
                <el-table-column
                    label="外访顺序"
                    width="100"
                    align="center">
                        <template scope="scope">
                            <el-input
                                v-model="scope.row.visitSeq"
                                size="small"
                                align="center">
                            </el-input>
                        </template>
                </el-table-column>
        </el-table>
    </div>
</template>
<script>

export default {
    name: 'bReadyVisit',
    data(){
        return {
            visitTabStyle: {
                height: '35%'
            },
            visitArray: [],
            team: [],  //外访人员列表
            visitorNo: [],  //选出来的人员队列
            pickerOptions1: {  //可选日期
                disabledDate:(time) => {
                    return time.getTime() < new Date(this.date).getTime() - 3600 * 1000 * 24 || time.getTime() > new Date(this.date).getTime()+3600 * 1000 * 24 * 3;
                }
            },
            dateStyle: {
                width: '120px'
            },
            date: '',   //系统时间
            visitorDate: '',    //选择的外访日期
            appointDate: '',    //选择的外访时间
            visitSeq: '',        //外访顺序
            multipleSelection: [],  //排程列表
            getReadyVisit: [],
            userName: []
        }
    },
    props: {
        readyVisit: {   //父组件传输从地图选出来的排程任务
            type: Array
        },
        visitTeam: {  // 外访人员列表
            type: Array
        },
        systemDate: ''    //系统时间
    },
    watch: {
        readyVisit: function () {
            this.visit();
        }
    },
    methods: {
        visit() {
            this.visitArray = [];  //清空列表数据
            this.date = this.systemDate;
            this.visitArray = this.readyVisit;
            this.team = this.visitTeam;
            console.log("列表模版接收到的排程任务")
            console.log(this.visitArray);
        },
        selectChange (scope) {
            console.log(scope);
            scope.row.visitorNo = scope.row.userName;
        },
        //多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.getReadyVisitList(this.multipleSelection);
        },
        deleteRow(index, rows) {
            console.log(rows);
            rows.splice(index, 1);
            this.getReadyVisitList(this.multipleSelection);
        },
        getReadyVisitList (r){
            console.log('子组件传递的数据----');
            console.log(r);
            this.getReadyVisit = [];
            this.getReadyVisit = r;
            this.$emit('readyVisitArr',this.getReadyVisit);  //向父组件推送数据
        }
    }
}
</script>