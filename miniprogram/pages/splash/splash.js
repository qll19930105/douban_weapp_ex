// pages/splash/splash.js
// 获取全局应用程序实例对象
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data:{
    movies: [],
    loading: true
  },
  getCache(){
    return new Promise(resolve=>{
      app.wechat.getStorage('last_splash_data')
      .then(res=>{
        const {movies,expires}=res.data;
          // 有缓存，判断是否过期
          if (movies && expires > Date.now()) {
            return resolve(res.data)
          }
          // 已经过期
          console.log('uncached')
          return resolve(null)
        })
        .catch(e => resolve(null))
    })
  },
  handleStart(){
    wx.switchTab({
      url: '../board/board',
    })
  },
  loadMore:function(){
    wx.cloud.callFunction({
      name: "movielist",
      data: {
        type: "coming_soon",
        start: 0,
        count: 1
      }
    }).then(res => {
      var rows = JSON.parse(res.result).subjects;
      this.setData({
        movies: rows,
        loading: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();

    
    this.getCache()
    .then(cache=>{
      if(cache){
        return this.setData({
          movies:cache.movies,
          loading:false
        })
      }
      // app.douban.find("coming_soon",1,1)
      // .then(res=>{
      //   this.setData({
      //     movies:res.subjects,
      //     loading:false
      //   });
        return app.wechat.setStorage("last_splash_data",{
          // movies:res.subjects,
           movies:this.data.movies,
          expires:Date.now()+1*24*60*60*1000
        // })
      })
      .then(()=>{console.log("storage last splash data")})
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  }
})