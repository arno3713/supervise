const content = require('./部门管理.ejs');
const bot = require('../../plugin/部门管理.ejs');
const layout = require('../../template/layout.js');
const pf = {
  pageTitle: '部门管理',
  headerCurr: "管理",
	navCurr: "部门管理",
}


module.exports = layout.init({
  pf
}).run(content(),'',bot());