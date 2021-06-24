const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const Joi = require("joi");


const schema = Joi.object({
    username:Joi.string().min(6).required(),
    password:Joi.string().min(7).required(),
    email:Joi.string().email()
});




router.post("/register", async (req,res)=>{

   //Validate before sending to mongodb

   const {error} = schema.validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   //check if email exists

   const emailExists = await User.findOne({email:req.body.email});
   if(emailExists) return res.status(400).send("email already exists");


   //hash the passwords

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    });
    
    try{ 
        const saveduser = await user.save();
        res.send(saveduser);

    }catch(err){
        res.status(404).send(err);
    }
});



module.exports=router;