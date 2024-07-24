// var User = require('../models/userModel');
const jwt = require('jsonwebtoken')


const JWT_SECRET = "ashgdjlshjkf"

 const requireLogin = (req, res, next) =>{
  const {authorization} =  req.headers
  console.log(req.headers)
  if(!authorization){
      console.log("aaaa")
      return res.status(401).json({error:"You must be logged in!"})

  }
  try{
      const {userId, userName, userRole} = jwt.verify(authorization, JWT_SECRET)
      console.log("aaaa try", userName)
      req.user = {uid:userId, uname:userName, uRole:userRole}

      next()
      // const payload = jwt.verify(authorization, JWT_SECRET)
      // // attach the user to the job routes
      // console.log(payload)
      // req.user = { uid: payload.id, name: payload.name }
      // next()
  }
  catch (err){
      console.log("aaaa error")
      return res.status(401).json({error:"You must be logged in!!"})

  }
}
module.exports = requireLogin


// const auth = async (req, res, next) => {

//   console.log('authHeader')
//   const authHeader = await req.headers['authorization']
  
//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     res.json('Authentication Fail or No Token')
//   }
//   const token = authHeader.split(' ')[1]
//   console.log('token')
//   console.log(authHeader)
//   try {
//     const payload = jwt.verify(token, "abcdefg")
//     // attach the user to the job routes
//     req.user = { uid: payload.id, name: payload.name }
//     next()
//   } catch (error) {
//    console.log('he')
//     // res.json(error);
//   res.json('Authentication invalid')
//   }
// }

// module.exports = auth