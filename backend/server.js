const express = require("express");
const {chats} = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const {notFound,errorHandler}= require("./middlewares/errorMiddleware");
const chatRoutes = require('./routes/chatRoutes');


const app = express();
dotenv.config();
connectDB();

//accepting json data
app.use(express.json()); 

app.get('/', function(req,res){
    res.send("API is running. . . .")
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, console.log(`server started on ${process.env.PORT}`))