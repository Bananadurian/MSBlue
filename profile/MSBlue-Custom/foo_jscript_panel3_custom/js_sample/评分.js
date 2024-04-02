// ==PREPROCESSOR==
// @name "Rating"
// @author "marc2003"
// @import "%fb2k_component_path%helpers.txt"
// @import "%fb2k_component_path%samples\js\lodash.min.js"
// @import "%fb2k_component_path%samples\js\common.js"
// @import "%fb2k_component_path%samples\js\panel.js"
// @import "%fb2k_component_path%samples\js\rating.js"
// ==/PREPROCESSOR==

var panel = new _panel({ custom_background : true });
// 单个星星 icon尺寸
var sigleIconH = 15;
// 使用全局选中颜色
var iconColor = window.GetColourCUI(5)
var rating = new _rating(0, 0, sigleIconH, iconColor); // x, y, height, colour
// console.log(rating.w);
// console.log(rating.h);
// 计算icon位置 放在 function on_size() 使用，不然调整窗口不会自动刷新。
// rating.x = window.Width / 2 - rating.w / 2;
// rating.y = window.Height / 2 - rating.h / 2;

panel.item_focus_change();

function on_colours_changed() {
	panel.colours_changed();
	window.Repaint();
}

function on_item_focus_change() {
	panel.item_focus_change();
}

function on_metadb_changed() {
	rating.metadb_changed();
}

function on_mouse_lbtn_up(x, y) {
	rating.lbtn_up(x, y);
}

function on_mouse_leave() {
	rating.leave();
}

function on_mouse_move(x, y) {
	rating.move(x, y);
}

function on_mouse_rbtn_up(x, y) {
	return panel.rbtn_up(x, y, rating);
}

function on_paint(gr) {
	panel.paint(gr);
	rating.paint(gr);
}

function on_playback_new_track() {
	panel.item_focus_change();
}

function on_playback_stop(reason) {
	if (reason != 2) {
		panel.item_focus_change();
	}
}

function on_playlist_switch() {
	panel.item_focus_change();
}

function on_size() {
	panel.size();
	// 计算星星icon x y 中心位置
	rating.x = window.Width / 2 - rating.w / 2;
	rating.y = window.Height / 2 - rating.h / 2;
}
