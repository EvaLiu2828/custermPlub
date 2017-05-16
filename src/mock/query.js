import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.143.32.61:8080/collectionPc/scheduleController/getQuery',
  {
    'queue|10': [{
      queueName: '@FIRST', 
      queueId: /\d{1,5}/
    }],
    'date': '2017-4-18',  //系统时间
    'codeInfo': 0,  //[0,1]
  });
