const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')


const login = async(req,res)=>{
    const {username,password} = req.body

    if (!username || !password){
        throw new CustomAPIError('Please provide username and password',400)
    }
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECREAT,{expiresIn:'30d'})
    res.status(200).json({'msg':'user created',token})
}

const dashboard = async(req,res)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('YOu are not authorised to this page',401)
    }
    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token,process.env.JWT_SECREAT)
        const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello, ${decode.username}`,secret:`Your lucky number is ${luckyNumber}`})
        console.log(decode)
    } catch (error) {
        throw new CustomAPIError('You are not authorised to this page',401)
    }
    
    
}

module.exports = {
    login,
    dashboard
}