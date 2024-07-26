import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { Product } from "../../product/models/product";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.body;
  try {
    const newUser = new User(username, email);
    await newUser.save();
    res.status(201).send({
      message: "User saved successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to save User.",
      error: (error as Error).message,
    });
  }
};

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.fetchAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: "Failed to get all Users.",
      error: (error as Error).message,
    });
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);
    const user = await User.findById(idUser);
    console.log(user);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: "Failed to get single User.",
      error: (error as Error).message,
    });
  }
};

const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idProduct, quantity } = req.body;
  try {
    console.log(idProduct, quantity);
    const product = await Product.findById(idProduct);
    console.log(product);
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    const result = await req.user!.addProductToCart(product, quantity);
    console.log(result);
    res.status(200).send({ message: "Product added to cart successfully." });
  } catch (error) {
    res.status(500).send({
      message: "Failed to Add Product to cart.",
      error: (error as Error).message,
    });
  }
};

const getMyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await req.user!.getMyCart();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({
      message: "Failed to get my cart",
      error: (error as Error).message,
    });
  }
};

const deleteItemFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  try {
    const cart = await req.user!.deleteItemFromCart(productId);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete item from cart",
      error: (error as Error).message,
    });
  }
};

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user!.cart.items.length == 0) {
      return res.status(404).send({ message: "Not found items in your cart" });
    }
    const order = await req.user!.addOrder();
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({
      message: "Failed to make order",
      error: (error as Error).message,
    });
  }
};
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await req.user!.getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({
      message: "Failed to get orders",
      error: (error as Error).message,
    });
  }
};
export {
  addUser,
  allUsers,
  getUser,
  addProductToCart,
  getMyCart,
  deleteItemFromCart,
  addOrder,
  getOrders,
};
