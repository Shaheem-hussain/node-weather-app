const request=require('request');

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhaGVlbS1odXNzYWluIiwiYSI6ImNsMmszeGE1MzE0M2szaXBoejI3NHRyNGYifQ._IBU-yotmZXlkFuBv9JKow&limit=1`;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("something went an error",undefined)
        }else if(response.body.features.length==0){
            callback({error:"Not found ,try antoher search"},undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;