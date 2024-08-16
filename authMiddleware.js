const jwtToken = require('jsonwebtoken');

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwtToken.verify(token,process.env.JWT_KEY,(error,decode) => {
            if(error){
                res.status(200).send({
                    success:false,
                    message:'Atuhentication failed'
                });
            };
            req.body.userId = decode.id
            next();

     });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in auth middleware.',
            error
        })
    };
};

module.exports = authMiddleware;