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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./util/database");
require("dotenv/config");
const user_1 = require("./modules/user/routes/user");
const product_1 = require("./modules/product/routes/product");
const user_2 = require("./modules/user/models/user");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Middleware to parse application/json
app.use(body_parser_1.default.json());
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_2.User.findById("6689b325792a2e077f9f54c9");
        console.log("user", user);
        if (user) {
            req.user = new user_2.User(user.username, user.email, user.cart, user._id);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}));
app.use("/users", user_1.userRouters);
app.use("/products", product_1.productRoutes);
// Start the server after database connection is established
(0, database_1.mongoConnect)()
    .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
