const request=require("request");

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=7261bfddc9c54f6747353a54d19f1ffa&query=${latitude},${longitude}`;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Something went error",undefined);
        }else if(response.body.error){
            callback({error:"big error"},undefined)
        }
        else{
            let data=response.body.current;
            let forecastData=`its ${data.temperature} temperature and feels like ${data.feelslike} and the humidity is ${data.humidity}`
            let atmosphere={
                forecast:forecastData,
                latitude,
                longitude
            }
            callback(undefined,atmosphere)
            console.log("Its cool now")
        }
    })
}

module.exports=forecast
// 10.015861,76.341866