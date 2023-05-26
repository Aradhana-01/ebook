import { Author, Admin } from "../models/user.js";
import express from "express";
import nodeNotifier from "node-notifier";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


























//author related func
export const authorLogin = async (req, res) => {

    const { email, password } = req.body;
    let user = await Author.findOne({ email });
    if (!user) return res.render("register.ejs", { notregistered: "This Email-id is not registered! Register here to continue.  " });

    // const isMatch = user.password === password;.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("login.ejs", { email, message: "Incorrect Password" });

    const token = jwt.sign({ _id: user._id }, "sdaghfjdfwq");

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });
    // alert("Welcome to Erudite!! Be a Crazy Writer..Be the one to bring the Change!!")
    // res.redirect("/logout");
    res.render("logout.ejs")
}

export const authorRegister = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    let user = await Author.findOne({ email });
    if (user) {
        return res.render("login.ejs", { registeredMessg: "This Email is already registered!! . <br> Kindly fill the required Login Details. " });
        //  return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await Author.create({

        firstname,
        lastname,
        email,
        password: hashedPassword,
    });
    nodeNotifier.notify({
        title: 'Hey there!!',
        message: 'Hurray !! You are now registered !!',
        sound: true,
        wait: true,
    });


    //   popup.alert({
    //     content: "Hurray !! You are now registered !!"
    //   })

    //    alert("Hurray !! You are now registered !!");

    const token = jwt.sign({ _id: user._id }, "sdaghfjdfwq");

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });


    //    const user = new Author





    res.redirect("/home");

}

//admin related function

export const adminLogin = async (req, res) => {

    const { email, password } = req.body;
    let user = await Admin.findOne({ email });
    if (!user) return res.render("adminregister.ejs", { notregistered: "This Email-id is not registered! Register here to continue.  " });

    // const isMatch = user.password === password;.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("adminlogin.ejs", { email, message: "Incorrect Password" });

    const admintoken =  jwt.sign({ _id: user._id }, "alfnsfaasiojuk");

    res.cookie("admintoken", admintoken, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });
    // alert("Welcome to Erudite!! Be a Crazy Writer..Be the one to bring the Change!!")
    // res.redirect("/logout");

    // user.save((err) => {
    //     if(err) {
    //         res.json({message: err.message, type: "danger"});

    //     }else{
    //         req
    //     }
    // })

    // Author.find().exec((err, users) => {
    //     if(err){
    //         res.json({message: err.message});

    //     }
    //     else{
    //         res.render("adminlogout.ejs",{
    //             users: users,
    //         })
    //     }
    // })





    //finding and displaying author data from database
    // try {
    //  Author.find({} ).then(( data) => {
    //         res.render("adminlogout.ejs", {record :data });
    //     }).catch( (err) =>{
    //         console.log(err); 
    //     } );
    //     // res.render("adminlogout.ejs", {record : userDetails});
    //     const firstname = req.body.firstname;
    //     const lastname = req.body.lastname;
    //     const email = req.body.email;

        // userDetails.exec((error , data) => {
        //     if(error){
        //         console.log(error);
        //     }
            
        // res.render("adminlogout.ejs", {record :data});
        // });
    //    await userDetails.exec(data).then(() => {
         
    //         res.render("adminlogout.ejs", {record :data});
    //     }).catch((err) => {console.log(err); });

        

    // await userDetails.exec(function(err, data) {
    //     if(err){console.log(err);}
    //      res.render("adminlogout.ejs", {record :data});
    // })
         
    

    // } catch (error) {
    //     // res.status(401).send(error);
    //     console.log(error);
    // }
res.redirect("/home/adminlogout")
}


export const adminRegister = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    let user = await Admin.findOne({ email });
    if (user) {
        return res.render("adminlogin.ejs", { registeredMessg: "This Email is already registered!!. Kindly fill the required Login Details. " });
        //  return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await Admin.create({

        firstname,
        lastname,
        email,
        password: hashedPassword,
    });
    nodeNotifier.notify({
        title: 'Hey there!!',
        message: 'Hurray !! You are now registered !!',
        sound: true,
        wait: true,
    });


    //   popup.alert({
    //     content: "Hurray !! You are now registered !!"
    //   })

    //    alert("Hurray !! You are now registered !!");

    const admintoken = jwt.sign({ _id: user._id }, "alfnsfaasiojuk");

    res.cookie("admintoken", admintoken, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/home");

}
