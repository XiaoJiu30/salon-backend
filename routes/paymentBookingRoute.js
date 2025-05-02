const express = require('express');
const Stripe = require('stripe');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // ✅ Secure
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount, appointmentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: 'php',
      metadata: { appointment_id: appointmentId }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});

module.exports = router;
