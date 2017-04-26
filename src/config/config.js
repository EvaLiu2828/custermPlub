import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

//请求服务ip
let https_url_userGroup = 'http://10.100.60.58:8080/collectionPc-web/scheduleController';
//接口
let GetTask = '/getTask';   //外访任务
let EnsureSchedule = '/ensureSchedule'  //确认排程
let DeleteSchedule = '/deleteSchedule'  //取消排程

/*
 * 玉刚： http://10.100.60.58:8080/collectionPc-web/scheduleController
 **/
export default {
  //接口
  config: {
    getTask: https_url_userGroup + GetTask,    //查询外访任务
    ensureSchedule: https_url_userGroup + EnsureSchedule,    //确认排程
    deleteSchedule: https_url_userGroup + DeleteSchedule,    //确认排程
  },
  //请求方法
  commitAjax : {
    action (url, data) {
      return Vue.http.post(
        url,
        {
          emulateJSON: true
        },
        data
      )
    }
  }
}
