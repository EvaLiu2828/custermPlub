<template>
    <div class="feedback-tab">
        <el-form 
            ref="feedbackData" 
            :model="feedbackData" 
            :rules="rules"
            :label-position="labelPosition"
            label-width="180px">
                <el-form-item 
                    label="申请单号"
                    prop="outVisitApplyID">
                    <el-input 
                        class="input200"
                        size="small" 
                        :disabled="true"
                        placeholder="申请单号"
                        v-model="feedbackData.outVisitApplyID"></el-input>
                </el-form-item>
                <el-form-item 
                    label="外访人员1"
                    prop="outMan1">
                    <el-input 
                        class="input200" 
                        size="small"
                        placeholder="外访人员姓名"
                        v-model="feedbackData.outMan1"></el-input>
                </el-form-item>
                <el-form-item 
                    label="外访人员2"
                    prop="outMan2">
                    <el-input 
                        class="input200" 
                        size="small"
                        placeholder="外访人员姓名"
                        v-model="feedbackData.outMan2"></el-input>
                </el-form-item>
                <el-form-item 
                    label="外访人员3"
                    prop="outMan3">
                    <el-input 
                        class="input200" 
                        size="small"
                        placeholder="外访人员姓名"
                        v-model="feedbackData.outMan3"></el-input>
                </el-form-item>
                <el-form-item 
                    label="地址类型反馈" 
                    prop="addrCategory">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.addrCategory" 
                        placeholder="请选择">
                        <el-option 
                            v-for="item in localDate.feedbackAddType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="单位情况">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.companyConId" 
                        placeholder="请选择"
                        @change="comSelectChange(feedbackData.companyConId)">
                        <el-option 
                            v-for="item in localDate.unitCase"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                    <el-input 
                        class="input400" 
                        v-show="comConOthershow"
                        v-model="feedbackData.companyConOther" 
                        placeholder="请输入内容(最多50个字)" 
                        size="small"
                        :maxlength="50"
                        ></el-input>
                </el-form-item>
                <el-form-item 
                    label="现地址情况">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.nowAddrConId" 
                        placeholder="请选择"
                        @change="nowAddrSelectChange(feedbackData.nowAddrConId)">
                        <el-option 
                            v-for="item in localDate.nowAddCase"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                    <el-input 
                        class="input400" 
                        v-show="nowAddrConOtherShow"
                        v-model="feedbackData.nowAddrConOther" 
                        placeholder="请输入内容(最多50个字)" 
                        size="small"
                        :maxlength="50"
                        ></el-input>
                </el-form-item>
                <el-form-item 
                    label="户籍情况">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.residenceConId" 
                        placeholder="请选择"
                        @change="residenceSelectChange(feedbackData.residenceConId)">
                        <el-option 
                            v-for="item in localDate.residenceCase"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                    <el-input 
                        class="input400" 
                        v-show="residenceConOtherShow"
                        v-model="feedbackData.residenceConOther" 
                        placeholder="请输入内容(最多50个字)" 
                        size="small"
                        :maxlength="50"
                        ></el-input>
                </el-form-item>
                <el-form-item 
                    label="谈判情况">
                    <el-radio-group 
                        size="small"
                        v-model="feedbackData.isOneself"
                        @change="isOneselfChange">
                        <el-radio-button label="1">本人</el-radio-button>
                        <el-radio-button label="2">他人</el-radio-button>
                    </el-radio-group>   
                    <el-radio-group 
                        size="small"
                        v-model="feedbackData.isInten"  
                        style="margin: 0 20px;">
                        <el-radio-button label="1">有意愿</el-radio-button>
                        <el-radio-button label="2">无意愿</el-radio-button>
                    </el-radio-group>                   
                    <el-radio-group
                        size="small"
                        v-model="feedbackData.isAbility">
                        <el-radio-button label="1">有能力</el-radio-button>
                        <el-radio-button label="2">无能力</el-radio-button>
                    </el-radio-group> 
                </el-form-item>
                <el-form-item>
                    <el-input 
                        class="input600" 
                        type="textarea" 
                        placeholder="请输入内容(最多100个字)"
                        :maxlength="100"
                        v-model="feedbackData.negOther"></el-input>                                                      
                </el-form-item>
                <el-form-item 
                    label="外访结果" 
                    prop="outResultId">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.outResultId" 
                        placeholder="请选择">
                        <el-option 
                            v-for="item in localDate.outResultIdType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="还款情况">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.paybackCon" 
                        placeholder="请选择还款情况"
                        @change="paySelectChange(feedbackData.paybackCon)">
                        <el-option 
                            v-for="item in localDate.paybackConType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                    <el-select 
                        class="input200" 
                        size="small"
                        v-show="outPromiseShow"
                        v-model="feedbackData.outPromise" 
                        placeholder="请选择承诺还款"
                        @change="outPromiseSelectChange(feedbackData.outPromise)">
                        <el-option 
                            v-for="item in localDate.outPromiseConType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                    <el-select 
                        class="input200" 
                        size="small"
                        v-show="outRejectPayShow"
                        v-model="feedbackData.outRejectPay" 
                        placeholder="请选择拒绝还款"
                        @change="outRejectPaySelectChange(feedbackData.outRejectPay)">
                        <el-option 
                            v-for="item in localDate.outRejectConType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                    <el-select 
                        class="input200" 
                        size="small"
                        v-show="outPayScaleShow"
                        v-model="feedbackData.outPayScale" 
                        placeholder="请选择还款方式"
                        @change="payoutScaleSelectChange(feedbackData.outPayScale)">
                        <el-option 
                            v-for="item in localDate.outPayScaleType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-show="paybackAmountShow"
                    prop="paybackAmount">
                    <el-input 
                        class="input200" 
                        v-model.number="feedbackData.paybackAmount" 
                        placeholder="请输入还款金额" 
                        size="small"
                        @blur="payInput(feedbackData.paybackAmount, paybackAmount, paybackamountErrorValue)"></el-input>
                        <div class="el-form-item__error" >{{paybackAmountErrorValue}}</div>
                    <el-date-picker
                        size="small"
                        class="input200"
                        v-show="paybackAmountShow"
                        v-model="feedbackData.paybackDate"
                        type="date"
                        placeholder="请选择还款时间"
                        :picker-options="pickerOptions"
                        @change="handleTimeClick(feedbackData.paybackDate)">
                    </el-date-picker>                    
                </el-form-item>
                <el-form-item v-show="outPromisePayOtherShow">
                    <el-input 
                        class="input600" 
                        type="textarea" 
                        v-model="feedbackData.outPromisePayOther" 
                        placeholder="请输入内容(最多50个字)" 
                        size="small"
                        :maxlength="50"
                        ></el-input>                    
                </el-form-item>
                <el-form-item v-show="outRejectPayOtherShow">
                    <el-input 
                        style="width: 605px"
                        type="textarea" 
                        v-model="feedbackData.outRejectPayOther" 
                        placeholder="请输入内容(最多50个字)" 
                        size="small"
                        :maxlength="50"
                        ></el-input>                    
                </el-form-item>
                <el-form-item 
                    label="经济能力">
                    <el-select 
                        class="input200" 
                        size="small"
                        v-model="feedbackData.outEconomy" 
                        placeholder="请选择"
                        @change="outEconomySelectChange(feedbackData.outEconomy)">
                        <el-option 
                            v-for="item in localDate.outEconomyType"
                            :key="item.typeNm"
                            :label="item.type" 
                            :value="item.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-show="salaryShow">
                    <el-input 
                        class="input200" 
                        v-model.number="feedbackData.salary" 
                        placeholder="请输入填写月收入金额"
                        type="text"
                        size="small"
                        @blur="payInput(feedbackData.salary,salary, salaryerrorValue)"></el-input><span class="">元</span>
                    <div class="el-form-item__error" >{{salaryErrorValue}}</div>
                </el-form-item>
                <el-form-item
                    v-show="retireAmountShow">
                    <el-input 
                        class="input200" 
                        v-model.number="feedbackData.retireAmount" 
                        placeholder="请输入填写退休金金额"
                        type="text"
                        size="small"
                        @blur="payInput(feedbackData.retireAmount, retireAmount, retireamountErrorValue)"></el-input><span class="">元</span>
                    <div class="el-form-item__error" >{{retireAmountErrorValue}}</div>
                </el-form-item>
                <el-form-item v-show="outEconomyOtherShow">
                    <el-input 
                        class="input600" 
                        type="textarea" 
                        v-model="feedbackData.outEconomyOther" 
                        placeholder="请输入内容(最多50个字)" 
                        size="small"
                        :maxlength="50"
                        ></el-input>                    
                </el-form-item>
                <el-form-item 
                    label="新手机">
                    <el-input 
                        class="input200" 
                        v-model="feedbackData.newPhone" 
                        placeholder="请输入11位数字" 
                        size="small"
                        :maxlength="12"
                        @blur="newPhoneInput(feedbackData.newPhone,newPhone,newphoneErrorValue)"></el-input>
                    <div class="el-form-item__error" >{{newPhoneErrorValue}}</div>
                </el-form-item>
                <el-form-item 
                    label="新地址手机">
                    <el-input 
                        class="input200" 
                        v-model="feedbackData.newAddrPhone" 
                        placeholder="请输入11位数字" 
                        size="small"
                        :maxlength="12"
                        @blur="newPhoneInput(feedbackData.newAddrPhone,newAddrPhone,newaddrErrorValue)"></el-input>
                    <div class="el-form-item__error" >{{newAddrErrorValue}}</div>
                </el-form-item>
                <el-form-item 
                    label="新单位手机">
                    <el-input 
                        class="input200" 
                        v-model="feedbackData.newCompanyPhone" 
                        placeholder="请输入11位数字" 
                        size="small"
                        :maxlength="12"
                        @blur="newPhoneInput(feedbackData.newCompanyPhone,newCompanyPhone,newcompanyErrorValue)"></el-input>
                    <div class="el-form-item__error" >{{newCompanyErrorValue}}</div>
                </el-form-item>
                <el-form-item 
                    label="其他电话">
                    <el-input 
                        class="input200" 
                        v-model="feedbackData.otherPhone" 
                        placeholder="请输入11位数字" 
                        size="small"
                        :maxlength="12"
                        @blur="newPhoneInput(feedbackData.otherPhone,otherPhone,otherphoneErrorValue)"></el-input>
                    <div class="el-form-item__error" >{{otherPhoneErrorValue}}</div>
                </el-form-item>
                <el-form-item 
                    label="新家庭地址">
                    <el-input 
                        class="input600" 
                        v-model.number="feedbackData.newHomeAddr" 
                        placeholder="请输入具体地址。格式:(省级－市级－具体地址)" 
                        size="small"></el-input>
                </el-form-item>
                <el-form-item 
                    label="新单位地址">
                    <el-input 
                        class="input600" 
                        v-model.number="feedbackData.newCompanyAddr" 
                        placeholder="请输入具体地址。格式:(省级－市级－具体地址)" 
                        size="small"></el-input>
                </el-form-item>
                <el-form-item 
                    label="其他新地址">
                    <el-input 
                        class="input600" 
                        v-model.number="feedbackData.otherNewAddr" 
                        placeholder="请输入具体地址。格式:(省级－市级－具体地址)" 
                        size="small"></el-input>
                </el-form-item>
                <el-form-item 
                    label="证明">
                    <el-checkbox-group 
                        v-model="ProveType"
                        @change="ProveChage(ProveType)">
                        <el-checkbox v-for="item in localDate.ProveType" :label="item.type" :key="item.typeNm"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    label="其他证明">
                    <el-input 
                        class="input600" 
                        type="textarea" 
                        placeholder="请输入内容(最多100个字)"
                        :maxlength="100"
                        v-model="feedbackData.otherCert"></el-input>                                                      
                </el-form-item>
                <el-form-item
                    label="备注">
                    <el-input 
                        class="input600" 
                        type="textarea" 
                        placeholder="请输入内容(最多100个字)"
                        :maxlength="100"
                        v-model="feedbackData.remark"></el-input>                                                      
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('feedbackData')">提交反馈单</el-button>
                    <el-button @click="resetForm('feedbackData')">重置</el-button>
                </el-form-item>         
        </el-form>
    </div>
</template>
<script>
import Feedbackdata from './FeedbackData'
import Config from '../../base/config.js'
let resource = Config.commitAjax;  //服务方法
import Common from '../../base/common.js'  //公用方法
let alertBox = Common.messageBox;  //消息提示方法
let utils = Common.utils;          //数据验证
let setTime = Common.setTime;      //时间设置
// let inputReg = Common.inputReg;    //数据验证方法
//假数据
// import feedback from '../../mock/feedback.js'
export default {
    name: 'feedback-tab',
    data (){
        let numInput = (rule, value, callback) => {   //数字输入校验
            if(!value){
                return callback(new Error('还款金额不能为空'));
            } 
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
        let mobileInput = (rule, value, callback) => {   //移动电话输入校验
            let isMob = /^((\+?86)|(\(\+86\)))?(1[356789][012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if(!isMob.test(value)){
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            }
        };
        return {
            labelPosition: 'right',
            pickerOptions: {  //时间选择
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            feedbackData: {
                outVisitApplyID: '',  //申请单号
                outMan1: '',   //外访人员1
                outMan2: '',   //外访人员2
                outMan3: '',   //外访人员3                
                addrCategory: '', //外访地址反馈
                companyConId: '', //单位情况
                companyConOther: '',  //单位情况其他
                nowAddrConId: '', //现住址情况
                nowAddrConOther: '', //现住址情况其他
                residenceConId: '',  //户籍情况
                residenceConOther: '',  //户籍情况其他
                isOneself: '1',     //谈判情况1
                isInten: '1',    //谈判情况2
                isAbility: '1',  //谈判情况3
                negOther: '',     //谈判情况其他
                outResultId: '',  //外访结果
                paybackCon: '',   //还款情况
                outPromise: '',   //承诺还款
                outRejectPay: '', //拒绝原因
                outPayScale: '',  //还款方式
                paybackAmount: '',//承诺还款金额
                paybackDate: '',  //承诺还款时间
                outPromisePayOther: '', //承诺还款其他原因
                outRejectPayOther: '',  //拒绝还款其他原因
                outEconomy: '',   //经济能力
                salary: '',       //月收入
                retireAmount: '', //退休金
                outEconomyOther: '', //经济能力其他原因
                newPhone: '',     //新手机
                newAddrPhone: '', //新地址手机
                newCompanyPhone: '',//新单位手机
                otherPhone: '',   //其他电话
                newHomeAddr: '',  //新家庭地址
                newCompanyAddr: '',//新单位地址
                otherNewAddr: '',   //其他新地址
                deadCert: '0',  //死亡证   0: 否   1: 是
                holdCert: '0',  //居留证   0: 否   1: 是
                judgement: '0', //判决书   0: 否   1: 是
                reportCert: '0',//报案证明   0: 否   1: 是
                evidence: '0',  //病例证明   0: 否   1: 是
                payPlan: '0',   //还款计划   0: 否   1: 是
                otherCert: '',//其他证明
                remark: '',   //备注
            },
            rules: {
                outVisitApplyID: [
                    {type: 'number', required: true, message: '请输入申请单号', trigger: 'blur' }
                ],
                outMan1: [
                    {required: true, message: '请输入外访人员姓名', trigger: 'blur' }
                ],
                addrCategory: [
                    {required: true, message: '请选择外访类型', trigger: 'change'}
                ],
                outResultId: [
                    {required: true, message: '请选择外访结果', trigger: 'change'}
                ]
            },
            localDate: '',
            show: false,   //显示隐藏
            comConOthershow: false, 
            nowAddrConOtherShow: false, 
            residenceConOtherShow: false, 
            outPromiseShow: false,   //承诺还款选项显示
            outRejectPayShow: false,   //拒绝还款选项显示
            outPayScaleShow: false,  //还款方式选项显示
            paybackAmountShow: false,  //还款金额和时间的显示
            outPromisePayOtherShow: false,     //承诺还款其他理由输入框
            outRejectPayOtherShow: false,     //拒绝还款其他理由输入框
            salaryShow: false,      //经济能力金额输入框显示
            retireAmountShow: false,//经济能力金额输入框显示
            outEconomyOtherShow: false,//经济能力其他输入框显示
            outEconomyInput: '',    //经济能力金额输入
            ProveType: [],   //证明选择的结果   
            paybackAmount: 'paybackAmount', //还款金额
            salary: 'salary',
            retireAmount: 'retireAmount',
            paybackamountErrorValue: 'paybackAmountErrorValue', //还款金额
            salaryerrorValue: 'salaryErrorValue',
            retireamountErrorValue: 'retireAmountErrorValue',
            paybackAmountErrorValue: '', //还款金额
            salaryErrorValue: '',
            retireAmountErrorValue: '',
            
            newPhone: 'newPhone', //新手机验证名
            newAddrPhone: 'newAddrPhone', //新手机验证名 
            newCompanyPhone: 'newCompanyPhone', //新手机验证名 
            otherPhone: 'otherPhone', //新手机验证名
            newphoneErrorValue: 'newPhoneErrorValue', 
            newaddrErrorValue: 'newAddrErrorValue',
            newcompanyErrorValue: 'newCompanyErrorValue',
            otherphoneErrorValue: 'otherPhoneErrorValue',   
            newPhoneErrorValue: '', 
            newAddrErrorValue: '',
            newCompanyErrorValue: '',
            otherPhoneErrorValue: '',         
        }
    },
    mounted () {
        this.getFeedback ();
    },
    methods: {
        getFeedback (){
            this.feedbackData.outVisitApplyID = parseInt(this.$route.query.taskId);
            console.log(this.feedbackData.outVisitApplyID);
            // console.log(Feedbackdata);
            this.localDate = Feedbackdata;
        },
        comSelectChange (n){  //单位情况
            console.log(n);
            if(n == '其他'){
                this.comConOthershow = true;
            }
        },
        nowAddrSelectChange (n){//先地址情况
            console.log(n);
            if(n == '其他'){
                this.nowAddrConOtherShow = true;
            }
        },
        residenceSelectChange (n){//户籍情况
            console.log(n);
            if(n == '其他'){
                this.residenceConOtherShow = true;
            }
        },
        isOneselfChange (value){//谈判情况
            console.log(this.feedbackData.isOneself);
        },
        paySelectChange (n){   //还款情况
            console.log('还款情况:'+n);
            this.paybackAmountShow = false;   //选择还款方式，除其他选项外，还款金额和时间隐藏
            this.outPayScaleShow = false;     //还款方式选项显示
            this.outPromisePayOtherShow = false; //承诺还款其他其他理由输入框
            this.outRejectPayOtherShow = false;  //拒绝还款其他理由输入框
            switch (n){
                case '承诺还款':
                    this.outPromiseShow = true;     //承诺还款选项显示
                    this.outRejectPayShow = false;  //拒绝还款选项隐藏
                    break;
                case '拒绝还款':
                    this.outPromiseShow = false;    //承诺还款选项隐藏
                    this.outRejectPayShow = true;   //拒绝还款选项显示
                    break;
            }
        },
        outPromiseSelectChange (n){   //承诺还款
            console.log('承诺还款:'+n);
            this.paybackAmountShow = false;   //选择还款方式，除其他选项外，还款金额和时间隐藏
            if(n == '其他'){
                this.outPayScaleShow = false;
                this.outPromisePayOtherShow = true;       //承诺还款其他其他理由输入框
            } else {
                this.outPayScaleShow = true;
                this.outPromisePayOtherShow = false;       //承诺还款其他其他理由输入框
            }
        },
        outRejectPaySelectChange (n){   //拒绝还款
            console.log('拒绝还款:'+n);
            if(n == '其他'){
                this.outRejectPayOtherShow = true;  //拒绝还款其他理由输入框
            } else {
                this.outRejectPayOtherShow = false;  //拒绝还款其他理由输入框
            }
        },
        payoutScaleSelectChange (n){   //还款方式
            console.log('还款方式:'+n);
            this.paybackAmountShow = true;    //选择还款方式，除其他选项外，还款金额和时间显示
        },
        outEconomySelectChange (n){    //经济能力
            console.log('经济能力:'+n);
            switch (n){
                case '工作中':
                    this.salaryShow = true;  //经济能力输入框
                    this.retireAmountShow = false; 
                    this.outEconomyOtherShow = false; 
                    break;
                case '退休金':
                    this.retireAmountShow = true; 
                    this.salaryShow = false;
                    this.outEconomyOtherShow = false; 
                    break;
                case '其他':
                    this.outEconomyOtherShow = true; 
                    this.retireAmountShow = false; 
                    this.salaryShow = false;
                    break;
            }
        },
        ProveChage (arr){
            console.log(arr);
            // deadCert: 0,  //死亡证   0: 否   1: 是
            // holdCert: 0,  //居留证   0: 否   1: 是
            // judgement: 0, //判决书   0: 否   1: 是
            // reportCert: 0,//报案证明   0: 否   1: 是
            // evidence: 0,  //病例证明   0: 否   1: 是
            // payPlan: 0,   //还款计划   0: 否   1: 是

            for(var i=0; i<arr.length; i++){
                switch (arr[i]){
                    case '死亡证':
                        this.feedbackData.deadCert = '1';
                        break;
                    case '居留证':
                        this.feedbackData.holdCert = '1';
                        break;   
                    case '判决书':
                        this.feedbackData.judgement = '1';
                        break;
                    case '报案证明':
                        this.feedbackData.reportCert = '1';
                        break;      
                    case '病例证明':
                        this.feedbackData.evidence = '1';
                        break;
                    case '还款计划':
                        this.feedbackData.payPlan = '1';
                        break;                                                                      
                }
            }
        },
        handleTimeClick (time){
            console.log(time);
            this.feedbackData.paybackDate = setTime.getForDate(time);
            console.log(this.feedbackData.paybackDate);
        },
        submitForm (formName){
            console.log(this.$refs[formName]);
            console.log(this.feedbackData);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    console.log('反馈单输入参数值');
                    console.log(this.feedbackData);
                    let addFeedbackFormUrl = Config.config.addFeedbackForm; //外访查询服务接口
                    console.log(addFeedbackFormUrl);
                    let FeedbackData = this.feedbackData;

                    resource.action (
                        addFeedbackFormUrl,
                        FeedbackData
                    ).then((res) => {
                        console.log(res.body);
                        let msg = res.body.msgInfo +'!';
                        if(res.body.codeInfo == 0){
                            alertBox.alertMessage({
                                TextMessage: msg,
                                Type: 'success',
                                duration: 2000
                            });
                            setTimeout(() => {
                                this.$router.push({path: 'interview'});
                            }, 2000);
                        } else {
                            let _this = this;
                            this.$message({
                                showClose: true,
                                message: msg,
                                type: 'error',
                                duration: 0,
                                onClose: function(){
                                    _this.$router.push({path: 'interview'});
                                }
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {  //置空
            this.$refs[formName].resetFields();
            this.feedbackData = {
                outVisitApplyID : this.$route.query.taskId,
                outMan1: '',   //外访人员1
                outMan2: '',   //外访人员2
                outMan3: '',   //外访人员3                
                addrCategory: '', //外访地址反馈
                companyConId: '', //单位情况
                companyConOther: '',  //单位情况其他
                nowAddrConId: '', //现住址情况
                nowAddrConOther: '', //现住址情况其他
                residenceConId: '',  //户籍情况
                residenceConOther: '',  //户籍情况其他
                isOneself: '1',     //谈判情况1
                isInten: '1',    //谈判情况2
                isAbility: '1',  //谈判情况3
                negOther: '',     //谈判情况其他
                outResultId: '',  //外访结果
                paybackCon: '',   //还款情况
                outPromise: '',   //承诺还款
                outRejectPay: '', //拒绝原因
                outPayScale: '',  //还款方式
                paybackAmount: '',//承诺还款金额
                paybackDate: '',  //承诺还款时间
                outPromisePayOther: '', //承诺还款其他原因
                outRejectPayOther: '',  //拒绝还款其他原因
                outEconomy: '',   //经济能力
                salary: '',       //月收入
                retireAmount: '', //退休金
                outEconomyOther: '', //经济能力其他原因
                newPhone: '',     //新手机
                newAddrPhone: '', //新地址手机
                newCompanyPhone: '',//新单位手机
                otherPhone: '',   //其他电话
                newHomeAddr: '',  //新家庭地址
                newCompanyAddr: '',//新单位地址
                otherNewAddr: '',   //其他新地址
                deadCert: '0',  //死亡证   0: 否   1: 是
                holdCert: '0',  //居留证   0: 否   1: 是
                judgement: '0', //判决书   0: 否   1: 是
                reportCert: '0',//报案证明   0: 否   1: 是
                evidence: '0',  //病例证明   0: 否   1: 是
                payPlan: '0',   //还款计划   0: 否   1: 是
                otherCert: '',//其他证明
                remark: '',   //备注
            };
            this.show = false;   //显示隐藏
            this.comConOthershow = false; 
            this.nowAddrConOtherShow = false; 
            this.residenceConOtherShow = false; 
            this.outPromiseShow = false;   //承诺还款选项显示
            this.outRejectPayShow = false;   //拒绝还款选项显示
            this.outPayScaleShow = false;  //还款方式选项显示
            this.paybackAmountShow = false;  //还款金额和时间的显示
            this.outPromisePayOtherShow = false;     //承诺还款其他理由输入框
            this.outRejectPayOtherShow = false;    //拒绝还款其他理由输入框
            this.salaryShow = false;     //经济能力金额输入框显示
            this.retireAmountShow = false;//经济能力金额输入框显示
            this.outEconomyOtherShow = false;//经济能力其他输入框显示
            this.paybackAmountErrorValue = ''; //还款金额
            this.salaryErrorValue = '';
            this.retireAmountErrorValue = '';
            this.newPhoneErrorValue = ''; 
            this.newAddrErrorValue = '';
            this.newCompanyErrorValue = '';
            this.otherPhoneErrorValue = '';  
            this.ProveType = [];   //证明选择的结果   
        },
        payInput (val,str,str2){  //金额输入验证
            console.log('还款金额'+val);
            if(utils.isNumber.test(val)){
                this[str2] = '只能输入数字';
                this.feedbackData[str] = '';
            } else {
                this.feedbackData[str] = val.toString();
                this[str2] = '';
            }
        },
        newPhoneInput (val,str,str2){  //手机输入验证
            console.log(str2);
            if(val){
                if(utils.isChinese.test(val) || utils.isEnglish.test(val)){ //判断是否是数字
                    this[str2] = '只能输入数字';
                    this.feedbackData[str] = '';
                } else {
                    if(utils.isMobile.test(val) || utils.isPhone1.test(val) || utils.isPhone2.test(val)){//判断是否是正确的手机号
                        this.feedbackData[str] = val.toString();
                        this[str2] = '';
                    } else {
                        this[str2] = '请输入正确的电话号码';
                        this.feedbackData[str] = '';
                    }
                }
            } else {
                this[str2] = '';
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.feedback-tab {
    height: 100%;
    overflow: auto;
}
.el-input.input200, .el-select.input200 {
    width: 200px;
}
.el-input.input400 {
    width: 400px;
}
.el-input.input600, .el-textarea.input600 {
    width: 605px;
}
</style>