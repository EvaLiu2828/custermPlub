<template>
    <div class="signMsgTab">
        <el-table :data="datas" border style="width: 100%">
            <el-table-column prop="signTime" label="日期" width="170">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="userID" label="外访人员ID" width="120">
            </el-table-column>
            <el-table-column prop="customerName" label="客户姓名" width="120">
            </el-table-column>
            <el-table-column prop="customerAddress" label="客户地址">
            </el-table-column>
            <el-table-column prop="signAddress" label="签到地址">
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="selectedLimit" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
//请求文件
import Config from '../config/config.js'
let resource = Config.commitAjax;  //服务方法

export default {
    name: 'signMsgTab',
    data() {
        return {
            signListArr: [],
            currentPage: 1,         //默认显示当前页数
            count: 0,
            datas: [],
            selectedLimit: 6,    //默认显示的条数
        }
    },
    props: {
        signList: {   //父组件传输从地图选出来的排程任务
            type: Array,
        }
    },
    watch: {
        signList: function () {
            this.track();
        }
    },
    methods: {
        track () {
            this.signListArr = [];
            this.signListArr = this.signList;
            console.log(this.signList);
            if(this.signListArr.length != null) {
                this.count = this.signListArr.length;
                console.log(this.count);
                this.datas = this.signListArr.slice(this.selectedLimit*(this.currentPage-1),this.selectedLimit*this.currentPage);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.datas = this.signListArr.slice(this.selectedLimit*(this.currentPage-1),this.selectedLimit*this.currentPage);

        }
    }
}
</script>
<style lang="scss" scoped>
.signMsgTab {
    margin-top: 1rem;
}
.block {
    float: right;
}
</style>
