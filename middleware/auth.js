const jwt = require('jsonwebtoken');
const {Unauthenticated} = require('../errors')



const authentcationMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new Unauthenticated('You are not authorised to this page')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token,process.env.JWT_SECREAT)
        // const luckyNumber = Math.floor(Math.random()*100)
        const {id,username} = decode
        req.user = {id,username}

        // res.status(200).json({msg:`Hello, ${decode.username}`,secret:`Your lucky number is ${luckyNumber}`})
        // console.log(decode)
    } catch (error) {
        throw new Unauthenticated('You are not authorised to this page')
    }
    next()
}


module.exports =authentcationMiddleware