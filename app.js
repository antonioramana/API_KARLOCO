const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
require("dotenv").config();
app.use(express.static('public'));

const PORT= process.env.PORT ;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


/*Routers*/

const carRouter=require("./routes/carRouter");
app.use("/car", carRouter);
const userRouter=require("./routes/userRouter");
app.use("/user", userRouter);
const favorisRouter=require("./routes/favorisRouter");
app.use("/favoris", favorisRouter);
const reservationRouter=require("./routes/reservationRouter");
app.use("/reservation", reservationRouter);
const notificationRouter=require("./routes/notificationRouter");
app.use("/notification", notificationRouter);
const chatRouter=require("./routes/chatRouter");
app.use("/chat", chatRouter);


app.listen(PORT,()=>{console.log("server is running on the port "+PORT)});