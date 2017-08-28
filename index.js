#!/usr/bin/env node

var axios = require("axios")
var pinyin  = require("node-pinyin")
var data = {}
var city = {}
var cityPy = ''
if(process.argv[2]){
  var d = pinyin(process.argv[2],{"style": 'normal'})
  for(var i = 0; i < d.length; i++){
    cityPy += d[i]
  }
  data.params = {
    location: cityPy
  }
  axios.get('https://weixin.jirengu.com/weather/cityid',data)
  .then(function(response){
    city.params = {
      cityid: response.data.results[0].id
    }
    axios.get('https://weixin.jirengu.com/weather/now',city)
    .then(function(response){
      var wt = response.data.weather[0]
      console.log("城市：" + wt.city_name)
      console.log("天气：" + wt.now.text)
      console.log("温度：" + wt.future[0].high + "℃ ~" + wt.future[0].low + "℃" )
      console.log("风向：" + wt.now.wind_direction + "风")
      console.log("风力：" + parseInt(wt.now.wind_scale) + "级")
      console.log("当前温度：" + wt.now.temperature + "℃")
      console.log("pm25：" + wt.now.air_quality.city.pm25)
    })
    .catch(function(error){
      console.log(error)
    })
  })
  .catch(function(error){
    console.log(error)
  })
} else {
    axios.get('https://weixin.jirengu.com/weather')
    .then(function(response){
      var wt = response.data.weather[0]
      console.log("城市：" + wt.city_name)
      console.log("天气：" + wt.now.text)
      console.log("温度：" + wt.future[0].high + "℃ ~" + wt.future[0].low + "℃" )
      console.log("风向：" + wt.now.wind_direction + "风")
      console.log("风力：" + parseInt(wt.now.wind_scale) + "级")
      console.log("当前温度：" + wt.now.temperature + "℃")
      console.log("pm25：" + wt.now.air_quality.city.pm25)
    })
    .catch(function(error){
      console.log(error)
    })
}


  