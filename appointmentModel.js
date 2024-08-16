const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName:{
      type:String,
      required:[true,'Patient name is required.']
    },
    doctorName:{
       type:String,
    },
    departmentsName:{
       type:String,
    },
    phone:{
       type:Number,
       required:[true,'Phone number is required.']
    },
    symtoms:{
       type:String,
       required:[true,'Symtoms is required.']
    },
    date:{
       type:String,
       required:[true,'Date is required.']
    }
   },{timestamps:true});

   const apppointmentModel = mongoose.model('appointments',appointmentSchema);

   module.exports = apppointmentModel;