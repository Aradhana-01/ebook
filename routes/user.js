import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
// import popup from "popups";
import nodeNotifier from "node-notifier";
import bcrypt from "bcrypt";
import {
//all function to be imported
authorLogin,
authorRegister,
adminLogin,
adminRegister

} from "../Controllers/user.js";
import { Author,Admin } from "../models/user.js";
import session from "express-session";




//pdfme ..error..in import

// import pkg from '@pdfme/generator';
// const { Template, BLANK_PDF } = pkg;
// import { Template, BLANK_PDF } from '@pdfme/ui'; <- Template types and BLANK_PDF can also be imported from @pdfme/ui.

// import generate from "@pdfme/generator";













// import pkg1 from '@pdfme/generator';
// const { Template, generate } = pkg1;
// import pkg from '@pdfme/ui';
// const {  Designer, Form, Viewer } = pkg;
// import {  Designer, Form, Viewer } from '@pdfme/ui';
// import { Template, BLANK_PDF } from '@pdfme/ui'; <- Template types and BLANK_PDF can also be imported from @pdfme/ui.

// const  template = {
//   basePdf: BLANK_PDF,
//   schemas: [
//     {
//       a: {
//         type: 'text',
//         position: { x: 0, y: 0 },
//         width: 10,
//         height: 10,
//       },
//       b: {
//         type: 'text',
//         position: { x: 10, y: 10 },
//         width: 10,
//         height: 10,
//       },
//       c: {
//         type: 'text',
//         position: { x: 20, y: 20 },
//         width: 10,
//         height: 10,
//       },
//     },
//   ],
// };



// const inputs = [{ a: 'a1', b: 'b1', c: 'c1' }];


























const router = express.Router();

// router.use((req , res , next ) => {
//     res.locals.message = req.session.message;
//     delete req.session.message;
//     next()
// })
// router.get("/all", getAllUsers);



//Author related routes


router.get("/home",(req,res) => {
    res.render("home.ejs");
})

router.get("/login",(req,res) => {
    res.render("login.ejs");
})
router.get("/register",(req,res) => {
    res.render("register.ejs");
})


router.get("/logout",(req,res) => {
    res.cookie("token",null,{
        httpOnly:true,
        expires: new Date(Date.now()),
    });

    res.redirect("/home");

});
//middleware for logout
const isAuthenticated =async(req,res,next) => {
    const {token} =req.cookies;
    if(token){
        const decoded = jwt.verify(token,"sdaghfjdfwq");
        req.user = await Author.findById(decoded._id);
        next();
    }
    else{
         res.redirect("/login");  //!!!!!!!
    }
};

router.get("/home",isAuthenticated,(req,res) => {
    res.render("logout.ejs");





  //from pdfme..error
    // generate({ template, inputs }).then((pdf) => {
    //     console.log(pdf);
      
    //     // Browser
    //     // const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    //     // window.open(URL.createObjectURL(blob));
      
    //     // Node.js
    //     // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
    //   });













});

// router.get("/new", register);
// router.get("/userId/special", specialFunc);
// router.get("/userId/:id", getUser);

router.post("/login", authorLogin);

router.post("/register", authorRegister );


//Admin related routes


router.get("/adminlogin",(req,res) => {
    res.render("adminlogin.ejs");
})
router.get("/adminregister",(req,res) => {
    res.render("adminregister.ejs");
})

router.post("/adminlogin", adminLogin);

router.post("/adminregister", adminRegister );





router.get("/home/adminlogout", async (req,res) => {
  //finding and displaying author data from database
  try {
  await  Author.find({} ).then(( data) => {
           res.render("adminlogout.ejs", {record :data });
       }).catch( (err) =>{
           console.log(err); 
       } );
       // res.render("adminlogout.ejs", {record : userDetails});
    //    const firstname = req.body.firstname;
    //    const lastname = req.body.lastname;
    //    const email = req.body.email;
    } catch (error) {
        // res.status(401).send(error);
        console.log(error);
    }

//    res.render("adminlogout.ejs");

});




router.get("/adminlogoutButton",(req,res) => {
    res.cookie("admintoken",null,{
        httpOnly:true,
        expires: new Date(Date.now()),
    });

    res.redirect("/home");

});
//middleware for logout
const isAuthenticatedAdmin =async(req,res,next) => {
    const {admintoken} =req.cookies;
    if(admintoken){
        const decoded = jwt.verify(admintoken,"alfnsfaasiojuk");
        req.user = await Admin.findById(decoded._id);
        next();
    }
    else{
        res.redirect("/adminlogin");
    }
};

router.get("/home",isAuthenticatedAdmin,(req,res) => {
    res.render("adminlogout.ejs");
});



// route to delete an Author from database 

router.get("/delete/:id" , (req,res) => {
  let id = req.params.id;
  Author.findByIdAndRemove(id).then((err) => {
    // if(err){
    //     console.log(err); 
    // }else{
        // req.session.message = {
        //      type: "success",
        //     message: "Author Deleted Successfully!! "
        // }
     res.redirect("/home/adminlogout");   
    // res.render("adminlogout.ejs", {delmsg : "Author Deleted Successfully!! "});

    // }
}).catch( (err) =>{
    console.log(err); 
} );
  

    
    
    
//     (err) => {
//     if(err){
//         console.log(err);
//     }else{
//     res.render("adminlogout.ejs", {delmsg : "Author Deleted Successfully!! "});
//     }
//   })



})


































export default router;