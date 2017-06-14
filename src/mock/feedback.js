import MockJs from  "mockjs"

var data = MockJs.mock(
    'http://10.143.32.61:8080/visitManagerController/addFeedbackForm',
    {
      'date': '2017-04-18',  //系统时间
      'codeInfo': 0,  //[0,1]
      'msgInfo': 0
    });