const request=  require('request')
const forecast=(lt,lg,callback)=>{

const url='http://api.weatherstack.com/current?access_key=c86dc854442f13bd68ab61de116f6acb&query='+lg+','+lt+'&units=f'


request({url,json:true},(error,{body})=>{

    if(error){

        callback('Unable Network Connection',undefined)
    }else if(body.error){
        callback('unable to find location',undefined)
    }
    else{
        callback(undefined,{
            forecastdata:'It is currently '+ body.current.temperature+' Degree out. There is a '+ body.current.feelslike +' % chance of rain. Humidity is '+ body.current.humidity+'%'
        })
    }
})

}

module.exports = forecast