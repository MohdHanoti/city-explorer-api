require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server =express();
const wetherData =require('./data/weather.json');

server.use(cors()); 

const PORT =process.env.PORT;// make the server opened for any request

// http://localhost:3000/
server.get('/',(req,res)=>{
    //console.log("http://localhost:3000/ IS RUNNING");
    res.send("Hi from the home roure");
})


 // http://localhost:3000/test
 server.get('/test',(req,res) => {
     console.log("test route");
     
     res.send('Hi from the test roure');
 })


// http://localhost:3000/getWetherCityName
server.get('/getWetherCityName',(req,res)=> {
    let wetherCityName = wetherData.map((item)=>{
        return item.city_name;
    })
    res.send(wetherCityName);
})
// http://localhost:3000/getWetherData?name=wetherCityName
server.get('/getWetherData',(req,res)=>{
    console.log(req.query.name);//its the name you put name=wetherCityName you change the wetherCityName to the name you want 
    const result = wetherData.find(item=>{
        if(item.city_name==req.query.name)
        {
            return item;
        }
        else 
        {return true};
    })
    res.send(result);
})


server.get('*', (req,res)=>{     // if the user put anything not exist 
   
    res.send("page not found");
})



server.listen(PORT,()=>{
    console.log(`Hello, I am listening on ${PORT}`)
})