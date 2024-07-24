const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  // Differentiate between shopping cart and appointment types
  type: {
    type: String,
    required: true,
    enum: ['shopping_cart', 'appointment']
  },
  // Shopping cart details (if type is 'shopping_cart')
  items: [
    {
      productId: { type: String, required: true }, // ID of the product
      variantId: { type: String, optional: true },  // Optional for product variants
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  // Appointment details (if type is 'appointment')
  appointment: {
    serviceId: { type: String, required: true }, // ID of the booked service
    startTime: { type: Date, required: true },
    price: { type: Number, required: true }
  },
  total: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: Object,
    properties: {
      streetAddress: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String }
    }
  }, // Optional for shopping cart
  paymentIntentId: {
    type: String, required: true
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['succeeded', 'pending', 'canceled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Optional fields for tracking fulfillment (applicable to shopping cart)
  fulfillmentStatus: {
    type: String,
    enum: ['unfulfilled', 'shipped', 'delivered', 'canceled'],
    default: 'unfulfilled'
  },
  trackingNumber: { type: String, optional: true }
});

module.exports = mongoose.model('Order', orderSchema);
