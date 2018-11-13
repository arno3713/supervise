layui.config({
  base: './front/js/',
})
var $_TABLE = layui.table,
  $_FORM = layui.form;
$_TABLE.set({
  skin: 'line',
  even:true
})
// 表单提交方法
function pushForm(elem, callback) {
  $_FORM.on('submit(' + elem + ')', function (data) {
    if (callback) {
      callback(data.field)
    }
    return false;
  });
}

function reloadTable(tab, data, curr = 1) {
  tab.config.page.curr = curr;
  tab.reload({
    where: data
  });
}

/**
 * 生成表格操作项的基础按钮
 *
 * @param {*} d 当前行的数据对象，默认d即可
 * @param {{}} actOpt 此值决定展示哪些按钮，基础参数见下方：
 * @{view : true} 表示显示【详情按钮】
 * @{edit : true}  表示显示【编辑按钮】
 * @{delet : true} 表示显示【删除按钮】
 * @returns 返回按钮的DOM
 */
function getTableActTmp(d, actOpt) {
  var _html = '<div class="layui-btn-group">';
  _html += actOpt.view ? '<button class="layui-btn" data-id="' + d.id + '">详情</button>' : '';
  _html += actOpt.edit ? '<button class="layui-btn" data-id="' + d.id + '">编辑</button>' : '';
  _html += actOpt.delet ? '<button class="layui-btn" data-id="' + d.id + '">删除</button>' : '';
  _html += '</div>';
  return _html;
}

/**
 * 动态表格初始化
 *
 * @param {*} elem 生成表格的table标签id
 * @param {*} url 表格数据接口
 * @param {*} [where={}] 请求附加参数，即ajax的data属性
 * @param {*} cols 表头设置
 * @returns 返回生成的表格对象
 */
function initTable(elem, url, cols, toolbar, where = {}) {
  return $_TABLE.render({
    elem: elem,
    url: url,
    page: true,
    method: 'POST',
    limit: 20,
    where: where,
    page: {
      layout: ['prev', 'page', 'next', 'skip', 'count']
    },
    toolbar: '<div>' + toolbar + '</div>',
    contentType: 'application/json',
    title: '员工信息汇总',
    cols: [
      cols
    ],
    done: function (res, curr, count) {
      //如果是异步请求数据方式，res即为你接口返回的信息。
      //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
      // console.log(res);

      //得到当前页码
      // console.log(curr);

      //得到数据总量
      // console.log(count);
    }
  });
}

/**
 * 动态表格初始化
 *
 * @param {*} elem 生成表格的table标签id
 * @param {*} url 表格数据接口
 * @param {*} [where={}] 请求附加参数，即ajax的data属性
 * @param {*} cols 表头设置
 * @returns 返回生成的表格对象
 */
function initTreeTable(elem, url, cols, toolbar, where = {}) {
  return $_TABLE.render({
    elem: elem,
    url: url,
    page: true,
    even: false,
    method: 'POST',
    limit: 20,
    where: where,
    page: {
      theme: '#5c6fb4',
      layout: ['prev', 'page', 'next', 'skip', 'count']
    },
    toolbar: '<div>' + toolbar + '</div>',
    contentType: 'application/json',
    title: '部门信息汇总',
    cols: [
      cols
    ],
    parseData: function(res){ //res 即为原始返回的数据
      console.log(res)
      var a_data = res.data;
      var t_data = [];
      for(var a in a_data){
        handleMockData(a_data[a],t_data);
      }
      for(let item of t_data){
        delete item.branch
      }
      console.log(t_data)
      return {
        "code": res.code, 
        "msg": res.msg, 
        "count": res.count,
        "data": t_data
      };
    },
    done: function (res, curr, count) {
      //如果是异步请求数据方式，res即为你接口返回的信息。
      //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
      console.log(res);

      //得到当前页码
      // console.log(curr);

      //得到数据总量
      // console.log(count);
    }
  });
}

function handleMockData (data,t_data) {
  let k_data = data;
  t_data.push(k_data)
	if (data.hasBranch) {
		for (let branch of data.branch) {
      t_data.push(branch)
		}
	}
}