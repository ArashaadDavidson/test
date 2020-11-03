// const request = require('request')

// const forecast = (lon, lat, callback)=>{
//     const url = `http://api.weatherstack.com/current?access_key=ca992b39f0c7287a21292f77888f88c6&query=${lat},${lon}&units=m`

//     request({url, json: true}, (error, {body}={})=>{ //destructuring the response object
//         if(error){
//             callback(chalk.red.inverse('Unable to connect to weather service'),undefined)
//         }else if(body.error){
//             callback(chalk.red.inverse('Unable find location'),undefined)
//         }else{
//             callback(undefined,{
//                 weather_description: body.current.weather_descriptions[0],
//                 temperature: body.current.temperature,
//                 feelslike: body.current.feelslike
//             })
//         }
//     })
// }

// module.exports = forecast

const request = require('request')

const forecast = (Lat,Lng, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=ca992b39f0c7287a21292f77888f88c6&query=${Lat},${Lng}&units=m`
    request({url, json:true},(error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                wind_speed: body.current.wind_speed,
                humidity: body.current.humidity,
                TimeOfRequest: body.current.observation_time
            })
        }
    })
}

module.exports = forecast