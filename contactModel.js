const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName:{
      type:String,
      required:[true,'Patient name is required.']
    },
    mobile:{
       type:Number,
       required:[true,'Phone number is required']
    },
    email:{
       type:String,
       required:[true,'Email is required']
    },
    message:{
       type:String,
    }
   },{timestamps:true});

   const contactModel = mongoose.model('contacts',contactSchema);

   module.exports = contactModel;