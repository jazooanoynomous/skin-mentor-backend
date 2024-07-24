const Product = require("../../models/Helper/Products");
const Cart = require("../../models/Helper/Cart");

module.exports = {
  addtoCart: async (req, res) => {
    const userId = req.user.id;
    const { cartItem, quantity } = req.body;
    let count;
    try {
      const existingProduct = await Cart.findOne({ userId, cartItem });

      if (existingProduct) {
        existingProduct.quantity += 1;
        await existingProduct.save();
      }
      //if a user has not added anything yet
      else {
        const newCartEntry = new Cart({
          userId: userId,
          cartItem: req.body.cartItem,
          quantity: req.body.quantity,
        });

        await newCartEntry.save();
      }
      count = await Cart.countDocuments({ userId: req.user.id });
      res.status(201).json({
        status: true,
        message: "Product added to cart successfully",
        count: count,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Failed to add product to cart",
      });
    }
  },

  getCart: async (req, res) => {
    //const userId = req.params.id;
    try {
      const cart = await Cart.find({ userId: req.user.id }).populate({
        path: "cartItem",
        select: "title imageUrl price supplier",
      });
      res.status(200).json(cart);
      //console.log(cart);
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Failed to get cart",
      });
      //console.log(error);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.id;
    let count;
    try {
      await Cart.findByIdAndDelete(cartItemId);
      count = await Cart.countDocuments({ userId: req.user.id });
      res.status(200).json({
        status: true,
        message: "Cart item deleted",
        count: count,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Failed to delete cart item",
      });
    }
  },
  decrementCartItem: async (req, res) => {
    let count;
    //const { userId, cartItem } = req.body;

    try {
      const cartItemId = req.params.cartItemId;
      const cartItem = await Cart.findOne({ cartItemId });
      if (!cartItem) {
        return res.status(404).json({
          status: false,
          message: "Cart item not found",
        });
      }
      if (cartItem.quantity > 1) {
        //Decrement the quantity
        cartItem.quantity -= 1;
        await cartItem.save();
        res.status(200).json({ status: true, count: cartItem.quantity });
      } else {
        //Delete the item if quantity  is 1 or less
        await Cart.findByIdAndRemove(cartItemId);
        count = await Cart.countDocuments({ userId: req.user.id });

        res.status(200).json({
          status: true,
          message: "Cart item removed",
          count: count,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Failed to update cart item",
      });
    }
  },

  resetCart: async (req, res) => {
    try {
      await Cart.deleteMany({userId: req.user.id});
      res.status(200).json({
        status: true,
        message: "Cart reset",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Failed to reset cart",
      });
    }
  },

  getCartCount: async (req, res) => {
    try {
      const count = await Cart.countDocuments({ userId: req.user.id });
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
};
