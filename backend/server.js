const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT=process.env.PORT || 8000

app.get('/', function(req,res){
    res.send("API is running. . . .")
})

// app.get('/api/chat', function(req,res){
//     res.send(chats)
// })

app.listen(PORT, console.log(`server started on ${PORT}`))