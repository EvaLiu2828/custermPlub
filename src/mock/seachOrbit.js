import MockJs from  "mockjs"

var data = MockJs.mock(
  'http://10.100.60.58:8080/collectionPc/scheduleController/searchOrbit',
  {
    'msg|5': [{
      'userName': '@FIRST',        //客户姓名
      'userId|1': /\d{5,10}/,           //客户id
      'gpsList|5': [{
        'gpsAddressOtherGPS': '包河区金寨路1号',  //定位地址
        'gpsAddrEastLongitudeGPS|116.3': 1,   //东经
        'gpsAddrNorthernLatitudeGPS|39.3': 1, //西经
        'operateTime': /^201[6-7]\d{0}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/      //操作时间
      }]
    }],
    'date': '2017-4-18',  //系统时间
    'codeInfo': 0,  //[0,1]
    'msgInfo': '111',  //[0,1]
  });