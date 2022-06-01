const express = require("express");
const {chats} = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const app = express();
dotenv.config();
connectDB();

const PORT=process.env.PORT || 5000

app.get('/', function(req,res){
    res.send("API is running. . . .")
})

app.get('/api/chat', function(req,res){
    res.send(chats)
})

app.get('/api/chat/:id', function(req,res){
    // console.log(req.params.id);
    const singlechat= chats.find(c=>c._id===req.params.id);
    res.send(singlechat);
})

app.listen(PORT, console.log(`server started on ${PORT}`))