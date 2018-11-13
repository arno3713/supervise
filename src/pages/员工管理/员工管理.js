const content = require('./员工管理.ejs');
const bot = require('../../plugin/员工管理.ejs');
const layout = require('../../template/layout.js');
const pf = {
  pageTitle: '员工管理',
	navCurr: "员工管理",
}


module.exports = layout.init({
  pf
}).run(content(),'',bot());