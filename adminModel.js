const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    referenceCode:{
        type:String,
        required:[true,'If you have not reference code then you can not register here']
    },
    name:{
        type:String,
        required:[true,'Name is required']
    },
    phone:{
        type:Number,
        required:[true,'Phone number is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    }
},{timestamps:true});

const adminModel = mongoose.model('admins',adminSchema);

const referenceCodeSchema = new mongoose.Schema({
    code:String
});

const referenceModel = mongoose.model('references',referenceCodeSchema);

module.exports = {
    adminModel,
    referenceModel
};