// ==PREPROCESSOR==
// @import "%fb2k_component_path%helpers.txt"
// ==/PREPROCESSOR==
// @name "切换声音输出设备"
// @author "Jin"
// @version "1.0.0"
// @created: 2024-12-07
// @updated: 2024-12-07


var colours = {
	// 声音指示背景
	slider_background: RGB(133, 136, 145),
	// 当前声音指示 使用全局选中的背景色
	// slider_contrast: window.GetColourCUI(4),
	slider_contrast: RGB(147, 115, 242),
	// 背景颜色 使用 全局系统设置背景色
	bgColour: window.GetColourCUI(3),
};

// svg路径
var svgFolderPath =
	fb.FoobarPath + "profile\\MSBlue-Custom\\foo_jscript_panel3_custom\\svg";
// icon默认宽高：speakerDefaultImg.Width = speakerDefaultImg.Height = 30
var speakerDefaultImg = utils.LoadSVG(svgFolderPath + "\\speakerWhite30x30.svg");

// icon上下居中 目标Y值：窗口高度 / 2 - 图片 / 2
var imgDstX = window.Width / 2 - speakerDefaultImg.Width / 2;
var imgDstY = window.Height / 2 - speakerDefaultImg.Height / 2;
// 点击响应区域是图片的位置
var clickAreaX2 = imgDstX + speakerDefaultImg.Width;
var clickAreaY2 = imgDstY + speakerDefaultImg.Height;


function on_paint(gr) {
	// 填充一个矩形背景色
	gr.FillRectangle(0, 0, window.Width, window.Height, colours.bgColour);
	// 显示图片  _scale(4)
	gr.DrawImage(
		speakerDefaultImg,
		imgDstX,
		imgDstY,
		speakerDefaultImg.Width,
		speakerDefaultImg.Height,
		0,
		0,
		speakerDefaultImg.Width,
		speakerDefaultImg.Height
	);
};


function on_size() {
	// 窗口尺寸变化重新计算位置和尺寸
	imgDstX = window.Width / 2 - speakerDefaultImg.Width / 2;
	imgDstY = window.Height / 2 - speakerDefaultImg.Height / 2;
	clickAreaX2 = imgDstX + speakerDefaultImg.Width;
	clickAreaY2 = imgDstY + speakerDefaultImg.Height;
};


function on_mouse_lbtn_up(x, y) {
	if (x > imgDstX && x < clickAreaX2 && y > imgDstY && y < clickAreaY2) {
		menu();
	}
}

// 左键点击显示输出设备切换菜单
function menu() {
	var menu = window.CreatePopupMenu();
	var str = fb.GetOutputDevices();
	var arr = JSON.parse(str);
	var active = -1;
	for (var i = 0; i < arr.length; i++) {
		menu.AppendMenuItem(MF_STRING, i + 1, arr[i].name);
		if (arr[i].active) active = i;
	}

	if (active > -1) menu.CheckMenuRadioItem(1, arr.length + 1, active + 1);

	var idx = menu.TrackPopupMenu(0, 0);
	menu.Dispose();

	if (idx > 0) fb.RunMainMenuCommand('Playback/Device/' + arr[idx - 1].name);
};

/*
=====================
鼠标指向的时候显示播放设备名字
=====================
*/

// 播放设备显示的tooltip
var g_tooltip = window.CreateTooltip();
var g_trackingMouse = false;
var g_oldX, g_oldY;
var deviceArr = JSON.parse(fb.GetOutputDevices());
g_tooltip.Text = get_output_device_name();


// 获取当前选择的播放设备名字
function get_output_device_name(){
	var activity_device_name = "Not Found";
	deviceArr = JSON.parse(fb.GetOutputDevices());
	
	for (var i = 0; i < deviceArr.length; i++) {
		if (deviceArr[i].active) {
			activity_device_name = deviceArr[i].name;
			break;
		};
	};
	return activity_device_name;
};


// 鼠标移动的时候显示当前播放设备名字
function on_mouse_move(x, y) {
	// if (x > imgDstX && x < clickAreaX2 && y > imgDstY && y < clickAreaY2) {}
    if (!g_trackingMouse) {
        g_tooltip.Activate();
        g_tooltip.TrackActivate = true;
        g_trackingMouse = true;
    }

    // Make sure the position is changed
    if (g_oldX != x || g_oldY != y) {
        // add offsets here
        g_tooltip.TrackPosition(x + 20, y + 20);
        g_oldX = x;
        g_oldY = y;
    }
}

// 鼠标离开隐藏当前播放设备名字
function on_mouse_leave() {
    g_trackingMouse = false;
    g_tooltip.TrackActivate = false;
}

// 播放设备切换的时候修改显示的设备名字
function on_output_device_changed(){
	g_tooltip.Text = get_output_device_name(); 
	};
