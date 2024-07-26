import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { mongoConnect } from "./util/database";
import "dotenv/config";
import { userRouters } from "./modules/user/routes/user";
import { productRoutes } from "./modules/product/routes/product";
import { User } from "./modules/user/models/user";

const app = express();
const port = process.env.PORT || 3000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse application/json
app.use(bodyParser.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById("6689b325792a2e077f9f54c9");
    if (user) {
      req.user = new User(user.username, user.email, user.cart, user._id);
    }
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/users", userRouters);
app.use("/products", productRoutes);

// Start the server after database connection is established
mongoConnect()
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
