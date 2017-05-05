import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

//请求服务ip
let https_url_userGroup = 'http://10.100.60.58:8080/collectionPc/scheduleController';
//接口
let GetTask = '/getTask';   //外访任务
let EnsureSchedule = '/ensureSchedule'  //确认排程
let DeleteSchedule = '/deleteSchedule'  //取消排程
let SearchSign = '/searchSign'  //签到查询
let SearchOrbit = '/searchOrbit'  //轨迹查询

/*
 * 玉刚： http://10.100.62.21:8080/collectionP/scheduleController
 * 婷婷： http://10.100.60.58:8080/collectionP/scheduleController
 **/

export default {
  //接口
  config: {
    getTask: https_url_userGroup + GetTask,    //查询外访任务
    ensureSchedule: https_url_userGroup + EnsureSchedule,    //确认排程
    deleteSchedule: https_url_userGroup + DeleteSchedule,    //取消排程
    searchSign: https_url_userGroup + SearchSign,    //签到查询
    searchOrbit: https_url_userGroup + SearchOrbit,    //签到查询
  },
  //请求方法
  commitAjax : {
    action (url, data) {
      return Vue.http.post(
        url,
        data,
        // { emulateJSON: true }
      )
    }
  }
}
