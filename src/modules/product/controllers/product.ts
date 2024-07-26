import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";
import { User } from "../../user/models/user";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description, imageUrl, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const newProduct = new Product(
      title,
      price,
      description,
      imageUrl,
      userId,
    );
    await newProduct.save();
    res.status(201).send({ message: "Product saved successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to save product.", error: (error as Error).message });
  }
};

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Failed to fetch all products.",
        error: (error as Error).message,
      });
    });
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findById(idProduct);
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    res.status(200).send(product);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch product.", error: (error as Error).message });
  }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { idProduct } = req.params;
  const { title, price, description, imageUrl } = req.body;

  try {
    // Check if the product exists
    const existingProduct = await Product.findById(idProduct);
    if (!existingProduct) {
      return res.status(404).send({ message: "Product not found." });
    }

    // Build the update object dynamically
    const updateData: Partial<Product> = {};
    if (title !== undefined) updateData.title = title;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    // Update the product
    await Product.update(idProduct, updateData);

    res.send({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      message: "Failed to update product.",
      error: (error as Error).message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { idProduct } = req.params;

  try {
    // Check if the product exists
    const product = await Product.findById(idProduct);
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    // Delete the product
    await Product.deleteById(idProduct);
    res.status(200).send({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete product.",
      error: (error as Error).message,
    });
  }
};

export { addProduct, getProducts, getProduct, updateProduct, deleteProduct };
