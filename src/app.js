const path=require('path')
const express= require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')


const app=express()
const port=process.env.PORT || 3000


//define path for express config
const htmlpath=path.join(__dirname,'../public')
//const partials= path.join(__dirname,'../templates/partials')

//setup handlerbars engine and views location
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');


hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//setup static directory to serve
app.use(express.static(htmlpath))


app.get('',(req,res)=>{

    res.render('front',{
        title:'weatherstack',
        name:'@shubham shelke'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'shubham'

    })
})



app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
      return  res.send({
         error:'Address must be in url'
        })
    }

geocode(req.query.address,(error,{latitude,longitude,place} = {})=>{

    if(error){

        return res.send({error})
    }

    forecast(longitude,latitude,(error,{forecastdata})=>{
        if(error){
            return res.send({error})
        }

        res.send({
            place,
            forecastdata
        })


    })

})


//     res.send({
//         property:'weather details',
//         name:'weatherstack',
//         address:req.query.address
// })
})

app.get('/about/*',(req,res)=>{
    res.render('article',{
        msg:'Help article Not Found'
    })

})

app.get('*',(req,res)=>{

    res.render('error',{
        msg:'Page not found'
    })

})


app.listen(port,()=>{
    console.log('Listening on port 3000')
})