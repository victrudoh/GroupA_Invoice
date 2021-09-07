const express = require("express");

const productController = require("../controllers/products.controller");

const router = express.Router();

router.get("/", productController.product_listController);

router.get("/new", productController.newProductController);

router.post("/new", productController.uploadProductController);

router.get("/edit/:id", productController.editProductController);

router.post("/edit", productController.updateProductController);

router.get("/delete/:id", productController.delete_viewProductController);

router.post("/delete", productController.deleteProductController);

router.post("/products", productController.sortProductController);



module.exports = router;