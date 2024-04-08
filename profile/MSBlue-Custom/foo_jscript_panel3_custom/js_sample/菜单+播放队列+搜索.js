// ==PREPROCESSOR==
// @name "菜单+播放队列+搜索"
// @author "jin"
// @version "1.0.1"
// @import "%fb2k_component_path%helpers.txt"
// @import "%fb2k_component_path%samples\js\lodash.min.js"
// @import "%fb2k_component_path%samples\js\common.js"
// @import "%fb2k_component_path%samples\js\panel.js"
// ==/PREPROCESSOR==

// @create 2024-04-06
// @update 2024-04-06
// @desc 参考作者的 "Menu + Playback Buttons + Custom Colours"、"Menu Button" 组件修改的代码。 

var colours = {
    buttons: RGB(148, 161, 178),
    background: window.GetColourCUI(3)
};

// _panel 定义在 "%fb2k_component_path%samples\js\panel.js"
var panel = new _panel();
// button、scale 等定义在 "%fb2k_component_path%samples\js\common.js"
var buttons = new _buttons();
// 这里是返回的是单个button大小
var bs = _scale(20);

// chars.menu 这些按钮信息 定义在 "%fb2k_component_path%helpers.txt" 中，值是一个编码，具体标识应该不是js写的。 
buttons.buttons.menu = new _button(0, 0, bs, bs, { char: chars.menu, colour: colours.buttons }, null, function () { _menu(0, bs); }, 'Menu');
buttons.buttons.queue = new _button(bs, 0, bs, bs, { char: chars.list, colour: colours.buttons }, null, function () { fb.RunMainMenuCommand('View/Queue Viewer'); }, 'Queue List');
buttons.buttons.search = new _button(bs * 2, 0, bs, bs, { char: chars.search, colour: colours.buttons }, null, function () { fb.RunMainMenuCommand('Edit/Search'); }, 'Playlist Search');

function on_mouse_lbtn_up(x, y, mask) {
    // 点击坐标
    // console.log("点击坐标");
    // console.log(x, y);
    buttons.lbtn_up(x, y, mask);
}

function on_mouse_leave() {
    buttons.leave();
}

function on_mouse_move(x, y) {
    buttons.move(x, y);
}

function on_mouse_rbtn_up(x, y) {
    if (buttons.buttons.menu.containsXY(x, y)) {
        _help(0, bs);
        return true;
    }
    return panel.rbtn_up(x, y);
}

function on_paint(gr) {
    gr.Clear(colours.background);
    buttons.paint(gr);
}

function on_size() {
    panel.size();
}