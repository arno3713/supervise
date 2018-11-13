const content = require('./index.ejs');
const layout = require('../../template/layout.js');
const pf = {
  pageTitle: '首页',
  headerCurr: "首页",
	navCurr: "首页",
}


module.exports = layout.init({
  pf
}).run(content());