import jwt from 'jsonwebtoken';

const verifytoken = (req,res,next) =>{

const token = req.cookies.jwt
   if(!token) return res.status(401).send('Access Denied');
   jwt.verify(token,process.env.JWT_TOKEN,async(err,payload)=>{
    if(err) return res.status(400).send('Invalid Token');
    req.userid = payload.userid;
    next();
   })
}

export default verifytoken;