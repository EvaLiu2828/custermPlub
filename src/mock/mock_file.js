import MockJs from  "mockjs"

var Random = MockJs.Random;
Random.extend({
    address: function(date) {
        var constellations = ['包河区金寨路1号（金寨路与望江西路交叉口）', 
                              '庐阳区凤台路209号（凤台路与蒙城北路交叉口）', 
                              '蜀山区金寨路217号(近安医附院公交车站)', 
                              '蜀山区梅山路10号(近安徽饭店)', 
                              '蜀山区 长丰南路159号铜锣湾广场312室', 
                              '合肥市寿春路93号钱柜星乐町KTV（逍遥津公园对面）', 
                              '庐阳区长江中路177号', 
                              '新站区胜利路89',
                              '北京朝阳区大望路1号',
                              '北京望京',
                              '北京通州区海棠湾',
                              '北京通州区台湖',
                              '北京海淀区',
                              '北京昌平区',
                              '北京东城区火箭军医院',]
        return this.pick(constellations)
    }
})
var data = MockJs.mock(
  'http://10.143.32.61:8080/scheduleController/getTask',
  {
    'task|15': [{
      'taskId': /\d{5,10}/,        //任务单号
      'customerName': '@FIRST',    //客户姓名
      'address|1': '@ADDRESS',  //外访地址
      'status|1': ['03','04'],//外访状态
      'visitorNo': [],             //外访人员
      'userName': [],   //外访人员
      'visitorDate': '',           //选择后的外访时间
      'appointDate': '',           //约定时间
      'visitSeq' : '',             //外访顺序
    }],
    'user|10': [{
      userName: '@FIRST', 
      id: /\d{1,5}/
    }],
    'date': '2017-05-30',  //系统时间
    'codeInfo': 0,  //[0,1]
    'msgInfo': '111111'
  });
