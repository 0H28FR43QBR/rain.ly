const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) =>{
    const city = req.body.cityname;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=05af9f25cd15c7ddbf867e1152167c63&lang=pl&units=metric`
    https.get(url, (message) =>{
        message.on("data", (data) =>{
            const jsondata = JSON.parse(data);
            const iconURL = `http://openweathermap.org/img/wn/${jsondata.weather[0].icon}@2x.png`;
            res.render("weatherresults", {cityName: jsondata.name, 
                temperature: jsondata.main.temp, 
                pressure: jsondata.main.pressure, 
                humidity: jsondata.main.humidity, 
                windspeed: jsondata.wind.speed, 
                winddirection: jsondata.wind.deg, 
                visibility: jsondata.visibility, 
                icon: iconURL, 
                description: jsondata.weather[0].description})
        });
    })
});

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});