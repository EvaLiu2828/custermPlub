import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.143.32.61:8080/collectionPc/scheduleController/getTask',
  {
    'task|50': [{
      'taskId': /\d{5,10}/,        //任务单号
      'customerName': '@FIRST',    //客户姓名
      'address': '包河区金寨路1号',  //外访地址
      'status|1': ['02','03'],           //外访状态
      'visitorNo': [],             //外访人员
      'userName': ['111','222'],             //外访人员
      'visitorDate': '',           //选择后的外访时间
      'appointDate': '',           //约定时间
      'visitSeq' : '',             //外访顺序
    }],
    'user|10': [{
      userName: '@FIRST', 
      id: /\d{1,5}/
    }],
    'date': '2017-4-18',  //系统时间
    'codeInfo': 0,  //[0,1]
    'msgInfo': '111111'
  });
