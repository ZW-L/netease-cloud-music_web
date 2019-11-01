## 网易云音乐 Web 客户端

基于 Vue 实现的网易云音乐 Web 客户端，在线地址：[vue-netease-cloud-music-web](http://zwlife.top)。

### 技术栈
`vue`, `vue-router`, `vuex`, `axios`, `webpack`, `sass`

### 感谢

[Vue](https://cn.vuejs.org/)

[网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 本地安装

首先安装 [网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)
```
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install 
$ node app.js
```

再安装
```
git clone git@github.com:ZW-L/netease-cloud-music_web.git music
cd music
npm install
npm run serve
```
**注意：** `NeteaseCloudMusicApi` 服务默认启动的端口是 `3000`，对应本项目 `vue.config.js` 文件中设置的代理端口，需要更改时务必保持同步。


## 概览

### 效果

![主页](/public/doc/gif_01.gif)
![播放](/public/doc/gif_02.gif)

### 已实现功能
+ 基本完成的页面：
  + 推荐 /discover/recommend
  + 排行榜 /discover/toplist
  + 歌单 /discover/playlist
  + 新碟上架 /discover/album
  + 专辑详情 /album
  + 歌单详情 /song
  + 歌曲详情 /playlist
+ 基本实现的功能有：
  + 播放功能(播放条、播放详情、播放控制、播放模式、播放列表管理等)
  + 首页搜索功能

### 待添加页面
+ 电台 /discover/djradio
+ 歌手 /discover/artist
+ 歌手详情 /artist
+ 搜索详情 /search
+ 用户详情 /user

### 待添加功能
+ 评论浏览
+ MV 播放
+ 本地数据存储

### 待优化
+ 数据的获取和存储优化
+ 组件提取和优化
+ 数据加载时的页面优化
+ 特效和动画优化




## 更新日志

### 2019.10.31

+ 添加关于网站声明
+ 修改播放列表为空时，添加到播放列表时不会播放的 BUG
+ 添加播放详情的删除单个歌曲功能

### 2019.10.30

+ 添加搜索功能，现在能根据关键字搜索显示简短结果，并能点击跳转到指定页面(目前仅限歌曲、歌单、专辑页面跳转)
+ 优化专辑介绍了歌单介绍
+ 修复播放列表只有一个条目时，循环模式和随机模式会暂停播放的 BUG
### 2019.10.29

+ 优化 store，使用 actions 管理 mutations
+ 添加播放详情组件，并优化播放控制(上一曲、下一曲、播放模式、列表显示、管理列表、歌词显示)

### 2019.10.28

+ 优化部分路由跳转和数据获取
+ 优化推荐页面的 UI，使用 vue 的进入/离开过渡实现了 “新碟上架” 的动画特效

### 2019.10.27

+ 添加专辑详情页
+ 重构歌曲表格组件 `<SongListTable>`，现在能用于歌单详情页和专辑详情页
+ 完善各组件的数据获取
+ 完善部分链接路由导航

### 2019.10.26

+ 完善歌曲详情页和歌单详情页
+ 重构侧边栏组件 `<AsideGroup>`，现在能提供多个页面的侧边栏组装
