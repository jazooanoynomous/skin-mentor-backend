const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
'sk_test_51OxLbCJJEJlcpPZ0o7OrSKy00TzPKQRiKvncPF6L8vouWtn8tL7e8S9jeFD5K09flDsHVCUIwvkV3dGX2sWBklGQ002vSG4TCs');

// router endpoints
router.post('/intents', async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;