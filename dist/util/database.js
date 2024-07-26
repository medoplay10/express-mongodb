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
exports.getDb = exports.mongoConnect = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
let _db;
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const client = yield mongodb_1.MongoClient.connect(process.env.MONGO_URI);
        _db = client.db();
        console.log('Successfully connected to MongoDB');
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
});
exports.mongoConnect = mongoConnect;
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error('No database found!');
};
exports.getDb = getDb;
