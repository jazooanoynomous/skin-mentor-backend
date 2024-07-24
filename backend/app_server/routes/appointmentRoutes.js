const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");


router.post("/add", AppointmentController.addAppointment);
router.get('/doctor/:doctorId', AppointmentController.getAppointmentsByDoctorId);
router.get('/requester/:requesterId', AppointmentController.getAppointmentsByRequesterId);
router.get('/requester/:requesterId/accepted', AppointmentController.getAcceptedAppointmentsByRequesterId);
router.put('/doctor', AppointmentController.updateAppointmentResponse);
router.get('/:appointmentId', AppointmentController.getAppointmentById);
router.get('/doctor/:doctorId/accepted',AppointmentController.getAcceptedAppointmentsByDoctorId)
router.get("/getAppointmentsByBoth/:doctorId/:requesterId",
 AppointmentController.getAppointmentsByDoctorAndRequesterId);


 router.delete('/:requesterId', AppointmentController.deleteAppointmentsByRequesterId);
 


module.exports = router;