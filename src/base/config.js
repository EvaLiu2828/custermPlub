/**
 * Created by v-yuxinliu on 17/4/1.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import { Message } from 'element-ui'
Vue.use(VueResource);

import Common from './common.js'  //公用方法
let alertBox = Common.messageBox;  //消息提示方法
let _this = this;


//请求服务ip
let serveUrl = 'http://10.143.32.61:8080';//dev用
// let serveUrl = '';//build用
let https_url_userGroup = serveUrl + '/scheduleController'; //排程
let https_url_visitManager = serveUrl + '/visitManagerController'; //人员管理
//接口
let GetQueue = '/getQueue';   //外访队列
let GetTask = '/getTask';   //外访任务
let EnsureSchedule = '/ensureSchedule';  //确认排程
let DeleteSchedule = '/deleteSchedule';  //取消排程
let CancelVisit = '/cancelVisit';  //取消外访
let SelectVisit = '/selectVisit';  //签到查询
let SelectTrack = '/selectTrack';  //轨迹查询
let GueryVisit = '/queryVisitList';   //外访查询
let AddFeedbackForm = '/addFeedbackForm';   //填写反馈单

/*
 * 线上： http://collectionpc.creditease.corp
 * 测试： http://10.143.32.61:8080
 * 玉刚： http://10.100.62.21:8080/collectionPc
 * 婷婷： http://10.100.60.58:8080/collectionPc
 * 曹哥： http://10.100.60.145:8080/collectionPc
 * 俊杰： http://10.100.60.219:8080
 **/

export default {
  //接口
  config: {
    getQueue: https_url_userGroup + GetQueue,    //查询外访队列
    getTask: https_url_userGroup + GetTask,    //查询外访任务
    ensureSchedule: https_url_userGroup + EnsureSchedule,    //确认排程
    deleteSchedule: https_url_userGroup + DeleteSchedule,    //取消排程
    cancelVisit: https_url_userGroup + CancelVisit,    //取消外访
    selectVisit: https_url_visitManager + SelectVisit,    //签到查询
    selectTrack: https_url_visitManager + SelectTrack,    //签到查询
    getQueueV: https_url_visitManager + GetQueue,    //查询外访队列(填写反馈单)
    gueryVisit: https_url_visitManager + GueryVisit,    //外访查询
    addFeedbackForm: https_url_visitManager + AddFeedbackForm,    //填写反馈单
  },
  //请求方法
  commitAjax : {
    action (url, data) {
      return Vue.http.post(
        url,
        data,
        // { emulateJSON: true }
      ).catch((error) => {
          console.log(error);
          alertBox.alertMessage({
              TextMessage: '网络错误',
              Type: 'error',
              duration: 2000
          });       
      })
    }
  }
}
