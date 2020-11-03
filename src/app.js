const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const port = process.env.PORT || 3000
//setup handlebars engine and views directory

app.set('view engine','hbs') //sets a value for a given express setting
app.set('views',path.join(__dirname, '../templates/views')) // setting the views setting to look for views in a new directory
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Setup static directory to serve

app.use(express.static(path.join(__dirname, '../public'))) //app.use is used to customize the express server

//Express routes

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Arashaad Davidson'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Arashaad Davidson',
        title: 'About Me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Arashaad Davidson',
        message: 'Do not use spaces in search'
    })
})

app.get('/weather',(req,res)=>{
    /*this is basically the '?' after the route URL*/
    if(!req./*[*/query/*]*/.address){//req.query is the object containing the data of the query string that gets requested by the browser eg localhost:3000/products[?search=games&ratings=5]. The req.query obeject will contain {search: 'games', rating: 5} 
        return res.send({   // the return is important here. if error, stops the rest of the code from executing.
            error: 'please provide search term'
        })
    }
    geocode(req.query.address, (error, {Lng, Lat, Place}={})=>{  
        if(error){
            return res.send({error})
        }
        forecast(Lat, Lng, (error, data={})=>{
            if(error){
                return res.send(`Error:${error}`)
            }
            data.Place = Place
            data.Longitude = Lng
            data.Latitude = Lat
            res.send(data)
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Arashaad Davidson',
        message: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Arashaad Davidson',
        message: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('listening on '+port)
})