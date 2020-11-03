// const request = require('request')
 
// const geocode = (address,callback)=>{
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJhc2hhYWQiLCJhIjoiY2tleW96Nmw1MGMxYjJ1b29uZXc1Y3AydCJ9.s2UQlw01MYPKkUCAv44GIw&limit=17`
//     request({url, json:true},(error,{body}={})=>{ //destructuring the response object // this 'error' is from no internet connection for example or a wrong URL. Making a request without internet connection or to a wrong URL
//         if(error){ //here might be no internet connection or an incorrect URL and this error would be thrown so it is being handled
//             callback(chalk.red.inverse('Unable to connect to geocode service'),undefined)
//             // console.log(chalk.red.inverse('Unable to connect to geocode service'))
//         }else if(body.features.length === 0){ // body.features is an array of objects and here the length is checked for 0. If 0, that means the location entered be incorrect so it returns no results
//             callback(chalk.red.inverse('Unable to find location, please insert a valid location'),undefined)
//             // console.log(chalk.red.inverse('Unable to find location, please insert a valid location'))
//         }else{
//             callback(undefined,{
//                 Latitude: body.features[0].center[0],
//                 Longitude: body.features[0].center[1],
//                 Place: body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports= geocode

//geocode is a function with 2 parameters. One taking in a string used in the URL as the address parameter.
//the other is a callback function. Inside the geocode function the request is executed. The request method has 2
//parameters. One taking in an object containing the settings for the request, and other is a function. The function parameter
//has 2 parameters of its own. One taking in the error object that will get returned if theres an error, the other is the 
//object containing the data recieved from the request. In the body of the function parameter of the request method some 
//error handling is done. If error, run the callback function with the first parameter being error text(make the second parameter undefined)
//else if the object containing the data recieved from the request is empty, call the callback again with the first parameter being error text.
// and the second parameter is undefined. Else, call the callback function, this time with first parameter being undefined, and the
//second parameter is set to the object containing the data recieved from the request.

const request = require('request')


const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJhc2hhYWQiLCJhIjoiY2tleW96Nmw1MGMxYjJ1b29uZXc1Y3AydCJ9.s2UQlw01MYPKkUCAv44GIw&limit=17`
    request({url, json:true}, (error, {body}={})=>{ 
        if(error){
            callback('No internet connection or incorrect URL', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location, please insert a valid location', undefined)
        }else{
            callback(undefined, {
                Lng : body.features[0].center[0],
                Lat : body.features[0].center[1],
                Place : body.features[0].place_name
            }
            )
        }
    })
}

module.exports = geocode