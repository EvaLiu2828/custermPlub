<template>
    <div class="orbitmsgtab">
        <el-table
            :data="datas"
            border
            style="width: 100%">
            <el-table-column
            prop="userName"
            label="客户姓名"
            >
            </el-table-column>
            <el-table-column
            prop="userID"
            label="客户id"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="110"
                align="center">
                <template scope="scope">
                    <el-button 
                        @click="handleClick(scope.$index)" 
                        type="text" 
                        size="small">查看运动轨迹</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-size="selectedLimit" l
                ayout="total, prev, pager, next" 
                :total="count">
            </el-pagination>
        </div>
        <div class="orbit-map">
            <b-orbitMap :gpsList="orbitGPSMsg"></b-orbitMap>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orbitmsgtab',
    data (){
        return {
            orbitListArr: [],
            currentPage: 1,         //默认显示当前页数
            count: 0,
            datas: [],
            selectedLimit: 2,    //默认显示的条数
            orbitGPSMsg: {}
        }
    },
    components: {
        'b-orbitMap': () => import('./OrbitMap.vue')
    },
    props: {
        orbitList: {
            type: Array
        }
    },
    watch : {
        orbitList: function(){
            this.track();
        }
    },
    methods: {
        track (){
            //从父组件接受回来的数据
            console.log(this.orbitList);
            this.orbitListArr = [];
            this.orbitListArr = this.orbitList;
            this.currentPage = 1;  //初始化显示页
            if(this.orbitListArr.length != null) {
                this.count = this.orbitListArr.length;
                console.log(this.count);
                this.datas = this.orbitListArr.slice(this.selectedLimit*(this.currentPage-1),this.selectedLimit*this.currentPage);
            }
            this.orbitGPSMsg = {};
            this.orbitGPSMsg = this.datas[0];
        },
        handleClick(index) {
            this.orbitGPSMsg = {};
            console.log('orbitMsgTab发送给orbitMap子组件的数据---');
            console.log(this.datas[index]);
            this.orbitGPSMsg = this.datas[index];
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.datas = this.orbitListArr.slice(this.selectedLimit*(this.currentPage-1),this.selectedLimit*this.currentPage);
        }
    }
}
</script>
<style lang="scss" scoped>
.orbitmsgtab {
    margin-top: 1rem;
    height: 90%;
}
.block {
    width: 100%;
    text-align: right;
}
.orbit-map {
    margin-top: 1rem;
    height: 75%;
}
</style>
