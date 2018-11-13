var Random = Mock.Random;
Mock.setup({
  timeout: '200-700'
})

Mock.mock(/\/getGroupId[\s\S]*?/, function (opt) {
  var data = $.parseJSON(opt.body);
  return Mock.mock({
    "code": 0,
    "msg": "",
    "count": 5,
    "data|5": [{
      'id|+1': 0,
      "department|+1": ['开发一部', '开发二部', '开发三部', '开发四部', '开发五部']
    }]
  })
});

Mock.mock(/\/getPositionId[\s\S]*?/, function (opt) {
  var data = $.parseJSON(opt.body);
  return Mock.mock({
    "code": 0,
    "msg": "",
    "count": 6,
    "data|6": [{
      'id|+1': 0,
      "classify|+1": ['JAVA程序员', '产品经理', 'IOS开发', 'Android开发', 'Web前端开发', '产品助理']
    }]
  })
});

Mock.mock(/\/normalTable[\s\S]*?/, function (opt) {
  var data = $.parseJSON(opt.body);
  console.log(data)
  return Mock.mock({
    "code": 0,
    "msg": "",
    "count": 60,
    "data": function () {
      let _arr = [];
      let _num, _name, _classify;
      let department = ['开发一部', '开发二部', '开发三部', '开发四部', '开发五部'];
      let classify = ['JAVA程序员', '产品经理', 'IOS开发', 'Android开发', 'Web前端开发', '产品助理'];
      data.limit = data.limit > 60 ? 60 : data.limit;
      _num = (data.name != '' || data.workerId != '') ? 1 : data.limit;
      _name = data.name != '' ? data.name : '@cname';
      _workerId = data.workerId != '' ? data.workerId : () => Random.natural(10000, 30000);
      _department = data.groupId >= 0 ? department[data.groupId] : () => Random.pick(department);
      _classify = data.positionId >= 0 ? classify[data.positionId] : () => Random.pick(classify);
      for (var i = 0; i < _num; i++) {
        var _tmp = Mock.mock({
          'id|+1': (data.page - 1) * 20 + 1,
          username: _name,
          workerId: _workerId,
          sex: () => Random.boolean() ? '男' : '女',
          city: '@city',
          classify: _classify,
          department: _department,
          "hiredate": '@date(T)',
          "birthday": '@date(T)',
          "email": '@email(eims.com.cn)'
        });
        _arr.push(_tmp)
      }
      return _arr;
    }
  })
});

Mock.mock(/\/treeTable[\s\S]*?/, function (opt) {
  var data = $.parseJSON(opt.body);
  console.log(data)
  return Mock.mock({
    "code": 0,
    "msg": "",
    "count": 60,
    "data": function () {
      let _arr = [];
      let _num;
      let department = ['开发一部', '开发二部', '开发三部', '开发四部', '开发五部'];
      let branch = ['技术一组', '技术二组', '技术三组'];
      data.limit = data.limit > 5 ? 5 : data.limit;
      _num = data.limit;
      _department = () => Random.pick(department);
      _branch = () => Random.pick(branch);
      for (var i = 0; i < _num; i++) {
        var _flag = Random.boolean();
        var pid = i + 1;
        var _tmp = Mock.mock({
          'id|+1': pid,
          "department|+1": department,
          number: Random.natural(10, 300),
          createday: '@date(T)',
          hasBranch: _flag,
          branch: () => {
            var _branch = [];
            if (!_flag) {
              _branch = []
            } else {
              for (var j = 0; j < 3; j++) {
                _branch.push(Mock.mock({
                  id: j + 1,
                  pid: pid,
                  "department|+1": branch,
                  number: Random.natural(10, 300),
                  createday: '@date(T)'
                }))
              }
            }
            return _branch;
          }
        });
        _arr.push(_tmp)
      }
      return _arr;
    }
  })
});