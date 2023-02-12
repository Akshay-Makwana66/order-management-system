const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const createOrderSchema = new mongoose.Schema({
   customerId:{
    type:ObjectId,
    ref:'Customer',
    required:true
   },
   product:{
    type:String,
    required:true
   },
   totalprice:{
    type:Number,
    required:true
   }

},{timestamps:true});

module.exports= mongoose.model('Order',createOrderSchema);  

