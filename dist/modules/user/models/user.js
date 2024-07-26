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
exports.User = void 0;
const database_1 = require("../../../util/database");
const mongodb_1 = require("mongodb");
class User {
    constructor(username, email, cart, id) {
        this._id = id;
        this.username = username;
        this.email = email;
        this.cart = cart ? cart : { items: [] };
        this.cart.items = cart ? cart.items : [];
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                return yield db.collection("users").insertOne(this);
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProductToCart(product, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateCart = {
                items: [Object.assign(Object.assign({}, product), { quantity })],
            };
            const db = (0, database_1.getDb)();
            const userId = new mongodb_1.ObjectId(this._id);
            try {
                return yield db.collection("users").updateOne({
                    _id: userId,
                }, {
                    $set: { cart: updateCart },
                });
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
                return yield db.collection("users").find().toArray();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            try {
                const userId = new mongodb_1.ObjectId(idUser);
                return yield db.collection("users").findOne({ _id: userId });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.User = User;
