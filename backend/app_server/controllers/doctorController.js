const { ObjectId } = require('mongodb');
const User = require('../models/doctorModel');
const UserHelper = require('../models/Helper/patientModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "ashgdjlshjkf"
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;

CLOUDINARY_USER_NAME = "deutqqpsv";
CLOUDINARY_API_KEY = "146928489343247";
CLOUDINARY_API_SECRET = "Y8Sho-wa7Gabo7beRWQlhd1aF_w";

cloudinary.config({
  cloud_name: CLOUDINARY_USER_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = class UserControl {

    //SignUp Method
    static async doctorRegister(req, res) {
        const { name, email, password, specialty, cliniAddress, phoneNumber, startAvailabilityTime, endAvailabilityTime, availabilityDays } = req.body;
        try {
            const user = await User.findOne({ email });
            const userHelper = await UserHelper.findOne({ email });

            if (user || userHelper) {
                return res.status(422).json({ error: "User already registered with this email" });
            }
            const hashedPass = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                email: email,
                password: hashedPass,
                name: name,
                specialty: specialty,
                // startAvailabilityTime: startAvailabilityTime,
                // endAvailabilityTime: endAvailabilityTime,
                // availabilityDays: availabilityDays,
                cliniAddress: cliniAddress,
                phoneNumber: phoneNumber,
                profileImage: [],
            })
            res.status(200).json(newUser);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }


    static async doctorLogin(req, res) {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                return res.status(422).json({ error: "Please fill all fields" })
            }
            const user = await User.findOne({ email })
            console.log("userrrrrrrrrrr", user);
            if (!user) {
                return res.status(404).json({ errorOne: "User does not exist with that email" })
            }
            const doMatch = await bcrypt.compare(password, user.password)
            if (doMatch) {
                const token = jwt.sign({ userId: user._id, userName: user.name, userRole: user.role }, JWT_SECRET, { expiresIn: '1d' })
                res.json({
                    token, userRole: user.role, userId: user._id, userName: user.name,
                    userNumber: user.phoneNumber,
                    userImage: user.profileImage
                })
                console.log(user.role)
                console.log(user.name)
                console.log(user._id)
                console.log(user.profileImage)


            }
            else {
                return res.status(401).json({ errorTwo: "email or password is invalid" })
            }

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: "Internal Server Error" });
        }

    }

    //for getting all users
    static async getAllDoctors(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async uploadProfileImage(req, res) {
        const userId = req.params.id;
        console.log('this is user id ', userId)
        const file = req.file;
        console.log('this is user file ', file)
        try {
            const user = await User.findById(userId);

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

    static async getDoctorById(req, res) {
        const doctorId = req.params.id; // Assuming the doctor's ID is passed as a route parameter
        try {
            const doctor = await User.findById(doctorId);
            if (!doctor) {
                return res.status(404).json({ error: "Doctor not found" });
            }
            res.status(200).json(doctor);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateDoctorAvailability(req, res) {
        const { idDoctor } = req.params; // Assuming the doctor's ID is passed as a route parameter
        const { startAvailabilityTime, endAvailabilityTime, availabilityDays } = req.body; // New start and end availability times
        console.log('this id at backend ', idDoctor)
        console.log('these are time at backend ', endAvailabilityTime,startAvailabilityTime)
        try {
            const updatedDoctor = await User.findByIdAndUpdate(
                idDoctor,
                { startAvailabilityTime, endAvailabilityTime, availabilityDays },
                { new: true }
            );
            if (!updatedDoctor) {
                return res.status(404).json({ error: "Doctor not found" });
            }
            res.status(200).json(updatedDoctor);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static async getDoctorsBySpecialty(req, res) {
        const {specialty} = req.params; // Assuming the specialty is passed as a route parameter
        try {
            const doctors = await User.find({specialty});
            if (!doctors || doctors.length === 0) {
                return res.status(404).json({ error: "No doctors found with this specialty" });
            }
            res.status(200).json(doctors);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
