const express = require('express');
const app = express()
const mongoose = require('mongoose');
const mongoUrl='mongodb://localhost:27017/hotel';
mongoose.connect(mongoUrl)
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("connected to mongodb")
});
db.on('error',(err)=>{
    console.error("mongodb connection server",err)
});
db.on('disconnected',()=>{
    console.log("mangodb disconnected ")
});


const bodyParser=require('body-parser')
app.use(bodyParser.json());
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        required:true
    }

});
const Person=mongoose.model('Person',personSchema)
app.get('/', function (req, res) {
    res.send('Welcome to Restaurent..')
  })
app.post('/person',async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'})
    }
})
app.get('/person',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data found');
        res.status(200).json(data);
    }
    catch(err){
        consol.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})
app.get('/person/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType //EXtract the work/type from URL parameters
        if(workType=='chef' || workType=='manager' || workType =='waiter'){
            const response=await Person.find({work:workType})
            console.log('data fetched')
            res.status(200).json(response)
        }
        else{
            res.status(400).json({error:'Invalid Work Type'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json()({error:"Interal Server Error"})
    }
})
app.listen(3000,()=>{
    console.log('listening on port 3000')
})