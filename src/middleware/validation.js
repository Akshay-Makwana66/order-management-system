const customerModel = require('../model/customerModel')
const customerValidations = async (req,res,next)=>{
    try{
        let data = req.body;
        let {name,email,password,phone}= data;
        if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
    
        // Checks whether name is empty or is enter as a string or contains only letters
        if (!name)return res.status(400).send({ status: false, msg: "Please enter name" });
        if (typeof name !== "string")return res.status(400).send({ status: false, msg: " Please enter name as a String" });
        let validName = /^\w[a-zA-Z.]*$/;
        if (!validName.test(name))return res.status(400).send({ status: false, msg: "The name may contain only letters" });
        name = name.trim();   

        // Checks whether email is empty or is enter as a string or is a valid email or already exists
        if (!data.email)return res.status(400).send({ status: false, msg: "Please enter E-mail" });
        if (typeof data.email !== "string")return res.status(400).send({ status: false, msg: "Please enter email as a String" });    
         if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email)){
             return res.status(400).send({ status: false, msg: "Entered email is invalid" });
         }
        let duplicateEmail = await customerModel.find({ email: email });
        if (duplicateEmail.length !== 0)return res.status(400).send({ status: false, msg: `${email} already exists` });
        email = email.trim();

        // Checks whether password is empty or is enter as a string or a valid pasword.
    if (!password)return res.status(400).send({ status: false, msg: "Please enter Password" });
    if (typeof password !== "string")return res.status(400).send({ status: false, msg: " Please enter password as a String" });
    let validPassword =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!validPassword.test(password))return res.status(400).send({status: false,
        msg: `Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number`});
        password=password.trim();


    //  phone validations---------
    if (!phone) return res.status(400).send({ status: false, msg: "Please Enter Phone Number" });
    if (typeof phone !== "string") return res.status(400).send({ status: false, msg: " Please enter only phone number of 10 digits & put in string" });
    let validPhone = /^[6-9]\d{9}$/
    if (!validPhone.test(phone)) return res.status(400).send({ status: false, msg: "The customer phone number should be indian may contain only 10 number" });
    let duplicatePhone = await customerModel.find({ phone: phone });
    if (duplicatePhone.length !== 0) return res.status(400).send({ status: false, msg: `${phone} already exists` });
     phone = phone.trim();
    next();
    
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const userLoginValidations = async (req,res,next)=>{
    try{
        let data = req.body;
        // Checks whether body is empty or not
        if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});
          // Checks whether email is entered or not
        if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail"});
        // Checks whether password is entered or not
        if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" }); 
        next();
        }catch(err){
         res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
        }
}
    
const orderValidations = async (req,res,next)=>{
    try{
        let data = req.body;
        let {product,totalprice}= data;
        // product validations---
        if (!product)return res.status(400).send({ status: false, msg: "Please enter product" });
        if (typeof product !== "string")return res.status(400).send({ status: false, msg: " Please enter product as a String" });
        let validproduct = /^\w[a-zA-Z.]*$/;
        if (!validproduct.test(product))return res.status(400).send({ status: false, msg: "The product may contain only letters" });
        product = product.trim();

        // totalprice validations--
        if (!totalprice) return res.status(400).send({ status: false, msg: "Please Enter totalprice" });
        if (typeof totalprice !== "number") return res.status(400).send({ status: false, msg: " Please enter only  number in totalprice" });
        next();
    }
    catch(error){
        res.status(500).send({ status: false, msg: error.message });
    }

}
module.exports={customerValidations,userLoginValidations,orderValidations}




