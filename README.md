# MSBlue

## 1. 简介

![](/imgs/UI2.png)

Foobar2000 Customized Interface

**MSBlue**（Medium Slate Blue）是一个基于 [**foobar2000-x64_v2.2.x**](https://www.foobar2000.org/download)、[**Columns UI**](https://github.com/reupen/columns_ui) 定制版本。

> 仅在WIN11测试。

## 2. 使用

1. 下载 **64bit** 的 [Foobar2000](https://www.foobar2000.org/download);

2. 使用 **便携** 方式安装软件;

3. 把仓库的 `\profile` 复制到 foobar2000 **安装目录**中即可；

> 新安装的 foobar2000 的便携版**不要启动**，此时不会生成 `profile` 目录，
>
> 直接复制旧版的 `profile` 到新版本的 foobar 安装目录即可！没有覆盖文件操作可以减少出错的情况！！！！
>

> 安装目录参考:
>
> 便携安装版的用户配置：`foobar2000\profile`，
>
> 非便携版本在 Win 用户的路径中：`C:\Users\用户名\AppData\Roaming\foobar2000`

## 3. 电台封面

利用 [foo\_external\_tags](https://wiki.hydrogenaud.io/index.php?title=Foobar2000:Components/External_Tags_(foo_external_tags)) 插件把电台的名字、专辑、艺人信息等信息补全。

1. 下载电台封面到一个指定文件夹中（建议封面命名和电台名字一致，方便后续使用）；

2. 打开 `Foobar -> Preferences -> Display -> Album art -> Front cover`，添加电台封面所在路径，
	
	示例参数：
	
	利用电台Url标识设置路径：`$if($strstr(%path%,'://'),E:\Music\_Extras\Radio\%title%.*)`；
	
	固定路径：`E:\Music\_Extras\Radio\%title%.*`（优先级最低，不然会覆盖同名歌曲）。

3. 需要显示封面的地方选择 `Front cover` 即可显示（`Artist` 设置类似）。

> `/imgs/Radio`：内置的几个电台封面。

## 4. 字体

更纱黑体：[be5invis/Sarasa-Gothic](https://github.com/be5invis/Sarasa-Gothic)