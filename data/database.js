import mongoose from "mongoose";

export const connectDB = () => {
    
mongoose
.connect(process.env.MONGO_URI,{dbName: "Backend-Users"})
.then(()=>console.log("database connected"))
.catch((e)=>console.log(e));
}