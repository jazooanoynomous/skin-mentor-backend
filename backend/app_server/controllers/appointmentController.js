const { ObjectId } = require('mongodb');
const Appointment = require('../models/appointmentModel')




module.exports = class UserControl {
    
    //add appointment
    static async addAppointment(req, res) {
        const { doctorId, 
            appointmentRequesterName,
             appointmentRequesterId,
             selectedDate,
              selectedTime, 
              appointmentRequesterImage,
              appointmentRequesterNumber,
              doctorName,
              doctorImage,
              doctorNumber
               } = req.body;
        try {
           
            const appointment = new Appointment({
                doctorId : doctorId , 
                appointmentRequesterName : appointmentRequesterName,
                 appointmentRequesterId : appointmentRequesterId, 
                 selectedTime : selectedTime, 
                 selectedDate : selectedDate,
                 appointmentRequesterImage : appointmentRequesterImage,
                 appointmentRequesterNumber : appointmentRequesterNumber,
                 doctorName:doctorName,
              doctorImage : doctorImage,
              doctorNumber:doctorNumber,
                 doctorResponse : ''
            });
            await appointment.save();
            res.status(200).json(appointment);
        } catch (err) {
            console.log(err);
        }
    } 
       static async getAppointmentsByDoctorId(req, res) {
            const { doctorId } = req.params; // Assuming doctorId is passed as a route parameter
            
            try {
                const appointments = await Appointment.find({ doctorId: ObjectId(doctorId) });
                res.status(200).json(appointments);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    
        // Method to get appointments by requesterId
        static async getAppointmentsByRequesterId(req, res) {
            const { requesterId } = req.params; // Assuming requesterId is passed as a route parameter
            
            try {
                const appointments = await Appointment.find({ appointmentRequesterId: ObjectId(requesterId) });
                res.status(200).json(appointments);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
        static async getAcceptedAppointmentsByDoctorId(req, res) {
            const { doctorId } = req.params; // Assuming doctorId is passed as a route parameter
            
            try {
                const appointments = await Appointment.find({ doctorId: ObjectId(doctorId), doctorResponce: 'Accepted' });
                res.status(200).json(appointments);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }  
        static async getAcceptedAppointmentsByRequesterId(req, res) {
            const { requesterId } = req.params; 
            try {
                const appointments = await Appointment.find({ appointmentRequesterId: ObjectId(requesterId), doctorResponce: 'Accepted' });
                res.status(200).json(appointments);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } 

        static async updateAppointmentResponse(req, res) {
            const { appointmentID,response } = req.body; 
        
            console.log('this is id and responce ',appointmentID, response)
            
            try {
                const updatedAppointment = await Appointment.findByIdAndUpdate(
                    appointmentID,
                    { doctorResponce: response },
                    { new: true }
                );
                //remove rejected appointments
                if(doctorResponce=="rejected"){
                    await Appointment.findByIdAndDelete(appointmentID)
                }
                if (!updatedAppointment) {
                    return res.status(404).json({ error: 'Appointment not found' });
                }
        
                res.status(200).json(updatedAppointment);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }



static async getAppointmentById(req, res) {
    const { appointmentId } = req.params; // Assuming appointmentId is passed as a route parameter

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



static async getAppointmentsByDoctorAndRequesterId(req, res) {
    const { doctorId, requesterId } = req.params;

    try {
        const appointments = await Appointment.find({
            doctorId: ObjectId(doctorId),
            appointmentRequesterId: ObjectId(requesterId)
        });

        res.status(200).json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

  
static async deleteAppointmentsByRequesterId(req, res) {
    const { requesterId } = req.params; // Assuming requesterId is passed as a route parameter

    try {
        const deletedAppointments = await Appointment.deleteMany({ appointmentRequesterId: ObjectId(requesterId) });

        if (deletedAppointments.deletedCount === 0) {
            return res.status(404).json({ error: 'Appointments not found for this requester' });
        }

        res.status(200).json({ message: 'Appointments deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

}