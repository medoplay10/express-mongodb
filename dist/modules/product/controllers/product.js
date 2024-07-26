"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.addProduct = void 0;
const product_1 = require("../models/product");
const user_1 = require("../../user/models/user");
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description, imageUrl, userId } = req.body;
        const user = yield user_1.User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        const newProduct = new product_1.Product(title, price, description, imageUrl, userId);
        yield newProduct.save();
        res.status(201).send({ message: "Product saved successfully." });
    }
    catch (error) {
        res
            .status(500)
            .send({ message: "Failed to save product.", error: error.message });
    }
});
exports.addProduct = addProduct;
const getProducts = (req, res, next) => {
    product_1.Product.fetchAll()
        .then((result) => {
        res.send(result);
    })
        .catch((error) => {
        res.status(500).send({
            message: "Failed to fetch all products.",
            error: error.message,
        });
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idProduct } = req.params;
        const product = yield product_1.Product.findById(idProduct);
        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }
        res.status(200).send(product);
    }
    catch (error) {
        res
            .status(500)
            .send({ message: "Failed to fetch product.", error: error.message });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProduct } = req.params;
    const { title, price, description, imageUrl } = req.body;
    try {
        // Check if the product exists
        const existingProduct = yield product_1.Product.findById(idProduct);
        if (!existingProduct) {
            return res.status(404).send({ message: "Product not found." });
        }
        // Build the update object dynamically
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (price !== undefined)
            updateData.price = price;
        if (description !== undefined)
            updateData.description = description;
        if (imageUrl !== undefined)
            updateData.imageUrl = imageUrl;
        // Update the product
        yield product_1.Product.update(idProduct, updateData);
        res.send({ message: "Product updated successfully." });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({
            message: "Failed to update product.",
            error: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProduct } = req.params;
    try {
        // Check if the product exists
        const product = yield product_1.Product.findById(idProduct);
        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }
        // Delete the product
        yield product_1.Product.deleteById(idProduct);
        res.status(200).send({ message: "Product deleted successfully." });
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to delete product.",
            error: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
