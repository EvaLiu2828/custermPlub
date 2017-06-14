/**
 * Created by v-yuxinliu on 17/4/1.
 */
import Vue from 'vue'

export default {
    //外访地址反馈类型
    feedbackAddType: [   //外访地址反馈类型
        {typeNm: '01', type: '地址有效'},
        {typeNm: '02', type: '亲友地址'},
        {typeNm: '03', type: '查无此人'},
        {typeNm: '04', type: '地址不详'},
        {typeNm: '05', type: '地址拆迁'},
        {typeNm: '06', type: '地址过期'},
        {typeNm: '07', type: '地址虚假'},
        {typeNm: '08', type: '无法确认'},
    ],
    unitCase: [         //单位情况类型
        {typeNm: '01', type: '在职'},
        {typeNm: '02', type: '离职'},
        {typeNm: '03', type: '退休'},
        {typeNm: '04', type: '其他'},
    ],
    nowAddCase: [         //现住址情况类型
        {typeNm: '01', type: '本人'},
        {typeNm: '02', type: '父母'},
        {typeNm: '03', type: '无人居住'},
        {typeNm: '04', type: '地址错误'},
        {typeNm: '05', type: '其他'},
    ],
    residenceCase: [         //户籍情况类型
        {typeNm: '01', type: '本人居住'},
        {typeNm: '02', type: '无人居住'},
        {typeNm: '03', type: '地址错误'},
        {typeNm: '04', type: '其他'},
    ],
    outResultIdType: [   //外访结果
        {typeNm: '01', type: '承诺还款（面）'},
        {typeNm: '02', type: '承诺还款（电）'},
        {typeNm: '03', type: '家人代偿'},
        {typeNm: '04', type: '协商谈判'},
        {typeNm: '05', type: '拒绝还款'},
        {typeNm: '06', type: '无效外访'},
        {typeNm: '07', type: '已留信函'},
    ],
    paybackConType: [   //还款情况
        {typeNm: '01', type: '承诺还款'},
        {typeNm: '02', type: '拒绝还款'},
    ],
    outPromiseConType: [//承诺还款
        {typeNm: '01', type: '本人承诺'},
        {typeNm: '02', type: '家人代偿'},
        {typeNm: '03', type: '朋友代偿'},
        {typeNm: '04', type: '其他'},
    ],
    outPayScaleType: [//承诺还款方式
        {typeNm: '01', type: '一次性结清'},
        {typeNm: '02', type: '部分'}
    ],
    outRejectConType: [//拒绝还款
        {typeNm: '01', type: '违约金过高'},
        {typeNm: '02', type: '不认可服务费'},
        {typeNm: '03', type: '其他'}
    ],
    outEconomyType: [//经济能力
        {typeNm: '01', type: '工作中'},
        {typeNm: '02', type: '退休金'},
        {typeNm: '03', type: '失业'},
        {typeNm: '04', type: '其他'}
    ],
    ProveType: [
        {typeNm: '0', type: '死亡证'},
        {typeNm: '0', type: '居留证'},
        {typeNm: '0', type: '判决书'},
        {typeNm: '0', type: '报案证明'},
        {typeNm: '0', type: '病例证明'},
        {typeNm: '0', type: '还款计划'}
    ]
}