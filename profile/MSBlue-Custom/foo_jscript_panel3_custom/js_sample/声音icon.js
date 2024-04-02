// ==PREPROCESSOR==
// @name "声音状态icon"
// @author "Jin"
// @import "%fb2k_component_path%helpers.txt"
// ==/PREPROCESSOR==

// Created: 20230728
// Updated: 20240329

// 获取系统设置的背景颜色
var bgColour = window.GetColourCUI(3);
// svg路径
var svgFolderPath = fb.FoobarPath + 'profile\\MSBlue-Custom\\foo_jscript_panel3_custom\\svg';
var volumeDefault = utils.LoadSVG(svgFolderPath + '\\volume30x30.svg');
var volumeMute = utils.LoadSVG(svgFolderPath + '\\volumeMute30x30.svg');
// 有声音的时候 1，-1是静音
var vokumeStatus = 1;

// 计算Y轴中心坐标，窗口高度一半 减去 图片高度一半
var centerY = window.Height / 2 - volumeDefault.Height / 2;

//鼠标按下icon静音
function on_mouse_lbtn_up(x, y){
	fb.VolumeMute();
	// 显示静音icon
	vokumeStatus = -1;
	window.Repaint();
}

function on_paint(gr) {
	// 填充一个矩形背景色
	gr.FillRectangle(0, 0, window.Width, window.Height,bgColour);
	if (vokumeStatus == 1){
		gr.DrawImage(volumeDefault, 0, centerY, volumeDefault.Width, volumeDefault.Height, 0, 0, volumeDefault.Width, volumeDefault.Height);
	} else {
		console.log("显示静音icon");
		gr.DrawImage(volumeMute, 0, centerY, volumeMute.Width, volumeMute.Height, 0, 0, volumeMute.Width, volumeMute.Height);
	}

}

function on_size(){
	centerY = window.Height / 2 - volumeDefault.Height / 2
}

function on_volume_change() {
	// icon联动其它控制声音的控件
	// 声音静音（-100db）的时候，但是当前是 非静音icon 状态（vokumeStatus = 1），设置静音icon
	// 声音不是静音的时候，但是当前是 静音icon 状态（vokumeStatus = -1），设置非静音icon
	if (fb.Volume == -100 && vokumeStatus == 1) {
		vokumeStatus = -1;
		window.Repaint();
	} else if (fb.Volume != -100 && vokumeStatus == -1) {
		vokumeStatus = 1;
		window.Repaint();
	}
}