#!/usr/bin/env node

var axios = require("axios")
var pinyin  = require("node-pinyin")
var data = {}
var city = {}
var cityPy = ''
if(process.argv[2]){
  data.params = {
    city: process.argv[2]
  }
  axios.get('https://jirenguapi.applinzi.com/weather.php',data)
  .then(function(response){
    var wt = response.data.results[0]
    console.log("城市：" + wt.currentCity)
    console.log("天气：" + wt.weather_data[0].weather)
    console.log("温度：" + wt.weather_data[0].temperature )
    console.log("风向：" + wt.weather_data[0].wind)
    console.log(wt.weather_data[0].date.match(/\((.+)\)$/)[1])
    console.log("pm25：" + wt.pm25)
    })
  .catch(function(error){
    console.log(error)
  })
} else {
    axios.get('https://jirenguapi.applinzi.com/weather.php')
    .then(function(response){
      var wt = response.data.results[0]
      console.log("城市：" + wt.currentCity)
      console.log("天气：" + wt.weather_data[0].weather)
      console.log("温度：" + wt.weather_data[0].temperature )
      console.log("风向：" + wt.weather_data[0].wind)
      console.log(wt.weather_data[0].date.match(/\((.+)\)$/)[1])
      console.log("pm25：" + wt.pm25)
    })
    .catch(function(error){
      console.log(error)
    })
}


  