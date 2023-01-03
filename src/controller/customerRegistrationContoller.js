const userModel = require('../model/customerModel')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
var saltRounds= 10;

const registrationOfUser = async (req,res)=>{
    try{
         let data = req.body;
         data.password = await bcrypt.hash(data.password, saltRounds);                   
         let savedData = await userModel.create(data);
         res.status(201).send({msg:"Your registration is successfully done, ThankYou", data: savedData})
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"sorry for inconvenience", Error: error})
    }
};


const loginUser = async (req,res)=>{
    try{
        let data = req.body         

        // Checks whether body is empty or not
        if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});
    
        // Checks whether email is entered or not
        if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail"});
        let userEmail= data.email
    
         // Checks whether password is entered or not
        if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" }); 
       
        let userPassword= data.password
    
        let checkingUserEmailInDB= await userModel.findOne({email: userEmail})
        if(!checkingUserEmailInDB) return res.status(401).send({status:false, msg:"Email is incorrect"})
        let decryptPassword =  bcrypt.compare(userPassword, checkingUserEmailInDB.password);
    
        if (!decryptPassword) {  
          return res
            .status(401)
            .send({ status: false, message: "Password is not correct" });
        }
    
        //Creating token if e-mail and password is correct
        let token= jwt.sign({
          customerId: checkingUserEmailInDB._id.toString(),
        }, "order-management-system");
        //Setting token in response header
        res.setHeader("x-api-key",token)
        res.status(201).send({status:true,data: token})
      }
    catch(error){
        res.status(500).send({msg:"sorry for inconvenience", Error: error})
    }
}

module.exports={registrationOfUser,loginUser}