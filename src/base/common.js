/**
 * Created by v-yuxinliu on 17/4/1.
 */
import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';

export default {
    //格式化日期
    setTime: {
        //补零
        addPreZero (num){
            if(num < 10){
                return '0' + num;
            } else {
                return num;
            }
        },
        //日期转换
        getForDate (time){
            let year = new Date(time).getFullYear(); // 年
            let month = this.addPreZero(new Date(time).getMonth()+1); // 月
            let date = this.addPreZero(new Date(time).getDate()); // 日
            let hour = this.addPreZero(new Date(time).getHours());  //时
            let minutes = this.addPreZero(new Date(time).getMinutes());  //分
            let seconds = this.addPreZero(new Date(time).getSeconds());  //分

            time= year + '-' + month + '-' + date;
            return time;
        },
        //日期转换
        getForTime (time){
            let year = new Date(time).getFullYear(); // 年
            let month = this.addPreZero(new Date(time).getMonth()+1); // 月
            let date = this.addPreZero(new Date(time).getDate()); // 日
            let hour = this.addPreZero(new Date(time).getHours());  //时
            let minutes = this.addPreZero(new Date(time).getMinutes());  //分
            let seconds = this.addPreZero(new Date(time).getSeconds());  //分

            time= year + '-' + month + '-' + date + ' '+ hour + ':' + minutes + ':' + seconds;
            return time;
        },
    },
    //提示面板
    messageBox: {
        //输入弹框
        alertInputBox ({
            InputPattern: inputPattern,
            TextMessage: msg,
            DefaultText: text,
        }){
            return MessageBox.prompt(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: inputPattern,
                inputErrorMessage: msg
            }).catch(() => {
                this.alertMessage({
                    TextMessage: '撤销输入',
                    Type: 'info'
                });       
            });
        },
        //确认消息弹框
        alertConfirmBox({
            DefaultText: text,
            Type: type
        }){
            return MessageBox.confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type
            })
        },
        //消息提示框
        alertMessage ({
            TextMessage: msg,
            Type: type,
            duration: minutes
        }){
            return Message({
                showClose: true,
                message: msg,
                type: type,
                duration: minutes
            });
        }
    },
    //输入框验证
    inputReg: {
        phone ({
            inputData: data,
            inputName: name,
        }){
            // return function(data){
            //     console.log(data)
            //     if(data){
            //         if(utils.isChinese.test(data) || utils.isEnglish.test(data)){ //判断是否是数字
            //             // this[str2] = '只能输入数字';
            //             // this.feedbackData[str] = '';
            //         } else {
            //             if(utils.isMobile.test(data) || utils.isPhone1.test(data) || utils.isPhone2.test(val)){//判断是否是正确的手机号
            //                 // this.feedbackData[str] = val.toString();
            //                 // this[str2] = '';
            //             } else {
            //                 // this[str2] = '请输入正确的电话号码';
            //                 // this.feedbackData[str] = '';
            //             }
            //         }
            //     } else {
            //         // this[str2] = '';
            //     }
            // }
        }
    },
    //数据验证
    utils: {
        //邮箱
        isMail : /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //手机号   
        isMobile: /^(0|86|17951)?(13[0-9]|17[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/,
        //手机号
        isPhone1: /^0\d{2,3}-?\d{7,8}$/,
        //手机号
        isPhone2: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
        //输入框长度
        isLength: /^.{0,100}$/,
        //校验数字
        isNumber: /[^\d]/,
        //校验汉字
        isChinese: /^[\u2E80-\u9FFF]+$/,
        //校验汉字
        isEnglish: /^[A-Za-z]+$/,
    }
}