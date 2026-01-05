import express from "express";
import http from 'http';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import {Server} from 'socket.io'



const app = express();
const server =  http.createServer(app);

export const io = new Server(server,{
    cors:{origin:"*"}
});
export const userSocketMap = {};

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user connected",userId);
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("user disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

app.use(express.json({limit:"4mb"}));
app.use(cors());


app.use("/api/status",(req,res)=>{
    res.send("server is live")
})
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter)

await connectDB();

if(process.env.NODE_ENV !== "production"){
    const PORT = 9000;
    server.listen(PORT,()=>{
    console.log(`server is running on : ${PORT}`)
    })
}
export default server;
