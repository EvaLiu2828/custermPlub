import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.100.60.58:8080/collectionPc-web/scheduleController/getTask',
  {
    'msg|10': [{
      'taskId': /\d{5,10}/,        //任务单号
      'customerName': '@FIRST',    //客户姓名
      'address': '包河区金寨路1号',  //外访地址
      'status|1': [0,1],           //外访状态
      'visitorNo': [],             //外访人员
      'visitorDate': '',           //选择后的外访时间
      'appointDate': '',           //约定时间
      'visitSeq' : '',             //外访顺序
    }],
    'visitTeam|10': [{
      userName: '@FIRST', 
      id: /\d{1,5}/
    }],
    'date': '2017-4-18',  //系统时间
    'code': 0,  //[0,1]
  });
