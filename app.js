//all middlewares here

import session from "express-session";
import express from "express";
import userRouter from "./routes/user.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";//for bg image

config({
path: "./data/config.env",
});

export const app = express();



// //using middlewares
app.use(express.static(path.join(path.resolve(), "public"))); //for bg image
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use("/",userRouter);
app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
);
app.use((req , res , next ) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next()
})

// app.get("/", (req,res) => {
//     res.send("Nice");

// });




