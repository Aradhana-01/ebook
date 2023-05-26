import mongoose from "mongoose";


//schema here for author
const Schema= new mongoose.Schema({
 
    firstname: String,
    lastname: String,
    email: String,
    password: String,


});

//schema for admin
const adminSchema= new mongoose.Schema({
 
    firstname: String,
    lastname: String,
    email: String,
    password: String,


});

// export const Author = mongoose.model("Author",Schema);

export const Author = mongoose.model("Author",Schema);
export const Admin =  mongoose.model("Admin",adminSchema);


