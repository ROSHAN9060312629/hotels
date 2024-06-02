const express=require('express')
const router=express.Router();
const app=express();
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
app.get('/', function (req, res) {
    res.send('Welcome to Restaurent..')
  })
const Person=mongoose.model('Person',personSchema)
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("data saved")
        res.status(200).json(response);
    } 
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
router.get('/',async(req,res)=>{
    try{
        const data=await Person.find()
        console.log('data found')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
router.get('/:workType',async(req,res)=>{
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
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonId=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatePersonId,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        console.log("data updates")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        console.log("data deleted")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
app.use('/person',router)
app.listen('3000',()=>{
    console.log("server is listening....")
})
//github

