//获取离顶部高度
function getTop(e) {
  var offset = e.offsetTop;
  if (e.offsetParent != null) offset += getTop(e.offsetParent);
  return offset;
}

/* 短信验证码 */
var getMsgCode = function (elem) {
  var el = $(elem);
  var count = 60;
  var msgTimed = setInterval(function () {
    el.prop("disabled", true);
    el.text(count + 's');
    count--;
    if (count <= 0) {
      el.prop("disabled", false);
      el.text("获取验证码");
      clearTimeout(msgTimed)
    }
  }, 1000)
}

// 时间戳格式化
var filter = {
  zero: function (num) {
    if (parseInt(num) < 10) {
      num = '0' + num
    }
    return num
  },
  setDate: function (date) {
    var that = this;
    var d = new Date(parseInt(date));
    var r = {
      year: d.getFullYear(),
      month: that.zero(d.getMonth() + 1),
      day: that.zero(d.getDate()),
      hour: that.zero(d.getHours()),
      minute: that.zero(d.getMinutes()),
      second: that.zero(d.getSeconds()),
      apm: d.getHours() < 12 ? '上午' : '下午'
    }
    return r;
  },
  dateByApm: function (date) {
    var r = this.setDate(date);
    return r.year + '年' + r.month + '月' + r.day + '日 ' + r.apm + ' ' + r.hour + ':' + r.minute + ':' + r.second
  },
  dateByHms: function (date) {
    var r = this.setDate(date);
    return r.year + '-' + r.month + '-' + r.day + ' ' + r.hour + ':' + r.minute + ':' + r.second
  },
  dateByYmd: function (date) {
    var r = this.setDate(date);
    return r.year + '-' + r.month + '-' + r.day
  }
}

// 分页器初始化
function initPagination(data, callback) {
  layui.use('laypage', function () {
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
      elem: 'pagination-box', //注意，这里是 ID，不用加 # 号
      count: data.total, //数据总数，从服务端得到
      limit: 10, //每页显示条数
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        //首次不执行
        //do something
        if (!first) {
          callback(obj.curr)
        }
        // console.log(obj)
      }
    });
  });
}


// 通过模板新增dom
function pushDomByTpl(data, from, to) {
  var getTpl = $(from).html(),
    view = document.getElementById(to);
  layui.use('laytpl', function () {
    var laytpl = layui.laytpl;
    laytpl(getTpl).render(data, function (html) {
      view.innerHTML = html;
    });
  })
}

// 刷新下拉框数据
function reFreshSelect() {
  layui.use('form', function () {
    var form = layui.form;
    form.render('select');
  });
}


// 弹出确认框
function showConfirm(str, opt, callback) {
  layer.confirm(str, {
    skin: 'dialog-class',
    area: '500px',
    offset: '100px'
  }, function (index) {
    if (callback) {
      callback(opt);
    }
    layer.close(index);
  });
}

// 弹出消息框
function showTips(str, sec, callback) {
  if (sec == undefined || sec == '') {
    sec = 2
  }
  layer.msg(str, {
    offset: '100px'
  }, {
    time: sec * 1000 //2秒关闭（如果不配置，默认是3秒）
  }, function () {
    if (callback) {
      callback();
    }
  });
}

// 弹出时间选择
function showDateBox(elem, value) {
  layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
      elem: elem, //指定元素
      type: 'datetime',
      value: value == undefined ? '' : value
    });
  });
}



$(function () {
  $("[datechoose]").each(function (i, el) {
    showDateBox(el)
  })
})

/**
 * 封装ajax()
 *
 * @param {*} _url 请求url
 * @param {*} [_data={}] 请求参数
 * @param {string} [_type='POST'] 请求方式，默认POST
 * @returns 如果code大于0则返回data对象否则返回msg
 */
function $_AJAX(_url, _data = {}, _type = 'POST') {
  var result;
  $.ajax({
    url: _url,
    type: _type,
    dataType: 'json',
    async: false,
    data: _data,
    contentType: 'application/json',
    success: function (res) {
      if (res.code >= 0) {
        result = res.data
      } else {
        result = res.msg
      }
    },
    error: function (err) {
      result = res.msg
    }
  })
  return result;
}