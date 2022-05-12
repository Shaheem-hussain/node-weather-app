// const request = require("request");
const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs')
const forecast=require("./utils/forecast");
const geocode = require("./utils/geocode");

const publicPath=path.join(__dirname,"./public");
const viewsPath=path.join(__dirname,"./templates/views");
const partialsPath=path.join(__dirname,"./templates/partials");
const port=process.env.PORT || 3000;

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath));

// const url="http://api.weatherstack.com/current?access_key=7261bfddc9c54f6747353a54d19f1ffa&query=10.015861,76.341866"

// request({url:url,json:true},(error,response)=>{
//     const currentData=response.body.current;
//     console.log(`It is currently ${currentData.temperature} degrees out.It feels like ${currentData.feelslike} degrees outside`)
// })

app.get("",(req,res)=>{
  res.render("index", {
    message: "you are successfully completed your task",
  });
})
app.get("/weather",(req,res)=>{
  if(!req.query.address){
    return res.send({error:"Please provide a search"})
  }else{
     geocode(req.query.address,(error,data)=>{
      if(error){
         res.send(error)
      }else{
       forecast(data.latitude,data.longitude,(error,data)=>{
         if(error){
           res.send(error)
         }else{
           res.send(data)
         }
       })
      }
    })
  }
})

app.listen(port,()=>{
  console.log("server running on port ",port)
})
