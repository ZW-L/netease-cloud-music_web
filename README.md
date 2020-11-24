## 网易云音乐 Web 客户端

基于 Vue 实现的网易云音乐 Web 客户端，在线地址：[vue-netease-cloud-music-web](http://webmusic.zwlife.top)。

### 技术栈

+ `vue`, `vue-router`, `vuex`
+ `axios`
+ `webpack`
+ `sass`
+ `element-ui`


### 感谢

+ [Vue](https://cn.vuejs.org/)
+ [网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)


### 本地安装

+ 安装 [网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)
```
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install 
$ node app.js
```

+ 安装本项目
```
git clone git@github.com:ZW-L/netease-cloud-music_web.git music
cd music
npm install
npm run serve
```
**注意：** `NeteaseCloudMusicApi` 服务默认启动的端口是 `3000`，对应本项目 `vue.config.js` 文件中设置的代理端口，需要更改时务必保持同步。




## 概览

### 效果

![主页](/doc/gif_01.gif)
![播放](/doc/gif_02.gif)


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
