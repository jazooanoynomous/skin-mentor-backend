const Report = require('../models/reportModel');

module.exports = class ReportControl {
    // Add Report Method
    static async addReport(req, res) {
        const {
            
            doctorName,
            doctorImage,
            reportRequesterId,
            reportRequesterName,
            reportRequesterImage,
            reportRequesterNumber,
            disease,
            prescription
        } = req.body;

        try {
            const newReport = await Report.create({
                
                doctorName : doctorName,
                doctorImage : doctorImage,
                reportRequesterId : reportRequesterId,
                reportRequesterName : reportRequesterName,
                reportRequesterImage : reportRequesterImage,
                reportRequesterNumber:reportRequesterNumber,
                disease : disease,
                prescription : ''
            });

            
            res.status(200).json(newReport);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Delete Report Method
    static async deleteReport(req, res) {
        const reportId = req.params.reportId;

        try {
            const deletedReport = await Report.findByIdAndDelete(reportId);
            if (!deletedReport) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json({ message: 'Report deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get Report by Doctor ID Method
    static async getReportByDoctorId(req, res) {
        const doctorId = req.params.doctorId;

        try {
            const reports = await Report.find({ doctorId });
            res.status(200).json(reports);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get Report by Report Requester ID Method
    static async getReportByRequesterId(req, res) {
        const requesterId = req.params.requesterId;

        try {
            const reports = await Report.find({ reportRequesterId: requesterId });
            res.status(200).json(reports);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get Report by Both Doctor ID and Report Requester ID Method
    static async getReportByBothIds(req, res) {
        const { doctorId, requesterId } = req.params;

        try {
            const reports = await Report.find({ doctorId, reportRequesterId: requesterId });
            res.status(200).json(reports);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Update Disease Field Method
    static async updateDisease(req, res) {
        const { reportId } = req.params;
        const { disease } = req.body;

        try {
            const updatedReport = await Report.findByIdAndUpdate(
                reportId,
                { disease },
                { new: true }
            );

            if (!updatedReport) {
                return res.status(404).json({ error: 'Report not found' });
            }

            res.status(200).json(updatedReport);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Update Prescription Method
    static async updatePrescription(req, res) {
        const { reportId } = req.params;
        const { prescription } = req.body;

        try {
            const updatedReport = await Report.findByIdAndUpdate(
                reportId,
                { prescription },
                { new: true }
            );

            if (!updatedReport) {
                return res.status(404).json({ error: 'Report not found' });
            }

            res.status(200).json(updatedReport);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    // ...



};
