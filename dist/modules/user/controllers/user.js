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
exports.addProductToCart = exports.getUser = exports.allUsers = exports.addUser = void 0;
const user_1 = require("../models/user");
const product_1 = require("../../product/models/product");
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    try {
        const newUser = new user_1.User(username, email);
        yield newUser.save();
        res.status(201).send({
            message: "User saved successfully.",
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to save User.",
            error: error.message,
        });
    }
});
exports.addUser = addUser;
const allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.fetchAll();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to get all Users.",
            error: error.message,
        });
    }
});
exports.allUsers = allUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        console.log(idUser);
        const user = yield user_1.User.findById(idUser);
        console.log(user);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to get single User.",
            error: error.message,
        });
    }
});
exports.getUser = getUser;
const addProductToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idProduct, quantity } = req.body;
    try {
        const product = yield product_1.Product.findById(idProduct);
        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }
        const result = yield req.user.addProductToCart(idProduct, quantity);
        console.log(result);
        res.status(200).send({ message: "Product added to cart successfully." });
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to Add Product to cart.",
            error: error.message,
        });
    }
});
exports.addProductToCart = addProductToCart;
