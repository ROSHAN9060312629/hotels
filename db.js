const express = require('express')
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

