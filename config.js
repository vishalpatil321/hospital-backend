const mongoose = require('mongoose');

module.exports = dbConnection = async(req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully....');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:`Error is ${error} in mongoDB connetion.`
        })
    };
};