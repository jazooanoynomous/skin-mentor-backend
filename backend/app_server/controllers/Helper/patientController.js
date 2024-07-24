const { ObjectId } = require('mongodb');
var UserHelper = require('../../models/Helper/patientModel');

var User = require('../../models/doctorModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "vvnjdjfkajsaslsd"
const bcrypt = require('bcrypt')
const json=require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;

CLOUDINARY_USER_NAME = "deutqqpsv";
CLOUDINARY_API_KEY = "146928489343247";
CLOUDINARY_API_SECRET = "Y8Sho-wa7Gabo7beRWQlhd1aF_w";

cloudinary.config({
  cloud_name: CLOUDINARY_USER_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
module.exports = class UserHelperControl {
  

    
    static async patientRegister(req, res) {
        const {name, email, password, phoneNumber} = req.body;
        try {
          const user = await User.findOne({ email });
            const userHelper = await UserHelper.findOne({ email });

            if (user || userHelper) {
                return res.status(422).json({ error: "User already registered with this email" });
            }
          const hashedPass = await bcrypt.hash(password, 12);
          const users = await UserHelper.create({ email: email,
            password: hashedPass,
            name: name,
            phoneNumber : phoneNumber
          })

          // const token=json.sign({_id:users._id},"yuuftetkwtuw26i7wft2572f",{
          //   expiresIn:'30d'
          // })
          res.status(200).json({
            users
          });
       
        } catch (err) {
          console.log(err);
        }
      }
  //for getting all helper 
  static async getAllpatient(req, res) {
    try {
      const helpers = await UserHelper.find();
      res.json(helpers);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  









  





//Login Method
static async patientLogin (req,res) {
    const {email, password} = req.body
    try{
    if(!email || !password){
        return res.status(422).json({error:"Please fill all fields"})
    }
    const user = await UserHelper.findOne({email})
    if(!user){
        return res.status(404).json({errorOne:"User does not exist with that email"})
    }
    const doMatch = await bcrypt.compare(password, user.password)
    if(doMatch){
        const token = jwt.sign({userId:user._id, userName:user.name}, JWT_SECRET, {expiresIn: '30d'} )
        res.json({token, userRole:user.role, userName:user.name, 
          userNumber:user.phoneNumber,
          userId:user._id, userImage:user.profileImage})
    }
    else{
        return res.status(401).json({errorTwo:"email or password is invalid"})
    }

} catch(err){
    console.log(err)
}

}




static async uploadProfileImage(req, res) {
  const userId = req.params.id;
  console.log('this is user id ', userId)
  const file = req.file;
  console.log('this is user file ', file)

  try {
      const user = await UserHelper.findById(userId);

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      if (user.profileImage.length > 0) {
          await cloudinary.uploader.destroy(user.profileImage[0].cloudinaryId);
          user.profileImage.pop();
      }

      const result = await cloudinary.uploader.upload(file.path);
      user.profileImage.push({
          url: result.secure_url,
          cloudinaryId: result.public_id,
          owner: userId
      });

      await user.save();
      res.status(200).json(user);

  } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
}




static async getPatientById(req, res) {
  const patientId = req.params.id; // Assuming the doctor's ID is passed as a route parameter

  try {
    const patient = await UserHelper.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

}