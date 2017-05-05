import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.100.60.58:8080/collectionPc/scheduleController/searchSign',
  {
    'msg|100': [{
      'taskId': /\d{5,10}/,        //任务单号
      'userName': '@FIRST',        //客户姓名
      'userId|1': /\d{5,10}/,           //客户id
      'customerAddress': '包河区金寨路1号',  //客户地址
      'signAddress': '庐阳区凤台路209号（凤台路与蒙城北路交叉口）',      //签到地址
      'signTime': '2017-4-18 00:00:00',             //签到时间
    }],
    'date': '2017-4-18',  //系统时间
    'codeInfo': 0,  //[0,1]
    'msgInfo': '111',  //[0,1]
  });