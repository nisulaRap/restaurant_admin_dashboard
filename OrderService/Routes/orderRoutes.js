const express = require('express');
const router = express.Router();
const { createOrder, listOrders, updateStatus } = require('../Controllers/orderController');
const verifyToken = require('../../AuthService/Middleware/verifyToken');
const verifyRole = require('../../AuthService/Middleware/verifyRole');

router.post('/add', verifyToken, verifyRole("ResturantAdmin"), createOrder);
router.get('/list', verifyToken, verifyRole("ResturantAdmin"), listOrders);
router.put("/:orderId/status", verifyToken, verifyRole("ResturantAdmin"), updateStatus);

module.exports = router;