layui.define(["table"], function (exports) {
	var MOD_NAME = "treetable",
		$_JQ = layui.jquery,
		$_TABLE = layui.table,
		tree = function () {};
	var that = this;
	tree.prototype.config = function (e) {
		that.c = $_JQ.extend({
			elem: '#tree-table',
			url: 'tree.json',
			page: true,
			method: 'POST',
			limit: 20,
			where: {},
			page: {
				theme: '#5c6fb4',
				layout: ['prev', 'page', 'next', 'skip', 'count']
			}
		}, e)
	};
	tree.prototype.render = function (e) {
		that.config(e);
		
	};
	tree.prototype.parent_to_choose = function (id) {
		var t = this,
			pt = o(t.c.elem).find('[data-pid=' + id + ']'),
			pl = pt.find('[lay-skin=primary]:checked').length,
			bt = o(t.c.elem).find('[data-id=' + id + '] [lay-skin=primary]'),
			pid = o(t.c.elem).find('[data-id=' + id + ']').data('pid');
		if (pt.length == pl || pl == 0) {
			bt.prop('checked', pt.length == pl);
			pid > -1 && t.parent_to_choose(pid);
		}
	};
	tree.prototype.child_to_choose = function (id, status) {
		var t = this;
		o(t.c.elem).find("tr[data-pid=" + id + "]").each(function () {
			o(this).find('[lay-skin=primary]').prop('checked', status);
			var id = o(this).data("id");
			t.child_to_choose(id, status)
		});
	};
	tree.prototype.hide = function (id) {
		var t = this;
		o(t.c.elem).find("tr[data-pid=" + id + "]").each(function () {
			o(this).addClass('hide');
			o(this).find("." + t.c.icon_class).html(t.c.icon_val.open);
			var id = o(this).data("id");
			t.hide(id)
		});
		t.cache(id, false)
	};
	tree.prototype.show = function (id) {
		var t = this;
		o(t.c.elem).find("tr[data-pid=" + id + "]").each(function () {
			o(this).removeClass('hide');
			o(this).find("." + t.c.icon_class).html(t.c.icon_val.close);
			var id = o(this).data("id");
			t.show(id)
		});
		t.cache(id, true)
	};
	tree.prototype.tree = function (lists, pid, data) {
		var t = this;
		if (lists[pid]) {
			data.push(lists[pid]);
			delete lists[pid]
		}
		o.each(t.c.data, function (index, item) {
			if (item.pid == pid) {
				data.concat(t.tree(lists, item.id, data))
			}
		});
		return data
	};
	tree.prototype.cache = function (val, option) {
		var t = this,
			name = "tree-table-open-item",
			val = val.toString(),
			cache = t.get_cookie(name) ? t.get_cookie(name).split(",") : [],
			index = o.inArray(val, cache);
		if (option === undefined) {
			return index == -1 ? false : val
		}
		if (option && index == -1) {
			cache.push(val)
		}
		if (!option && index > -1) {
			cache.splice(index, 1)
		}
		t.set_cookie(name, cache.join(","))
	};
	tree.prototype.set_cookie = function (name, value, days) {
		var exp = new Date();
		exp.setTime(exp.getTime() + (days ? days : 30) * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
	};
	tree.prototype.get_cookie = function (name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2])
		} else {
			return null
		}
	};
	tree.prototype.all = function (type) {
		var t = this;
		if (type == "up") {
			o(t.c.elem).find("tr[data-pid=0]").each(function () {
				var id = o(this).data("id");
				t.hide(id);
				o(this).find("." + t.c.icon_class).html(t.c.icon_val.open)
			})
		} else if (type == "down") {
			o(t.c.elem).find("tr[data-pid=0]").each(function () {
				var id = o(this).data("id");
				t.show(id);
				o(this).find("." + t.c.icon_class).html(t.c.icon_val.close)
			})
		} else if (type == "checked") {
			var ids = [],
				data = [];
			o(t.c.elem).find("tbody [lay-skin=primary]:checked").each(function () {
				var id = o(this).parents('tr').data("id");
				data.push(t.c.new_data[id]);
				ids.push(id);
			})
			return {
				ids: ids,
				data: data
			};
		}
	};
	var tree = new tree();
	exports(MOD_NAME, tree)
});