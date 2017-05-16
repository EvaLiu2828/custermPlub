import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.143.32.61:8080/collectionPc/visitManagerController/selectVisit',
  {
    'message|100': [{
      'taskID': /\d{5,10}/,        //任务单号
      'userName': '@FIRST',        //客户姓名
      'userID|1': /\d{5,10}/,           //客户id
      'customerAddress': '包河区金寨路1号',  //客户地址
      'signAddress': '庐阳区凤台路209号（凤台路与蒙城北路交叉口）',      //签到地址
      'signTime': /^201[6-7]\d{0}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,             //签到时间
    }],
    'codeInfo': 0,  //[0,1]
    'msgInfo': '111',  //[0,1]
  });