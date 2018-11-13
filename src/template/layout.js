const layout = require('./layout.ejs');
const header = require('./header.ejs');
const footer = require('./footer.ejs');
const leftNav = require('./leftNav.ejs');
const navConfig = require('../config/nav.config');

let pf = {
	pageTitle: "home",
	headerCurr: "首页",
	navCurr: ""
}

const moduleExports = {
	/* 处理需要在公共页面用到的参数 */
	init(res) {
		for (let ev in res.pf) {
			pf[ev] = res.pf[ev]
		}
		return this;
	},

	/* 拼接公共组件与实际内容 */
	run(content, topsource, botsource) {
		let renderData = {
			pageTitle: pf.pageTitle,
			topsource: !topsource ? '' : topsource,
			botsource: !botsource ? '' : botsource,
			header: header(),
			footer: footer(pf),
			leftNav: leftNav({
				nav: navConfig,
				curr: pf.navCurr
			}),
			content,
			pf
		}
		return layout(renderData);
	}
}

module.exports = moduleExports