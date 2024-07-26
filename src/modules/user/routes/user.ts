import { Router } from "express";
import {
  addUser,
  allUsers,
  getUser,
  addProductToCart,
  getMyCart,
  deleteItemFromCart,
  addOrder,getOrders
} from "../controllers/user";
const router = Router();

router.get("/all-users", allUsers);

router.get("/single-user/:idUser", getUser);

router.get("/get-cart", getMyCart);

router.post("/add-user", addUser);

router.post("/add-product-to-cart", addProductToCart);

router.delete("/delete-item-from-cart/:productId", deleteItemFromCart);

router.post("/add-order", addOrder);
router.get("/get-orders", getOrders);



export { router as userRouters };
