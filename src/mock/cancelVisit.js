import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.143.32.61:8080/scheduleController/cancelVisit',
  {
    'codeInfo': 0,  //[0,1]
    'msgInfo': 0,  //[0,1]
  });
