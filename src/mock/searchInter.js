import MockJs from  "mockjs"

var data = MockJs.mock(
    'http://10.143.32.61:8080/visitManagerController/queryVisitList',
    {
      'task|10': [{
          'taskId': /\d{5,10}/,        //任务单号
          'customerName': '@FIRST',    //客户姓名
          'customerNum': /\d{5,10}/,    //客户姓名
          'visitorNo': '@FIRST',             //外访人员
          'visitorDate': '2017-04-18',           //选择后的外访时间
       }],
      'date': '2017-04-18',  //系统时间
      'codeInfo': 1,  //[0,1]
    });
