const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/product');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require("../models/product");

/**
 * @swagger
 * /products:
 *  get:
 *    description: Use to request all products
 *    responses:
 *      '200':
 *        description: Responese successed
 *      '500':
 *        description: Responese failed
 */

router.get("/", ProductController.get_all_products);

router.post("/", upload.single('productImage'), checkAuth,ProductController.create_product);

router.get("/:productId", ProductController.get_product_by_id);

router.patch("/:productId", checkAuth, ProductController.update_product );

router.delete("/:productId", checkAuth,ProductController.remove_product_by_id );

module.exports = router;