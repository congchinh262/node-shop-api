const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose')

exports.get_all_orders= (req, res, next) => {
    Order.find()
        .populate('Product')
        .exec()
        .then(results => {
            const responese = {
                count: results.length,
                order: results.map(result => {
                    return {
                        _id: result._id,
                        quantity: result.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + result._id
                        }
                    }
                })
            }
            res.status(200).json(responese);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
}

exports.create_order=(req, res, next) => {
    Product.findById(req.body.orderId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }
            const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: "Order stored!",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders/" + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Product not found!',
                url: "http://localhost:3000/orders/" + result._id
            })
        });
}

exports.get_order_by_id=(req, res, next) => {
    id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + order._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        });
}

exports.remove_order_by_id=(req, res, next) => {
    id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted!',
                request: {
                    type: "POST",
                    body: {
                        productId: 'ID',
                        quantity: 'Number'
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        });
}

