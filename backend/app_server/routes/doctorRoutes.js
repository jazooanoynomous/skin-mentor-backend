const express = require("express");
const router = express.Router();
const cor = require("cors");
const UserCtrl = require("../controllers/doctorController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/RegisterDoc", UserCtrl.doctorRegister);
router.post("/LoginDoc", UserCtrl.doctorLogin);
router.get("/getAllDoc",  UserCtrl.getAllDoctors);
router.put("/uploadImageDoc/:id", upload.single("profileImage"), UserCtrl.uploadProfileImage);
router.get("/getDoc/:id",  UserCtrl.getDoctorById);
router.put("/updateDoctorAvailability/:idDoctor", UserCtrl.updateDoctorAvailability);

router.get("/getDocBySpecialty/:specialty",  UserCtrl.getDoctorsBySpecialty);


// router.put("/updateDoctorAvailability/:id", UserCtrl.updateDoctorAvailability);


module.exports = router;

