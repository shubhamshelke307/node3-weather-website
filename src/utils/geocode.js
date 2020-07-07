const request = require('request')
 
const geocode=(address,callback)=>{
const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2h1YmhhbXNoZWxrZTMwNyIsImEiOiJja2MwaWRjeTAxYzV1MnhsamFjZW91OXZwIn0.KTNxNYfpJatjdJpkv6maUQ&limit=1'


     request({url, json:true},(error,{body})=>{
         

        callback(undefined,{
            latitude:body.features[0].center[0],
            longitude:body.features[0].center[1],
            place:body.features[0].place_name
        })

     })

}

module.exports= geocode