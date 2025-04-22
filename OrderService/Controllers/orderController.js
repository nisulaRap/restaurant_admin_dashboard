const Order = require('../Models/orderModel');
const express = require('express');

const createOrder = async (req, res) => {
    try {
        const {
            cartId,
            customerId,
            restaurantId,
            items,
            totalAmount,
            paymentMethod,
            deliveryLocation,
            notes
        } = req.body;

        // Basic validation
        if (!customerId || !restaurantId || !items || !totalAmount || !paymentMethod || !deliveryLocation) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newOrder = new Order({
            cartId,
            customerId,
            restaurantId,
            items,
            totalAmount,
            paymentMethod,
            deliveryLocation,
            notes
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create order" });
    }
};

const listOrders = async (req, res) => {
    try{
        const orders = await Order.find({});
        res.status(200).json({ success:true, data:orders })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:false, message:"Error"})
    }
}

const updateStatus = async (req, res) => {
    try{
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        if (!orderStatus) {
            return res.status(400).json({ message: "Order status is required" });
        }

        const validStatuses = [ "Pending", "Confirmed", "Preparing", "ReadyToDeliver",  "Cancelled" ];

        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const order = await Order.findOne({ orderId });
        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({ success:true, message:"Status Updated"})
    } catch (error){
        console.log(error);
        res.status(500).json({success:false, message:"Error"})
    }
}

module.exports = { createOrder, listOrders, updateStatus }
