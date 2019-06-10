
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path=require('path')
const app = express()
var ejs=require('ejs');


const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partial');
app.set('views', viewsPath);

const apiKey = 'bee62a014a42f0e6252fbd368fcaeb2d';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
          console.log(weather)
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!<br>Wind : ${weather.wind.speed} mph <br>Humidity : ${weather.main.humidity}%`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
