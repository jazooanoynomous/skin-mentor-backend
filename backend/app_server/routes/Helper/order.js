const router = require("express").Router();
const ordersController = require("../../controllers/Helper/ordersController");

router.get("/:id", ordersController.getUserOrders);

module.exports = router;
