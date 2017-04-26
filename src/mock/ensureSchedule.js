import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.100.60.58:8080/collectionPc-web/scheduleController/ensureSchedule',
  {
    'code': 0,  //[0,1]
  });
