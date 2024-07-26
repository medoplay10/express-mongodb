import { Router } from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.get("/all-products", getProducts);

router.get("/single-product/:idProduct", getProduct);

router.post("/add-product", addProduct);

router.patch("/update-product/:idProduct", updateProduct);

router.delete("/delete-product/:idProduct", deleteProduct);

export { router as productRoutes };
