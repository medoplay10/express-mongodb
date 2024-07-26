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
exports.Product = void 0;
const database_1 = require("../../../util/database");
const mongodb_1 = require("mongodb");
class Product {
    constructor(title, price, description, imageUrl, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                const result = yield db.collection("products").insertOne(this);
                return Object.assign(Object.assign({}, this), { _id: result.insertedId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                return yield db.collection("products").find().toArray();
            }
            catch (error) {
                console.log("Error fetching products:", error);
                throw error;
            }
        });
    }
    static findById(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                const objectId = new mongodb_1.ObjectId(idProduct);
                return yield db.collection("products").findOne({ _id: objectId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(idProduct, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                const objectId = new mongodb_1.ObjectId(idProduct);
                return yield db.collection("products").updateOne({ _id: objectId }, {
                    $set: updateData,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteById(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                const objectId = new mongodb_1.ObjectId(idProduct);
                return yield db.collection("products").deleteOne({ _id: objectId });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Product = Product;
