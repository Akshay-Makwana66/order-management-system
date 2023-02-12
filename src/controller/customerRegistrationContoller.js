const userModel = require('../model/customerModel')
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
        let data = req.body;
       
        let userEmail= data.email
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
        //sending token in response body
        res.status(201).send({message:'You are Successfully LoggedIn',data: token})
      }
    catch(error){
        res.status(500).send({msg:"sorry for inconvenience", Error: error})
    }
};

module.exports={registrationOfUser,loginUser}