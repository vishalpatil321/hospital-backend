const {adminModel,referenceModel} = require("./adminModel");
const apppointmentModel = require("./appointmentModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const contactModel = require("./contactModel");

const adminRegister = async(req,res) => {
  try {
    const referenceCode  = await referenceModel.findOne({code:req.body.referenceCode});
    if(!referenceCode){
        return res.status(200).send({
            success:false,
            message:"You have not allowed to register."
        })
    };
    const existingAdmin = await adminModel.findOne({email:req.body.email});
    if(existingAdmin){
        res.status(200).send({
            success:false,
            message:'Admin already axist with this email id'
        });
    }else{
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    req.body.password = hashedPassword;
    const newAdmin = new adminModel(req.body);
    await newAdmin.save();

    res.status(200).send({
        success:true,
        message:'Register Successfully.'
    })
}
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error in register admin',
      error
    });
  };
};

const loginAdmin = async(req,res) => {
    try {
       console.log('boody is',req.body);
       const admin = await adminModel.findOne({email:req.body.email});
       if(!admin){
        return res.status(200).send({
            success:false,
            message:'Admin not found ,Please register first'
        });
       }
       const mathchPassword  = await bcrypt.compare(req.body.password , admin.password);
       if(!mathchPassword){
        return res.status(200).send({
            success:false,
            message:'Invalid Email or Password.'
        });
    };
    const token = jwt.sign({id:admin._id},process.env.JWT_KEY,{expiresIn:'1d'});
    res.status(200).send({
       success:true,
       message:'Login successfully.',
       token
   });
       
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in login admin.',
            error
        });
    };
};

const SendAppointmentController = async(req,res) =>{
 try {
   const newAppointment  = new apppointmentModel({...req.body});
   await newAppointment.save();
  
   res.status(200).send({
    success:true,
    message:'Appointment request send successfully.'
   });
 } catch (error) {
   console.log(error);
   res.status(500).send({
    success:false,
    message:'Error in Send appointment',
    error
   });
 };
};

const getAppointments = async(req,res) => {
    try {
        const apppointments = await apppointmentModel.find();
        if(apppointments){
            res.status(200).send({
                success:true,
                data:apppointments
            });
        }
        res.status(200).send({
            success:false,
            message:'No Appointments Found'
        });

    } catch (error) {
        console.log(error);
     res.status(500).send({
    success:false,
    message:'Error in get appointment',
    error
   });
    };
};

const getContacts = async(req,res) => {
    try {
        const contacts = await contactModel.find();
        if(contacts){
            res.status(200).send({
                success:true,
                data:contacts
            });
        }
        res.status(200).send({
            success:false,
            message:'No Appointments Found'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
        success:false,
        message:'Error in get contacts',
        error
   });
};
};

const postContacts = async(req,res) => {
    try {
        const newContact  = new contactModel({...req.body});
        await newContact.save();
       
        res.status(200).send({
         success:true,
         message:'Message sent send successfully.'
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
         success:false,
         message:'Error in Send message',
         error
        });
      };
};

module.exports = {
    adminRegister,
    loginAdmin,
    SendAppointmentController,
    getAppointments,
    getContacts,
    postContacts
};