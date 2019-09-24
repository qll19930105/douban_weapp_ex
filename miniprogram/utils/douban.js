const URI = 'https://douban-api.uieee.com/v2/movie';
const fetch = require('./fetch');

// 抓取豆瓣电影特定类型的API
function fetchApi(type, params) {
  return fetch(URI, type, params)
}

// 获得列表类型的数据
function find(type,page=1,count=20,search=""){
  const params={
    start:(page-1)*count,
    count:count,
    city:getApp().data.currentCity
  };
  return fetchApi(type,search?Object.assign(params,{q:search}):params).then(res=>res.data)
}

// 获得单条类型的数据
function findOne(id){
  return fetchApi("subject/"+id).then(res=>res.data)
}

module.exports = { find, findOne}