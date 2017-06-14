<template>
    <div class="interview-tab">
        <el-table :data="datas" border style="width: 100%">
            <el-table-column prop="taskId" label="申请单号" width="">
            </el-table-column>
            <el-table-column prop="customerName" label="客户姓名" width="">
            </el-table-column>
            <el-table-column prop="customerId" label="客户号" width="">
            </el-table-column>
            <el-table-column prop="visitorDate" label="排程时间" width="">
            </el-table-column>
            <el-table-column prop="userName" label=" 排程人">
                <template scope="scope">
                    <span v-for="item in scope.row.userName">{{item}},</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template scope="scope">
                    <el-button 
                        @click="handleClick(scope.$index)" 
                        type="text" 
                        size="small">填写反馈单</el-button>
                </template>
            </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-size="selectedLimit" 
                    layout="total, prev, pager, next" 
                    :total="count">
                </el-pagination>
            </div>
    </div>
</template>
<script>
import feedfack from './Feedback'
export default {
    name: 'interview-tab',
    data (){
        return {
            datas: [],
            interviewArr: [],
            currentPage: 1,         //默认显示当前页数
            count: 0,
            selectedLimit: 6,    //默认显示的条数
        }
    },
    props: {
        interList: {   //父组件传输从地图选出来的排程任务
            type: Array
        }
    },
    watch: {
        interList: function () {
            this.interview();
        }
    },
    methods: {
        interview(){
            console.log('从父组件传来的数据')
            console.log(this.interList);
            this.interviewArr = [];
            this.interviewArr = this.interList;
            if(this.interviewArr.length != null){
                this.count = this.interviewArr.length;
                console.log(this.count)
                this.datas = this.interviewArr.slice(this.selectedLimit*(this.currentPage-1),this.selectedLimit*this.currentPage);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.datas = this.interviewArr.slice(this.selectedLimit*(this.currentPage-1),this.selectedLimit*this.currentPage);
        },
        handleClick(index) {
            this.orbitGPSMsg = {};
            console.log('InterviewTab发送给orbitMap子组件的数据---');
            console.log(this.datas[index]);
            console.log(this.$router);
            this.$router.push({path: 'feedback', query: {taskId: this.datas[index].taskId}});
        }
    },
}
</script>
<style lang="scss" scoped>
.interview-tab {
    margin-top: 1rem;
}
.block {
    float: right;
}
</style>