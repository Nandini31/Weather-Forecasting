const { response } = require("express");
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
        const query=req.body.cityName; 
        const appkey="2db6dbc958bdaf77961fa94730cb877a";
        const unit="metric";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units="+unit;
    
        
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temperature=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+query+ " is "+temperature+" degree celsius.</h1>");
            res.write("<h2><strong> Description "+weatherDescription+"</strong></h2>");
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
});
app.listen(3000,function(){
    console.log("Server is starting at port 3000");
});