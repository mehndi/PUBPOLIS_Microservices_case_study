const express = require('express');
const router = express.Router();
const PaymentModel = require('../models/payment.model');
const secretKey = 'OurSecretKey';
const tockenVerify = require('tokenverify_middleware')(secretKey);

// ====
router.post('/payment/create', tockenVerify, (req, res) => {
    const {amount} = req.body;
    const payment = new PaymentModel({amount});
    payment.save((err, result) => {
        if (err) res.status(400).json(err);
        else {
            res.status(201).json(result);
        }
    });
});

module.exports = router;