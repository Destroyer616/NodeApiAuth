const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
//import router from auth

const router = require("./routes/auth");

//connect to mongodb

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true},()=>console.log("connected to mongodb.."));

//middleware
app.use(express.json());

app.use("/api/user",router);




app.listen(5000,()=>console.log("server is running.."));