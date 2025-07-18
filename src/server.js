import express from "express"
import "dotenv/config"
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import checkinRoutes from "./routes/checkin.route.js";


import {connectDB} from "./lib/db.js"

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://spokn1.vercel.app", 
        "https://spokn-d4pj30g92-lavishs-projects-36ec3d3b.vercel.app",
        "https://spokn-lavishs-projects-36ec3d3b.vercel.app",

    ],
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

app.use("/api/checkin", checkinRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"/dist")));

    app.get("*splat",(req,res)=>{
        res.sendFile(path.join(__dirname,"dist","index.html"));
    })
}



app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
    connectDB();
})