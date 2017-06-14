<template>
    <div class="interview">
        <h2>外访查询</h2>
        <b-searchInterview @interviewData="getInterview"></b-searchInterview>
        <b-interviewTab :interList="interList"></b-interviewTab>
    </div>
</template>
<script>
import SearchInterview from './viewAdminis/SearchInterview'
import InterviewTab from './viewAdminis/InterviewTab'
export default {
    name: 'interview',
    data () {
        return {
            interList: []
        }
    },
    components: {
        'b-searchInterview': SearchInterview,
        'b-interviewTab': InterviewTab
    },
    methods: {
        //从搜索组件传回的数据
        getInterview (msg){
            console.log('外访查询任务');
            console.log(msg);
            this.interList = msg;
        }
    }
}
</script>
<style lang="scss" scoped>
.interview {
    height: 100%;
}
</style>