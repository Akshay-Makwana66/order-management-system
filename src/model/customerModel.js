const mongoose = require('mongoose');

const mandatory = {
    type:String,
    required:true,
    unique:true
}
const customerSchema = new mongoose.Schema({
    name: mandatory,
    email: mandatory,
    password: mandatory,
    phone:mandatory,
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

