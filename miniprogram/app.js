//app.js
// 引入wechat API模块
const wechat = require('./utils/wechat.js')
// 引入douban API模块
const douban = require('./utils/douban.js')
// 引入baidu API模块
const baidu = require('./utils/baidu.js')

// 定义全局对象
App({
  data:{
    name:"Douban Movie",
    version:"0.1.0",
    currentCity:"北京"
  },
  wechat:wechat,
  douban:douban,
  baidu:baidu,
  onLaunch(){
    wx.cloud.init({
      traceUser: true,
    });//云函数初始化
    wechat.getLocation()
    .then(res=>{
      const {latitude,longitude}=res;
      return baidu.getCityName(latitude,longitude)
    })
    .then(name=>{
      this.data.currentCity=name.replace("市","");
      console.log(`currentCity:${this.data.currentCity}`)
    })
    .catch(err=>{
      this.data.currentCity="北京";
      console.log(err);
    })
  }
})
