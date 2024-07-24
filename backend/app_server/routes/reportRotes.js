const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportController");

// Route for adding a report
router.post("/add", ReportController.addReport);

// Route for deleting a report by ID
router.delete("/:reportId", ReportController.deleteReport);

// Route for getting reports by doctor ID
router.get("/doctor/:doctorId", ReportController.getReportByDoctorId);

// Route for getting reports by report requester ID
router.get("/requester/:requesterId", ReportController.getReportByRequesterId);

// Route for getting reports by both doctor and report requester IDs
router.get("/doctor/:doctorId/requester/:requesterId", ReportController.getReportByBothIds);

// Route for updating the disease field in a report
router.put("/:reportId/disease", ReportController.updateDisease);

// Route for updating the prescription field in a report
router.put("/:reportId/prescription", ReportController.updatePrescription);

module.exports = router;
