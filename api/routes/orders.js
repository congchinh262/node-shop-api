const { json } = require('express');
const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/order');

router.get('/',checkAuth,OrderController.get_all_orders)

router.post('/',checkAuth, OrderController.create_order)

router.get('/:orderId', checkAuth, OrderController.get_order_by_id)

router.delete('/:orderId', checkAuth,OrderController.remove_order_by_id)


module.exports = router