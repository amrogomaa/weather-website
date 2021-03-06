const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

const path= require('path')
const express = require('express')
const hbs=require('hbs')

const app = express()
const port=process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../tempelates/views')
const partialsPath=path.join(__dirname, '../tempelates/partials')

// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather' ,
        name: 'Amr Gomaa'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name: 'Amr Gomaa'
    })
})



app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Amr Gomaa'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
         return res.send({
            error : 'You must enter an address term !'
        })
    }
    let address= req.query.address
geocode(address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error});
    }
   forecast(latitude, longitude, (error, forecastData) => {
     if(error){
       return res.send({error});
     }
     res.send({location,address,forecastData})
   })
 })

    
})


app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Amr Gomaa',
        errorMessage: 'This article not found'
    })
})

app.get('*',(req ,res)=>{
    res.render('404', {
        title: '404',
        name: 'Amr Gomaa',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})