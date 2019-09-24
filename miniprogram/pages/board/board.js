// pages/board/board.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards:[
      {key:"in_theaters"},
      {key:"coming_soon"},
      {key:"new_movies"},
      {key:"top250"}
    ]
  },
 getBoard:function(){
   wx.showLoading({
     title: '拼命加载中...',
   });
   const tasks=this.data.boards.map(board=>{
     return wx.cloud.callFunction({
         name: "movielist",
         data: {
           type: board.key,
           start: 0,
           count: 8
         }
       }).then(res => {
         board.title = board.key;
         board.movies = JSON.parse(res.result).subjects;
         return board;
       })
    })
   Promise.all(tasks).then(res=>{
     this.setData({
       boards:res
     });
     wx.hideLoading();
   })
   console.log(this.data.boards)
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getBoard();
        // return app.douban.find(board.key,1,8)
        //   .then(res=>{
        //     board.title=res.title;
        //     board.movies=res.subjects;
        //     return board;
        //   })
      // Promise.all(tasks).then(boards=>{
      //   this.setData({
      //     boards:boards,
      //     loading:false
      //   });
      //   wx.hideLoading();
      // })
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

  }
})