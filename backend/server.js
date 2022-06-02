const express = require("express");
const {chats} = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();
connectDB();

//accepting json data
app.use(express.json()); 

app.get('/', function(req,res){
    res.send("API is running. . . .")
})

app.use('/api/user',userRoutes);

app.listen(process.env.PORT, console.log(`server started on ${process.env.PORT}`))