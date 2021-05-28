const request=require('postman-request')

const forecast=(lat, long, callback)=>{
    // console.log(`${lat},${long}`);
    const url=`http://api.weatherstack.com/current?access_key=68f20d1ec89404609a0824b81904168d&query=${long},${lat}`

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        } else if(response.body.error){
            callback('Unable to find coordinates. Try another search.',undefined)
        } else{
            callback(undefined,response.body.current.weather_descriptions[0] + ', It is currently ' + response.body.current.temperature + ' degress out. And it seems to be ' + response.body.current.feelslike + ' out.')
        }
    })
}


module.exports = forecast