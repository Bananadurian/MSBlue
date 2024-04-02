// ==PREPROCESSOR==
// @name "Volume"
// @author "marc2003"
// @import "%fb2k_component_path%helpers.txt"
// @import "%fb2k_component_path%samples\js\lodash.min.js"
// @import "%fb2k_component_path%samples\js\common.js"
// @import "%fb2k_component_path%samples\js\volume.js"
// ==/PREPROCESSOR==

var volume = new _volume(0, 0, 0, 0);
volume.c1 = RGB(114, 117, 126);
volume.c2 = RGB(127, 90, 240);

// 使用CUI设置的背景色
var bgColor = window.GetColourCUI(3);

function on_mouse_lbtn_down(x, y) {
	volume.lbtn_down(x, y);
}

function on_mouse_lbtn_up(x, y) {
	volume.lbtn_up(x, y);
}

function on_mouse_move(x, y) {
	volume.move(x, y);
}

function on_mouse_wheel(s) {
	volume.wheel(s);
}

function on_paint(gr) {
	// 填充背景色
	gr.FillRectangle(0,0,window.Width,window.Height,bgColor);
	// 显示的声音样式高度
	var displayVolumeH = 10;
	// 显示的声音样式 y 坐标， y坐标计算后是居中位置
	var startY = volume.h / 2 - displayVolumeH / 2;
	gr.FillRoundedRectangle(volume.x, startY, volume.w, displayVolumeH, 5, 5, volume.c1);
	gr.FillRoundedRectangle(volume.x, startY, volume.pos(), displayVolumeH, 5, 5, volume.c2);

}

function on_size() {
	// 设置声音进度条宽度
	volume.w = window.Width-20;
	volume.h = window.Height;
}

function on_volume_change() {
	volume.volume_change();
}
