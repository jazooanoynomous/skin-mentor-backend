const router = require("express").Router();
const cartController = require("../../controllers/Helper/cartController");
// const { verifyToken } = require("../middleware/verifyToken");

router.get("/find",  cartController.getCart);
router.get("/cartCount", cartController.getCartCount);
router.post("/",  cartController.addtoCart);
router.delete("/:id",  cartController.deleteCartItem);
router.put("/quantity/:cartItemId", cartController.decrementCartItem);
//router.delete("/:cartItemId", verifyToken, cartController.resetCart);

module.exports = router;
