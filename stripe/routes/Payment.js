const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51OxLbCJJEJlcpPZ0o7OrSKy00TzPKQRiKvncPF6L8vouWtn8tL7e8S9jeFD5K09flDsHVCUIwvkV3dGX2sWBklGQ002vSG4TCs");

router.post('/intent', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        description:'Your payment description here',
        currency: 'inr',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });

module.exports = router;