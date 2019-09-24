// 抓取远程API的结构
module.exports=function(api,path,params){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${api}/${path}`,
      data:Object.assign({},params),
      header:{
        "content-Type":"json"
      },
      success:resolve,
      fail:reject
    })
  })
}