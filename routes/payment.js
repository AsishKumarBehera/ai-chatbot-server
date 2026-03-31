const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create order
router.post('/create-order', async (req, res) => {  // ← removed /payment
  try {
    const order = await razorpay.orders.create({
      amount: 49900,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// 2. Verify payment
router.post('/verify-payment', async (req, res) => {  // ← removed /payment
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSig !== razorpay_signature) {
    return res.status(400).json({ error: 'Payment verification failed' });
  }

  res.json({ success: true });
});

// 3. Webhook
router.post('/webhook', (req, res) => {  // ← removed /payment
  const sig = req.headers['x-razorpay-signature'];
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.body)
    .digest('hex');

  if (sig !== expectedSig) return res.status(400).send('Invalid signature');

  const event = JSON.parse(req.body);
  if (event.event === 'payment.captured') {
    console.log('Payment captured:', event.payload.payment.entity.id);
  }

  res.json({ received: true });
});

module.exports = router;