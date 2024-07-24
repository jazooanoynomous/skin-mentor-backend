var userModel = require('mongoose');
var varlidatorr = require('validator');



var schema = new userModel.Schema({
  doctorId: {
    type: String,
  },
  appointmentRequesterName: {
    type: String,
  },
  appointmentRequesterId: {
    type: String,
  },
  appointmentRequesterImage: {
    type: String,
  },
  appointmentRequesterNumber: {
    type: String,
  },
  selectedDate: {
    type: String
  },
  selectedTime: {
    type: String
  },
  doctorResponce: {
    type: String
  },
  doctorName: {
    type: String
  },
  doctorImage: {
    type: String
  },
  doctorNumber: {
    type: String
  }

 
});

module.exports = ModelUser = userModel.model("ModelAppointment", schema);
