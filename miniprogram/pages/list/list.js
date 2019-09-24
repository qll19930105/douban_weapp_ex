// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     pno:0,
     type:""
  },
  loadMore:function(){
    var pno=this.data.pno+1;
    this.setData({pno});
    var offset=(pno-1)*4;
    wx.cloud.callFunction({
      name:"movielist",
      data:{
        type:this.data.type,
        start:offset,
        count:6
      }
    }).then(res=>{
      var rows=JSON.parse(res.result).subjects;
      var lists=this.data.list.concat(rows);
      this.setData({
        list:lists
      })
      console.log(lists);
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.type + ' « 电影 « 豆瓣' })
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})