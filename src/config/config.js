import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

//请求服务ip
let serveUrl = 'http://10.143.32.61:8080/collectionPc';
let https_url_userGroup = serveUrl + '/scheduleController'; //排程
let https_url_visitManager = serveUrl + '/visitManagerController'; //人员管理
//接口
let GetQueue = '/getQueue';   //外访队列
let GetTask = '/getTask';   //外访任务
let EnsureSchedule = '/ensureSchedule'  //确认排程
let DeleteSchedule = '/deleteSchedule'  //取消排程
let SelectVisit = '/selectVisit'  //签到查询
let SelectTrack = '/selectTrack'  //轨迹查询

/*
 * 测试： http://10.143.32.61:8080/collectionPc
 * 玉刚： http://10.100.62.21:8080/collectionPc
 * 婷婷： http://10.100.60.58:8080/collectionPc
 * 曹哥： http://10.100.60.145:8080/collectionPc
 **/

export default {
  //接口
  config: {
    getQueue: https_url_userGroup + GetQueue,    //查询外访队列
    getTask: https_url_userGroup + GetTask,    //查询外访任务
    ensureSchedule: https_url_userGroup + EnsureSchedule,    //确认排程
    deleteSchedule: https_url_userGroup + DeleteSchedule,    //取消排程
    selectVisit: https_url_visitManager + SelectVisit,    //签到查询
    selectTrack: https_url_visitManager + SelectTrack,    //签到查询
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
