const  express =  require("express");
const router = express.Router();
const cor = require("cors")
const UserHelperCtrl = require("../../controllers/Helper/patientController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/PatientRegister",  UserHelperCtrl.patientRegister);

router.post("/PatientLogin",  UserHelperCtrl.patientLogin);

router.get("/getAllPatient",  UserHelperCtrl.getAllpatient);

router.put("/uploadImagePatient/:id", upload.single("profileImage"), UserHelperCtrl.uploadProfileImage);


router.get("/getPatient/:id",  UserHelperCtrl.getPatientById);


module.exports =  router;