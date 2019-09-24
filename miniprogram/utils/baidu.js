const URI="https://api.map.baidu.com";
const fetch=require("./fetch.js");

function fetchApi(type,params){
  return fetch(URI,type,params)
}

// 根据经度纬度获取城市
function getCityName(latitude = 39.90403, longitude = 116.407526){
  const params={
    location:`${latitude},${longitude}`,
    output:"json",
    // ak: 'kVtxWvHzGcShN37KcBcywI27ZfkQRgN3'
    ak: 'B61195334f65b9e4d02ae75d24fa2c53'
  }
  return fetchApi("geocoder/v2/",params).then(res=>res.data.result.addressComponent.city)
}

module.exports={getCityName};

