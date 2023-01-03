const mongoose = require('mongoose');

const register = {
    type:String,
    required:true,
    unique:true
}
const customerSchema = new mongoose.Schema({
    name: register,
    email: register,
    password: register,
    phone:register,
    category:{
        type:String,
        enum:["Regular", "Gold", "Platinum"],
        default:"Regular"
    },
    totalorders:{
        type:Number,
        default:0
    },
    totaldiscount:{
        type:Number,
        default:0
    },
    orderdiscount:{
        type:[],
        default:[]
    } 
},{timestamps:true});

module.exports= mongoose.model('Customer',customerSchema);  

