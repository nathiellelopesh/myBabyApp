//router.js
const { Router } = require("express");
const productsController = require("./controllers/productsController")

const router = Router()

router.get("/", productsController.index);
router.get("/produto/:id", productsController.show);
//router.post("/products", productsController.create);
//router.put("/products/:id", productsController.update);
//router.delete("/products/:id", productsController.delete);

module.exports = router

