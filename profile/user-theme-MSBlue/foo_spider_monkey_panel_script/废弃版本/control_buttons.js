/**
 * @file control_buttons.js
 * @author XYSRe
 * @created 2025-12-12
 * @updated 2025-12-18
 * @version 1.0.0
 * @description 一个包含 [声音输出设备按钮 + 声音控制 + 打开搜索 + 打开队列 + 菜单] 的控件
 */

"use strict";

// 未清楚options、features是否生效
window.DefineScript("Control Buttons", {
  author: "XYSRe",
  version: "1.0.0",
  options: { grab_focus: false },
  // features: { grab_focus: false }
});

// include 语句的先后顺序是至关重要的，必须严格遵守依赖关系！

// Lodash 是一个流行的 JavaScript 工具库，提供了许多高效的函数（如数组操作、对象操作、函数节流/防抖等），用于简化编程。它是高度优化的。
include(fb.ComponentPath + "samples\\complete\\js\\lodash.min.js");
// 不使用作者完整的内容，改为下方自行精简移植的
// include(fb.ComponentPath + "samples\\complete\\js\\helpers.js");
// 声音控制条，直接把代码复制过来了
// include(fb.ComponentPath + "samples\\complete\\js\\volume.js");
// 该面板支持右键自定义背景颜色，基本用不到，直接代码中写死了, 代码中 const panel = new _panel(true); 相关内容取消注释即可恢复
// include(fb.ComponentPath + "samples\\complete\\js\\panel.js");
include(
  fb.ProfilePath +
    "\\user-theme-MSBlue\\foo_spider_monkey_panel_script\\_helpers.js"
);

const colors = {
  // 声音指示背景
  volume_slider_bg: _RGB(148, 161, 178),
  // 当前声音指示
  volume_slider_fg: _RGB(255, 255, 254),
  volume_slider_fg_hover: _RGB(183, 162, 246),
  // 背景颜色 使用 全局系统设置背景色
  //bgColour: window.GetColourCUI(5),
  bg: _RGB(23, 23, 23),
};

// 一个基础panel，用于绘制背景颜色
// const panel = new _panel(true);

// 读取图片
// C:\XX\foobar2000-x64_v2.25.3\profile\\user-theme-MSBlue\imgs\png\
const imgs_folder = fb.ProfilePath + "\\user-theme-MSBlue\\imgs\\Lucide\\";
const imgs = {
  recent: gdi.Image(imgs_folder + "history.png"),
  recent_hover: gdi.Image(imgs_folder + "history_hover.png"),
  favorite: gdi.Image(imgs_folder + "flame.png"),
  favorite_hover: gdi.Image(imgs_folder + "flame_hover.png"),
  replaygain_off: gdi.Image(imgs_folder + "replaygain_off.png"),
  replaygain_track_on: gdi.Image(imgs_folder + "replaygain_track_on.png"),
  replaygain_other_on: gdi.Image(imgs_folder + "replaygain_other_on.png"),
  replaygain_hover: gdi.Image(imgs_folder + "replaygain_hover.png"),
  vol: gdi.Image(imgs_folder + "volume.png"),
  vol_hover: gdi.Image(imgs_folder + "volume_hover.png"),
  mute: gdi.Image(imgs_folder + "volume_mute.png"),
  mute_hover: gdi.Image(imgs_folder + "volume_mute_hover.png"),
  asio: gdi.Image(imgs_folder + "asio.png"),
  asio_hover: gdi.Image(imgs_folder + "asio_hover.png"),
  wasapi_share: gdi.Image(imgs_folder + "wasapi_share.png"),
  wasapi_share_hover: gdi.Image(imgs_folder + "wasapi_hover.png"),
  wasapi: gdi.Image(imgs_folder + "wasapi.png"),
  wasapi_hover: gdi.Image(imgs_folder + "wasapi_hover.png"),
  search: gdi.Image(imgs_folder + "search.png"),
  search_hover: gdi.Image(imgs_folder + "search_hover.png"),
  queue: gdi.Image(imgs_folder + "queue.png"),
  queue_hover: gdi.Image(imgs_folder + "queue_hover.png"),
  menu: gdi.Image(imgs_folder + "menu.png"),
  menu_hover: gdi.Image(imgs_folder + "menu_hover.png"),
};

// 指定通用图标缩放后宽度，避免图片过大, 指定默认元素间距
const icon_w = _scale(15);
const icon_h = _scale(15);
const default_margin = _scale(6);

// 定义元素信息
// elements = {
//   device_btn: {
//     name: "输出设备按钮",
//     x: 0, 元素渲染位置x坐标
//     y: 0, 元素渲染位置y坐标
//     w: icon_w, 元素渲染宽
//     h: icon_h, 元素渲染高
//     margin: _scale(4), 元素距离右侧间距;
//     img: imgs.wasapi_share, 元素显示图片
//     func: false, 按钮点击触发函数
//     tiptext: "输出设备", 按钮hover文案
//     is_btn: true, 控制init_buttons()中是否创建按钮
//     query: '',  创建指定播放列表查询语法
//     sort_pattern: "",  排序
//     target_playlist: "",  目标播放列表
//     limit: 20,  指定条数
//   },
// }
const elements = {
  recent_btn: {
    name: "最近播放",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.recent, hover: imgs.recent_hover },
    func: __run_custom_query,
    tiptext: "最近播放",
    is_btn: true,
    query: "%last_played% PRESENT",
    sort_pattern:
      "%last_played%|%artist%|%date%|%album%|%discnumber%|%tracknumber%",
    target_playlist: "🕤️ 最近播放",
    limit: 50,
  },
  favorite_btn: {
    name: "最爱，播放最多的 最受欢迎",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.favorite, hover: imgs.favorite_hover },
    func: __run_custom_query,
    tiptext: "最受欢迎",
    is_btn: true,
    query: "%play_count% PRESENT",
    sort_pattern:
      "%play_count%|%artist%|%date%|%album%|%discnumber%|%tracknumber%",
    target_playlist: "🔥 最受欢迎",
    limit: 50,
  },
  queue_btn: {
    name: "队列按钮",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.queue, hover: imgs.queue_hover },
    func: (x, y, mask) => {
      fb.RunMainMenuCommand("View/Queue Viewer");
    },
    tiptext: "队列",
    is_btn: true,
  },
  search_btn: {
    name: "搜索按钮",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.search, hover: imgs.search_hover },
    func: (x, y, mask) => {
      fb.RunMainMenuCommand("View/Show now playing in playlist");
      fb.RunMainMenuCommand("Edit/Search");
    },
    tiptext: "播放列表搜索",
    is_btn: true,
  },
  replaygain_btn: {
    name: "音轨增益",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.replaygain_off, hover: imgs.replaygain_hover },
    func: (x, y) => {
      fb.ReplaygainMode = fb.ReplaygainMode === 0 ? 1 : 0;
    },
    tiptext: "应用音轨增益",
    is_btn: true,
  },
  device_btn: {
    name: "切换ASIO",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.wasapi_share, hover: imgs.wasapi_share_hover },
    func: null,
    tiptext: "切换ASIO输出",
    is_btn: true,
  },
  volume_btn: {
    name: "声音按钮",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: _scale(2),
    img: { normal: imgs.vol, hover: imgs.vol_hover },
    func: (x, y, mask) => {
      fb.VolumeMute();
    },
    tiptext: "静音",
    is_btn: true,
  },
  volume: {
    name: "声音显示条",
    x: 0,
    y: 0,
    w: _scale(60),
    h: _scale(3),
    margin: default_margin,
    is_btn: false,
  },
  menu_btn: {
    name: "菜单按钮",
    x: 0,
    y: 0,
    w: icon_w,
    h: icon_h,
    margin: default_margin,
    img: { normal: imgs.menu, hover: imgs.menu_hover },
    func: _menu,
    tiptext: "菜单",
    is_btn: true,
  },
};

// 播放增益模式，对应 fb.ReplaygainMode 的值
const replaygain_mode_configs = [
  {
    name: "None",
    value: 0,
    img: { normal: imgs.replaygain_off, hover: imgs.replaygain_hover },
    tiptext: "应用音轨增益",
  },
  {
    name: "Track",
    value: 1,
    img: { normal: imgs.replaygain_track_on, hover: imgs.replaygain_hover },
    tiptext: "取消音轨增益",
  },
  {
    name: "Album",
    value: 2,
    img: { normal: imgs.replaygain_other_on, hover: imgs.replaygain_hover },
    tiptext: "取消专辑增益",
  },
  {
    name: "Track/Album by Playback Order",
    value: 3,
    img: { normal: imgs.replaygain_other_on, hover: imgs.replaygain_hover },
    tiptext: "取消播放顺序增益",
  },
];

// 定义几个常用的输出设备信息
// 后续设备名字变了之后，修改name即可
// name来源：Perfenence -> Playback -> Output -> Devices
// 2. 使用配置对象集中管理不同模式下的图片和下一命令
// 关键：我们定义的是“当前设备”下的配置，以及“点击后要切换到的目标命令”。
const deviceConfigs = {
  "ASIO : aune USB Audio Device": {
    img: { normal: imgs.asio, hover: imgs.asio_hover },
    // 目标：切换到 WASAPI Share
    command: "Playback/Device/WASAPI (shared) : Default Sound Device",
    tiptext: "切换WASAPI Share输出",
  },
  "Default : Primary Sound Driver [exclusive]": {
    img: { normal: imgs.wasapi, hover: imgs.wasapi_hover },
    // 目标：切换到 WASAPI Share
    command: "Playback/Device/WASAPI (shared) : Default Sound Device",
    tiptext: "切换WASAPI Share输出",
  },
  // 默认配置，用于 WASAPI Share 或其他未匹配的设备
  default: {
    img: { normal: imgs.wasapi_share, hover: imgs.wasapi_share_hover },
    // 目标：切换到 ASIO
    command: "Playback/Device/ASIO : aune USB Audio Device",
    tiptext: "切换ASIO输出",
  },
};

// 初始化声音控制条
const volume = new _volume(0, 0, 0, 0);
volume.c1 = colors.volume_slider_bg;
volume.c2 = colors.volume_slider_fg;
volume.h = elements.volume.h;
volume.w = elements.volume.w;

// _buttons 定义看samples\\complete\\js\\helpers.js
const buttons = new _buttons();

// 这里只重新生成按钮会改变的按钮, 避免所有按钮都重新 new _button
// --- 1. 独立函数：更新 ReplayGain 按钮 ---
function update_replaygain_btn() {
  // 获取当前增益状态, 非 0~3 异常的时候直接拿 0
  const current_replaygain_mode =
    replaygain_mode_configs[fb.ReplaygainMode] || replaygain_mode_configs[0]; // 确保 fallback 到配置对象

  // 创建或更新按钮
  buttons.buttons.replaygain_btn = new _button(
    elements.replaygain_btn.x,
    elements.replaygain_btn.y,
    elements.replaygain_btn.w,
    elements.replaygain_btn.h,
    current_replaygain_mode.img,
    elements.replaygain_btn.func,
    current_replaygain_mode.tiptext
  );
}

// --- 2. 独立函数：更新输出设备按钮 ---
function update_device_btn() {
  // 1. 获取当前设备名称
  const device_output_name = __get_output_device_name();

  // 2. 根据设备名称查找配置，如果没有找到则使用 default 配置
  const currentConfig =
    deviceConfigs[device_output_name] || deviceConfigs.default;

  // 3. 创建或更新按钮
  buttons.buttons.device_btn = new _button(
    elements.device_btn.x,
    elements.device_btn.y,
    elements.device_btn.w,
    elements.device_btn.h,
    currentConfig.img,
    // 注意：func 需要捕获 currentConfig 变量
    (x, y) => {
      fb.RunMainMenuCommand(currentConfig.command);
    },
    currentConfig.tiptext
  );
}

// --- 3. 独立函数：更新音量/静音按钮 ---
function update_volume_btn() {
  const isMuted = fb.Volume === -100;

  // 决定图片和提示文本
  const volumeState = isMuted
    ? {
        images: { normal: imgs.mute, hover: imgs.mute_hover },
        tiptext: "取消静音",
      }
    : {
        images: { normal: imgs.vol, hover: imgs.vol_hover },
        tiptext: "静音",
      };

  // 创建或更新按钮
  buttons.buttons.volume_btn = new _button(
    elements.volume_btn.x,
    elements.volume_btn.y,
    elements.volume_btn.w,
    elements.volume_btn.h,
    volumeState.images,
    elements.volume_btn.func,
    volumeState.tiptext
  );
}

// 根据元素定义信息初始化按钮
function init_buttons() {
  for (const [key, element] of Object.entries(elements)) {
    if (element.is_btn) {
      // function _button(x, y, w, h, img_src, fn, tiptext)
      buttons.buttons[key] = new _button(
        element.x,
        element.y,
        element.w,
        element.h,
        element.img,
        element.func,
        element.tiptext
      );
    }
  }
  update_replaygain_btn();
  update_device_btn();
  update_volume_btn();
}

init_buttons();

// 尺寸变化时候更新按钮位置信息
function update_buttons_position() {
  for (const [key, button] of Object.entries(buttons.buttons)) {
    // function _button(x, y, w, h, img_src, fn, tiptext)
    // console.log("key:" + key);
    // console.log("element:" + button.x);
    button.x = elements[key].x;
    button.y = elements[key].y;
  }
}

function on_size() {
  // panel.size();
  // console.log("on_size() 重新计算");

  // console.log("Panel window width:" + ww);
  // 计算所有元素总宽度，元素 w + margin
  let total_width = 0;
  for (const element of Object.values(elements)) {
    // console.log("total_width t1:" + total_width);
    total_width += element.w + element.margin;
    // console.log("total_width t2:" + total_width);
  }
  // console.log("Elements total width:" + total_width);
  // 元素布局 x 起点 ，这里使用靠右布局，居中布局: (ww - total_width)/2
  let startX = window.Width - total_width;
  // 元素布局 y 中心
  let centerY = Math.round(window.Height / 2);

  // 计算每个元素的x、y
  for (const element of Object.values(elements)) {
    element.x = startX;
    element.y = Math.round(centerY - element.h / 2);
    // 更新元素布局起点, 原起点 + 当前元素w + 当前元素margin
    startX += element.w + element.margin;
    // console.log(element);
  }
  // 更新声音进度条x y属性
  volume.x = elements.volume.x;
  volume.y = elements.volume.y;
  // 更新按钮位置信息
  update_buttons_position();
  // update_buttons();
}

function on_paint(gr) {
  // console.log("-------\non_paint() 重新绘制");
  // 绘制最底层panel，用于定义颜色
  // panel.paint(gr);
  gr.FillSolidRect(0, 0, window.Width, window.Height, colors.bg);

  // 绘制按钮
  buttons.paint(gr);
  // 绘制声音进度条
  gr.FillRoundRect(
    volume.x,
    volume.y,
    volume.w,
    volume.h,
    _scale(1),
    _scale(1),
    volume.c1
  );
  // 由于是圆角矩形，volume.pos() 的值太小的时候会绘制图形失败，所以volume.pos()太小的时候绘制
  if (volume.pos() >= 6) {
    gr.FillRoundRect(
      volume.x,
      volume.y,
      volume.pos(),
      volume.h,
      _scale(1),
      _scale(1),
      volume.c2
    );
  }
  // console.log("----------");
}

function on_mouse_lbtn_down(x, y) {
  volume.lbtn_down(x, y);
}

function on_mouse_lbtn_up(x, y) {
  volume.lbtn_up(x, y);
  buttons.lbtn_up(x, y);

  if (buttons.buttons.replaygain_btn.trace(x, y)) {
    update_replaygain_btn();
  } else if (buttons.buttons.device_btn.trace(x, y)) {
    update_device_btn();
  } else if (buttons.buttons.volume_btn.trace(x, y)) {
    update_volume_btn();
  }
  window.Repaint();
}

function on_mouse_rbtn_down(x, y) {
  // 不能用 on_mouse_rbtn_up() 这个函数会触发默认的 右键菜单，原因未知
  // 输出设备区域弹出设备选择菜单
  if (buttons.buttons.device_btn.trace(x, y)) {
    __devices_menu(x, y);
  }
}

// function on_mouse_rbtn_up(x, y) {
//   // 弹出panel的颜色定制菜单
//   // panel.rbtn_up(x, y);
// }

function on_mouse_move(x, y) {
  volume.move(x, y);
  buttons.move(x, y);
  // 声音指示条hover颜色
  if (volume.trace(x, y)) {
    volume.c2 = colors.volume_slider_fg_hover;
    window.RepaintRect(volume.x, volume.y, volume.w, volume.h);
  } else {
    volume.c2 = colors.volume_slider_fg;
    window.RepaintRect(volume.x, volume.y, volume.w, volume.h);
  }
}

function on_mouse_leave() {
  buttons.leave();
}

function on_mouse_wheel(s) {
  volume.wheel(s);
}

function on_volume_change(val) {
  volume.volume_change();
  // console.log("当前音量: "+val);  // 当前音量 -100 ~ 0, console.log(fb.Volume) 也可以输出
  update_volume_btn();
  window.RepaintRect(
    buttons.buttons.volume_btn.x,
    buttons.buttons.volume_btn.y,
    buttons.buttons.volume_btn.w,
    buttons.buttons.volume_btn.h
  );
}

// function on_colours_changed() {
//   panel.colours_changed();
//   window.Repaint();
// }

// 播放设备切换的时候修改显示 独占状态 文本
function on_output_device_changed() {
  update_device_btn();
  window.RepaintRect(
    buttons.buttons.device_btn.x,
    buttons.buttons.device_btn.y,
    buttons.buttons.device_btn.w,
    buttons.buttons.device_btn.h
  );
}

function on_replaygain_mode_changed(new_mode) {
  update_replaygain_btn();
  window.RepaintRect(
    buttons.buttons.replaygain_btn.x,
    buttons.buttons.replaygain_btn.y,
    buttons.buttons.replaygain_btn.w,
    buttons.buttons.replaygain_btn.h
  );
}

// 获取当前选择的播放设备名字
function __get_output_device_name() {
  let device_output_name = "Not Found";
  const deviceArr = JSON.parse(fb.GetOutputDevices());
  for (let i = 0; i < deviceArr.length; i++) {
    if (deviceArr[i].active) {
      device_output_name = deviceArr[i].name;
      break;
    }
  }
  // console.log("device output now: " + device_output_name);
  return device_output_name;
}

/**
 * 显示音频输出设备的右键菜单，并处理设备切换。
 * 已知问题：on_mouse_rbtn_up() 切换设备之后会弹出默认的 panel右键菜单，原因未知, 应该使用 on_mouse_rbtn_down() 触发
 *
 * @param {number} x - 菜单显示位置的 x 坐标。
 * @param {number} y - 菜单显示位置的 y 坐标。
 */
function __devices_menu(x, y) {
  const menu = window.CreatePopupMenu();

  // 1. 获取并处理设备列表
  // fb.GetOutputDevices() 返回 JSON 字符串，解析为数组。
  // 数组元素格式：[{name: '...', active: true/false}, ...] https://theqwertiest.github.io/foo_spider_monkey_panel/assets/generated_files/docs/html/fb.html#.GetOutputDevices
  const devices = JSON.parse(fb.GetOutputDevices());

  // 使用 map 结合解构赋值来遍历数组，填充菜单项，并查找活动设备的索引
  let active_id = -1;
  let menu_id = 1; // 菜单项的 ID 从 1 开始

  // 映射设备数据到菜单创建和 ID 标记
  devices.map((device, index) => {
    // 解构赋值获取 name 和 active 属性
    const { name, active } = device;

    // 添加菜单项。使用 menu_id 作为命令 ID。
    menu.AppendMenuItem(MF_STRING, menu_id, name);

    // 如果设备处于活动状态，记录其在 devices 数组中的索引
    if (active) {
      active_id = index;
    }

    menu_id++;
  });

  // 2. 标记当前活动设备
  // 菜单项的 ID 是 1 到 devices.length。
  if (active_id > -1) {
    // active_id 是数组索引 (0-based)，菜单 ID 是 menu_id - 1 (1-based)。
    // 标记的菜单项 ID = active_id + 1
    // 范围检查：从 ID 1 到 ID devices.length (即 menu_id - 1)
    menu.CheckMenuRadioItem(1, menu_id - 1, active_id + 1);
  }

  // 3. 追踪菜单并获取用户选择
  const idx = menu.TrackPopupMenu(x, y);

  // 4. 处理选择结果, idx - 1 !== active_id 和当前选择一样不处理
  if (idx > 0 && idx - 1 !== active_id) {
    // idx 是菜单项的 ID (1-based)，需要转换回 devices 数组的索引 (0-based)
    const deviceIndex = idx - 1;

    // 使用模板字符串构建命令，比字符串拼接更清晰
    fb.RunMainMenuCommand(`Playback/Device/${devices[deviceIndex].name}`);
  }
  // // SMP中没有该方法，js panel中有 https://theqwertiest.github.io/foo_spider_monkey_panel/docs/faq/jsp_to_smp_migration_guide/#remove-toarray-and-dispose-methods
  // menu.Dispose();
}

/**
 * 核心功能：执行查询并移动结果
 */
function __run_custom_query(x, y) {
  let selectedElement = null;

  // 仅判断哪个按钮被点击
  if (buttons.buttons.recent_btn.trace(x, y)) {
    selectedElement = elements.recent_btn;
  } else if (buttons.buttons.favorite_btn.trace(x, y)) {
    selectedElement = elements.favorite_btn;
  }

  // 如果点击了有效按钮，则提取数据，否则保持默认 初始化一个默认查询, 最近一个星期发行的
  const {
    query = "%date% DURING LAST 1 WEEKS",
    sort_pattern = "%date%",
    target_playlist = "✨ Library View",
    limit = 1,
  } = selectedElement || {};

  // 1. 在媒体库中执行查询
  const handleList = fb.GetQueryItems(fb.GetLibraryItems(), query);
  // handleList.Count > 0  // 可以判断是否存在查询结果，这里不做处理, 不存在结果直接空
  // 1. 获取全库句柄
  // let handleList = fb.GetLibraryItems();

  // 2. 执行排序 (使用 TitleFormat 模式)
  // 第二个参数: 1 为升序, -1 为降序
  handleList.OrderByFormat(fb.TitleFormat(sort_pattern), -1);
  // 2. 如果结果超过了限制数量，删除多余的部分
  if (handleList.Count > limit) {
    // 参数：起始索引，删除数量
    handleList.RemoveRange(limit, handleList.Count - limit);
  }

  // 3. 查找或创建播放列表
  //  FindOrCreatePlaylist(name, unlocked) 找到播放列表返回对应索引，找不到创建一个列表返回其索引，unlocked 是否忽略上锁列表
  const plIndex = plman.FindOrCreatePlaylist(target_playlist, false);
  // 3. 操作播放列表
  plman.ClearPlaylist(plIndex); // 清空原列表 (可选)
  //  InsertPlaylistItems(playlistIndex, base, handle_list, selectopt)  selectopt：bool 是否选中列表内容
  plman.InsertPlaylistItems(plIndex, 0, handleList, false); // 插入查询结果
  plman.ActivePlaylist = plIndex; // 跳转到该列表
}

// 下方内容来自作者的 samples\\complete\\js\\volume.js
function _volume(x, y, w, h) {
  this.volume_change = () => {
    window.RepaintRect(this.x, this.y, this.w, this.h);
  };

  this.trace = (x, y) => {
    const m = this.drag ? 200 : 0;
    return (
      x > this.x - m &&
      x < this.x + this.w + m * 2 &&
      y > this.y - m &&
      y < this.y + this.h + m * 2
    );
  };

  this.wheel = (s) => {
    if (this.trace(this.mx, this.my)) {
      if (s == 1) {
        fb.VolumeUp();
      } else {
        fb.VolumeDown();
      }
      _tt("");
      return true;
    } else {
      return false;
    }
  };

  this.move = (x, y) => {
    this.mx = x;
    this.my = y;
    if (this.trace(x, y)) {
      x -= this.x;
      const pos = x < 0 ? 0 : x > this.w ? 1 : x / this.w;
      this.drag_vol = Math.max(-100, (10 * Math.log(pos)) / Math.LN2);
      _tt(this.drag_vol.toFixed(2) + " dB");
      if (this.drag) {
        fb.Volume = this.drag_vol;
      }
      this.hover = true;
      return true;
    } else {
      if (this.hover) {
        _tt("");
      }
      this.hover = false;
      this.drag = false;
      return false;
    }
  };

  this.lbtn_down = (x, y) => {
    if (this.trace(x, y)) {
      this.drag = true;
      return true;
    } else {
      return false;
    }
  };

  this.lbtn_up = (x, y) => {
    if (this.trace(x, y)) {
      if (this.drag) {
        this.drag = false;
        fb.Volume = this.drag_vol;
      }
      return true;
    } else {
      return false;
    }
  };

  this.pos = (type) => {
    return Math.ceil(
      (type == "h" ? this.h : this.w) * Math.pow(2, fb.Volume / 10)
    );
  };

  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.mx = 0;
  this.my = 0;
  this.hover = false;
  this.drag = false;
  this.drag_vol = 0;
}
