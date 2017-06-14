import MockJs from  "mockjs"
var Random = MockJs.Random;  

var data = MockJs.mock(
  'http://10.143.32.61:8080/scheduleController/getQueue',
  {
    'queue': [{
      'queueName': Random.county(), 
      'queueId|1000-1000000': 100000
    }],
    'date': '2017-05-31',  //系统时间
    'codeInfo': 0,  //[0,1]
  });
///\d{1,5}/